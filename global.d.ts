type MdDocuemntDefineType = {
    /** 文档标题 */
    title: string;
    /** html文本 */
    html: string;
}

/** 
 * html文本集
 * @example { 'document-id': {title: '文档标题', html: '<div id="document-id">...</div>', code: '<template>...</template>\n<script lang="ts"></script>' }
 */
declare const __MD_DOCUMENT_HTML__: Record<string, MdDocuemntDefineType>;