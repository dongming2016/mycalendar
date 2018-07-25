<template>
<!-- 不排课设置   -->
<div>
  <el-button type="text" @click="dialogVisible = true">年级不排课设置</el-button>
  <el-dialog title="年级不排课设置" :visible.sync="dialogVisible" class="grade-setting">
    <span>请选择年级：</span>
    <el-select v-model="selectedGrade" placeholder="一年级" @change='gradesChange(selectedGrade)'>
      <el-option
        v-for="item in grades"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
    <div class="note">
      <span>说明：</span>
      <el-switch
        v-model="notArrange"
        active-text="不排课"
        inactive-text="排课">
      </el-switch>
    </div>
    <CourseScheduleTable style="display:inline-block;" :options="getOptions"/>
    <div style="display:inline-block;  margin-left: 30px;
    width: 250px;   vertical-align: top;" v-show="isClassOut">
      <ClassOTT :classes="classes"/>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" plain @click="saveGradeSetting">确定</el-button>
      <el-button plain @click="dialogVisible = false">取消</el-button>
    </div>
  </el-dialog>
</div>
</template>

<script>
import CourseScheduleTable from './CourseScheduleTable'
import { NoScheduleService } from '../service/noSchedule.service'
import ClassOTT from './ClassOTT'

const grades = [{ value: 1, label: '一年级' },
  { value: 2, label: '二年级' },
  { value: 3, label: '三年级' }]

export default {
  data () {
    return {
      dialogVisible: false,
      notArrange: true,
      arrange: true,
      grades,
      selectedGrade: 1,
      labels: [],
      courses: [],
      isClassOut: true,
      classes: [{id: '1', name: '一年级（1）班'}, {id: '2', name: '二年级（1）班'}]
    }
  },
  computed: {
    getOptions () {
      return { labels: this.labels, courses: NoScheduleService.getNoScheduleByGradeId(this.selectedGrade, this.courses) }
    }
  },
  methods: {
    saveGradeSetting () {
      this.dialogVisible = false
    },
    gradesChange (val) {
      console.log(val)
    }
  },
  components: {
    CourseScheduleTable,
    ClassOTT
  },
  mounted () {
    this.labels = NoScheduleService.getLabels()
  }
}
</script>

<style>
.grade-setting .el-select .el-input--suffix .el-input__inner {
  width: 200px;
}
.note {
  text-align: right;
  margin-bottom: 16px;
  margin-right: 12px;
}
.dialog-footer {
  text-align: center;
}
</style>
