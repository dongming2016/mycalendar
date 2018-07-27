<template>
  <!-- 公共课设置 -->
  <div>
    <div  style="width:800px;">
      <el-form :model="publicActivityData" :rules="rules" ref="publicActivity">
        <el-form-item label="公共课程名称：" prop="publicName">
          <el-input  style="margin-top:8px;margin-left:8px;width:200px;" v-model="publicActivityData.courseName"/>
        </el-form-item>
        <el-form-item label="参与班级：" prop="classes">
           <!-- <el-cascader
            :options="gradeClasses"
            v-model="publicActivityData.classes">
          </el-cascader> -->
          <el-select v-model="publicActivityData.classes" multiple placeholder="请选择活动区域">
            <el-option-group
              v-for="group in gradeClasses"
              :key="group.id"
              :label="group.label">
              <el-option
                v-for="item in group.children"
                :key="item.id"
                :label="item.label"
                :value="item.id">
              </el-option>
            </el-option-group>
          </el-select>
        </el-form-item>
        <el-form-item label="选择时间：" prop="courseTimeStr">
        <el-input style="width:200px" @focus="showTimeTable" v-model="publicActivityData.courseTimeStr" placeholder="请选择活动时间">
          <i slot="suffix" @click="showTimeTable" class="el-input__icon el-icon-caret-bottom"></i>
        </el-input>
        </el-form-item>
        <el-form-item label="公共课程描述：" prop="courseDesc">
          <el-input v-model="publicActivityData.courseDesc"/>
        </el-form-item>
        <div class="down-box" style="text-align:center;" v-if="isTimeTableShow">
          <CourseScheduleTable :options="options" :datas="datas">
            <template slot="content" slot-scope="currentData">
              <el-checkbox v-model="currentData.currentData.isSelected" @change="setTime(currentData.currentData)"/>
              <!-- <span v-show="currentData.currentData && currentData.currentData.isSelected">不排课</span> -->
            </template>
          </CourseScheduleTable>
          <el-button style="margin:10px 0;" type="primary" @click="isTimeTableShow=false">确定</el-button>
        </div>
         <el-form-item>
          <el-button type="primary" @click="onSubmit">新增</el-button>
        </el-form-item>
      </el-form>
      <el-table :data="publicActivityDatas">
        <el-table-column label="活动名称" prop="publicName"/>
        <el-table-column label="参与班级" prop="teachers"/>
        <el-table-column label="活动时间" prop="courseTimeStr"/>
        <el-table-column label="活动描述" prop="courseDesc"/>
        <el-table-column label="操作">
          <template slot-scope="scope">
             <span class="el-icon-edit" style="margin-right:10px;">编辑</span>
            <span class="el-icon-close" @click="deleteRecord(scope.row)">删除</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import WeekTemplate from './WeekTemplate'
import moment from 'moment'
import classUtil from '../util/classUtil.js'
// import Event from '../model/Event'
import { CourseService } from '../service/course.service'
import { NoScheduleService, getLabels } from '../service/noSchedule.service'
import CourseScheduleTable from './CourseScheduleTable'
import researchUtil from '../util/courseUtil.js'
import baseService from '../service/base.service.js'

export default {
  props: ['phaseType'],
  beforeDestroy () {
    const publicActivity = this.publicActivityDatas
    this.$store.commit('setArrangeSettings', {type: 'publicActivity', setting: publicActivity})
  },
  data () {
    return {
      rules: {
        publicName: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
        ],
        classes: [
          { required: true, message: '请选择活动老师', trigger: 'change' }
        ],
        courseTimeStr: [
          { required: true, message: '请选择活动时间', trigger: 'change' }
        ]
      },
      publicActivityData: {currentData: []},
      publicActivityDatas: [],
      courseName: '',
      courseDesc: '',
      dialogVisible: false,
      activeIndex: 0,
      courses: [],
      newClass: [],
      isIndeterminate: true,
      grades: [],
      isTimeTableShow: false,
      selectedCourse: -1,
      checkAll: false,
      options: {},
      currentWeek: moment('2018-05-29').startOf('week'),
      events: [],
      labels: [],
      checkedClasses: [],
      courseTime: '',
      inputVisible: false,
      inputValue: '',
      gradeClasses: [],
      datas: []
      // classes: [{id: 0, name: `一年级(1)班`}, {id: 1, name: `二年级(1)班`}, {id: 2, name: `三年级(1)班`}]
    }
  },
  methods: {
    onSubmit () {
      this.$refs.publicActivity.validate((valid) => {
        if (valid) {
          this.publicActivityDatas.push(this.publicActivityData)
          console.log('submit')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    showTimeTable () {
      this.isTimeTableShow = true
      this.datas = researchUtil.genEmptySchedule(5, 8)
      console.log(this.datas)
      baseService.getCourseBaseInfo()
        .then(data => {
          this.options = data
        })
    },
    getCourses () {
      this.courses = CourseService.getCourses()
      if (this.courses.length > 0) {
        // selectedCourse用来记录课程的id
        this.selectedCourse = 0
        // this.activeIndex = 0
      }
    },
    getClasses (selectedCourse) {
      classUtil.getTreeClasses()
        .then(data => {
          console.log(data)
          console.log(this.phaseType)
          this.gradeClasses = data.find(element => {
            return element.id === this.phaseType
          }).children
          console.log(this.gradeClasses)
        })
      // return CourseService.getClasses(selectedCourse)
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
    this.grades = this.getClasses()
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
    WeekTemplate,
    CourseScheduleTable
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
