<template>
<div>
    <div>
      <div style="text-align:left; margin-left: 2%;">所有课程</div>
    <div style="display: inline-block;
    text-align: left;
    width: 90%;
    min-height: 650px;">
    <div style="text-align:center; margin:20px 0;">
      <div style="display:inline-block;margin-right:18px;">
        <span style="margin-right:10px;">课程编号</span>
        <el-input v-model="courseCode" placeholder="请输入课程编号" style="width:180px;display:inline-block;"/>
      </div>
      <div style="display:inline-block;margin-right:18px;">
        <span style="margin-right:10px;">课程名称</span>
        <el-input v-model="courseName" placeholder="请输入课程名称" style="width:180px;display:inline-block;"/>
      </div>
      <div style="display:inline-block;margin-right:18px;">
        <span style="margin-right:10px;">课程类别</span>
        <el-input v-model="category" placeholder="请输入课程类别" style="width:180px;display:inline-block;"/>
      </div>
      <div style="display:inline-block;margin-right:18px;">
        <span style="margin-right:10px;">任课教师</span>
        <el-input v-model="teacherName" placeholder="请输入任课教师" style="width:180px;display:inline-block;"/>
      </div>
      <div style="margin-top:18px;text-align:center">
        <el-button type="primary">查询</el-button>
        <el-button type="primary" plain>取消</el-button>
      </div>
    </div>
     <el-table
     style="display: inline-block;margin: 8px 2%;height:400px;"
    border
    :data="optionalCourseData">
     <el-table-column
      label="课程编号"
      sortable
      prop="classCode">
    </el-table-column>
    <el-table-column
      label="课程名称"
      sortable
      prop="className">
    </el-table-column>
     <el-table-column
      label="课程类别"
      sortable
      prop="category"/>
    <el-table-column
      label="任课教师"
      sortable
      prop="teacherName">
    </el-table-column>
    <el-table-column
      label="学分"
      prop="credit"/>
    <el-table-column
      label="适用年级"
      prop="condition"/>
    <el-table-column
      label="科目限选"
      prop="courseLimit"/>
    <el-table-column
      label="班级限选"
      prop="classLimit"/>
    <el-table-column
      label="剩余可选人数"
      prop="studentsNum"/>
    <el-table-column
      label="操作" width="350">
      <template slot-scope="props">
        <el-button type="primary" size="mini" @click="slectCourse(props.row.id, props.row.className)">选课</el-button>
        <el-button type="primary" size="mini"  @click="showCourseDetail(props.row)">
          查看课程信息
        </el-button>
        <el-button type="primary" size="mini"  @click="showCourseSelectDetail(props.row.id)">
          查看课程选课信息
        </el-button>
      </template>
    </el-table-column>
  </el-table>
    <el-pagination
    style="display:inline-block;"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    :current-page="currentPage"
    :page-sizes="[10, 20, 50]"
    :page-size="10"
    layout="total, sizes, prev, pager, next, jumper"
    :total="40">
  </el-pagination>
  </div>
  <el-dialog title="课程详情" :visible.sync="courseVisible">
    <EditOptionalCourse :course="course" :isEditable="isEditable"
    :isClassroomEditable="isClassroomEditable"/>
    <div style="text-align:center;margin-top:20px;">
      <el-button type="primary" @click="courseVisible=false">确定</el-button>
      <el-button type="primary" plain @click="courseVisible=false">取消</el-button>
    </div>
  </el-dialog>
  <el-dialog title="选课详情" :visible.sync="courseSelectVisible">
    <CourseStudentsInfo :isStudent="isStudent" :selectedDetail="selectedDetail"/>
    <div style="text-align:center;">
      <el-button type="primary" @click="courseSelectVisible=false">确定</el-button>
      <el-button type="primary" plain @click="courseSelectVisible=false">取消</el-button>
    </div>
  </el-dialog>
  <!-- <div style="display: inline-block;
    width: 30%;margin: 8px 2%;float:right;">
    <el-tabs v-model="activeName"
    type="border-card">
   <el-tab-pane
        label="已选课程"
        name="first"
      >
      <div v-for="item in selectedCourse" :key="item.id" class="text item">
        {{item.className }}
        <el-button type="text" style="float:right;">退选</el-button>
      </div>
   </el-tab-pane>
    <el-tab-pane
        label="课程基本信息"
        name="second"
      >
      <EditOptionalCourse/>
   </el-tab-pane>
    <el-tab-pane
    label="课程选课情况"
    name="third">
      <CourseStudentsInfo :isStudent="isStudent"/>
   </el-tab-pane>
    </el-tabs>
  </div> -->
    </div>
  </div>
</template>
<script>
import EditOptionalCourse from './OptionalSetting/EditOptionalCourse'
import CourseStudentsInfo from './OptionalSetting/CourseStudentsInfo'
export default {
  data () {
    return {
      searchKey: '',
      currentTime: new Date().getMilliseconds(),
      startTime: new Date('2018-03-04').getMilliseconds(),
      endTime: new Date('2018-07-05').getMilliseconds(),
      activeName: 'first',
      isStudent: false,
      isEditable: false,
      isClassroomEditable: false,
      courseCode: '',
      courseName: '',
      category: '',
      teacherName: '',
      course: {},
      selectedDetail: {},
      courseSelectVisible: false,
      courseVisible: false,
      optionalCourseData: [
        {
          id: 1,
          classCode: 'xxx123',
          className: '国画鉴赏',
          teacherName: '黄方明',
          category: '学科',
          courseName: '艺术',
          courseTimes: '18',
          credit: 8,
          condition: '一五级，六年级',
          site: '美术楼',
          testMethod: '考核',
          courseLimit: 40,
          classLimit: 2,
          studentsNum: 2,
          checkedIds: [1, 2],
          time: [{dayid: 1, timeId: 1, name: '星期一第一节课'}],
          courseDomain: [{id: 1, name: '学科拓展类'}],
          totalHours: 18,
          weeks: 18
        },
        {
          id: 1,
          classCode: 'xxx123',
          className: '国画鉴赏',
          teacherName: '黄方明',
          category: '学科',
          courseName: '艺术',
          courseTimes: '18',
          credit: 8,
          condition: '一五级，六年级',
          site: '美术楼',
          testMethod: '考核',
          courseLimit: 40,
          classLimit: 2,
          studentsNum: 2,
          checkedIds: [1, 2],
          time: [{dayid: 1, timeId: 1, name: '星期一第一节课'}],
          courseDomain: [{id: 1, name: '学科拓展类'}],
          totalHours: 18,
          weeks: 18
        }
      ],
      selectedCourse: [
        {className: '美术'}
      ],
      currentPage: 2
    }
  },
  components: {
    EditOptionalCourse,
    CourseStudentsInfo
  },
  methods: {
    slectCourse (cid, cname) {
      this.$message(`恭喜你选课${cname}成功`)
    },
    showCourseDetail (course) {
      this.courseVisible = true
      this.course = course
    },
    showCourseSelectDetail (cid) {
      this.courseSelectVisible = true
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
<style>
.text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 100%;
  }
</style>
