<template>
<!-- 不排课设置   -->
<div>
    <CourseScheduleTable :options="options" :datas="datas">
    <template slot="content" slot-scope="currentData">
      <span v-show="currentData.currentData && currentData.currentData.isSelected">不排课</span>
    </template>
  </CourseScheduleTable>
</div>
</template>

<script>
import CourseScheduleTable from './CourseScheduleTable'
import { NoScheduleService } from '../service/noSchedule.service'
import baseService from '../service/base.service.js'

export default {
  mounted () {
    baseService.getCourseBaseInfo()
      .then(data => {
        this.options = data
      })
    NoScheduleService.getGradeNoCourse()
      .then(data => {
        this.datas = data
        console.log(this.datas)
      })
  },
  watch: {
    '$store.getters.getSaveState' () {
      this.commitSettings()
    }
  },
  beforeDestroy () {
    this.commitSettings()
  },
  data () {
    return {
      options: {},
      datas: []
    }
  },
  components: {
    CourseScheduleTable
  },
  methods: {
    commitSettings () {
      const gradeNoSchedule = this.datas
      this.$store.commit('setArrangeSettings', {type: 'gradeNoSchedule', setting: gradeNoSchedule})
    }
  }
}
</script>

<style>
.grade-setting .el-select .el-input--suffix .el-input__inner {
  width: 200px;
}
.note {
  text-align: right;
  margin-bottom: 16px;
  margin-right: 12px;
}
.dialog-footer {
  text-align: center;
}
</style>
