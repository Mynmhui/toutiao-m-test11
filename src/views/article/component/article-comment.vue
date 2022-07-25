<template>
<!-- 展示文章评论列表 -->
  <div class="article-comments">
    <!-- 评论列表 -->
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      error-text="加载失败，请点击重试"
      :immediate-check="false"
      @load="onLoad"
    >
    <CommentItem v-for="(comment, index) in list" :comment="comment" :key="index" @click-reply="onReplyShow"></CommentItem>
    <!-- 评论回复 -->
    <van-popup
      v-model="isReplyShow"
      position="bottom"
      style="height: 90%"
    >
      <CommentReply @click-close="isReplyShow = false" :comment="currentComment"></CommentReply>
    </van-popup>
    </van-list>
  </div>
</template>

<script>
import { getComments } from '@/api'
import CommentItem from './CommentItem.vue'
// import CommentReply from './CommentReply.vue'
export default {
  name: 'ArticleComment',
  components: {
    CommentItem
    // CommentReply
  },
  props: {
    source: {
      type: [Number, String, Object],
      require: true
    },
    list: {
      type: Array,
      default: () => []
    },
    comment: {
      type: Array,
      required: true
    },
    type: {
      type: String,
      validator (value) {
        return ['a', 'c'].includes(value)
      },
      default: 'a'
    }
  },
  data () {
    return {
      // list: [], // 评论列表
      loading: false, // 上拉加载更多的 loading
      finished: false, // 是否加载结束
      offset: null, // 请求下一页数据的页码
      totalCount: 0, // 总数据条数
      limit: 10,
      inputComment: '',
      message: '',
      isReplyShow: false,
      currentComment: {} // 点击回复的那个评论对象
    }
  },
  created () {
    this.onLoad()
  },
  methods: {
    async onLoad () {
    // 请求获取数据
      try {
        const { data } = await getComments({
          type: 'a', // 评论类型，a-对文章（article）的评论，c-对评论（comment）的回复
          source: this.source, // 原id,文章id或评论id
          offset: this.offset, // 获取评论数据的偏移量，值为评论id，表示从此id的数据向后取，不传表示从第一页开始读数据
          limit: this.limit // 每页的大小
        })
        console.log(data)
        const { results } = data.data // 将数据添加到列表中
        this.list.push(...results)
        this.totalCount = data.data.total_count // 更新数据总条数
        this.loading = false // 将加载更多的loading设置为false
        // 判断是否还有数据
        if (results.length) {
          this.offset = data.data.last_id // 更新获取下一页数据的页码
        } else {
          this.finished = true // 没有数据了，关闭加载更多
        }
        this.$emit('onload-success', data.data) // 在评论组件获取到文章数据量后传递给父组件
      } catch (error) {
        console.log(error)
      }
    },
    onReplyShow (comment) {
      console.log(111)
      console.log(comment)
      this.currentComment = comment
      this.isReplyShow = true
    }
  }
}
</script>

<style scoped lang="less">
  .publish-wrap {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
  }

  .van-list {
    margin-bottom: 45px;
  }
</style>
