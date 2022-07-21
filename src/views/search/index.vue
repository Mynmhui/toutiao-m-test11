<template>
    <div class="search-result">
    <form action="/">
  <van-search
    v-model="keywords"
    show-action
    placeholder="请输入搜索关键词"
    @search="onSearch"
    @cancel="backToPrePage"
    @focus="visibleSearchSuggestion"
    background="#3296fa"
    class="search"
  ></van-search>
    <!-- <SearchHistory></SearchHistory>
    <SearchResult></SearchResult>
    <SearchSuggestion></SearchSuggestion> -->

</form>
<!-- 动态的根据情况显示或隐藏搜索历史，搜索记录，搜索结果 -->
<component
:is="componentName"
:keywords="keywords"
@item="Item"
:searchHistories="searchHistories"
@search="onSearch"
@allDelte="searchHistories = []"
@clear-search-history="searchHistories = []"
></component>
    </div>
</template>

<script>
import SearchHistory from './components/SearchHistory.vue'
import SearchResult from './components/SearchResult.vue'
import SearchSuggestion from './components/SearchSuggestion.vue'
import { get, set } from '@/utils/storage'
export default {
  data () {
    return {
      keywords: '',
      isShowSearchResult: false, // 控制搜索结果的显示或隐藏
      searchHistories: get('TOUTIAO_LISHI') || []
    }
  },
  computed: {
    componentName () {
    // 搜索历史：搜索框没有值或者是空字符串
    // 搜索结果: isShowSearchResult=true
      if (this.keywords.trim() === '') {
        return 'SearchHistory'
      }
      if (this.isShowSearchResult) {
        return 'SearchResult'
      }
      return 'SearchSuggestion'
    }
  },
  // 注册自定义标签
  components: {
    SearchHistory,
    SearchResult,
    SearchSuggestion
  },

  methods: {
    // 搜索功能
    onSearch (value) {
      console.log('正在搜索')
      // console.log(value)
      this.keywords = value
      const index = this.searchHistories.indexOf(value)
      if (index !== -1) {
        this.searchHistories.splice(index, 1)
      }
      this.isShowSearchResult = true
      this.searchHistories.unshift(value)
    },
    // 点击取消
    backToPrePage () {
      this.$router.go(-1)
    },
    // 显示搜索建议
    visibleSearchSuggestion () {
    // 如果keywords没有值显示搜索历史
    // 如果keywords有值显示搜索建议
      this.isShowSearchResult = false
    },
    Item (value) {
      this.keywords = value
    }
  },
  watch: {
    searchHistories (value) {
      set('TOUTIAO_LISHI', value)
    }
  }
}
</script>

<style lang="less" scoped>
.search {
[role="button"] {
color: #fff;
}
}
.search-container {
  padding-top: 108px;
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
