<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.event-list {
  position: absolute;
  right: 16px;
  width: 100px;
}
.my-date {
  display: inline-block;
  margin-left: 8px;
  margin-bottom: 8px;
}
.click-option {
  display: inline-block;
}
.choose-phase {
  margin-bottom: 8px;
}
</style>
