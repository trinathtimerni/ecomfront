<template>

  <div id="app">
    <loader> </loader>
     <router-view></router-view>
  </div>
</template>

<script>
import Loader from "./components/helpers/loader.vue"
export default {
  name: 'App',
 components: {
   Loader
 }
}
</script>

<style>
</style>