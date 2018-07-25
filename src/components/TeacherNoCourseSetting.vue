<template>
  <div>
    <div class="item-container teacher-item-container">
      <div class="item-header">老师列表</div>
      <div class="list-item-container">
        <div style="display:inline-block; vertical-align:top;margin-right:15px;margin-top: 10px;">
          <alphabet :indexer="indexer" @clickAlphabet="clickAlphabet"/>
        </div>
        <div style="display:inline-block;">
          <div class="list-item" v-for="(item, index) in teachers" :class="{'active-item': activeIndex===index}"
          @click="clickTeacher(item,index)" :key="index">{{item.teacherName}}</div>
        </div>
      </div>
    </div>
    <!-- <div> -->
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
import alphabet from './alphabet'
import { NoScheduleService } from '../service/noSchedule.service'
import { TeacherService } from '../service/teacherService.js'
import characterUtil from '../util/characterUtil.js'
import baseService from '../service/base.service.js'
export default {
  components: {
    CourseScheduleTable,
    alphabet
  },
  methods: {
    clickTeacher (teacher, index) {
      this.activeIndex = index
    },
    clickAlphabet (index) {
      this.teachers = this.indexedTeachers[index]
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
    TeacherService.getTeachers()
      .then(data => {
        this.teachers = data
        this.indexedTeachers = characterUtil.indexNames(this.teachers, 'teacherName')
        this.indexer = Object.keys(this.indexedTeachers)
        this.indexer = this.indexer.sort((preItem, nextItem) => {
          return preItem.charCodeAt() - nextItem.charCodeAt()
        })
      })
  },
  data () {
    return {
      teachers: [],
      options: {},
      datas: [],
      courses: [],
      activeIndex: 0,
      indexedTeachers: {},
      indexer: []
    }
  }
}
</script>

<style>
.item-container.teacher-item-container {
  width: 200px;
}
</style>
