<template>
  <div>
    <div :key="index" v-for="(item, index) in getBody" class="fc-row">
      <div v-show="item.isLabelShow">{{item.label}}</div>
        <div :key="item2.id" v-for="item2 in item.events" :class="{'event-not-allowed': !item2.isAllowed()}"
          ref="fcCell" class="fc-cell">{{item2.content}}</div>
        </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { isPlainObject, isString } from '../util/util'
import Event from '../model/Event'

export default Vue.extend({
  props: {labels: Array, header: Array, events: Array, date: null, dailyEvent: Object},
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
          if (events[i].getId() === element.id) {
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
      console.log(this)
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
    width: 100%;
    height: 100%;
    background: #eee;
    cursor: not-allowed;
  }
  .fc-cell {
    min-width: 60px;
    height: 24px;
    line-height: 24px;
    border-top: 1px solid #eee;
  }
</style>
