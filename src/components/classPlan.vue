<template>
  <!-- 班级设置 -->
  <div>
    <el-table
        border
        :data="getClassOption">
        <el-table-column
          type="selection"
          />
        <el-table-column
          label="课程"
          prop="course"
          />
          <el-table-column
          label="教师"
          >
          <template slot-scope="scope">
            <el-select v-model="scope.row.teacherName">
              <el-option
                v-for="item in scope.row.teacherNames"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </template>
          </el-table-column>
          <el-table-column v-if="isAll"
          label="周节次（0/40）"
          >
          <template slot-scope="scope">
            <el-select v-model="scope.row.courseNum">
            <el-option
              v-for="item in 40"
              :key="item"
              :label="item"
              :value="item">
            </el-option>
            </el-select>
          </template>
          </el-table-column>
          <el-table-column v-if="!isAll"
          label="单周节次（0/40）"
          >
          <template slot-scope="scope">
            <el-select v-model="scope.row.singleCourseNum">
            <el-option
              v-for="item in 40"
              :key="item"
              :label="item"
              :value="item">
            </el-option>
            </el-select>
          </template>
          </el-table-column>
          <el-table-column
          label="双周节次" v-if="!isAll"
          >
            <template slot-scope="scope">
              <el-select v-model="scope.row.doubleCourseNum">
              <el-option
                v-for="item in 40"
                :key="item"
                :label="item"
                :value="item">
              </el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column
          label="连课"
          prop="serialNum"
          >
            <template slot-scope="scope">
              <el-select v-model="scope.row.serialNum">
              <el-option
                v-for="item in serialNums"
                :key="item"
                :label="item"
                :value="item">
              </el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column
          label="自动排课"
          >
            <template slot-scope="scope">
              <el-radio-group v-model="scope.row.isAuto">
                <el-radio label="true">是</el-radio>
                <el-radio label="false">否</el-radio>
              </el-radio-group>
            </template>
          </el-table-column>
          <el-table-column
          label="不排课设置"
          >
            <template slot-scope="scope">
              <el-input @focus="isWeekShow=true" v-model="scope.row.noCourseTime" placeholder="请选择不排课时间">
              <i slot="suffix" @click="isWeekShow=true" class="el-input__icon  el-icon-caret-bottom"></i>
              </el-input>
            </template>
          </el-table-column>
          <el-table-column
          label="优先排课设置">
            <template slot-scope="scope">
              <el-input @focus="isWeekShow=true" v-model="scope.row.priorityTime" placeholder="请选择不排课时间">
              <i slot="suffix" @click="isWeekShow=true" class="el-input__icon  el-icon-caret-bottom"></i>
              </el-input>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-switch v-model="scope.row.isValid"/>
            </template>
          </el-table-column>
    </el-table>
  </div>
</template>

<script>
import WeekTemplate from './WeekTemplate'
import moment from 'moment'
import { getLabels } from '../service/noSchedule.service.js'
export default {
  data () {
    return {
      options: this.getLabels,
      isAll: false,
      courseTypes: [{id: 1, name: '全排'}, {id: 2, name: '单周'}, {id: 3, name: '双周'}],
      mergeType: [{id: 1, name: '不允许'}, {id: 2, name: '允许'}],
      autoType: [{id: 1, name: '是'}, {id: 2, name: '否'}],
      serialNums: 2,
      dialogVisible: false,
      isWeekShow: false,
      selectedClass: '1',
      classNumber: 8,
      classPlan: [],
      currentWeek: moment('2018-05-29').startOf('week'),
      classes: [{id: '1', name: '一年级(1)班'}, {id: '2', name: '一年级（2）班'}, {id: '3', name: '一年级（3）班'}]
    }
  },
  computed: {
    getClassOption () {
      return [{course: '语文',
        teacherName: '张宇',
        teacherNames: [{id: 1, name: '张宇'}, {id: 2, name: '李曼'}, {id: 3, name: '黄伟'}],
        courseNum: '',
        courseType: 1,
        serialNum: 1,
        isAuto: 'true',
        isMerged: 1,
        noCourseTime: '',
        checkedClassNumber: []
      }]
    },
    getOption () {
      return getLabels()
    }
  },
  components: {
    WeekTemplate
  },
  beforeDestroy () {
    const classPlan = this.classPlan
    this.$store.commit('setArrangeSettings', {type: 'classPlan', setting: classPlan})
  }
}
</script>
<style scoped>
.el-radio+.el-radio {
  margin-left: 8px;
}
</style>
