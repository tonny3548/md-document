<template>
  <MdDocument document="demo">
    <Teleport to="#demo1">
      <Demo1/>
    </Teleport>
    <Teleport to="#demo2">
      <Demo2 msg="hello world"/>
    </Teleport>
  </MdDocument>
</template>

<script setup lang="ts">
import MdDocument from "@/components/Document.vue";
import "./styles/github.scss";
import Demo1 from "@/views/demo/Demo1.vue";
import Demo2 from "@/views/demo/Demo2.vue";
console.log("global1", __MK_DOCUMENT_HTML__)
</script>
