<template>
  <div class="search-result">
<!-- .sync是一个语法糖。是父组件监听子组件更新某个props的请求的缩写语法。 -->
<!-- Vue规则：组件不能修改props外部数据
Vue规则：$emit可以触发事件并传参
Vue规则：$event可以获取$emit的参数
以上三条规则，都是尤雨溪定的
场景描述：爸爸给儿子钱，儿子要花钱怎么办，示例
答：儿子打电话（触发事件）向爸爸要钱 -->
    <van-list
      v-model="loading"
      :finished="finished"
      :error.sync="error"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell v-for="(item, index) in list" :key="index" :title="item.title" />
    </van-list>
  </div>
</template>

<script>
import { getSearchResult } from '@/api'
export default {
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      page: 1,
      perPage: 20,
      error: false
    }
  },
  props: {
  // 搜索关键词
    keywords: {
      type: String,
      required: true
    }
  },
  created () {
  // 加载页面后就调用
    this.onLoad()
  },
  methods: {
    async onLoad () {
      try {
        const { data } = await getSearchResult({
          page: this.page,
          per_paghe: this.perPage,
          q: this.keywords
        })
        // console.log(data)
        const { results } = data.data
        // console.log(results)
        this.list.push(...results)
        this.loading = false
        if (results.length) {
          this.page++
        } else {
          this.finished = true
        }
      } catch (error) {
        console.log(error)
        this.error = true
        this.loading = false
      }
    }
  }
}
</script>

<style lang="less" scoped>
.search-result {
 padding-top: 10px;
  .van-search__action {
    color: #fff;
  }
  .search-form {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1;
  }
}
</style>
