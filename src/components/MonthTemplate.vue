<template>
  <div class="fc-table">
    <!-- body display date day -->
    <div class="fc-body">
      <div class="fc-head">
        <strong :key="dayIndex" v-for="dayIndex in 7">{{ (dayIndex - 1) | localeWeekDay(firstDay, locale) }}</strong>
      </div>
      <div class="fc-table">
        <div class="fc-row" v-for="(week, index) in getCalendar" :key="index">
          <div class="fc-cell" v-for="(day, index2) in week" :key="index2" :class="{'not-current': !day.isCurrentMonth()}">
            <p>{{day.getDayOfMonth()}}</p>
            <DayTemplate :events="day.getEvents()" :labels="options.labels"/>
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
    }
  },
  components: {
    DayTemplate
  },
  data () {
    return {
      currentMonth: moment().startOf('month')
    }
  },
  computed: {
    getCalendar () {
      return this.calCalendar()
    }
  },
  methods: {
    calCalendar () {
      const startDay = dateUtil.getMonthViewStartDate(this.currentMonth, this.startDay)
      const calendar = []
      // 一个月最多6周
      for (let i = 0; i < 6; i++) {
        const week = []
        // 一个星期7天
        for (let j = 0; j < 7; j++) {
          const dailyEvent = new DailyEvent(this.currentMonth, startDay)
          // 获取当前天的事件，暂时只关注天,当前天是当前月时，对事件列表进行过滤，并将事件存放在dailyEvent的事件列表中
          if (dailyEvent.isCurrentMonth()) {
            this.events.forEach(element => {
              if (element.getCurrDate().isSame(dailyEvent.getDate())) {
                dailyEvent.pushEvent(element)
              }
            })
          }
          week.push(dailyEvent)
          startDay.add(1, 'day')
        }
        calendar.push(week)
      }
      console.log(calendar)
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
  .fc-row {
    display: block;
  }
  .fc-cell {
    display: inline-block;
    width: 120px;
    min-height: 120px;
  }
  .fc-cell p {
    text-align: right;
    margin-top: 8px;
    margin-right: 8px;
  }
  .not-current {
    background: #eee;
  }
</style>
