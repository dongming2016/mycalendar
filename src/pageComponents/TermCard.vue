<template>
  <div style="margin:auto;">
    <el-card class="term-card">
      <div slot="header" class="clearfix term-card-header">
        <span>{{option.schoolYear}}</span>
        <YearSetting v-if="option.isCurrentYear" class="year-setting"/>
      </div>
      <div v-if="option.terms.length > 0" class="term-container" v-for="(term, index) in option.terms" :key="index">
        <div class="term-item">
          <div class="term-item-name">{{term.name}}</div>
          <div class="view-buttons">
            <el-button type="text" class="term-setting-item" @click="viewSchedule">查看课表</el-button>
            <el-button type="text" class="term-setting-item" @click="viewPlan">查看教学计划</el-button>
          </div>
          <!-- <div class="view-buttons">
            <el-button type="text" class="term-setting-item" @click="viewOptionalCourse">选课信息详情</el-button>
          </div> -->
        </div>
        <div class="operation-buttons">
          <div v-if="term.isCurrent">
            <div>
              <el-button type="text" @click="setGrades">年级计划设置</el-button>
              <el-button type="text" @click="classManage">班级计划</el-button>
              <!-- <GradeCourseSetting class="term-setting-item"/> -->
              <!-- <ClassSetting class="term-setting-item"/> -->
              <!-- <OptionalCourse class="term-setting-item"/> -->
              <el-button type="text" @click="standard"  class="term-setting-item">课程管理</el-button>

              <!-- <el-button type="text" @click="teacherGroup"  class="term-setting-item">教学组设置</el-button> -->
              <el-button type="text" @click="optionalBaseSetting"  class="term-setting-item select-item">选课基础设置（加学年学期）</el-button>
              <!-- <el-button type="text" @click="setOptionalCourse"  class="term-setting-item select-item">选修课课程设置</el-button> -->
              <el-button type="text" @click="OpenCourse"  class="term-setting-item select-item">选修课开课管理</el-button>
              <!-- <el-button type="text" @click="MyCourse"  class="term-setting-item select-item">我的选修课(仅老师)</el-button> -->
              <el-button type="text" @click="setCategory"  class="term-setting-item select-item">选修课类别设置（加学年学期）</el-button>
              <el-button type="text" @click="setDomain"  class="term-setting-item select-item">选修课课程所属领域</el-button>
              <!-- <el-button type="text" @click="setTimetable"  class="term-setting-item">作息设置</el-button> -->
              <el-button type="text" class="term-setting-item select-item" @click="classOptional">班级选课详情</el-button>
              <el-button type="text" class="term-setting-item" @click="dailyClassSet">日节次设置</el-button>
              <el-button type="text" @click="arrangeCourse">排课管理</el-button>
            </div>
          </div>
          <div v-else>
            <!-- 非当前学期则可以克隆 -->
            <el-button type="text" @click="clone">克隆</el-button>
          </div>
        </div>
      </div>
      <div v-else>
        <!-- 有学年没有学期，是系统异常，需要联系系统管理员 -->
        <span class="el-icon-warning bg-danger">系统异常，当前无学期，请联系系统管理员。</span>
      </div>
    </el-card>
  </div>
</template>

<script>
import GradeCourseSetting from './GradeCourseSetting'
import YearSetting from './YearSetting'
import ClassSetting from './ClassSetting'
import OptionalCourse from './OptionalSetting/OptionalCourse'
export default {
  props: {
    option: {
      default () {
        // 学年，学年下面的学期
        return { schoolYear: '', terms: [] }
      }
    }
  },
  data () {
    return {
      classSettingVisible: false,
      termSetting: []
    }
  },
  methods: {
    clone () {
    },
    arrangeCourse () {
      this.$router.push({ name: 'ArrangeCourse' })
    },
    viewOptionalCourse () {
      this.$router.push({ name: 'viewCourseSelected' })
    },
    setOptionalCourse (termId) {
      this.$emit('setOption', { termId: this.termId, componentName: 'optional-course' })
    },
    setGrades (termId) {
      this.$emit('setOption', { termId: this.termId, componentName: 'GradeCourseSetting' })
    },
    optionalBaseSetting () {
      this.$emit('setOption', { termId: this.termId, componentName: 'OptionalBaseSetting' })
    },
    viewSchedule () {
      this.$emit('setOption', { termId: this.termId, componentName: 'ClassSchedule' })
    },
    standard () {
      this.$emit('setOption', { termId: this.termId, componentName: 'CourseSetting' })
    },
    viewPlan () {
      this.$emit('setOption', { termId: this.termId, componentName: 'TeachPlan' })
    },
    teacherGroup () {
      this.$emit('setOption', { termId: this.termId, componentName: 'TeacherGroup' })
    },
    classManage () {
      this.$emit('setOption', { termId: this.termId, componentName: 'ClassSetting' })
    },
    setTimetable () {
      this.$emit('setOption', { termId: this.termId, componentName: 'Timetable' })
    },
    setCategory () {
      this.$emit('setOption', { termId: this.termId, componentName: 'Category' })
    },
    setDomain () {
      this.$emit('setOption', { termId: this.termId, componentName: 'DomainManage' })
    },
    OpenCourse () {
      this.$emit('setOption', { termId: this.termId, componentName: 'OpenCourse' })
    },
    MyCourse () {
      this.$emit('setOption', { termId: this.termId, componentName: 'TeacherMyCourse' })
    },
    classOptional () {
      this.$emit('setOption', { termId: this.termId, componentName: 'ClassOptionalCourse' })
    },
    dailyClassSet () {
      this.$emit('setOption', { termId: this.termId, componentName: 'dailyClass' })
    }
  },
  components: {
    GradeCourseSetting,
    YearSetting,
    ClassSetting,
    OptionalCourse
  }
}
</script>

<style scoped>
.year-setting {
  float: right;
  padding: 3px 0;
}
.term-card {
  width: 100%;
}
.term-card-header,
.term-item {
  text-align: left;
}
.term-item-name,
.view-buttons {
  display: inline-block;
  margin-right: 10px;
}
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both
}
.term-setting-item {
  display: inline-block;
  margin-right: 8px;
  text-align: center;
}
.operation-buttons {
  text-align: right;
}
.select-item {
  color:red;
}
</style>
