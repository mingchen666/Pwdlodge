<template>
  <div class="Navbar">

  <b-nav tabs fill>
    <b-nav-item>首页</b-nav-item>
    <b-nav-item>个人中心</b-nav-item>
    <b-nav-item>等待添加</b-nav-item>
    <b-nav-item>等待添加</b-nav-item>
    <b-nav-item disabled>注册/登录</b-nav-item>
  </b-nav>
</div>

</template>

<script>
export default {

}
</script>

<style>
.Navbar{
  margin-bottom: 80px;
}
/* 自定义激活状态的导航项样式 */
.b-nav-item.active {
  border-bottom: 2px solid blue; /* 添加下划线，颜色为蓝色 */
}

/* 增加过渡效果使得样式变化更加平滑 */
.b-nav-item {
  transition: border-bottom-color 0.3s, color 0.3s; /* 添加过渡效果 */
}
</style>