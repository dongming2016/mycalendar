<template>
  <!-- 管理选修课的选修信息 -->
  <div style="text-align:left;">
    <router-link to="/" style="text-decoration:none;">
      <el-button type="primary" class="el-icon-back" style="margin-bottom:16px;display:block;">返回</el-button>
    </router-link>
    <div class="container">
      <OptionalCourseTable :isEditable="false" :isEdit="false" :viewLabel="viewLabel" :viewCallBack="viewCallBack" :class="{'fold-course': isStudentShow}"
            class="optional-table"/>
      <!-- <el-tabs type="border-card">
        <el-tab-pane label="按课程查看">
          <OptionalCourseTable :isEditable="false" :isEdit="false" :viewLabel="viewLabel" :viewCallBack="viewCallBack" :class="{'fold-course': isStudentShow}"
            class="optional-table"/>
            <CourseStudentsInfo :courseName="courseName" :courseId="courseId" v-show="isStudentShow" :class="{'course-student-show': isStudentShow}">
              <template slot="footer">
                <button-group :OKCallback="OKCallback" :CancelCallback="CancelCallback"/>
              </template>
          </CourseStudentsInfo>
        </el-tab-pane>
        <el-tab-pane label="按年级查看"><grade-optional-class/></el-tab-pane>
        <el-tab-pane label="按班级查看">角色管理</el-tab-pane>
      </el-tabs> -->

    </div>
  </div>
</template>

<script>
import OptionalCourseTable from '../pageComponents/OptionalSetting/OptionalCourseTable'
import CourseStudentsInfo from '../pageComponents/OptionalSetting/CourseStudentsInfo'
import ButtonGroup from '../pageComponents/ButtonGroup'
import GradeOptionalClass from '../pageComponents/GradeOptionalClass'
export default {
  data () {
    return {
      viewLabel: '查看选课详情',
      courseName: '',
      courseId: '',
      isStudentShow: false
    }
  },
  methods: {
    viewCallBack (courseId, courseName) {
      // this.$router.push('/viewCourseStudents')
      this.courseName = courseName
      this.courseId = courseId
      this.$router.push('/viewCourseStudents')
      // this.isStudentShow = true
    },
    OKCallback () {
      this.isStudentShow = false
    },
    CancelCallback () {
      this.isStudentShow = false
    }
  },
  components: {
    OptionalCourseTable,
    CourseStudentsInfo,
    ButtonGroup,
    GradeOptionalClass
  }
}
</script>

<style>
.container .fold-course {
  width: 35%;
  min-width: 400px;
}
.optional-table,
.course-student-show {
  display: inline-block;
  margin-right: 2%;
}
.optional-table {
  width: 96%;
}
.course-student-show {
  width: 60%;
  min-width: 500px;
  float: right;
}
</style>
