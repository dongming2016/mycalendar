<template>
  <div>
    <div class="fc-table">
      <div class="fc-head">
        <div  class="fc-head-content"><strong>节次</strong></div>
        <div :key="dayIndex" v-for="dayIndex in 7" class="fc-head-content">
          <strong>{{ (dayIndex - 1) | localeWeekDay(firstDay, locale) }}</strong>
        </div>
      </div>
      <div class="fc-head" v-show="isDateShow">
        <div class="fc-head-content" style="display:inline-block;">
          <strong>日期</strong>
        </div>
         <div :key="index" v-for="(weekDay, index) in weekDays" class="fc-head-content" style="display:inline-block;">
          <strong>{{ weekDay | dateFilter('YYYY-MM-DD') }}</strong>
        </div>
      </div>
      <div class="fc-body">
        <div class="fc-week-cell">
          <div v-for="(label, index) in options.labels" :key="index" class="fc-child-cell" :style="{height:subCells.length * 35+'px', lineHeight: subCells.length * 35+'px'}">
              {{label.name}}
          </div>
        </div>
        <div v-for="(day, index) in getWeekOption" :key="index" class="fc-week-cell" >
          <div :key="item.id" v-for="item of day.events" class="fc-child-cell">
            <div
              :class="{'event-not-allowed': !item.events[0].isAllowed()}" ref="fcCell" class="fc-event-container">
              <div class="table-content" v-for="(item3, index) in subCells" :key="index">
                <div v-for="(item2, index) in item.events" :key="index"
                  v-dragable="{callback: moveEvent, args: {id: item2.id, subcellId: item2.subcellId,
                    content: item2.content, isInTable: true}}"
                class="fc-event-dragable" v-if="item2.subcellId===item3.id">

                  <slot :data="item2"/>
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
import { positionUtil } from '../util/positionUtil'
import Event from '../model/Event'
import { EventUtil } from '../util/EventUtil'
import Label from '../model/Label'

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
      type: Object,
      default () {
        return {
          labels: [
            new Label(0, '第一节', true),
            new Label(1, '第二节', true),
            new Label(2, '第三节', true),
            new Label(3, '第四节', true),
            new Label(4, '第五节', true),
            new Label(5, '第六节', true),
            new Label(6, '第七节', true),
            new Label(7, '第八节', true)
          ]
        }
      }
    },
    notArranged: {
      type: Array
    },
    eventName: {
      type: String
    },
    currentWeek: {
      default () {
        return moment().startOf('week')
      }
    },
    isDateShow: {
      default () {
        return false
      }
    },
    subCells: {
      default () {
        return [{id: 0}]
      }
    }
  },
  data () {
    return {
      weekDays: []
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
    // addEvent (rect, content) {
    //   // 判断中间点是否在当前元素中
    //   const middlePoint = { x: rect.x + rect.width / 2, y: rect.y + rect.height / 2 }
    //   const children = this.$refs.child
    //   for (let i = 0; i < children.length; i++) {
    //     if (positionUtil.isPointInRect(middlePoint, children[i].$el.getBoundingClientRect())) {
    //       const grandChildren = children[i].$refs.fcCell
    //       for (let j = 0; j < grandChildren.length; j++) {
    //         if (positionUtil.isPointInRect(middlePoint, grandChildren[j].getBoundingClientRect())) {
    //           this.events.push(new Event(j, children[i].date, children[i].labels[j], content))
    //         }
    //       }
    //     }
    //   }
    // },
    moveEvent ([rect], option) {
      const subcellId = option.subcellId
      const moveId = option.id
      const content = option.content
      const isInTable = option.isInTable
      if (content.notArranged <= 0 && !isInTable) {
        return [ false ]
      }
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
            const move2Day = this.weekDays[Math.floor(i / labelNum)]
            newEvent = new Event(j, move2Day, labels[j].name, content, subcellId)
            isAllowed = true
          }
          break
        }
      }
      console.log(newEvent)
      // 如果当前移动到的格子中已经有了标签便不能再移进去
      if (!newEvent) {
        return [ isAllowed ]
      }
      const rs = this.events.find(element => {
        return element.getId() === newEvent.getId()
      })
      console.log(rs)
      if (rs) {
        isAllowed = false
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
    calcWeekOption () {
      const weekOption = []
      const startDay = moment(this.currentWeek)
      this.weekDays = []
      for (let i = 0; i < 7; i++) {
        this.weekDays.push(moment(startDay))
        const dailyEvent = new DailyEvent(this.currentMonth, startDay)
        const currDayEvent = []
        this.events.forEach(element => {
          // console.log(element.getCurrDate().format('YYYY-MM-DD'))
          // console.log(dailyEvent.getDate().format('YYYY-MM-DD'))
          // console.log(element.getCurrDate().format('YYYY-MM-DD') === dailyEvent.getDate().format('YYYY-MM-DD'))
          // if (element.getCurrDate().isSame(dailyEvent.getDate())) {
          //   currDayEvent.push(element)
          // }
          // 不知道什么原因导致isSame不可用
          if (element.getCurrDate().format('YYYY-MM-DD') === dailyEvent.getDate().format('YYYY-MM-DD')) {
            currDayEvent.push(element)
          }
        })
        dailyEvent.events = EventUtil.handleEvents(this.options.labels, currDayEvent, dailyEvent.getDate())
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
    },
    dateFilter (date, format) {
      return date.calendar()
    }
  }
}
</script>

<style>
.fc-week-cell {
  display: inline-block;
  position:relative;
  min-width: 155px;
  border-left: 1px solid #eee;
}
.fc-week-cell:last-child {
  border-right:1px solid #eee;
}
.fc-table {
  display: inline-block;
}
.fc-head, .fc-body {
  display: flex;
}
.fc-head-content {
  display: inline-block;
  height: 30px;
  line-height: 30px;
  min-width: 155px;
  border-top: 1px solid #ddd;
  border-left: 1px solid #ddd;
}
.fc-head-content:last-child {
  border-right: 1px solid #ddd;
}
.fc-child-cell{
 position:relative;
 min-height: 30px;
 border-top: 1px solid #eee;
}
/* .fc-event-container {
  display: inline-block;
} */
.fc-event-dragable {
  position: relative;
  z-index: 2;
}
.fc-event-container {
  /* height: 23px; */
  width: 100%;
}
.fc-week-cell>.fc-child-cell:last-child {
  border-bottom: 1px solid #eee;
}
.event-not-allowed {
  background: #eee;
  cursor: not-allowed;
}
.table-content {
  height: 31px;
  width: 100%;
  padding: 2px 0;
}
/* .fc-head-content:first-child::before {
  content: '';
  position: absolute;
  width: 120px;
  height: 40px;
  border-top: 1px solid #eee;
  transform: rotate(30deg);
} */
</style>
