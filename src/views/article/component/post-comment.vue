<template>
<!-- 发布评论组件 -->
  <div class="post-comment">
    <van-field
      class="post-field"
      v-model.trim="message"
      rows="2"
      autosize
      type="textarea"
      maxlength="50"
      placeholder="请输入留言"
      show-word-limit
    />
    <!-- 添加disabled控制禁用 -->
    <van-button
      type="primary"
      size="small"
      @click="onAddComment"
      :disabled="!message.length"
    >发布</van-button>
  </div>
</template>

<script>
import { addComment } from '@/api'
export default {
  name: 'PostComment',
  components: {},
  props: {
    target: {
      type: [Object, String, Number]
    }
  },
  data () {
    return {
      message: ''
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  inject: {
    articleId: {
      type: [Number, String, Object],
      default: null
    }
  },
  methods: {
    async onAddComment () {
      this.$toast.loading({
        message: '发布中...',
        forbidClick: true,
        duation: 0
      })
      try {
        // 请求添加
        const { data } = await addComment({
          target: this.target, // 评论的目标id（评论文章即为文章id，对评论进行回复则为评论id）
          content: this.message // 评论内容
          // art_id // 文章id，对评论内容发表回复时，需要传递此参数，表明所属文章id。对文章进行评论，不要传此参数。
        })
        this.$emit('onpost-success', data.data)
        this.$toast.success('发布成功')
        this.message = ''
      } catch (err) {
        this.$toast.cail('发布失败')
      }
    }
  }
}
</script>

<style scoped lang="less">
.post-comment {
  display: flex;
  padding: 15px;
  align-items: flex-end;
  .post-field {
    background: #f5f7f9;
    margin-right: 15px;
  }
}
</style>
