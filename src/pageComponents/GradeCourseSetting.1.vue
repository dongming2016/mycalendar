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
      <span>选择年级</span>
      <el-select v-model="currentGrade" multiple placeholder="请选择年级">
        <el-option
          v-for="item in grades"
          :key="item.id"
          :label="item.name"
          :value="item.id">
        </el-option>
      </el-select>
    </div>
    <div>
      <el-table
      ref="multipleTable"
      :data="getCourses"
      style="width: 100%">
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column
        label="课程名称"
        prop="name"
        width="120">
      </el-table-column>
      <el-table-column
        label="课程类型"
        width="120">
        <template slot-scope="scope">
          <span>
            {{scope.row.type}}
          </span>
        </template>
      </el-table-column>
      <el-table-column
        label="周课时"
        width="120">
        <template slot-scope="scope">
           <el-select v-model="scope.row.weekHours" placeholder="请选择周课时">
            <el-option
              v-for="item in 40"
              :key="item"
              :value="item">
            </el-option>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column
        label="总课时">
        <template slot-scope="scope">
          <el-input v-model="scope.row.totalHours" type="number" placeholder="请输入总课时"></el-input>
        </template>
      </el-table-column>
    </el-table>
    </div>
  </div>
</template>

<script>
import ClassSetting from './ClassSetting'
// import { CourseService } from '../service/course.service'
export default {
  data () {
    return {
      currentGrade: '一年级',
      grades: [{id: '1', name: '一年级'}, {id: '2', name: '二年级'}, {id: '3', name: '三年级'}]
    }
  },
  computed: {
    getCourses () {
      // 根据当前年级获取课程
      console.log(this.currentGrade)
      return [
        {
          id: 1,
          name: '数学',
          type: '国标',
          weekHours: 10,
          totalHours: 100
        },
        {
          id: 2,
          name: '语文',
          type: '国标',
          weekHours: 10,
          totalHours: 100
        },
        {
          id: 3,
          name: '英语',
          type: '国标',
          weekHours: 10,
          totalHours: 100
        },
        {
          id: 4,
          name: '政治',
          type: '国标',
          weekHours: 10,
          totalHours: 100
        },
        {
          id: 5,
          name: '艺术',
          type: '校本',
          weekHours: 10,
          totalHours: 100
        },
        {
          id: 6,
          name: '音乐',
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
