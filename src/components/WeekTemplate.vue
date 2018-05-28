<template>
  <div>
    <div v-dragable="addEvent" style="position:absolute;">I'm draggable </div>
    <div class="fc-table">
      <div class="fc-head">
        <div  class="fc-head-content"><strong>节次</strong></div>
        <div :key="dayIndex" v-for="dayIndex in 7" class="fc-head-content">
          <strong>{{ (dayIndex - 1) | localeWeekDay(firstDay, locale) }}</strong>
        </div>
      </div>
      <div v-for="(day, index) in getWeekOption" :key="index" class="fc-week-cell" >
        <DayTemplate :events="day.getEvents()" :date="day.getDate()" :labels="options.labels" :isLabelShow="index === 0" ref="child"/>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import DayTemplate from './DayTemplate'
import DailyEvent from '../model/DailyEvent'
import { positionUtil } from '../util/positionUtil'
import tableHeader from './tableHeader'
import Event from '../model/Event'

export default {
  props: {
    events: { // events will be displayed on calendar
      type: Array,
      default () {
        return []
      }
    },
    locale: {
      type: String,
      default () {
        return 'zh-cn'
      }
    },
    // 制定一周的第一天
    firstDay: {
      type: Number | String,
      validator (val) {
        let res = parseInt(val)
        return res >= 0 && res <= 6
      },
      default () {
        return 1
      }
    },
    options: {
      type: Object
    },
    eventName: {
      type: String
    },
    currentWeek: {
      default () {
        return moment().startOf('week')
      }
    }
  },
  components: {
    DayTemplate,
    tableHeader
  },
  data () {
    return {
    }
  },
  computed: {
    getWeekOption () {
      return this.calcWeekOption()
    },
    showLabel (index) {
      return index === 0
    }
  },
  methods: {
    addEvent (rect, content) {
      // 判断中间点是否在当前元素中
      const middlePoint = { x: rect.x + rect.width / 2, y: rect.y + rect.height / 2 }
      const children = this.$refs.child
      for (let i = 0; i < children.length; i++) {
        if (positionUtil.isPointInRect(middlePoint, children[i].$el.getBoundingClientRect())) {
          const grandChildren = children[i].$refs.fcCell
          for (let j = 0; j < grandChildren.length; j++) {
            if (positionUtil.isPointInRect(middlePoint, grandChildren[j].getBoundingClientRect())) {
              this.events.push(new Event(j, children[i].date, children[i].labels[j], content))
            }
          }
        }
      }
    },
    calcWeekOption () {
      const weekOption = []
      const startDay = moment(this.currentWeek).add(1, 'day')
      for (let i = 0; i < 7; i++) {
        const dailyEvent = new DailyEvent(this.currentMonth, startDay)
        this.events.forEach(element => {
          if (element.getCurrDate().isSame(dailyEvent.getDate())) {
            dailyEvent.pushEvent(element)
          }
        })
        startDay.add(1, 'day')
        weekOption.push(dailyEvent)
      }

      return weekOption
    }
  },
  filters: {
    // 过滤器，将时间转化为本地的星期
    localeWeekDay (weekday, firstDay, locale) {
      firstDay = parseInt(firstDay)
      const localMoment = moment().locale(locale)
      return localMoment.localeData().weekdays()[(weekday + firstDay) % 7]
    }
  }
}
</script>

<style>
.fc-week-cell {
  display: inline-block;
  position:relative;
}
.fc-week-cell:last-child {
  border-right:1px solid #eee;
}
.fc-table {
  display: inline-block;
}
.fc-head {
  display: flex;
}
.fc-head-content {
  display: inline-block;
  min-width: 120px;
  border-top: 1px solid #ddd;
  border-left: 1px solid #ddd;
}
.fc-head-content:last-child {
  border-right: 1px solid #ddd;
}
</style>
