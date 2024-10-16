# 测试组件

## 二级标题1

![demo1](https://www.zhaodaoshi.com/imgs/ans1_img.svg)

`vue:demo1`

这是一些文本内容

换行了

## 二级标题2

![demo2](https://www.zhaodaoshi.com/imgs/ans1_img.svg)

`vue:demo2`

## 二级标题3

![demo3](https://www.zhaodaoshi.com/imgs/ans1_img.svg)

```vue
<template>
    <div class="demo">
        <h1>{{ msg }}</h1>
    </div>
</template>

<script setup lang="ts">
defineProps<{ msg: string }>({});
</script>
```

### 表格

> 引用1
>
> 引用2

| 标题1 | 标题2                     |
| ----- | ------------------------- |
| test  | Test[链接](www.kooci.net) |
| test2 | test2v                    |

#### 有序序号

1. 持续健康
2. 倒计时开发

##### 无需序号

- 多数据库
- 倒计时卡
