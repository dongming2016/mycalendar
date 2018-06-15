<template>
  <!-- 班级设置 -->
  <div>
    <el-button type="text" @click="dialogVisible = true">班级计划设置</el-button>
    <el-dialog title="班级计划设置" :visible.sync="dialogVisible" class="class-setting">
      <div>
        <span>选择班级</span>
        <el-select style="margin:10px;"
        v-model="selectedClass">

        <el-option
        v-for="item1 in classes"
        :key="item1.id"
          :label="item1.name"
          :value="item1.id"
        />
        </el-select>
      </div>
      <div v-show="!isWeekShow">
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
            <el-table-column
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
            <el-table-column
            label="单双周"
            >
              <template slot-scope="scope">
                <el-select v-model="scope.row.courseType">
                <el-option
                  v-for="item in courseTypes"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
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
                <el-select v-model="scope.row.isAuto">
                <el-option
                  v-for="item in autoType"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
                </el-select>
              </template>
            </el-table-column>
            <el-table-column
            label="多班合上"
            >
              <template slot-scope="scope">
                <el-select v-model="scope.row.isMerged">
                <el-option
                  v-for="item in mergeType"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
                </el-select>
              </template>
            </el-table-column>
            <el-table-column
            label="不排课设置"
            >
              <template slot-scope="scope">
                <el-input @focus="isWeekShow=true" v-model="scope.row.noCourseTime" placeholder="请选择不排课时间">
                <i slot="prefix" @click="isWeekShow=true" class="el-input__icon el-icon-date"></i>
                </el-input>
              </template>
            </el-table-column>
            <el-table-column
            label="优先排课设置"
            >
              <template slot-scope="scope">
                <el-checkbox-group style="display:block;" v-model="scope.row.checkedClassNumber">
                  <el-checkbox v-for="item in classNumber"
                  :key="item"
                  :label="item">
                  {{item}}
                  </el-checkbox>
                </el-checkbox-group>
              </template>
            </el-table-column>
      </el-table>
      <footer style="text-align: center;
                margin-top: 20px;">
          <el-button type="primary" @click="dialogVisible=false">确定</el-button>
          <el-button @click="dialogVisible=false">取消</el-button>
        </footer>
      </div>
      <div v-show="isWeekShow">
        <div>不排课设置</div>
        <WeekTemplate :options="options" :currentWeek="currentWeek" ref="Week"/>
        <footer style="text-align: center;
                margin-top: 20px;">
          <el-button type="primary" @click="isWeekShow=false">确定</el-button>
          <el-button @click="isWeekShow=false">取消</el-button>
        </footer>
      </div>
    </el-dialog>
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
      courseTypes: [{id: 1, name: '全排'}, {id: 2, name: '单周'}, {id: 3, name: '双周'}],
      mergeType: [{id: 1, name: '不允许'}, {id: 2, name: '允许'}],
      autoType: [{id: 1, name: '是'}, {id: 2, name: '否'}],
      serialNums: 2,
      dialogVisible: false,
      isWeekShow: false,
      selectedClass: '1',
      classNumber: 8,
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
        isAuto: 1,
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
  }
}
</script>
<style scoped>
.el-checkbox+.el-checkbox{
  margin: 0;
}
</style>
