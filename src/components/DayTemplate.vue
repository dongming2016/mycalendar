<template>
  <div>
    <div :key="item.label" v-for="item in getBody" class="fc-row">
      <div v-show="item.isLabelShow">{{item.label}}</div>
      <div>
        <div :key="item2.time" v-for="item2 in item.events">{{item2.content}}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { isPlainObject, isString } from '../util/util'

export default Vue.extend({
  props: {labels: Array, header: Array, events: Array, date: Date},
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
        const eventList = (this.events.filter(ele => {
          return ele.id === element.id
        }))
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
    pushEvent (date, time, content) {
    }
  }
})
</script>

<style scoped>
  .fc-table {
    position: relative;
  }
  .fc-table div {
    text-align: left;
    position: relative;
  }
  .fc-header > div {
    display: inline-block;
    margin-right: 8px;
  }
  .fc-body div {
    display: inline-block;
    margin-right: 8px;
  }
  .fc-body .fc-row {
    display: block;
  }
  .event-table {
    position: absolute;
  }
</style>
