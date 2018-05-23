<template>
  <div id="app">
    <day-template :labels="fcLabel" :header="fcHeader"/>
  </div>
</template>

<script>
import DayTemplate from './components/DayTemplate.vue'

export default {
  name: 'app',
  components: {
    DayTemplate
  },
  data () {
    return {
      fcHeader: {time: '节次', eventName: '日程'},
      fcLabel: ['第一节', '第二节', '第三节', '第四节', '第五节', '第六节', '第七节']
    }
  }
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
</style>
