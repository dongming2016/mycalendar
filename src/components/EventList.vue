<template>
  <div>
    <slot></slot>
    <div  class="fc-event-card">
      <div v-for="(event, index) in fcEvents" :key="index">
        <div class="fc-event-content">{{event.content}}</div>
        <div class="fc-event-content">{{event.number}}</div>
      </div>
    </div>
    <div class="fc-drag-container">
      <!-- 如果event的数量为0时不能移动 -->
      <div v-for="(event, index2) in fcEvents" :key="index2" class="fc-drag-card"
      v-dragable="{callback: [ dragArgs.callback, decrementNumber], args: [{id: index2, subcellId: event.subcellId}, {index2}]}" v-if="event.number">
        {{event.content}}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  // fcEvents为可添加的列表
  // dragArgs为拖动指令的参数
  props: ['fcEvents', 'dragArgs'],
  methods: {
    decrementNumber ([ result ], index) {
      if (result) {
        this.fcEvents[index.index2].number--
      }
      return ''
    }
  }
}
</script>

<style>
 .fc-event-card {
  position: absolute;
  text-align: left;
 }
 .fc-event-content {
   display: inline-block;
   position: relative;
 }
 .fc-drag-container{
   text-align: left;
   position: absolute;
   /* top: 0; */
 }
 .fc-drag-card {
   position: relative;
 }
</style>
