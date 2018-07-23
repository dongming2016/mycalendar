<template>
<div>
   <el-table
    border
    :data="optionalCourseData">
    <el-table-column
      label="课程编号"
      sortable
      prop="classCode"/>
    <el-table-column
      label="课程名称"
      sortable
      prop="className">
    </el-table-column>
    <!-- <el-table-column
      label="任课教师"
      sortable
      prop="teacherName">
    </el-table-column> -->
    <el-table-column
    label="所属类别"
    sortable
    prop="category"/>
    <el-table-column
    label="学科名称"
    sortable
    prop="courseName"/>
    <el-table-column
    label="课程所属领域"
    sortable>
    <template slot-scope="scope">
      {{scope.row.courseDomain.name}}
    </template>
    </el-table-column>
    <el-table-column
    label="考核要求"
    prop="testMethod"
    sortable>
    </el-table-column>
    <!-- <el-table-column
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
      prop="weekNum"/> -->
    <el-table-column
      label="学分"
      sortable
      prop="credit"/>
    <!-- <el-table-column
      label="已选人数"
      prop="selectedNumber"
      v-if="!isEdit"/> -->
    <el-table-column v-if="!onlyRead"
      label="操作" width="250">
      <template slot-scope="props">
        <!-- <el-button type="primary" icon="el-icon-view" size="mini" @click="viewCourse(props.row.id, props.row.className)">查看课程信息</el-button> -->
        <!-- <el-button type="primary" icon="el-icon-view" size="mini" @click="viewSelect(props.row.id, props.row.className)">查看选课详情</el-button> -->
        <el-button v-if="isEditable" style="margin-right:10px;" type="primary" icon="el-icon-edit" @click="editCourse(props.row)" size="mini">编辑</el-button>
        <el-button v-if="isEditable" type="primary" icon="el-icon-delete" size="mini" @click="deleteCourse(props.row.id)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>

  <el-pagination style="text-align:center;margin-top:20px;"
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
    onlyRead: Boolean,
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
      course: {},
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
          credit: 2,
          checkedGradeIds: [1, 2],
          time: [{dayid: 1, timeId: 1, name: '星期一第一节课'}, {dayid: 2, timeId: 2, name: '星期二第二节课'}],
          courseDomain: {id: 1, name: '学科拓展类'},
          totalHours: 18,
          weeks: 18
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
    viewCourse (course) {
      if (this.viewCallBack) {
        this.viewCallBack(course)
        this.$emit('viewCourse', course)
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
