<template>
  <div id="app">
    <div>
      <BaseSetting/>
    </div>
    <div class="click-option">
      <button @click="showIndex = 0">按月</button>
      <button @click="showIndex = 1">按周</button>
      <button @click="showIndex = 2">按日</button>
    </div>
    <div class="my-date">
      <el-date-picker
        v-model="currentdate"
        @change="changeDate"
        type="date"
        placeholder="选择日期">
      </el-date-picker>
    </div>
    <div class="my-date">
      <span>第</span><input type="number" v-model="week" min="1" max="40" size="2" @change="getData"><span>周</span>
    </div>
    <EventList :fcEvents="notArranged" :dragArgs="{callback: moveEvent}" class="event-list"/>
    <day-template :labels="options.labels" :header="fcHeader" :date="currentdate" :events="events" :isLabelShow="true" v-show="showIndex==2" ref="Day"/>
    <MonthTemplate :events="events" :options="options" :date="currdate" :currentMonth="currentMonth" :moveEventCallback="moveEvent"  v-show="showIndex==0" ref="Month"/>
    <WeekTemplate :events="events" :options="options" :currentWeek="currentWeek" v-show="showIndex==1" :notArranged="notArranged"  ref="Week"/>
  </div>
</template>

<script>
import DayTemplate from './components/DayTemplate.vue'
import MonthTemplate from './components/MonthTemplate.vue'
import Event from './model/Event'
import Label from './model/Label'
import WeekTemplate from './components/WeekTemplate'
import moment from 'moment'
import NotArrangedEvent from './model/NotArrangedEvent'
import EventList from './components/EventList'
import BaseSetting from './components/BaseSetting'

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
    WeekTemplate,
    EventList,
    BaseSetting
  },
  data () {
    return {
      showIndex: 1,
      fcHeader: [{id: 1, name: '节次', className: 'fc-my-header'}, {id: 2, name: '日程'}],
      options: { labels },
      events: [new Event(1, '2018-05-28', '第二节', '语文/张丽萍'), new Event(0, '2018-05-29', '第一节', '语文/张丽萍'), new Event(2, '2018-05-30', '第一节', '语文/张丽萍'), new Event(3, '2018-05-24', '第一节', '语文/张丽萍'),
        new Event(3, '2018-05-29', '第一节', '', false), new Event(5, '2018-05-30', '第六节', '', false), new Event(7, '2018-05-30', '第八节', '数学/abc', true)],
      currdate: moment(),
      notArranged: [ new NotArrangedEvent('数学/小李', 10), new NotArrangedEvent('数学/王梅梅', 7), new NotArrangedEvent('数学/李兰', 3) ],
      week: 1,
      currentdate: moment(),
      currentWeek: moment().startOf('week'),
      currentMonth: moment().startOf('month')
    }
  },
  computed: {
    getStartWeek () {
      return this.currentdate.endOf('week').add(1, 'day').subtract(this.getCurrentWeek, 'week').add(1, 'day')
    },
    getCurrentWeek () {
      return 2
    }
  },
  methods: {
    moveEvent ([rect, content], option) {
      const showIndex = this.showIndex
      switch (showIndex) {
        case 0: {
          return this.$refs.Month.moveEvent([rect, content], option)
        }
        case 2: {
          return this.$refs.Day.moveEvent([rect, content], option)
        }
        default: {
          return this.$refs.Week.moveEvent([rect, content], option)
        }
      }
    },
    changeDate () {
      this.currentdate = moment(this.currentdate)
      const currentWeek = moment(this.currentdate).startOf('week')
      // 改变周数
      this.week = this.week - this.currentWeek.isoWeek() + currentWeek.isoWeek()
      this.currentWeek = currentWeek
      this.currentMonth = moment(this.currentdate).startOf('month')
    },
    getData () {
      this.currentdate = moment(this.getStartWeek).add(this.week - 1, 'week')
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
</style>
