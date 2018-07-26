<template>
  <div>
    <slot></slot>
    <div  class="fc-event-card">
      <div v-for="(event, index) in fcEvents" :key="index">
        <div class="event-card-item">
          <div class="class-container">{{event.content.className}}</div>
          <div class="daily-item">{{event.content.courseName}}</div>
          <span>|</span>
          <div class="daily-item">{{event.content.teacherName}}</div>
          <div style="float:right;width: 70px;">
            <div class="daily-item">{{event.content.notArranged}}</div>
            <span>|</span>
            <div class="daily-item">{{event.content.arranged}}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="fc-drag-container">
      <!-- 如果event的数量为0时不能移动 -->
      <div v-for="(event, index2) in fcEvents" :key="index2">
        <div class="fc-drag-card" v-if="event.content.notArranged>0"
          v-dragable="{callback: [ dragArgs.callback, decrementNumber], args: [{id: index2, subcellId: event.subcellId, content: event.content}, {index2}]}">
          <div class="drag-card-item">
            <div class="class-container">{{event.content.className}}</div>
            <div class="daily-item">{{event.content.courseName}}</div>
            <span>|</span>
            <div class="daily-item">{{event.content.teacherName}}</div>
          </div>
        </div>
        <div v-else class="fc-drag-card drag-card-item" style="cursor:not-allowed;height:17px;">
          <!-- <div class="class-container">{{event.content.className}}</div>
            <div class="daily-item">{{event.content.courseName}}</div>
            <span>|</span>
          <div class="daily-item">{{event.content.teacherName}}</div> -->
        </div>
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
      console.log(result)
      if (result) {
        console.log(this.fcEvents[index.index2])
        this.fcEvents[index.index2].content.notArranged--
        this.fcEvents[index.index2].content.arranged++
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
 .class-container {
   text-align:center;
 }
 .event-card-item {
   display:inline-block;
   margin-left:10px;
   width:245px;
   margin-top: 8px;
   background: #F6F8FC;
   border: 1px solid #BECFF7;
   border-radius: 15px;
   padding: 4px;
 }
 .drag-card-item {
   display:inline-block;
   margin-left:10px;
   width:245px;
   margin-top: 8px;
   padding: 5px;
   cursor: pointer;
 }
</style>
