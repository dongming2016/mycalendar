<template>
  <div>
    <div class="no-course-table">
      <div class="table-header">
        <div class="head-content">
          <strong>节次</strong>
        </div>
        <div :key="dayIndex" v-for="dayIndex in options.dayNum" class="head-content">
          <strong>{{ (dayIndex - 1) | localeWeekDay(firstDay, locale) }}</strong>
        </div>
      </div>
      <div class="table-body">
        <div class="table-column">
          <div v-for="(label, index) in options.labels" :key="index" class="table-cell">
            <div>{{label.name}}</div>
          </div>
        </div>
        <div v-for="(item1, index2) in options.dayNum" :key="index2" class="table-column">
          <div v-for="(item, index1) in options.classNum" :key="index1" class="table-cell"
            title="不排课" @click="switchStates(index2,index1)">
            <!-- <el-switch
            v-model="item.isNo">
          </el-switch> -->
          <slot name="content" :currentData="datas[index2] && datas[index2][index1]"></slot>
          <!-- <span v-show="datas[index2] && datas[index2][index1] && datas[index2][index1].isNoCourse">不排课</span> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  props: {
    options: Object,
    datas: Array,
    firstDay: {
      type: Number,
      default: 1
    },
    locale: {
      type: String,
      default: 'zh-cn'
    }
  },
  methods: {
    switchStates (dayNO, classNO) {
      this.datas[dayNO] && this.datas[dayNO][classNO] && this.datas[dayNO][classNO].switchState()
    }
  },
  data () {
    return {
      value: [[{ isNo: 'false' }, { isNo: 'true' }, { isNo: 'false' }]]
    }
  },
  filters: {
    // 过滤器，将时间转化为本地的星期
    localeWeekDay (weekday, firstDay, locale) {
      firstDay = parseInt(firstDay)
      const localMoment = moment().locale(locale)
      return localMoment.localeData().weekdays()[(weekday + firstDay) % 7]
    }
  },
  mounted () {
    console.log(this.datas)
  }
}
</script>

<style>
.head-content {
  display: inline-block;
  min-width: 120px;
  border-top: 1px solid #ddd;
  border-left: 1px solid #ddd;
}
.head-content:last-child {
  border-right: 1px solid #ddd;
}
.table-column {
  display: inline-block;
}
.el-dialog {
  min-width: 1100px;
}
.table-header,
.table-body {
  display: flex;
}
.head-content,
.table-cell {
  min-width: 120px;
  height: 40px;
  border-top: 1px solid #eee;
  line-height: 40px;
  border-left: 1px solid #eee;
  cursor: pointer;
  text-align: center;
}
.table-column:last-child>.table-cell{
  border-right: 1px solid #eee;
}
.table-column>.table-cell:last-child {
  border-bottom: 1px solid #eee;
}
</style>
