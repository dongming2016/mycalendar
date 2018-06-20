<template>
<!-- 年级设置 -->
  <div>
    <!-- <el-button type="text" @click="clickGradeSetting">年级设置</el-button> -->
    <!-- <el-dialog title="年级设置" :visible.sync="gradeSettingVisible"> -->
      <div>
        <!-- 展示每个年级已选课程的表格 -->
        <div style="text-align: center;margin-bottom: 30px;">年级设置</div>
        <el-table
          :data="gradeOption"
          border
          @expand-change="expandRow"
          style="width: 100%">
          <el-table-column
          type="expand"
          >
          </el-table-column>
          <el-table-column
            prop="name"
            label="年级"
            width="100">
          </el-table-column>
          <el-table-column
            prop="courses"
            label="国标课程">
            <template slot-scope="scope">
              <el-checkbox-group v-model="scope.row.courses">
                <div v-for="(course, index) in allCourses.standard" :key="index" class="course-item">
                  <!-- <el-tag
                    closable
                    :disable-transitions="false">
                    {{course.name}}({{course.weekClasses}}/{{course.totalClasses}})
                  </el-tag> -->
                  <el-checkbox :label="course.id">{{course.name}}({{course.weekClasses}}/{{course.totalClasses}})</el-checkbox>
                </div>
              </el-checkbox-group>
            </template>
          </el-table-column>
          <el-table-column
            prop="courses"
            label="选修课程">
            <template slot-scope="scope">
              <!-- <el-checkbox class="course-item">全选</el-checkbox> -->
              <el-checkbox-group v-model="scope.row.courses" @change="handleCheckedCitiesChange">
                <div v-for="(course, index) in allCourses.optional" :key="index" class="course-item">
                  <!-- <el-tag
                    closable
                    :disable-transitions="false">
                    {{course.name}}({{course.weekClasses}}/{{course.totalClasses}})
                  </el-tag> -->
                  <el-checkbox :label="course.id">{{course.name}}({{course.weekClasses}}/{{course.totalClasses}})</el-checkbox>
                </div>
              </el-checkbox-group>
            </template>
          </el-table-column>
          <el-table-column
            prop="courses"
            label="操作">
            <template slot-scope="scope">
              <el-button type="primary" @click="classVisible=true">班级设置</el-button>
              <el-button type="primary" @click="courseVisible=true">课程设置</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    <el-dialog title="班级设置" :visible.sync="classVisible">
      <div>
        <div style="display:inline-block;">理科</div>
          <div style="display:inline-block;">
            <div class="course-item">
              <el-checkbox v-for="(course, index) in allCourses.standard" :key="index"  :label="course.id">{{course.name}}</el-checkbox>
            </div>
            <div class="course-item">
              <el-checkbox v-for="(course, index) in allCourses.optional" :key="index" :label="course.id">{{course.name}}</el-checkbox>
            </div>
          </div>
          <div  style="display:inline-block;float:right;margin-right: 16px;">
            <el-button type="text" size="mini">创建班级</el-button>
          </div>
          <ClassSetting />
          <div style="margin-top:10px;display:inline-block;">文科</div>
          <div style="display:inline-block;">
            <div class="course-item">
              <el-checkbox v-for="(course, index) in allCourses.standard" :key="index" :label="course.id">{{course.name}}</el-checkbox>
            </div>
            <div class="course-item">
              <el-checkbox v-for="(course, index) in allCourses.optional" :key="index" :label="course.id">{{course.name}}</el-checkbox>
            </div>
          </div>
          <div  style="display:inline-block;float:right;margin-right: 16px;">
            <el-button type="text" size="mini">创建班级</el-button>
          </div>
          <ClassSetting />
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" plain @click="classVisible = false">确定</el-button>
        <el-button plain @click="gradeSettingVisible = false">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import ClassSetting from './ClassSetting'
// import { CourseService } from '../service/course.service'
export default {
  data () {
    return {
      classVisible: false,
      gradeSettingVisible: false,
      gradeOption: [ { name: '一年级', courses: [ 1, 2 ] } ],
      allCourses: { standard: [ { id: 1, name: '语文', weekClasses: '10', totalClasses: '10', isChecked: true },
        { id: 2, name: '数学', weekClasses: '10', totalClasses: '10', isChecked: true } ],
      optional: [ { id: 3, name: '艺术', weekClasses: '10', totalClasses: '10', isChecked: false } ] },
      isAllCourseShow: false,
      classOption: [ { classType: '0', classes: [] }, { classType: '1', classes: [] } ]
    }
  },
  methods: {
    clickGradeSetting () {
      this.gradeSettingVisible = true
    },
    saveGradeSetting () {
      this.gradeSettingVisible = false
    },
    addCourse (gradeCourse) {
      this.isAllCourseShow = true
    },
    handleCheckedCitiesChange () {
      console.log(this.gradeOption)
    },
    expandRow (row) {
      this.classOption.push([ {} ])
    }
  },
  components: {
    ClassSetting
  },
  mounted () {
    // this.gradeOption = CourseService.getGradeCourses()
    // this.allCourses = CourseService.getAllCourses()
  }
}
</script>

<style scoped>
  .course-item {
    display: inline-block;
    margin-left: 16px;
  }
  .grade-title {
    margin-bottom: 8px;
  }
  .dialog-footer {
    margin-top: 30px;
  }
</style>
