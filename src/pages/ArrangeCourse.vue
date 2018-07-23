<template>
<div>
  <el-row :gutter="20">
      <el-col :span="4">
        <div style="text-align:left;">
          <el-button type="primary" @click="BACK">返回</el-button>
        </div>
        <!-- <BaseSetting/> -->
        <NoCourseSetting/>
        <GradeNoSchedule/>
        <TeacherNoSchedule/>
        <PublicCourse/>
        <research-setting/>
        <merge-class/>
        <!-- <class-setting/> -->
      </el-col>
      <el-col :span="16">
        <div class="settings">
          <div class="choose-phase" style="margin-bottom:16px;" >
            <!-- <span class="arrange-label">选择学段</span> -->
            <el-radio-group v-model="phase" >
              <el-radio-button label="1">小学</el-radio-button>
              <el-radio-button label="2">初中</el-radio-button>
              <el-radio-button label="3">高中</el-radio-button>
            </el-radio-group>
          </div>
        </div>
            <div style="margin-bottom:16px;">
      <span class="arrange-label">选择年级</span>
      <el-select v-model="selectedGrade" placeholder="请选择年级" @change='gradesChange()'>
        <el-option
          v-for="item in grades"
          :key="item.id"
          :label="item.name"
          :value="item.id">
        </el-option>
      </el-select>
    </div>
    <div style="margin-bottom:16px;">
      <span class="arrange-label">选择班级</span>
      <el-select v-model="selectedClasses" placeholder="请选择班级">
        <el-option
          v-for="item in classes"
          :key="item.id"
          :label="item.name"
          :value="item.id">
        </el-option>
      </el-select>
    </div>
    <div style="margin-bottom:10px;">
      <el-button type="primary">预览课表</el-button>
    </div>
        <!-- <div class="change-view">
            <span>查看方式：</span>
            <el-radio v-model="viewMethod" label="1">按班级查看</el-radio>
            <el-radio v-model="viewMethod" label="2">按老师查看</el-radio>
          </div> -->
        <!-- <div class="click-option">
          <button @click="showIndex = 0">按月</button>
          <button @click="showIndex = 1">按周</button>
          <button @click="showIndex = 2">按日</button>
        </div> -->
        <!-- <div class="my-date">
          <el-date-picker
            v-model="currentdate"
            @change="changeDate"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
        </div>
        <div class="my-date">
          <span>第</span><input type="number" v-model="week" min="1" max="40" size="2" @change="getData"><span>周</span>
        </div> -->
        <!-- <day-template :labels="options.labels" :header="fcHeader" :date="currentdate" :events="events" :isLabelShow="true" v-show="showIndex==2" ref="Day"/>
        <MonthTemplate :events="events" :options="options" :date="currdate" :currentMonth="currentMonth" :moveEventCallback="moveEvent"  v-show="showIndex==0" ref="Month"/> -->
        <!-- <div style="display:inline-block;">
          <div v-for="(grade, index) in grades" style="text-align:left;" :key="index">
            <div style="display:inline-block;margin-right:10px;" @click="selectedIndex=index">{{grade.name}}</div>
            <div style="display:inline-block;vertical-align: top;" v-show="selectedIndex===index" >
              <div v-for="(classItem, index) in grade.classes" :key="index">
                {{classItem.name}}
              </div>
            </div>
          </div>
        </div> -->
        <WeekTemplate style="display:inline-block;margin-left:20px;vertical-align: top;" :events="events" :options="options" :currentWeek="currentWeek" :notArranged="notArranged"  ref="Week"/>
      </el-col>
      <el-col :span="4">
        <span>待添加课程</span>
        <EventList :fcEvents="notArranged" :dragArgs="{callback: moveEvent}" class="event-list"/>
      </el-col>
    </el-row>
    <el-dialog :visible.sync="dialogVisible" title="提示">
      <div style="text-align:center;margin-bottom:30px;">
        当前一年级（1）班班级计划尚未完成，<router-link to="/class-plan">去完成！</router-link>
      </div>
      <div style="text-align:center;">
        <el-button type="primary" @click="dialogVisible=false">确定</el-button>
        <el-button type="primary" @click="dialogVisible=false">取消</el-button>
      </div>
    </el-dialog>
    </div>
</template>

<script>
import DayTemplate from '../components/DayTemplate.vue'
import MonthTemplate from '../components/MonthTemplate.vue'
import Event from '../model/Event'
import Label from '../model/Label'
import WeekTemplate from '../components/WeekTemplate'
import moment from 'moment'
import NotArrangedEvent from '../model/NotArrangedEvent'
import EventList from '../components/EventList'
import BaseSetting from '../components/BaseSetting'
import NoCourseSetting from '../components/NoCourseSetting'
import GradeNoSchedule from '../components/GradeNoSchedule'
import TeacherNoSchedule from '../components/TeacherNoSchedule'
import PublicCourse from '../components/publicCourse'
import ResearchSetting from '../components/researchSetting'
import ClassSetting from '../components/classSetting'
import MergeClass from './MergeClass'

