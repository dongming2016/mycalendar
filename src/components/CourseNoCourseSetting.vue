<template>
  <!-- 课程不排 -->
  <div>
    <div class="item-container">
      <div class="item-header">课程列表</div>
      <div class="list-item-container">
        <div class="list-item" v-for="(item, index) in courses" :class="{'active-item': activeIndex===index}"
        @click="clickCourse(item,index)" :key="index">{{item.courseName}}</div>
      </div>
    </div>
    <!-- <div class="no-course-container"> -->
       <CourseScheduleTable class="no-course-container" :options="options" :datas="datas">
         <template slot="content" slot-scope="currentData">
          <span v-show="currentData.currentData && currentData.currentData.isSelected">不排课</span>
        </template>
       </CourseScheduleTable>
    <!-- </div> -->
  </div>
</template>

<script>
import CourseScheduleTable from './CourseScheduleTable'
import { NoScheduleService } from '../service/noSchedule.service'
import { CourseService } from '../service/course.service.js'
import baseService from '../service/base.service.js'
export default {
  components: {
    CourseScheduleTable
  },
  methods: {
    clickCourse (course, index) {
      this.activeIndex = index
    }
  },
  mounted () {
    baseService.getCourseBaseInfo()
      .then(data => {
        this.options = data
      })
    NoScheduleService.getSchoolNoCourse()
      .then(data => {
        this.datas = data
      })
    CourseService.getAllCourses()
      .then(data => {
        this.courses = data
      })
  },
  beforeDestroy () {
    const courseNoScheduleSetting = this.datas
    this.$store.commit('setArrangeSettings', {type: 'courseNoScheduleSetting', setting: courseNoScheduleSetting})
  },
  data () {
    return {
      options: {},
      datas: [],
      courses: [],
      activeIndex: 0
      // dialogVisible: false,
      // notArrange: true,
      // arrange: true,
      // isClassOut: true,
      // classes: [{id: '1', name: '一年级（1）班'}, {id: '2', name: '二年级（1）班'}]
    }
  }
}
</script>

<style>

</style>
