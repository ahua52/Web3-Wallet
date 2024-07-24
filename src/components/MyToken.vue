<template>
  <!-- <WalletButton /> -->
  <div>name: {{name}}</div>
  <div>symbol: {{symbol}}</div>
  <div>totalSupply: {{ts}}</div>
  <div>balanceOf: {{balance}}</div>
  <h1>转入地址 <input v-model="toAddress" type="text"></h1>
<h1> 转入金额 <input v-model="amount" type="text">GYC</h1>
  <button @click="transferGYC">Transfer</button>
</template>

<script setup>
import {ref, onMounted,computed} from 'vue'
import MyToken from "../contracts/MyToken.json";
import Web3 from "web3";
const sepolian = "wss://sepolia.infura.io/ws/v3/3b0717db7b8e444db66f87431232170b";

var web3 = new Web3(Web3.givenProvider || sepolian);

const mtcContact = new web3.eth.Contract(
    MyToken.abi,
    "0x18Cbcb50bA04a8b58FCf306df3E4A5444e7B1a4f"
)
const toAddress = ref("");
const amount = ref();
const name = ref("");
const symbol = ref("");
const totalSupply = ref("");
const balanceOf = ref("");
const currentAccount = ref("");

const getCoinInfo = async() => {
    currentAccount.value = await web3.eth.requestAccounts();
    name.value = await mtcContact.methods.name().call();
    symbol.value = await mtcContact.methods.symbol().call();
    totalSupply.value = await mtcContact.methods.totalSupply().call();
    balanceOf.value = await mtcContact.methods.balanceOf(currentAccount.value[0]).call();
}

const ts = computed(() => {
    return web3.utils.fromWei(totalSupply.value,'ether');
})
const balance = computed(() => {
    return web3.utils.fromWei(balanceOf.value,'ether');
})



onMounted(() => {
    getCoinInfo()
})

const transferGYC = () => {
    const weiAmount = web3.utils.toWei(amount.value, 'ether');
    mtcContact.methods
    .transfer(toAddress.value,weiAmount)
    .send({
        from: currentAccount.value[0],
    })
    .on('receipt',(res) => {
        console.log("交易成功", res)
    });
    console.log(weiAmount);
}

console.log(mtcContact) 
</script>

<style lang="less">
h1 {
  color: red
}
</style>