const isLabelShow = (index) => {
  if (index === 0) {
    return true
  }

  return false
}

const labels = [
  new Label(0, '第一节', isLabelShow),
  new Label(1, '第二节', isLabelShow),
  new Label(2, '第三节', isLabelShow),
  new Label(3, '第四节', isLabelShow),
  new Label(4, '第五节', isLabelShow),
  new Label(5, '第六节', isLabelShow),
  new Label(6, '第七节', isLabelShow),
  new Label(7, '第八节', isLabelShow)
]

export default {
  components: {
    DayTemplate,
    MonthTemplate,
    WeekTemplate,
    EventList,
    BaseSetting,
    NoCourseSetting,
    GradeNoSchedule,
    TeacherNoSchedule,
    PublicCourse,
    ResearchSetting,
    ClassSetting,
    MergeClass
  },
  data () {
    return {
      showIndex: 1,
      selectedIndex: 0,
      selectedClasses: '',
      fcHeader: [{id: 1, name: '节次', className: 'fc-my-header'}, {id: 2, name: '日程'}],
      options: { labels },
      events: [new Event(1, '2018-05-28', '第二节', '语文/张丽萍'), new Event(0, '2018-05-29', '第一节', '语文/张丽萍'), new Event(2, '2018-05-30', '第一节', '语文/张丽萍'), new Event(3, '2018-05-24', '第一节', '语文/张丽萍'),
        new Event(3, '2018-05-29', '第一节', '', false), new Event(5, '2018-05-30', '第六节', '', false), new Event(7, '2018-05-30', '第八节', '数学/abc', true)],
      currdate: moment(),
      notArranged: [ new NotArrangedEvent('数学/小李', 10), new NotArrangedEvent('数学/王梅梅', 7), new NotArrangedEvent('数学/李兰', 3) ],
      week: 1,
      dialogVisible: true,
      currentdate: moment(),
      currentWeek: moment().startOf('week'),
      currentMonth: moment().startOf('month'),
      phase: '1',
      // viewMethod 查看方式，1表示按班级，2便是按老师
      viewMethod: '1',
      selectedGrade: '',
      // grades: [
      //   { value: 1, label: '一年级' },
      //   { value: 2, label: '二年级' },
      //   { value: 3, label: '三年级' }
      // ],
      classes: [{id: '1', name: '一年级（1）班'}, {id: '2', name: '二年级（1）班'}, {id: '3', name: '三年级（1）班'}],
      grades: [
        { id: 1, name: '一年级', classes: [{id: '1', name: '一年级（1）班'}, {id: '2', name: '一年级（2）班'}] },
        { id: 2, name: '二年级', classes: [{id: '1', name: '二年级（1）班'}, {id: '2', name: '二年级（2）班'}] },
        { id: 3, name: '三年级', classes: [{id: '1', name: '三年级（1）班'}, {id: '2', name: '三年级（2）班'}] }
      ]
    }
  },
  computed: {
    getStartWeek () {
      return this.currentdate.endOf('week').add(1, 'day').subtract(this.getCurrentWeek, 'week').add(1, 'day')
    },
    getCurrentWeek () {
      return 2
    }
  },
  methods: {
    moveEvent ([rect, content], option) {
      const showIndex = this.showIndex
      switch (showIndex) {
        case 0: {
          return this.$refs.Month.moveEvent([rect, content], option)
        }
        case 2: {
          return this.$refs.Day.moveEvent([rect, content], option)
        }
        default: {
          return this.$refs.Week.moveEvent([rect, content], option)
        }
      }
    },
    gradesChange (selectedGrade) {
      this.classes = this.grades[this.selectedGrade - 1].classes
    },
    changeDate () {
      this.currentdate = moment(this.currentdate)
      const currentWeek = moment(this.currentdate).startOf('week')
      // 改变周数
      this.week = this.week - this.currentWeek.isoWeek() + currentWeek.isoWeek()
      this.currentWeek = currentWeek
      this.currentMonth = moment(this.currentdate).startOf('month')
    },
    getData () {
      this.currentdate = moment(this.getStartWeek).add(this.week - 1, 'week')
    },
    BACK () {
      this.$router.push('/')
    }
  }
}
</script>

<style>
.event-list {
  position: absolute;
  right: 16px;
  width: 100px;
}
.my-date {
  display: inline-block;
  margin-left: 8px;
  margin-bottom: 8px;
}
.click-option {
  display: inline-block;
}
.choose-phase {
  margin-bottom: 8px;
}
.arrange-label {
  margin-right:20px;
  color: #99a9bf;
}
</style>
