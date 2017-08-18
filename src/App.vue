<template>
  <div id="app">
    <g-header></g-header>
    <tab></tab>
    <router-view></router-view>
  </div>
</template>

<script>
import GHeader from 'components/g-header/g-header'
import tab from 'components/tab/tab'
export default {
  name: 'app',
  components: {
    GHeader,
    tab
  }
}
</script>

<style>
  body{
    background-color: #222;
  }
</style>
