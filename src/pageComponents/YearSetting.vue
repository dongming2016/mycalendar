<template>
  <div>
    <el-button class="year-setting el-icon-setting" type="text" @click="schoolYearVisible=true">学年设置</el-button>
        <el-dialog title="学年设置" :visible.sync="schoolYearVisible">
        <div v-for="(term, index) in termSetting" :key="index">
          <div>
            <label>学期名称</label>
            <el-input
              placeholder="请输入学期名称"
              v-model="term.name"
              clearable>
            </el-input>
          </div>
          <div>
            <label>学期时间</label>
            <el-date-picker
              v-model="term.time"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
          </div>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" plain @click="saveSchoolYearSetting">确定</el-button>
          <el-button plain @click="schoolYearVisible = false">取消</el-button>
        </div>
      </el-dialog>
  </div>
</template>

<script>
import { CourseService } from '../service/course.service'
export default {
  data () {
    return {
      schoolYearVisible: false,
      // 一个学年有多少个学期，这个相对于学年等应该是独立的。
      termSetting: []
    }
  },
  methods: {
    saveSchoolYearSetting () {
      this.schoolYearVisible = false
    }
  },
  mounted () {
    this.termSetting = CourseService.getTermSetting()
  }
}
</script>
