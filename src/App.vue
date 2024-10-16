<template>
    <MdDocument class="md-document" document="demo">
        <Teleport to="#demo1">
            <Demo1 />
        </Teleport>
        <Teleport to="#demo2">
            <Demo2 msg="hello world" />
        </Teleport>
    </MdDocument>
</template>

<script setup lang="ts">
import MdDocument from "md-document/src/components/Document.vue";
import "md-document/src/styles/github.scss";
import Demo1 from "@/views/demo/Demo1.vue";
import Demo2 from "@/views/demo/Demo2.vue";
</script>

<style lang="scss">
.md-document {
    width: 80%;
    margin: auto;
}
@media screen and (min-width: 1027px) {
    .md-document {
        width: 70%;
    }
}
@media screen and (min-width: 1200px) {
    .md-document {
        width: 60%;
    }
}
</style>
