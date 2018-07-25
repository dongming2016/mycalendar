<template>
  <!-- 公共课设置 -->
  <div>
    <div  style="width:800px;">
      <el-form :model="publicActivityData" :rules="rules" ref="publicActivity">
        <el-form-item label="公共课程名称：" prop="publicName">
          <el-input  style="margin-top:8px;margin-left:8px;width:200px;" v-model="publicActivityData.courseName"/>
        </el-form-item>
        <el-form-item label="参与班级：" prop="classes">
          <el-select v-model="publicActivityData.classes" placeholder="请选择活动区域">
            <el-option label="item.className" value="item.id"
              v-for="(item, index) in classes" :key="index"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="选择时间：" prop="courseTimeStr">
        <el-input style="width:200px" @focus="isWeekShow=true" v-model="publicActivityData.courseTimeStr" placeholder="请选择活动时间">
          <i slot="suffix" @click="isWeekShow=true" class="el-input__icon el-icon-caret-bottom"></i>
        </el-input>
        </el-form-item>
        <el-form-item label="公共课程描述：" prop="courseDesc">
          <el-input v-model="publicActivityData.courseDesc"/>
        </el-form-item>
        <div class="down-box" style="text-align:center;" v-if="isWeekShow">
          <CourseScheduleTable :options="options" :datas="datas">
            <template slot="content" slot-scope="currentData">
              <el-checkbox v-model="currentData.currentData.isSelected" @change="setTime(currentData.currentData)"/>
              <!-- <span v-show="currentData.currentData && currentData.currentData.isSelected">不排课</span> -->
            </template>
          </CourseScheduleTable>
          <el-button style="margin:10px 0;" type="primary" @click="isWeekShow=false">确定</el-button>
        </div>
         <el-form-item>
          <el-button type="primary" @click="onSubmit">新增</el-button>
        </el-form-item>
      </el-form>
      <el-table :data="publicActivityDatas">
        <el-table-column label="活动名称" prop="publicName"/>
        <el-table-column label="参与老师" prop="teachers"/>
        <el-table-column label="活动时间" prop="courseTimeStr"/>
        <el-table-column label="活动描述" prop="courseDesc"/>
      </el-table>
    </div>
  </div>
</template>

<script>
import WeekTemplate from './WeekTemplate'
import moment from 'moment'
// import Event from '../model/Event'
import { CourseService } from '../service/course.service'
import { NoScheduleService, getLabels } from '../service/noSchedule.service'
export default {
  data () {
    return {
      publicActivityData: {},
      publicActivityDatas: [],
      courseName: '',
      courseDesc: '',
      dialogVisible: false,
      activeIndex: 0,
      courses: [],
      newClass: [],
      isIndeterminate: true,
      grades: [],
      isWeekShow: false,
      selectedCourse: -1,
      checkAll: false,
      options: this.getOption,
      currentWeek: moment('2018-05-29').startOf('week'),
      events: [],
      labels: [],
      checkedClasses: [],
      courseTime: '',
      inputVisible: false,
      inputValue: '',
      classes: [{id: 0, name: `一年级(1)班`}, {id: 1, name: `二年级(1)班`}, {id: 2, name: `三年级(1)班`}]
    }
  },
  methods: {
    onSubmit () {},
    getCourses () {
      this.courses = CourseService.getCourses()
      if (this.courses.length > 0) {
        // selectedCourse用来记录课程的id
        this.selectedCourse = 0
        // this.activeIndex = 0
      }
    },
    getClasses (selectedCourse) {
      return CourseService.getClasses(selectedCourse)
    },
    handleCheckAllChange () {
      this.isIndeterminate = false
    },
    foldClasses (grade) {
      grade.showClass = !grade.showClass
    },
    switchCourse () {
    },
    savePublicSetting () {
      this.dialogVisible = false
    },
    handleClose (tag) {
      // this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1)
    },

    showInput () {
      this.inputVisible = true
      // this.$nextTick(_ => {
      //   this.$refs.saveTagInput.$refs.input.focus()
      // })
    },

    handleInputConfirm (course) {
      course.classes.push({id: '1' + this.newClass[0].id, name: this.newClass[0].name})
    }
  },
  mounted () {
    this.getCourses()
    this.grades = this.getClasses(this.selectedCourse)
    this.labels = NoScheduleService.getLabels()
  },
  computed: {
    getOption () {
      return getLabels()
    },
    getAllClasses () {
      return [{id: 0, name: `一年级(1)班`}, {id: 1, name: `二年级(1)班`}, {id: 2, name: `三年级(1)班`}]
    }
  },
  components: {
    WeekTemplate
  }
}
</script>

<style>
.class-checkbox {
  display: inline-block;
  margin-right: 8px;
}
.public-grade, .all-grade {
  text-align: left;
}
.classes-container {
  margin-left: 24px;
}
.public-class-setting .el-dialog {
  min-width: 1350px;
}
.public-grade-item {
  margin-left: 10px;
}
.all-grade {
  margin-left: 24px;
}
</style>
