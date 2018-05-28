<template>
  <div>
    <div :key="index" v-for="(item, index) in getBody" class="fc-row">
      <div v-show="isLabelShow" class="fc-cell">{{item.label}}</div>
      <div style="position:relative;" :key="item2.id" v-for="item2 in item.events" :class="{'event-not-allowed': !item2.isAllowed()}"
        ref="fcCell" class="fc-cell"><div v-dragable="moveEvent" class="fc-event-dragable">{{item2.content}}</div></div>
      </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { isPlainObject, isString } from '../util/util'
import Event from '../model/Event'
import { positionUtil } from '../util/positionUtil'

export default Vue.extend({
  props: {labels: Array, header: Array, events: Array, date: null, dailyEvent: Object, isLabelShow: Boolean},
  data () {
    return {
      body: []
    }
  },
  computed: {
    getBody: function () {
      const body = []
      this.labels.forEach(element => {
        let name = ''
        if (isPlainObject(element)) {
          name = element.name
        } else if (isString(element)) {
          name = element
        }
        const events = this.events
        const eventList = []
        let isEventExist = false
        // 如果当前时间有事件，则将事件添加到事件列表中，否则创建一个空的事件
        for (let i = 0; i < events.length; i++) {
          if (events[i].getId() === element.id && events[i].getCurrDate().isSame(this.date)) {
            eventList.push(events[i])
            isEventExist = true
            break
          }
          isEventExist = false
        }
        if (!isEventExist) {
          eventList.push(new Event(element.id, this.date, element.name, ''))
        }
        body.push({
          label: name,
          isLabelShow: this.isLabelShow,
          events: eventList
        })
      })
      return body
    }
  },
  methods: {
    moveEvent (rect, content) {
      const middlePoint = { x: rect.x + rect.width / 2, y: rect.y + rect.height / 2 }
      const children = this.$parent.$refs.child
      let newEvent = null
      let isAllowed = false
      for (let i = 0; i < children.length; i++) {
        if (positionUtil.isPointInRect(middlePoint, children[i].$el.getBoundingClientRect())) {
          if (children[i].$el.className.indexOf('event-not-allowed') > -1) {
            break
          }
          const grandChildren = children[i].$refs.fcCell
          for (let j = 0; j < grandChildren.length; j++) {
            if (positionUtil.isPointInRect(middlePoint, grandChildren[j].getBoundingClientRect())) {
              if (grandChildren[j].className.indexOf('event-not-allowed') < 0) {
                newEvent = new Event(j, children[i].date, children[i].labels[j], content)
                isAllowed = true
              }
              break
            }
          }
        }
      }
      const $parentEvets = this.$parent.events
      if (isAllowed) {
        let popNum = -1
        for (let i = 0; i < $parentEvets.length; i++) {
          if (this.events[0].isSame($parentEvets[i])) {
            popNum = i
            break
          }
        }
        $parentEvets.splice(popNum, 1, newEvent)
      }
      return isAllowed
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
