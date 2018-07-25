<template>
  <div>
    <el-button type="text" @click="dialogVisible = true">老师不排课设置</el-button>
    <el-dialog title="老师不排课设置" :visible.sync="dialogVisible" class="teacher-setting">
      <div class="note">
        <span>说明：</span>
        <el-switch
          v-model="notArrange"
          active-text="不排课"
          inactive-text="排课">
        </el-switch>
      </div>
      <el-row :gutter="16">
        <el-col :span="4">
          <div class="teacher-search">
              <el-input placeholder="请输入内容" v-model="searchKey" class="input-with-select">
                <el-button slot="append" icon="el-icon-search"></el-button>
              </el-input>
          </div>
          <div class="teacher-list">
            <div v-if="teachers.length > 0" v-for="(teacher, index) in teachers" :key="teacher.id" class="teacher-item"
              :class="{'teacher-active': index===activeIndex}" @click="switchTeacher(index, teacher.id)">
              {{teacher.name}}
            </div>
            <div v-if="teachers.length == 0">
              暂时无老师数据，请添加老师。
            </div>
          </div>
        </el-col>
        <el-col :span="20">
          <CourseScheduleTable :options="getOptions"/>
        </el-col>
      </el-row>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" plain @click="saveSettings">确定</el-button>
        <el-button plain @click="dialogVisible = false">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import CourseScheduleTable from './CourseScheduleTable'
import { NoScheduleService } from '../service/noSchedule.service'
import { TeacherService } from '../service/teacherService'

export default {
  data () {
    return {
      dialogVisible: false,
      notArrange: true,
      arrange: true,
      activeIndex: 0,
      labels: [],
      courses: [],
      chosedTeacher: 0,
      searchKey: '',
      teachers: []
    }
  },
  computed: {
    getOptions () {
      return { labels: this.labels, courses: NoScheduleService.getNoScheduleByTeacher(this.chosedTeacher, this.courses) }
    }
  },
  methods: {
    getAllTeachers () {
      const teachers = TeacherService.getTeachers()
      if (teachers.length > 0) {
        this.chosedTeacher = teachers[0].id
      }
      this.teachers = teachers
    },
    switchTeacher (index, teacherId) {
      this.activeIndex = index
      this.chosedTeacher = teacherId
    },
    saveSettings () {
      this.dialogVisible = false
    },
    getLabels () {
      this.labels = NoScheduleService.getLabels()
    }
  },
  mounted () {
    // 老师和每天上几节课是在加载时需要获取的数据。
    this.getAllTeachers()
    this.getLabels()
  },
  components: {
    CourseScheduleTable
  }
}
</script>

<style>
.teacher-setting .el-dialog {
 min-width: 1250px;
}
.teacher-list {
  margin-top: 10px;
}
.teacher-item {
  border: 1px solid #eee;
  border-bottom: none;
  height: 28px;
  line-height: 28px;
  cursor: pointer;
}
.teacher-item:first-child {
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
}
.teacher-item:last-child {
  border-bottom: 1px solid #eee;
}
.teacher-active {
  color: #409eff;
  background: rgba(64,158,255,.1);
}
</style>
