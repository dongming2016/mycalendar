<template>
<div>
   <el-table
    border
    :data="optionalCourseData">
    <!-- <el-table-column type="expand">
      <template slot-scope="props">
        <el-form label-position="left" inline class="demo-table-expand">
          <el-form-item label="课程编号">
            <span>{{ props.row.classCode }}</span>
          </el-form-item>
          <el-form-item label="课程名称">
            <span>{{ props.row.className }}</span>
          </el-form-item>
          <el-form-item label="任课教师">
            <span>{{ props.row.teacherName }}</span>
          </el-form-item>
          <el-form-item label="所属类别">
            <span>{{ props.row.category }}</span>
          </el-form-item>
          <el-form-item label="学科名称">
            <span>{{ props.row.courseName }}</span>
          </el-form-item>
          <el-form-item label="课时安排">
            <span>{{ props.row.courseTimes }}</span>
          </el-form-item>
          <el-form-item label="学生选修条件">
            <span>{{ props.row.condition }}</span>
          </el-form-item>
          <el-form-item label="场地">
            <span>{{ props.row.site }}</span>
          </el-form-item>
          <el-form-item label="考核要求">
            <span>{{ props.row.testMethod }}</span>
          </el-form-item>
          <el-form-item label="科目限选">
            <span>{{ props.row.number }}</span>
          </el-form-item>
          <el-form-item label="每班限选">
            <span>{{ props.row.studentsNum }}</span>
          </el-form-item>
        </el-form>
      </template>
    </el-table-column> -->
    <el-table-column
      label="课程编号"
      sortable
      prop="classCode"/>
    <el-table-column
      label="课程名称"
      sortable
      prop="className">
    </el-table-column>
    <el-table-column
      label="任课教师"
      sortable
      prop="teacherName">
    </el-table-column>
    <el-table-column
    label="所属类别"
    prop="category"/>
    <el-table-column
    label="学科名称"
    prop="courseName"/>
    <el-table-column
      label="课时安排"
      prop="courseTimes"/>
    <el-table-column
    label="科目限选"
    prop="number"/>
    <el-table-column
      label="各班限选"
      prop="studentsNum"/>
    <el-table-column
      label="上课周数"
      prop="weekNum"/>
    <el-table-column
      label="学分"
      prop="credit"/>
    <!-- <el-table-column
      label="已选人数"
      prop="selectedNumber"
      v-if="!isEdit"/> -->
    <el-table-column
      label="操作" width="500">
      <template slot-scope="props">
        <el-button type="primary" icon="el-icon-view" size="mini" @click="viewCourse(props.row.id, props.row.className)">查看课程信息</el-button>
        <el-button type="primary" icon="el-icon-view" size="mini" @click="viewSelect(props.row.id, props.row.className)">查看选课详情</el-button>
        <el-button v-if="isEditable" type="primary" icon="el-icon-edit" @click="editCourse(props.row.id)" size="mini">修改课程信息</el-button>
        <el-button v-if="isEditable" type="primary" icon="el-icon-delete" size="mini" @click="deleteCourse(props.row.id)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage4"
      :page-sizes="[100, 200, 300, 400]"
      :page-size="100"
      layout="total, sizes, prev, pager, next, jumper"
      :total="400">
    </el-pagination>
    </div>
</template>

<script>
export default {
  props: {
    isEditable: {
      default () {
        return true
      }
    },
    isEdit: {
      default () {
        return true
      }
    },
    viewLabel: '',
    editLabel: '',
    deletLabel: '',
    viewCallBack: {
      type: Function
    },
    editCallback: {
      type: Function
    },
    currentPage4: 1
  },
  data () {
    return {
      optionalCourseData: [
        {
          id: 1,
          classCode: 'xxx123',
          className: '国画鉴赏',
          teacherName: '黄方明',
          category: '学科',
          courseName: '艺术',
          courseTimes: '18',
          condition: '一五级，六年级',
          site: '美术楼',
          testMethod: '考核',
          number: 40,
          studentsNum: 2,
          weekNum: 4,
          currentPage4: 1,
          credit: 2
        }
      ]
    }
  },
  methods: {
    editCourse (courseId) {
      if (this.editCallback) {
        this.editCallback(courseId)
      }
    },
    deleteCourse (courseId) {
      console.log(courseId)
    },
    viewCourse (courseId, courseName) {
      if (this.viewCallBack) {
        this.viewCallBack(courseId, courseName)
        this.$emit('viewCourse', {courseId, courseName})
      }
    },
    viewSelect (courseId, courseName) {
      this.$router.push('/viewCourseStudents')
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
    }
  }
}
</script>
