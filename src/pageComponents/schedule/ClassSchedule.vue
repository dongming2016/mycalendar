<template>
  <div>
    <div style="text-align:center">
      <el-tabs v-model="method" @tab-click="handleClick">
        <el-tab-pane label="按班级查看" name="1">
          <span>请选择学段：</span>
          <el-select v-model="selectedPhase" style="margin-right:18px;">
            <el-option
              v-for="item in phases"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
          <span>请选择班级：</span>
          <el-select v-model="selectedClass" @change="setSelectedClass" filterable multiple placeholder="请选择班级，可多选">
            <el-option
              v-for="item in classes"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-tab-pane>
        <el-tab-pane label="按老师查看" name="2">
          <span>请选择学段：</span>
          <el-select v-model="selectedPhase" style="margin-right:18px;">
            <el-option
              v-for="item in phases"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
          <span>请选择老师：</span>
          <el-select v-model="selectedTeacher" @change="setSelectedTeacher" filterable multiple  placeholder="请选择老师，可多选">
            <el-option
              v-for="item in teachers"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-tab-pane>
      </el-tabs>
    </div>
    <!-- <div style="text-align:center">
      <span style="margin-right:16px;">查看方式:</span>
      <el-radio-group v-model="method">
        <el-radio :label="1">班级</el-radio>
        <el-radio :label="2">老师</el-radio>
      </el-radio-group>
    </div> -->
    <div style="margin-bottom:10px;">
      <el-button type="primary" size="mini">导出课表</el-button>
      <el-button type="primary" size="mini">打印课表</el-button>
    </div>
    <el-button style="margin-bottom:10px;" round v-for="(item, index) in selectedItem" :key="index">{{item.name}}</el-button>
    <WeekTemplate :events="events"
    :options="options" :currentWeek="currentWeek" ref="Week"/>
  </div>
</template>

<script>
import WeekTemplate from '../../components/WeekTemplate'
import { getLabels } from '../../service/noSchedule.service.js'
import moment from 'moment'
import Event from '../../model/Event'
const classEvents = [new Event(1, '2018-05-28', '第二节', '语文/张丽萍'), new Event(0, '2018-05-29', '第一节', '语文/张丽萍'), new Event(2, '2018-05-30', '第一节', '语文/张丽萍'), new Event(3, '2018-05-24', '第一节', '语文/张丽萍'),
  new Event(3, '2018-05-29', '第一节', '物理/王灿'), new Event(5, '2018-05-30', '第六节', '英语/李希', true), new Event(7, '2018-05-30', '第八节', '数学/abc', true)]
const teacherEvents = [new Event(1, '2018-05-28', '第二节', '语文/一年级(1)班'), new Event(0, '2018-05-29', '第一节', '语文/一年级(1)班'), new Event(2, '2018-05-30', '第一节', '语文/一年级(1)班')]
export default {
  data () {
    return {
      method: '1',
      selectedItem: [{id: '1', name: '一年级(1)班'}],
      selectedClass: ['1'],
      selectedTeacher: ['11'],
      options: this.getOption,
      selectedPhase: '21',
      classes: [{id: '1', name: '一年级(1)班'}, {id: '2', name: '一年级（2）班'}, {id: '3', name: '一年级（3）班'}],
      phases: [{id: '21', name: '小学'}, {id: '22', name: '初中'}, {id: '23', name: '高中'}],
      teachers: [{id: '11', name: '张丽萍'}, {id: '12', name: '李希'}, {id: '13', name: '王灿'}],
      currentWeek: moment('2018-05-29').startOf('week'),
      events: classEvents
    }
  },
  computed: {
    getOption () {
      return getLabels()
    }
  },
  methods: {
    handleClick (tab, event) {
      this.events = tab.name === '2' ? teacherEvents : classEvents
      // this.selectedItem = tab.name === '2' && !this.selectedTeacher.length ? [{id: '11', name: '张丽萍'}] : this.selectedClass
      tab.name === '2' ? this.setSelectedTeacher() : this.setSelectedClass()
    },
    setSelectedClass (val) {
      this.selectedItem = this.classes.filter(element => {
        for (let i = 0; i < this.selectedClass.length; i++) {
          if (this.selectedClass[i] === element.id) {
            return true
          }
        }
        return false
        // return this.selectedClass.find(element.id)
      })
    },
    setSelectedTeacher (val) {
      this.selectedItem = this.teachers.filter(element => {
        for (let i = 0; i < this.selectedTeacher.length; i++) {
          if (this.selectedTeacher[i] === element.id) {
            return true
          }
        }
        return false
        // return this.selectedClass.find(element.id)
      })
    }
  },
  components: {
    WeekTemplate
  }
}
</script>
