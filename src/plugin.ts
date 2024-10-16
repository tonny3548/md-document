import { glob } from "glob";
import fs from "fs-extra";
import { marked } from "marked";

export type MdDocumentOptionType = {
    encoding?: BufferEncoding;
    md: {
        /**
         * 目标存储文件
         * @desc 生成综合md存储路径
         * @desc 不传则不生成md文件
         * @example "./README.md"
         */
        target?: string;
        /**
         * markdown文件路径
         * @desc 模糊匹配需要在文档中展示的markdown文件路径
         * @desc 符合glob匹配规则
         * @example ["./docs/*.md"]
         */
        includes: string[];
    };
    code: {
        /**
         * 代码文件路径
         * @desc 生成综合html存储路径
         * @desc 不传则不生成html文件
         * @example "./README.html"
         */
        target?: string;
        /**
         * 代码文件路径
         * @desc 模糊匹配需要在文档中展示的代码文件路径
         * @desc 符合glob匹配规则
         * @example ["./src/views/demo/*.vue", "./src/views/demo/*.js"]
         */
        includes: string[];
    };
};
export type MdDocuemntDefineType = {
    /** 文档标题 */
    title: string;
    /** html文本 */
    html: string;
};

/** 核心对象 */
const mdDoc: Record<string, MdDocuemntDefineType> = {};

/**
 * 核心插件
 * @desc 设置全局变量
 * @param option 配置对象
 * @returns
 */
export default async function plugin(option: MdDocumentOptionType) {
    await read(option);
    return {
        name: "vite-plugin-mddocument",
        config() {
            return {
                define: {
                    __MK_DOCUMENT_HTML__: mdDoc,
                },
            };
        },
    };
}
/**
 * 读取markDown文档
 * @desc 根据文件路径匹配规则读取所有文件,并使用marked转换为html
 * @param includes 文件路径匹配
 */
async function read(option: MdDocumentOptionType) {
    const readmes: string[] = [];
    const [codeFilePaths, mdFilesPaths] = await Promise.all(
        [option.code.includes, option.md.includes].map((includes) => glob(includes, { absolute: true })),
    );
    const codeQuery: Record<string, string> = {};
    codeFilePaths.forEach((path) => {
        const fileName = path.split("/").pop();
        if (fileName) {
            const key = fileName.replace(/\.\w+$/i, "");
            codeQuery[key.toLowerCase()] = path;
        }
    });
    await Promise.all(
        mdFilesPaths.map(async (path) => {
            /** markdown文件乐融 */
            let mdContent = await fs.readFile(path, { encoding: option.encoding || "utf-8" });
            /** md中所有代码块列表 */
            const cmps = mdContent.match(/```[^\n]+```/g) || [];
            // 遍历代码列表,替换为真实代码
            await Promise.all(
                cmps.map(async (cmp) => {
                    let [, lang, id] = cmp.match(/```(.*:)?([^`]+)```/) || [];
                    lang = (lang || "vue").replace(":", "");
                    if (id && codeQuery[id]) {
                        id = id.toLowerCase();
                        const code = await fs.readFile(codeQuery[id], { encoding: option.encoding || "utf-8" });
                        mdContent = mdContent.replaceAll(cmp, `\`\`\`${lang}\n${code}\n\`\`\``);
                    }
                }),
            );
            // 保存md文档
            readmes.push(mdContent);
            /** md中所有图片元素列表 */
            const imgs = mdContent.match(/!\[.*?\]\(.*?\)/g) || [];
            // 遍历图片列表,替换为图片载体
            imgs.forEach((img) => {
                const id = img.match(/\[(.+)\]/)?.[1] || "";
                if (codeQuery[id.toLowerCase()]) {
                    mdContent = mdContent.replace(img, `<div class="md-doc__cmp" id="${id}"></div>`);
                }
            });
            // 转换为html
            let html: string = marked(mdContent) as string;
            // 给所有标签添加属性md-doc-item
            html = html.replace(/<([^>/]+)(\/?)>/g, ($, $1, $2) => `<${$1} md-doc-item${$2 ? " /" : $2}>`);
            // 提取标题
            const title = mdContent.match(/# (.+)/)?.[1] || "";
            // 提取文件名key进行全局存储
            const fileName = path.split("/").pop();
            if (fileName) {
                const key = fileName.replace(/\.\w+$/i, "").toLowerCase();
                codeQuery[key] = path;
                mdDoc[key] = { html, title };
            }
        }),
    );
    if (!readmes.length) return;
    // 保存md文档
    if (option.md.target) {
        await fs.writeFile(option.md.target, readmes.join("\n\n"), { encoding: option.encoding || "utf-8" });
    }
    // 保存html文档
    if (option.code.target) {
        await fs.writeFile(option.code.target, marked(readmes.join("\n")) as string, {
            encoding: option.encoding || "utf-8",
        });
    }
}
