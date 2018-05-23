<template>
  <div class="fc-table">
    <div class="fc-header">
      <div>{{header.time}}</div>
      <div>{{header.eventName}}</div>
    </div>
    <div class="fc-body">
       <div :key="item.label" v-for="item in getBody">
        <div>{{item.label}}</div>
        <div>
          <div :key="item2.time" v-for="item2 in item.events" v-dragable>{{item2.content}}</div>
        </div>
      </div>
    </div>
    <div class="event-table">
    </div>
    <div @click="pushEvent">点击</div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: {labels: Array, header: Object, events: Array, date: Date},
  data () {
    return {
      body: [{
        label: '第一节',
        events: [
          {
            date: '2018-05-23',
            time: '第一节',
            content: '语文/张雨田'
          }
        ]
      }],
      events$: [
        {
          date: '2018-05-23',
          time: '第一节',
          content: '语文/张雨田'
        }
      ]
    }
  },
  computed: {
    getBody: function () {
      return this.body
    }
  },
  methods: {
    pushEvent (date, time, content) {
      this.events$.push({
        date,
        time,
        content
      })
    }
  }
})
</script>

<style scoped>
  div {
    text-align: left;
  }
  .fc-table {
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
  .event-table {
    position: absolute;
  }
</style>
