<template>
    <div>
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
  />
    <!-- <SearchHistory></SearchHistory>
    <SearchResult></SearchResult>
    <SearchSuggestion></SearchSuggestion> -->

</form>
<component :is="componentName" :keywords="keywords"></component>
    </div>
</template>

<script>
import SearchHistory from './components/SearchHistory.vue'
import SearchResult from './components/SearchResult.vue'
import SearchSuggestion from './components/SearchSuggestion.vue'
export default {
  data () {
    return {
      keywords: '',
      isShowSearchResult: false
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
  components: {
    SearchHistory,
    SearchResult,
    SearchSuggestion
  },

  methods: {

    onSearch () {
      console.log('正在搜索')
      this.isShowSearchResult = true
    },
    backToPrePage () {
      this.$router.go(-1)
    },
    // 显示搜索建议
    visibleSearchSuggestion () {
    // 如果keywords没有值显示搜索历史
    // 如果keywords有值显示搜索建议
      this.isShowSearchResult = false
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
</style>
