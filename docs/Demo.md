# Markdown文档生成器

## 基本介绍

您是否遇到过想要封装一个公共组件库（如`element-ui`）,为了能让使用者通俗易懂，还得专门写一个文档的可交互页面来介绍您的组件库。为了这个页面还得不断的去复制与粘贴您的示例代码作为文档的代码参照，并且还需要讲说明部分粘贴或保存到数据库中。

使用文档生成器可以帮您大大的节省这些步骤：

- 这是一个自动生成文档的工具

- 可以融合`Markdown`文档与`vue`组件快速生成html文档

- 可以实现边开发，边测，边自动生成文档，文档的说明部分可以在`Markdown`中书写，文档的组件举例与渲染部分专注在演示组件中开发与调试
- 文档导出一个`vite`插件与`vue3.x`的组件

## 怎么使用

*vite.config.ts*

```typescript
import { defineConfig } from 'vite'
import MdDoc from "md-document";

export default defineConfig({
  plugins: [
    // 其它插件
    // md生成器插件
    MdDoc({
      md: {
        target: "./README.md",
        includes: ["./docs/*.md"]
      },
      code: {
        includes: ["./src/view/demo/*"]
      }
    })
  ]
})
```

*文档主组件Document.vue*

```vue:app```

## 插件

插件的作用是找到md文档与组件文件结合生成html字符串存储在`__MD_DOCUMENT_HTML__`全局变量中

| key           | 说明                                                         | 类型     | 举例                | 必填 |
| ------------- | ------------------------------------------------------------ | -------- | ------------------- | ---- |
| md.target     | 结合生成的`md`文档存储路径，不传则不生成综合md文件           | string   | "./README.md"       | 否   |
| md.includes   | 获取md文档的路径（采用[glob库](https://www.npmjs.com/package/glob)识别，格式参照`glob`库） | string[] | ["./src/\*\*/*.md"] | 是   |
| code.target   | 结合生成的html文件存储路径（html无样式）不传则不生成         | string   | "./Readme.html"     | 否   |
| code.includes | 获取代码部分文档的路径（采用[glob库](https://www.npmjs.com/package/glob)识别，格式参照`glob`库） | string[] | ["./src/*.vue"]     | 是   |
| encoding      | 文件编解码格式（默认`utf-8`）                                | string   | "gb2312"            | 否   |

## 组件

组件存储在`src/components/Document.vue`中，组件的作用是根据提供的文档id，将插件部分的html内容渲染到dom中，当然您也可以不使用该组件，转而直接使用`__MD_DOCUMENT_HTML__`根据文档id来查询对应html内容，文档id为`md`文件的名称

*props入参*

| props    | 说明                       | 类型   | 举例   | 必填 |
| -------- | -------------------------- | ------ | ------ | ---- |
| document | 文档id，使用md文档的文件名 | string | "demo" | 是   |

*slots插槽*

| Slots   | 说明                                                         |
| ------- | ------------------------------------------------------------ |
| default | 存放所有的示例组件，一定要将组件放入默认插槽，避免因为文档html未渲染完成导致的组件挂载失败 |

*举例*

```vue
<template>
	<MdDocument document="demo">
	  <Teleport to="#demo1">
	  	<ElButton>测试按钮</ElButton>
	  </Teleport>
	</MdDocument>
</template>
```

## 样式

自动生成的html内容是不带样式的，需要引入转换器对应的样式主题实现样式渲染，或者自定义样式

*举例：main.ts*

```
import "md-document/src/styles/github.scss";
```

## Markdown文档

因为转换器可以根据markdown文档来动态的将演示组件与代码插入到文档中，所以为了方便查询内容，是需要根据全局唯一文件名（简称文档id）索引对的内容。

所以给代码定义全局唯一的id是非常重要的。转换器根据设定的id结合文档的特殊语法来使用`<div id="{id}"></div>`替换掉给组件留位置的占位符，从而配合`vue3`的`Teleport`实现将演示组件挂载到文档的指定位置

md文档的ID也是相似原理讲代码替换到对应为止

演示组件占位符

```markdown
![组件id](图片地址-可以用来直观的演示静态页面的组件示例)
```

代码占位符

> 解析器：对应的是代码格式，比如`vue`,`typescript`

```markdown
```解析器:id```
```

