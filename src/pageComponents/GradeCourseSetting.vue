<template>
<!-- 年级设置,既可以看到年级的教学计划，也可以 -->
  <div>
    <!-- <div>
      <span>当前年级:</span>
      <span v-for="(item, index) in currentGrade" :key="index">
        <el-tag
          closable
          type="success">
          {{item.name}}
        </el-tag>
      </span>
    </div> -->
    <div>
    <div style="margin-bottom:18px;">
      <el-radio-group v-model="selectedGrade" style="margin-bottom: 20px;">
        <el-radio-button v-for="(item, index) in grades"
        :key="index" :label="item.name">{{item.name}}</el-radio-button>
      </el-radio-group>
    </div>
    </div>
    <div style="text-align:center;margin-top:16px;">
      <span style="margin-right:20px;">课程名称</span>
      <el-select v-model="selectedCourseId">
        <el-option v-for="(item, index) in getCourses"
        :key="index" :label="item.courseName" :value="item.id"/>
      </el-select>
    </div>
    <div style="text-align:center;margin-top:16px;">
      <span style="margin-right:20px;">适用班级类型</span>
      <el-radio-group v-model="courseType" style="margin-bottom: 20px;">
        <el-radio label="通用">通用</el-radio>
        <el-radio label="文科">文科</el-radio>
        <el-radio label="理科">理科</el-radio>
      </el-radio-group>
    </div>
    <div>
      <el-button type="primary" @click="add">添加年级课程计划</el-button>
      <el-dialog :visible.sync="dialogVisible" :title="title">
        <GradeCoursePlan :isNew="isNew" :plan="plan"/>
        <div style="text-align:center;">
          <el-button type="primary" @click="dialogVisible=false">确定</el-button>
          <el-button type="primary" plain @click="dialogVisible=false">取消</el-button>
        </div>
      </el-dialog>
    </div>
    <div>
      <el-table
      ref="multipleTable"
      :data="getCourses"
      style="width: 100%">
      <el-table-column
        label="年级"
        sortable
        prop="grade">
      </el-table-column>
      <el-table-column
        label="课程名称"
        sortable
        prop="courseName">
      </el-table-column>
      <!-- <el-table-column
        label="课程类型">
        <template slot-scope="scope">
          <span>
            {{scope.row.type}}
          </span>
        </template>
      </el-table-column> -->
      <el-table-column
        label="适用班级类型"
        prop="courseType">
        <!-- <template slot-scope="scope">
          <el-select v-model="scope.row.courseType">
            <el-option v-for="(item, index) in courseTypes"
            :key="index" :label="item.name" :value="item.id"/>
          </el-select>
        </template> -->
      </el-table-column>
      <el-table-column
        label="周课时"
        sortable
        prop="weekHours">
        <!-- <template slot-scope="scope">
           <el-select v-model="scope.row.weekHours" placeholder="请选择周课时">
            <el-option
              v-for="item in 40"
              :key="item"
              :value="item">
            </el-option>
          </el-select>
        </template> -->
      </el-table-column>
      <el-table-column
        label="总课时"
        sortable
        prop="totalHours">
        <!-- <template slot-scope="scope">
          <el-input v-model="scope.row.totalHours" type="number" placeholder="请输入总课时"></el-input>
        </template> -->
      </el-table-column>
      <el-table-column
        label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="edit(scope.row)">编辑</el-button>
          <el-button type="primary">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      layout="total, prev, pager, next"
      :total="50">
    </el-pagination>
    </div>
  </div>
</template>

<script>
import ClassSetting from './ClassSetting'
import GradeCoursePlan from './gradeClassManage/GradeCoursePlan'
// import { CourseService } from '../service/course.service'
export default {
  data () {
    return {
      dialogVisible: false,
      isNew: false,
      plan: {},
      title: '',
      filter: '全部',
      selectedCourseId: '',
      category: [{id: 0, name: '全部'}, {id: 1, name: '国标'}, {id: 2, name: '校本'}],
      courseType: '通用',
      courseTypes: [{id: 0, name: '通用'}, {id: 1, name: '文科'}, {id: 2, name: '理科'}],
      selectedGrade: '全部',
      grades: [{id: '0', name: '全部'}, {id: '1', name: '一年级'}, {id: '2', name: '二年级'}, {id: '3', name: '三年级'}]
    }
  },
  computed: {
    getCourses () {
      // 根据当前年级获取课程
      console.log(this.currentGrade)
      return [
        {
          id: 1,
          grade: '一年级',
          courseName: '数学',
          type: '国标',
          weekHours: 10,
          courseType: '通用',
          totalHours: 100
        },
        {
          id: 2,
          grade: '一年级',
          courseName: '语文',
          type: '国标',
          courseType: '通用',
          weekHours: 10,
          totalHours: 100
        },
        {
          id: 3,
          grade: '一年级',
          courseName: '英语',
          courseType: '通用',
          type: '国标',
          weekHours: 10,
          totalHours: 100
        },
        {
          id: 4,
          grade: '一年级',
          courseName: '政治',
          courseType: '文科',
          type: '国标',
          weekHours: 10,
          totalHours: 100
        },
        {
          id: 5,
          grade: '一年级',
          courseName: '艺术',
          courseType: '通用',
          type: '校本',
          weekHours: 10,
          totalHours: 100
        },
        {
          id: 6,
          grade: '一年级',
          courseName: '音乐',
          courseType: '通用',
          type: '国标',
          weekHours: 10,
          totalHours: 100
        },
        {
          id: 7,
          grade: '一年级',
          courseName: '物理',
          courseType: '理科',
          type: '国标',
          weekHours: 10,
          totalHours: 100
        }
      ]
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
    },
    edit (gradePlan) {
      this.dialogVisible = true
      this.isNew = false
      this.plan = gradePlan
    },
    add () {
      this.dialogVisible = true
      this.isNew = true
      this.title = '添加年级计划'
      this.plan = {}
    }
  },
  components: {
    ClassSetting,
    GradeCoursePlan
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
