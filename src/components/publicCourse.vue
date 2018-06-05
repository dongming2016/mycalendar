<template>
  <!-- 公共课设置 -->
  <div>
    <el-button type="text" @click="dialogVisible = true">公共课设置</el-button>
    <el-dialog title="公共课设置" :visible.sync="dialogVisible" class="public-class-setting">
      <el-row :gutter="16">
        <el-col :span="2">
          <div>公共活动列表</div>
          <div class="course-list">
            <div v-if="courses.length > 0" v-for="(course, index) in courses" :key="course.id" class="course-item"
              :class="{'teacher-active': index===activeIndex}" @click="switchCourse(index, teacher.id)">
              <div>{{course.name}}</div>
            </div>
            <div v-if="courses.length == 0">
              暂时无公共活动，请添加公共活动。
            </div>
            <el-button type="primary" icon="el-icon-plus" size="small"></el-button>
          </div>
        </el-col>
        <el-col :span="18">
          <WeekTemplate :events="events" :options="{ labels }" :isDateShow="false"  ref="Week"/>
        </el-col>
        <el-col :span="4">
          <div>选择年级或班级</div>
          <div>
            <div v-if="grades.length>0">
              <div class="all-grade">
                <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
              </div>
              <div class="public-grade">
                <div v-for="(grade, index) in grades" :key="index">
                  <div @click="foldClasses(grade)" :class="{'el-icon-caret-right': !grade.showClass, 'el-icon-caret-bottom': grade.showClass}">
                    <el-checkbox :label="grade.id" v-model="grade.isChecked" :indeterminate="grade.isIndeterminate" class="public-grade-item">
                      <div>{{grade.name}}</div>
                    </el-checkbox>
                  </div>
                  <div v-show="grade.showClass" class="classes-container">
                    <div v-for="(classItem, index1) in grade.classes" :key="index1" class="class-checkbox">
                      <el-checkbox :label="classItem.id" v-model="classItem.isChecked">
                        <div>{{classItem.name}}</div>
                      </el-checkbox>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div v-else>没有班级</div>
          </div>
        </el-col>
      </el-row>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" plain @click="savePublicSetting">确定</el-button>
        <el-button plain @click="dialogVisible = false">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { CourseService } from '../service/course.service'
import WeekTemplate from '../components/WeekTemplate'
import { NoScheduleService } from '../service/noSchedule.service'
export default {
  data () {
    return {
      dialogVisible: false,
      activeIndex: 0,
      courses: [],
      isIndeterminate: true,
      grades: [],
      selectedCourse: -1,
      checkAll: false,
      events: [],
      labels: []
    }
  },
  methods: {
    getCourses () {
      this.courses = CourseService.getCourses()
      if (this.courses.length > 0) {
        // selectedCourse用来记录课程的id
        this.selectedCourse = 0
        this.activeIndex = 0
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
    }
  },
  mounted () {
    this.getCourses()
    this.grades = this.getClasses(this.selectedCourse)
    this.labels = NoScheduleService.getLabels()
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
