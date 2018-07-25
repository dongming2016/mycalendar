<template>
  <div>
    <titleComponent :showTime="showTime" :menus="menus" :showMenu="showMenu"/>
    <el-row type="flex"  class="title" justify="space-around">
      <el-col :span="4">
        <el-button @click="settingBoxShow=true">设置</el-button>
        <classesMenu class="class-menu" @clickNode="clickNode"/>
      </el-col>
      <el-dialog :visible.sync="settingBoxShow" class="grade-setting">
        <settingBox/>
      </el-dialog>
      <el-col :span="16">
        <div>
          <div class="operation-container">
            <el-button>导出课表</el-button>
            <el-button>打印课表</el-button>
          </div>
          <div class="schedule-table-title">
            <div style="display:inline-block; float:left;background:#4876E7;">
              {{selectedItem.label}}
            </div>
            <div style="display:inline-block;">
              <div class="course-circle">
                课
              </div>
              <div class="course-circle">
                表
              </div>
            </div>
          </div>
          <WeekTemplate style="display:inline-block;margin-left:20px;vertical-align: top;"
          :events="events" :options="options" :currentWeek="currentWeek"
          :subCells="subCells"
          :notArranged="notArranged"  ref="Week"/>
        </div>
      </el-col>
      <el-col :span="4">
        <div class="radio-container">
          <el-radio-group v-model="isSingleOrDouble" v-if="!isAll">
            <el-radio label="single">单周</el-radio>
            <el-radio label="double">单周</el-radio>
          </el-radio-group>
        </div>
        <div class="course-list-container">
          <div class="course-list-title">
            <span class="el-icon-circle-plus-outline">{{courseTitle}}</span>
          </div>
          <div class="course-list-tips">·您可拖动待排课程到课表中·</div>
          <EventList :fcEvents="notArranged" :dragArgs="{callback: moveEvent}" class="event-list">
            <template>
              <div>
                <div>班级</div>
                <div>科目</div>
                <div>老师</div>
              </div>
            </template>
          </EventList>
        </div>
      </el-col>
    </el-row>
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
import PublicCourse from '../components/publicActivitySetting'
import ResearchSetting from '../components/researchSetting'
import ClassSetting from '../components/classSetting'
import MergeClass from './MergeClass'
import classesMenu from '../components/classesMenu'
import settingBox from '../components/settingbox'
import titleComponent from '../components/titleComponent'

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
    MergeClass,
    classesMenu,
    settingBox,
    titleComponent
  },
  data () {
    return {
      showTime: true,
      showMenu: true,
      menus: [
        {name: '按班级查看', id: 0},
        {name: '按教室查看', id: 1}
      ],
      isAll: false,
      courseTitle: '班级课程列表',
      subCells: [],
      settingBoxShow: false,
      showIndex: 1,
      selectedIndex: 0,
      selectedItem: {},
      isSingleOrDouble: 'single',
      selectedClasses: '',
      fcHeader: [{id: 1, name: '节次', className: 'fc-my-header'}, {id: 2, name: '日程'}],
      options: { labels },
      events: [
        new Event(1, '2018-07-25', '第二节', '语文/张丽萍', '4852a1d4d1f740879dcde724ec8e11dd'),
        new Event(0, '2018-07-26', '第一节', '语文/张丽萍', '595a33a814504fd5915efbdfd8309ddf'),
        new Event(2, '2018-07-27', '第一节', '语文/张丽萍', '4852a1d4d1f740879dcde724ec8e11dd'),
        new Event(3, '2018-07-24', '第一节', '语文/张丽萍', '595a33a814504fd5915efbdfd8309ddf'),
        new Event(3, '2018-07-24', '第一节', '', '', false),
        new Event(5, '2018-07-25', '第六节', '', '', false),
        new Event(7, '2018-07-23', '第八节', '数学/abc', '', true)],
      currdate: moment(),
      notArranged: [
        new NotArrangedEvent('数学/小李', 10, '4852a1d4d1f740879dcde724ec8e11dd'),
        new NotArrangedEvent('数学/王梅梅', 7, '595a33a814504fd5915efbdfd8309ddf'),
        new NotArrangedEvent('数学/李兰', 3, '595a33a814504fd5915efbdfd8309ddf') ],
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
    clickNode (data) {
      this.selectedItem = data
      this.subCells = this.selectedItem.children || [{id: -1}]
      console.log(data)
    },
    moveEvent ([rect, content, subcellId], option) {
      console.log(content)
      const showIndex = this.showIndex
      switch (showIndex) {
        case 0: {
          return this.$refs.Month.moveEvent([rect, content, subcellId], option)
        }
        case 2: {
          return this.$refs.Day.moveEvent([rect, content, subcellId], option)
        }
        default: {
          return this.$refs.Week.moveEvent([rect, content, subcellId], option)
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
  position: relative;
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
.class-menu {
  width: 60%;
  margin: auto;
  margin-top: 20px;
  border: 1px solid #eee;
  height: 600px;
}
.operation-container {
  text-align: left;
  margin-bottom: 20px;
}
.schedule-table-title {
  height: 50px;
  line-height: 50px;
  color:#fff;
  background: #4876E7;
}
.course-circle {
  display:inline-block;
  background:#1D55D8;
  width:30px;
  height:30px;
  line-height: 30px;
  border-radius:50%;
}
.course-list-title {
  background: #F6F8FC;
  height: 40px;
  line-height: 40px;
}
.course-list-container {
  margin: 20px;
  border: 1px solid #eee;
}
.course-list-tips {
  text-align: center;
  color: #BEBEBE;
  margin: 20px 0;
}
.radio-container {
  height: 40px;
  line-height: 40px;
  margin-bottom: 10px;
}
</style>
