<template>
	<div class="edit_main">
		<input
			type="file"
			style="display:none;"
			class="avatar-uploader"
			@change="uploadImage($event)"
		/>
		<!-- bidirectional data binding（双向数据绑定） -->
		<quill-editor
			v-model="content"
			ref="myQuillEditor"
			:options="editorOption"
		>
		</quill-editor>
	</div>
</template>

<script>
// 工具栏配置
const toolbarOptions = [
	['bold', 'italic', 'underline', 'strike'], // 加粗 斜体 下划线 删除线
	['blockquote', 'code-block'], // 引用  代码块
	[{ header: 1 }, { header: 2 }], // 1、2 级标题
	[{ list: 'ordered' }, { list: 'bullet' }], // 有序、无序列表
	[{ script: 'sub' }, { script: 'super' }], // 上标/下标
	[{ indent: '-1' }, { indent: '+1' }], // 缩进
	// [{'direction': 'rtl'}],                         // 文本方向
	[{ size: ['small', false, 'large', 'huge'] }], // 字体大小
	[{ header: [1, 2, 3, 4, 5, 6, false] }], // 标题
	[{ color: [] }, { background: [] }], // 字体颜色、字体背景颜色
	[{ font: [] }], // 字体种类
	[{ align: [] }], // 对齐方式
	['clean'], // 清除文本格式
	['link', 'image', 'video'], // 链接、图片、视频
]
// require styles
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import { quillEditor } from 'vue-quill-editor'
export default {
	components: {
		quillEditor,
	},
	props: {
		value: {
			type: String,
			default: '',
		},
	},
	data() {
		return {
			editorOption: {
				placeholder: '内容',
				modules: {
					toolbar: {
						container: toolbarOptions,
						// container: "#toolbar",
						handlers: {
							image: function(value) {
								if (value) {
									// 触发input框选择图片文件
									document
										.querySelector('.avatar-uploader')
										.click()
								} else {
									this.quill.format('image', false)
								}
							},
						},
					},
				},
				// some quill options
			},
		}
	},
	// manually control the data synchronization
	// 如果需要手动控制数据同步，父组件需要显式地处理changed事件
	methods: {
		//监听图片上传
		uploadImage(e) {
			console.log(e.target.files)
			let file = e.target.files
			if (file.length > 0) {
				let FD = new FormData()
				FD.append('file', file[0])
				this.$http.post('/upload/image/single', FD).then((res) => {
					console.log(res)
					// 获取富文本组件实例
					let quill = this.$refs.myQuillEditor.quill
					if (res?.url) {
						let length = quill.getSelection().index
						// 插入图片  res.url为服务器返回的图片地址
						quill.insertEmbed(length, 'image', res.url)
						// 调整光标到最后
						quill.setSelection(length + 1)
					}
				})
			}
		},
	},
	computed: {
		editor() {
			return this.$refs.myQuillEditor.quill
		},
		content: {
			get() {
				return this.value
			},
			set(v) {
				this.$emit('changeContent', v)
			},
		},
	},
	// mounted() {
	// 	console.log('this is current quill instance object', this.editor)
	// },
}
</script>

<style lang="scss" scoped>
.quill-editor {
	background-color: white;
	margin-top: 20px;
}
</style>
