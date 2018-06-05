<template>
  <div>
    <EventList :fcEvents="notArranged" :dragArgs="{callback: moveEvent}"></EventList>
    <div :key="index" v-for="(item, index) in getBody" class="fc-row">
      <div v-show="isLabelShow" class="fc-cell">{{item.label.name}}</div>
      <div style="position:relative;" :key="index" v-for="(item2, index) in item.events" :class="{'event-not-allowed': !item2.isAllowed()}"
        ref="fcCell" class="fc-cell"><div v-dragable="{callback: moveEvent, args: item2.getId()}"  class="fc-event-dragable">
          <!-- todo:删除，编辑功能未实现 -->
          {{item2.content}}
        </div>
      </div>
      </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Event from '../model/Event'
import { positionUtil } from '../util/positionUtil'
import { EventUtil } from '../util/EventUtil'
import moment from 'moment'
import EventList from './EventList'
/**
 * 设置日期格式
 */
moment.locale('zh', {
  calendar: {
    nextDay: 'YYYY-MM-DD',
    nextWeek: 'YYYY-MM-DD',
    lastDay: 'YYYY-MM-DD',
    lastWeek: 'YYYY-MM-DD',
    sameElse: 'YYYY-MM-DD',
    sameDay: 'YYYY-MM-DD'
  }
})

export default Vue.extend({
  props: {labels: Array, header: Array, events: Array, date: null, dailyEvent: Object, isLabelShow: Boolean, notArranged: Array},
  data () {
    return {
      body: [],
      foo: 1
    }
  },
  components: {
    EventList
  },
  computed: {
    getBody: function () {
      return EventUtil.handleEvents(this.labels, this.events, this.date)
    }
  },
  methods: {
    moveEvent ([rect, content], moveId) {
      const middlePoint = { x: rect.x + rect.width / 2, y: rect.y + rect.height / 2 }
      const children = this.$refs.fcCell
      let newEvent = null
      let isAllowed = false
      for (let i = 0; i < children.length; i++) {
        if (positionUtil.isPointInRect(middlePoint, children[i].getBoundingClientRect())) {
          if (children[i].className.indexOf('event-not-allowed') < 0) {
            newEvent = new Event(i, this.date, this.labels[i].name, content)
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
        events.splice(index, 1)
        events.push(newEvent)
      }
      return [ isAllowed ]
    },
    addEvent (rect, content) {

    }
  }
})
</script>

<style scoped>
  .fc-table {
    position: relative;
  }
  .fc-header > div {
    display: inline-block;
    margin-right: 8px;
  }
  .fc-body div {
    display: inline-block;
    width: 100%;
  }
  .fc-body .fc-row {
    display: block;
    height: 24px;
  }
  .event-table {
    position: absolute;
  }
  .event-not-allowed {
    height: 100%;
    background: #eee;
    cursor: not-allowed;
    z-index: 1;
  }
  .fc-cell {
    min-width: 120px;
    height: 24px;
    line-height: 24px;
    border-top: 1px solid #eee;
    display: inline-block;
    border-left: 1px solid #eee;
  }
  .fc-row:last-child > .fc-cell {
    border-bottom: 1px solid #eee;
  }
  .fc-row > .fc-cell:last-child {
    border-right: 1px solid #eee;
  }
  .fc-cell > div {
    display: inline-block;
  }
  .fc-event-dragable {
    display:inline-block;
    position:relative;
    z-index: 2;
  }
</style>
