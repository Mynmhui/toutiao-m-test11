<template>
  <div id="app">
    <!-- 路由的出口 -->
    <h1>黑马头条</h1>
    <span class="toutiao toutiao-dianzan2"></span>
    <van-button type="primary">主要按钮</van-button>
<van-button type="info">信息按钮</van-button>
<van-button type="default">默认按钮</van-button>
<van-button type="warning">警告按钮</van-button>
<van-button type="danger">危险按钮</van-button>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="less"></style>
