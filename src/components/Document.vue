<template>
    <div class="mk-doc">
        <span class="mk-doc__html" v-if="mk?.html" v-html="mk.html" ref="html"></span>
        <template v-if="isRender">
            <slot></slot>
        </template>
    </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref, type ComputedRef, type Ref } from 'vue';

const props = defineProps<{
    /** 文档id */
    document: string;
}>();
const mk:ComputedRef<MdDocuemntDefineType> = computed(() => {
    return __MK_DOCUMENT_HTML__[props.document] || null;
})
const isRender = ref(false);
const html: Ref<HTMLSpanElement | null> = ref(null);
onMounted(() => {
    const timer = setInterval(() => {
        if(mk.value && html.value?.childNodes.length) {
            isRender.value = true;
            clearInterval(timer);
        }
    }, 100)
})
setTimeout(() => {
    isRender.value = true;
}, 1000);

</script>