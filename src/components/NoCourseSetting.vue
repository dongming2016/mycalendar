<template>
<!-- 全校不排课设置   -->
<div>
  <!-- <el-button type="text" @click="dialogVisible = true">全校不排课设置</el-button>
  <el-dialog title="全校不排课设置" :visible.sync="dialogVisible">
    <div class="note">
      <span>说明：</span>
      <el-switch
        v-model="notArrange"
        active-text="不排课"
        inactive-text="排课">
      </el-switch>
    </div>
    <NoCourseTable :options="getOptions" style="display:inline-block;"/>
    <div style="display:inline-block;  margin-left: 30px;
    width: 250px;  vertical-align: top;" v-show="isClassOut">
      <ClassOTT :classes="classes"/>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" plain  @click="OK">确定</el-button>
      <el-button plain @click="dialogVisible = false">取消</el-button>
    </div>
  </el-dialog> -->
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
// import ClassOTT from './ClassOTT'

export default {
  mounted () {
    baseService.getCourseBaseInfo()
      .then(data => {
        this.options = data
      })
    NoScheduleService.getSchoolNoCourse()
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
  methods: {
    commitSettings () {
      const phaseNoSchedule = this.datas
      this.$store.commit('setArrangeSettings', {type: 'phaseNoSchedule', setting: phaseNoSchedule})
    }
  },
  data () {
    return {
      options: {},
      datas: []
    }
  },
  components: {
    CourseScheduleTable
  }
}
</script>

<style>
.note {
  text-align: right;
  margin-bottom: 16px;
  margin-right: 12px;
}
.dialog-footer {
  text-align: center;
}
</style>
