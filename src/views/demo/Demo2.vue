<template>
    <h2>Demo2:{{ msg }}</h2>
    <button @click="test">测试按钮</button>
</template>

<script setup lang="ts">
defineProps<{
    msg?:string;
}>()
function test() {
    alert('测试按钮123')
}
</script>