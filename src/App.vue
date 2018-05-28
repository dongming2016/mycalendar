<template>
  <div id="app">
    <!-- <day-template :labels="options.labels" :header="fcHeader" :events="events"/> -->
    <MonthTemplate :events="events" :options="options"/>
    <WeekTemplate :events="events" :options="options"/>
  </div>
</template>

<script>
import DayTemplate from './components/DayTemplate.vue'
import MonthTemplate from './components/MonthTemplate.vue'
import Event from './model/Event'
import Label from './model/Label'
import WeekTemplate from './components/WeekTemplate'

const isLabelShow = (index) => {
  if (index === 0) {
    return true
  }

  return false
}

const labels = [
  new Label(0, '第一节', isLabelShow),
  new Label(1, '第二节', isLabelShow),
  new Label(2, '第三节', isLabelShow),
  new Label(3, '第四节', isLabelShow),
  new Label(4, '第五节', isLabelShow),
  new Label(5, '第六节', isLabelShow),
  new Label(6, '第七节', isLabelShow),
  new Label(7, '第八节', isLabelShow)
]

export default {
  name: 'app',
  components: {
    DayTemplate,
    MonthTemplate,
    WeekTemplate
  },
  data () {
    return {
      fcHeader: [{id: 1, name: '节次', className: 'fc-my-header'}, {id: 2, name: '日程'}],
      options: { labels },
      events: [new Event(1, '2018-05-28', '第二节', '语文/张丽萍'), new Event(0, '2018-05-29', '第一节', '语文/张丽萍'), new Event(2, '2018-05-30', '第一节', '语文/张丽萍'), new Event(3, '2018-05-24', '第一节', '语文/张丽萍'),
        new Event(3, '2018-05-29', '第一节', '', false), new Event(5, '2018-05-30', '第六节', '', false)]
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
