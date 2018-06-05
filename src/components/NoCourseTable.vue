<template>
  <div>
    <div class="no-course-table">
      <div class="table-header">
        <div class="head-content">
          <strong>节次</strong>
        </div>
        <div :key="dayIndex" v-for="dayIndex in 7" class="head-content">
          <strong>{{ (dayIndex - 1) | localeWeekDay(firstDay, locale) }}</strong>
        </div>
      </div>
      <div class="table-body">
        <div class="table-column">
          <div v-for="(label, index) in options.labels" :key="index" class="table-cell">
            <div>{{label.name}}</div>
          </div>
        </div>
        <div v-for="(item1, index2) in getCourse()" :key="index2" class="table-column">
          <div v-for="(item, index1) in item1" :key="index1" class="table-cell">
            <el-switch
            v-model="item.isNo">
          </el-switch>
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
    firstDay: {
      type: Number,
      default: 1
    },
    locale: {
      type: String,
      default: 'zh-cn'
    }
  },
  data () {
    return {
      value: [[{ isNo: 'false' }, { isNo: 'true' }, { isNo: 'false' }]]
    }
  },
  methods: {
    getCourse () {
      this.value = this.options.courses
      return this.value
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
.table-cell {
  min-width: 120px;
  height: 40px;
  border-top: 1px solid #eee;
  line-height: 40px;
  border-left: 1px solid #eee;
}
.table-column:last-child>.table-cell{
  border-right: 1px solid #eee;
}
.table-column>.table-cell:last-child {
  border-bottom: 1px solid #eee;
}
</style>
