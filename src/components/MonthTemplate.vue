<template>
<div>
  <div class="fc-table">
    <div class="fc-head">
      <div :key="dayIndex" v-for="dayIndex in 7" class="fc-head-content">
        <strong>{{ (dayIndex - 1) | localeWeekDay(firstDay, locale) }}</strong>
      </div>
    </div>
    <!-- body display date day -->
    <div class="fc-body">
      <div class="fc-table">
        <div class="fc-row" v-for="(week, index) in getCalendar" :key="index">
          <div class="fc-cell" v-for="(day, index2) in week" :key="index2" :class="{'not-current event-not-allowed': !day.isCurrentMonth()}" ref="fcDay">
            <p>{{day.getDayOfMonth()}}</p>
            <div style="position:relative;" :key="item.id" v-for="item of day.events" class="fc-child-cell">
              <div :key="index" v-for="(item2, index) in item.events" :class="{'event-not-allowed': !item2.isAllowed() || !day.isCurrentMonth()}" ref="fcCell" class="fc-event-container">
                <div v-dragable="{callback: moveEvent, args: {id: item2.id}}" class="fc-event-dragable">{{item2.content}}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import moment from 'moment'
import DailyEvent from '../model/DailyEvent'
import { dateUtil } from '../util/dateUtil'
import DayTemplate from './DayTemplate'
import { positionUtil } from '../util/positionUtil'
import Event from '../model/Event'
import { EventUtil } from '../util/EventUtil'
import EventList from './EventList'

/**
 * 设置日期格式
 */
moment.locale('zh', {
  calendar: {
    sameDay: 'YYYY-MM-DD'
  }
})

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
    notArranged: Object,
    moveEventCallback: Function
  },
  components: {
    DayTemplate,
    EventList
  },
  data () {
    return {
      currentMonth: moment().startOf('month'),
      alertbox: {
        title: {
          show: true,
          content: '添加课程'
        },
        showAlertbox: false
      },
      isPalceable: true,
      monthDays: []
    }
  },
  computed: {
    getCalendar () {
      return this.calCalendar()
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
          console.log(grandChildren)
          for (let j = 0; j < grandChildren.length; j++) {
            if (positionUtil.isPointInRect(middlePoint, grandChildren[j].getBoundingClientRect())) {
              this.events.push(new Event(j, children[i].date, children[i].labels[j], content))
            }
          }
        }
      }
    },
    moveEvent ([rect, content], option) {
      const moveId = option.id
      const middlePoint = { x: rect.x + rect.width / 2, y: rect.y + rect.height / 2 }
      const children = this.$refs.fcCell
      let newEvent = null
      let isAllowed = false
      const labels = this.options.labels
      const labelNum = this.options.labels.length
      for (let i = 0; i < children.length; i++) {
        if (positionUtil.isPointInRect(middlePoint, children[i].getBoundingClientRect())) {
          if (children[i].className.indexOf('event-not-allowed') < 0) {
            const j = i % labelNum
            const move2Day = this.monthDays[Math.floor(i / labelNum)]
            newEvent = new Event(j, move2Day, labels[j].name, content)
            isAllowed = true
          }
          break
        }
      }
      const events = this.events
      let index = -1
      if (isAllowed) {
        for (let i = 0; i < this.events.length; i++) {
          if (this.events[i].getId() === moveId) {
            index = i
            break
          }
        }
        if (index > -1) {
          events.splice(index, 1)
        }
        events.push(newEvent)
      }
      return [ isAllowed ]
    },
    calCalendar () {
      DailyEvent.labels = this.labels
      const startDay = dateUtil.getMonthViewStartDate(this.currentMonth, this.startDay)
      const calendar = []
      // 一个月最多6周
      for (let i = 0; i < 6; i++) {
        const week = []
        // 一个星期7天
        for (let j = 0; j < 7; j++) {
          this.monthDays.push(moment(startDay))
          const dailyEvent = new DailyEvent(this.currentMonth, startDay)
          const currDayEvent = []
          // 获取当前天的事件，暂时只关注天,当前天是当前月时，对事件列表进行过滤，并将事件存放在dailyEvent的事件列表中
          if (dailyEvent.isCurrentMonth()) {
            this.events.forEach(element => {
              if (element.getCurrDate().isSame(dailyEvent.getDate())) {
                currDayEvent.push(element)
              }
            })
          }
          dailyEvent.events = EventUtil.handleEvents(this.options.labels, currDayEvent, dailyEvent.getDate())
          week.push(dailyEvent)
          startDay.add(1, 'day')
        }
        calendar.push(week)
      }
      return calendar
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

<style scoped>
  .fc-table {
    display: inline-block;
  }
  .fc-head {
    display: flex;
  }
  .fc-head-content {
    display: inline-block;
    min-width: 200px;
    border-top: 1px solid #ddd;
    border-left: 1px solid #ddd;
  }
  .fc-head-content:last-child {
    border-right: 1px solid #ddd;
  }
  .fc-row {
    display: flex;
  }
  .fc-cell {
    display: inline-block;
    min-width: 200px;
    border-top: 1px solid #ddd;
    border-left: 1px solid #ddd;
  }
  .fc-row > .fc-cell:last-child {
    border-right: 1px solid #ddd;
  }
  .fc-row:last-child > .fc-cell {
    border-bottom: 1px solid #ddd;
  }
  .fc-cell p {
    text-align: right;
    margin: 8px 8px 8px 0;
  }
  .not-current {
    background: #eee;
    cursor: not-allowed;
  }
  .event-not-allowed {
    width: 100%;
    height: 100%;
    background: #eee;
    cursor: not-allowed;
    z-index: 1;
  }
  .fc-child-cell {
    height: 22px;
    border-top: 1px solid #eee;
    border-left: none;
    border-right: none;
  }
  .fc-event-dragable {
    position: relative;
  }
  .event-not-allowed {
    background: #eee;
  }
  .fc-event-container {
    height: 22px;
  }
</style>
