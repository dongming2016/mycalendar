<template>
  <!-- 公共课设置 -->
  <div>
    <el-button type="text" @click="dialogVisible = true">公共课设置</el-button>
    <el-dialog title="公共课设置" :visible.sync="dialogVisible" class="public-class-setting">
      <el-tabs type="border-card">
        <el-tab-pane label="添加公共课程" style="padding:40px;">
          <div>
          <div v-show="!isWeekShow">
            <div>
              <span>公共课程名称：</span>
              <el-input  style="margin-top:8px;margin-left:8px;width:200px;" v-model="courseName"/>
            </div>
            <div>
              <span>公共课程描述：</span>
              <el-input style="margin-top:8px;margin-left:8px;width:200px;" v-model="courseDesc"/>
            </div>
            <div style="display:inline-block;margin-top:10px;margin-left:-180px;"><span>选择班级：</span>
            <div style="margin:20px;margin-left: 170px;">
              <div v-for="(grade, index) in grades" :key="index">
                <div style="display:inline-block;margin-right:20px;">{{grade.name}}:</div>
                <el-checkbox-group style="display:inline-block;" v-model="checkedClasses">
                  <el-checkbox v-for="item in grade.classes"
                  :key="item.id"
                  :label="item.name">
                  {{item.name}}
                  </el-checkbox>
                </el-checkbox-group>
              </div>
            </div>
            </div>
            <div><span>选择时间：</span>
            <el-input style="width:200px" @focus="isWeekShow=true" v-model="courseTime" placeholder="请选择活动时间">
              <i slot="prefix" @click="isWeekShow=true" class="el-input__icon el-icon-date"></i>
            </el-input></div>
            <div style="text-align:center;margin-top:20px;">
              <el-button type="primary" @click="dialogVisible=false">确定</el-button>
              <el-button @click="dialogVisible=false">取消</el-button>
            </div>
            </div>
            <div v-show="isWeekShow">
              <div>公共课程时间设置</div>
                <WeekTemplate
                :options="options" :currentWeek="currentWeek" ref="Week"/>
              <footer style="text-align: center;
                          margin-top: 20px;">
                <el-button type="primary" @click="isWeekShow=false">确定</el-button>
                <el-button @click="isWeekShow=false">取消</el-button>
              </footer>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="公共课程列表">
          <el-row :gutter="20">
            <el-col :span="4">
              <el-button type="primary" size="mini">批量删除</el-button>
              <el-collapse v-model="activeIndex">
                <el-collapse-item v-for="(item, index) in courses" :key="index" :title="item.name" :name="item.id">
                  <div>{{item.courseDesc}}</div>
                  <div><el-tag
                      v-for="tag in item.classes"
                      :key="tag.id"
                      closable
                      :disable-transitions="false"
                      @close="handleClose(tag)">
                      {{tag.name}}
                    </el-tag>
                      <el-select v-if="inputVisible" @change="handleInputConfirm(item)" multiple v-model="newClass">
                        <el-option-group
                          v-for="grade in grades"
                          :key="grade.id"
                          :label="grade.name">
                            <el-option
                            v-for="item in grade.classes"
                            :key="item.id"
                            :label="grade.name+item.name"
                            :value="item.id"
                            />
                        </el-option-group>
                      </el-select>
                    <el-button v-else size="small" @click="inputVisible=true">+ New Tag</el-button>
                    </div>
                  </el-collapse-item>
              </el-collapse>
            </el-col>
            <el-col :span="20">
            <WeekTemplate
              :options="options" :currentWeek="currentWeek" ref="Week"/>
            </el-col>
          </el-row>
          <div style="text-align:center;margin:20px 0;">
              <el-button type="primary" plain @click="savePublicSetting">确定</el-button>
              <el-button plain @click="dialogVisible = false">取消</el-button>
            </div>
        </el-tab-pane>
      </el-tabs>
    </el-dialog>
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
