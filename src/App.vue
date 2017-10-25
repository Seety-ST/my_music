<template>
  <div id="app">
    <g-header></g-header>
    <tab></tab>
    <router-view></router-view>
    <player></player>
  </div>
</template>

<script>
import GHeader from 'components/g-header/g-header'
import tab from 'components/tab/tab'
import player from 'components/player/player'
export default {
  name: 'app',
  components: {
    GHeader,
    tab,
    player
  }
}
</script>

<style>
  body{
    background-color: #222;
  }
</style>
