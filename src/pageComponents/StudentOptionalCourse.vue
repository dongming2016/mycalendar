<template>
<div>
  <div style="margin-left:2%;">张晓明</div>
    <div>2017-2018年第二学期 选课时间：2018-03-04 00:00:00  至  2018-04-05 00:00:00 </div>
    <div>
      <div style="text-align:left; margin-left: 2%;">所有课程</div>
    <div style="display: inline-block;
    text-align: left;
    width: 60%;">
    <div style="text-align:right;">
      <span>搜索：</span>
      <el-input v-model="searchKey" style="width:180px;display:inline-block;"/>
    </div>
     <el-table
     style="display: inline-block;margin: 8px 2%;"
    border
    :data="optionalCourseData">
     <el-table-column
      label="课程编号"
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
      label="剩余可选人数"
      prop="studentsNum"/>
    <el-table-column
      label="操作" width="350">
      <template slot-scope="props">
        <el-button type="primary" size="mini" @click="slectCourse(props.row.id, props.row.className)">选课</el-button>
        <el-button type="primary" size="mini"  @click="showCourseDetail(props.row.id)">
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
  <div style="display: inline-block;
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
  </div>
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
          studentsNum: 2
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
    slectCourse (cid) {
      console.log(cid)
    },
    showCourseDetail (cid) {
      this.activeName = 'second'
    },
    showCourseSelectDetail (cid) {
      this.activeName = 'third'
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
