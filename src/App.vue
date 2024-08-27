<template>
  <div id="app">
<NavMenu></NavMenu>
<SearchAndAdd></SearchAndAdd>
<AddInfo></AddInfo>
<MainBody></MainBody> 

  </div>
</template>

<script>
import NavMenu from './components/NavMenu.vue'
import MainBody from './components/MainBody.vue';
import SearchAndAdd from './components/SearchAndAdd.vue';
import AddInfo from './components/AddInfo.vue';
export default {
  name: 'App',
  components: {
    NavMenu,
    MainBody,
    SearchAndAdd,
    AddInfo
  }
}
</script>

<style>
</style>
