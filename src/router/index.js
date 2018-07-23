import Vue from 'vue'
import Router from 'vue-router'
import ArrangeCourse from '../pages/ArrangeCourse'
import index from '../pages/index.vue'
import ManageSelectedCourseInfo from '../pages/ManageCourseSelectedInfo.vue'
import CourseStudentsInfo from '../pages/CourseStudentsInfo.vue'
import StudentOptionalCourse from '../pageComponents/StudentOptionalCourse'
import EditOptionalCourse from '../pageComponents/OptionalSetting/EditOptionalCourse'
import StudentMyCourse from '../pageComponents/StudentMyCourse'
import OpenCourse from '../pages/OpenCourse.vue'
import OptionalCourse from '../pageComponents/OptionalSetting/OptionalCourse.vue'
import ClassOptionalCourse from '../pages/ClassOptionalCourse'
import TeacherMyCourse from '../pageComponents/TeacherMyCourse'
import TestCourse from '../pages/TestClock.vue'
import DailyClass from '../pages/dailyClasses.vue'
import ClassSetting from '../pageComponents/ClassSetting'
import NewArrangeCourse from '../pages/NewArrangeCourse'
import PreviewCourse from '../pages/PreviewCourse.vue'

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
  }, {
    path: '/myCourse',
    redirect: '/myCourse/1'
  }, {
    path: '/myCourse/:authorType',
    name: 'myCourse',
    component: StudentMyCourse
  }, {
    path: '/openCourse',
    redirect: '/openCourse/1'
  },
  {
    path: '/openCourse/:type',
    name: 'openCourse',
    component: OpenCourse
  },
  {
    path: '/classOptionalCourse',
    name: 'classOptionalCourse',
    component: ClassOptionalCourse
  },
  {
    path: '/teacher-my-course',
    name: 'teacher-my-course',
    component: TeacherMyCourse
  },
  {
    path: '/course-base-info',
    redirect: '/course-base-info/1'
  },
  {
    path: '/course-base-info/:type',
    name: 'course-base-info',
    component: OptionalCourse
  },
  {
    path: '/my-clock',
    name: 'my-clock',
    component: TestCourse
  },
  {
    path: '/daily-class',
    name: 'daily-class',
    component: DailyClass
  },
  {
    path: '/class-plan',
    name: 'class-plan',
    component: ClassSetting
  },
  {
    path: '/new-arrange-course',
    name: 'new-arrange-course',
    component: NewArrangeCourse
  },
  {
    path: '/preview-classTable',
    name: 'preview-classTable',
    component: PreviewCourse
  }
  ]
})
