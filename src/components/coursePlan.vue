<template>
  <div>
    <div>
      <div>
        <div class="course-plan-title">设置国标课程</div>
        <div class="course-container">
          <!-- <el-checkbox-group v-model="checkedStandardCourses"> -->
            <el-checkbox v-for="(item, index) in standardCourses" :key="index" :label="item.courseName" :checked="item.isChecked"></el-checkbox>
          <!-- </el-checkbox-group> -->
        </div>
      </div>
      <div>
        <div class="course-plan-title">设置校本课程</div>
        <div class="course-container">
            <el-checkbox v-for="(item, index) in schoolCourses" :key="index" :label="item.courseName" :checked="item.isChecked"></el-checkbox>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import baseService from '../service/base.service.js'
export default {
  data () {
    return {
      standardCourses: [],
      checkedStandardCourses: [],
      schoolCourses: [],
      checkedSchoolCourses: []
    }
  },
  mounted () {
    baseService.getStandardCourse()
      .then(data => {
        this.standardCourses = data
      })
    baseService.getSchoolCourse()
      .then(data => {
        this.schoolCourses = data
      })
  },
  beforeDestroy () {
    const standardCourses = this.standardCourses
    const schoolCourses = this.schoolCourses
    this.$store.commit('setArrangeSettings', {type: 'courseSetting', setting: {standardCourses, schoolCourses}})
  }
}
</script>
<style>
.course-plan-title {
  color: #44A0FF;
}
.course-container {
  padding: 20px 20px;
}
</style>
