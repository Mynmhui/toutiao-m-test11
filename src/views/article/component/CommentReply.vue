<template>
  <div class="comment-reply">
    <!-- 导航栏 -->
    <van-nav-bar :title="`${comment.reply_count}条回复`">
      <van-icon
        slot="left"
        name="cross"
        @click="$emit('close')"
      />
    </van-nav-bar>
    <!-- /导航栏 -->

    <!-- 设置滚动容器 -->
     <div class="scroll-wrap"></div>
    <!-- 当前评论项 -->
        <CommentItem :comment="comment"></CommentItem>
    <!-- /当前评论项 -->
    <van-cell title="所有回复" />
    <!-- 评论的回复列表 -->
    <!-- <CommentList :source="comment.com_id" type="c" :list="commentList"></CommentList> -->
    <!-- /评论的回复列表 -->

    <!-- 底部 -->
        <!-- 发布评论-->
    <div class="post-wrap">
      <van-button class="post-btn" size="small" round @click="isPostshow = true">写评论</van-button>
    </div>
    <!-- 发布评论-->
    <van-popup v-model="isPostshow" position="bottom">
      <postComment :target="comment.com_id" @onpost-success="onPostSuccess"/>
    </van-popup>
    <!-- /底部 -->
  </div>
</template>

<script>
import CommentItem from './CommentItem.vue'
import postComment from './post-comment.vue'
// import { getComments } from '@/api'
export default {
  name: 'CommentReply',
  components: {
    CommentItem,
    postComment
  },
  props: {
    comment: {
      type: Object
    }
  },
  data () {
    return {
      isPostshow: false
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    onPostSuccess (data) {
      console.log(data, 'data')
      // 更新回复数量
      this.comment.reply_count++
      // 关闭谈层
      this.isPostshow = false
      // 将最新回复的内容展示到列表的顶部
      // this.commentList.unshift(data.new_obj)
    }
  }
}
</script>

<style scoped lang="less">
.scroll-wrap {
  position: fixed;
  top: 92px;
  left: 0;
  right: 0;
  bottom: 88px;
  overflow-y: auto;
}
.post-wrap {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 88px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  border-top: 1px solid #d8d8d8;
  .post-btn {
    width: 60%;
 }
}
</style>
