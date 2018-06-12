import Vue from 'vue'
import Router from 'vue-router'
import ArrangeCourse from '../pages/ArrangeCourse'
import index from '../pages/index.vue'
import ManageSelectedCourseInfo from '../pages/ManageCourseSelectedInfo.vue'
import CourseStudentsInfo from '../pages/CourseStudentsInfo.vue'
import StudentOptionalCourse from '../pageComponents/StudentOptionalCourse'
import EditOptionalCourse from '../pageComponents/OptionalSetting/EditOptionalCourse'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    name: 'index',
    component: index
  }, {
    path: '/ArrangeCourse',
    name: 'ArrangeCourse',
    component: ArrangeCourse
  }, {
    path: '/viewCourseSelected',
    name: 'viewCourseSelected',
    component: ManageSelectedCourseInfo
  }, {
    path: '/viewCourseStudents',
    name: 'viewCourseStudents',
    component: CourseStudentsInfo
  }, {
    path: '/studentOptionalCourse',
    name: 'studentOptionalCourse',
    component: StudentOptionalCourse
  }, {
    path: '/course-detail',
    name: 'course-detail',
    component: EditOptionalCourse
  }]
})
