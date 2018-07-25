<template>
  <!-- 公共课设置 -->
  <div>
    <div style="width:800px;">
        <el-form :model="researchData" :rules="rules" ref="research">
          <el-form-item label="教研活动名称:" prop="researchName">
            <el-input v-model="researchData.researchName"/>
          </el-form-item>
          <el-form-item label="参与老师:" prop="teachers">
            <el-select v-model="researchData.teachers" placeholder="请选择活动区域">
              <el-option label="item.teacherName" value="item.id"
                v-for="(item, index) in teachers" :key="index"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="活动时间:" prop="activityTimes">
            <el-input style="width:300px;margin-top:20px;" @focus="showTimeTable"
            placeholder="选择时间" v-model="researchData.activityTimesStr" clearable>
            <!-- <el-tag
              :key="index"
              v-for="(activityTime, index) in researchData.activityTimes"
              closable
              :disable-transitions="false"
              @close="handleClose(activityTime)">
              {{activityTime.getCourseTimeStr()}}
            </el-tag> -->
              <i slot="suffix" @click="showTimeTable" class="el-input__icon el-icon-caret-bottom"></i>
            </el-input>
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
          <el-form-item label="教研活动描述:">
            <el-input style="margin-top:8px;margin-left:8px;width:200px;" v-model="researchData.courseDesc"/>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">新增</el-button>
          </el-form-item>
        </el-form>
        <el-table :data="researchDatas">
          <el-table-column label="活动名称" prop="researchName"/>
          <el-table-column label="参与老师" prop="teachers"/>
          <el-table-column label="活动时间" prop="time"/>
          <el-table-column label="活动描述" prop="researchDesc"/>
        </el-table>
    </div>
  </div>
</template>

<script>
// import { CourseService } from '../service/course.service'
import researchUtil from '../util/courseUtil.js'
import baseService from '../service/base.service.js'
import CourseScheduleTable from './CourseScheduleTable'

export default {
  components: {
    CourseScheduleTable
  },
  data () {
    return {
      researchData: {currentData: []},
      researchDatas: [],
      teachers: [],
      rules: {
        researchName: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
        ],
        teachers: [
          { required: true, message: '请选择活动老师', trigger: 'change' }
        ],
        activityTimes: [
          { required: true, message: '请选择活动时间', trigger: 'change' }
        ]
      },
      isTimeTableShow: false,
      datas: [],
      options: {}
    }
  },
  methods: {
    onSubmit () {

    },
    handleClose () {

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
    setTime (time) {
      console.log(time)
      if (!this.researchData.activityTimes) {
        this.researchData.activityTimes = []
      }
      this.researchData.activityTimes.push(time)
      const activityTimesStr = this.researchData.activityTimes.map(element => {
        return element.getCourseTimeStr()
      }).join(',')
      console.log(activityTimesStr)
      this.$set(this.researchData, 'activityTimesStr', activityTimesStr)
    }
  },
  mounted () {
  }
}
</script>

<style>
.down-box {
  position: absolute;
  z-index: 2;
  background: #fff;
}
</style>
