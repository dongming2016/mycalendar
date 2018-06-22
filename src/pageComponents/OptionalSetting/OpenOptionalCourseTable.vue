<template>
<div>
  <div style="text-align:left;">
    <el-button type="primary" v-if="$route.params.type==='0'" @click="BACK">返回</el-button>
  </div>
  <div style="text-align:right;">2018-2019学年 第一学期</div>
  <div style="text-align:left;margin-bottom:20px;">选修课开课管理</div>
  <!-- <div style="text-align:left;margin-bottom:20px;">
    <router-link to="/course-base-info">
      <el-button type="primary">查看所有课程</el-button>
    </router-link>
  </div> -->
  <div>
    <el-dialog :visible.sync="dialogVisible" title="开课设置">
      <EditOptionalCourse :course="course"
      :isEditable="isEditable" :isClassroomEditable="isClassroomEditable"/>
      <div style="text-align:center;margin:20px 0;">
        <el-button type="primary" @click="dialogVisible=false">确定</el-button>
        <el-button type="primary" plain @click="dialogVisible=false">取消</el-button>
      </div>
    </el-dialog>
  </div>
  <div class="search-container">
      <el-form label-position="left" inline class="search-container-form">
        <el-form-item v-for="(item, index) in searchItems" :key="index" :label="item.label">
          <el-input v-if="item.type === 'input'" v-model="item.value"/>
          <el-select v-if="item.type === 'select'" v-model="item.value">
            <el-option v-for="(item1, index) in item.options"
            :key="index" :label="item1.name" :value="item1.id"/>
          </el-select>
        </el-form-item>
        <el-form-item style="display:block;">
          <el-button type="primary">查询</el-button>
          <el-button type="primary" plain>重置</el-button>
        </el-form-item>
      </el-form>
  </div>
  <!-- <el-radio-group v-model="tabPosition" style="margin-bottom: 30px;">
    <el-radio-button label="top">编辑课堂</el-radio-button>
    <el-radio-button label="right">查看所有课堂</el-radio-button>
  </el-radio-group> -->
  <el-button type="primary" @click="openCourseSetting()" size="mini"
  style="margin-bottom:16px;">增加课堂</el-button>
   <el-table
    border
    :data="optionalCourseData">
     <!-- <el-table-column type="expand">
      <template slot-scope="props">
        <el-form label-position="left" v-for="(classroom, index) in props.row.classrooms" :key="index" inline class="demo-table-expand">
          <div style="text-align:left;">
            <span>
              {{classroom.name}}
            </span>
            <div style="display:inline-block; float:right;">
              <el-button type="text" size="mini" @click="editClassroom(classroom, props.row)">编辑</el-button>
              <el-button type="text" size="mini" @click="deleteClassroom(classroom.id)">删除</el-button>
              <el-button type="text" size="mini" @click="viewClassroom(classroom, props.row)">详情</el-button>
              <router-link style="margin-left:10px;"  to="/viewCourseStudents"><el-button type="text" size="mini">选课详情</el-button></router-link>
            </div>
          </div>
           <el-form-item label="任课老师">
            <span>{{ classroom.teacherName }}</span>
          </el-form-item>
          <el-form-item label="课时安排">
            <span>{{ classroom.courseTimes }}</span>
          </el-form-item>
          <el-form-item label="上课周数">
            <span>{{ classroom.weekNum }}</span>
          </el-form-item>
          <el-form-item label="上课时间">
            <span>{{ classroom.timeStr }}</span>
          </el-form-item>
          <el-form-item label="设备及场地">
            <span>{{ classroom.site }}</span>
          </el-form-item>
          <el-form-item label="科目限选">
            <span>{{ classroom.courseLimit }}</span>
          </el-form-item>
          <el-form-item label="每班限选">
            <span>{{ classroom.classLimit }}</span>
          </el-form-item>
          <el-form-item label="学生选修条件">
            <span>{{classroom.selectConditionStr}}</span>
          </el-form-item>
        </el-form>
        <div class="pagination">
          <div v-for="(item, index) in 4" :key="index"
          class="pagination-item" :class="{'active': activeIndex===index}" @click="activeIndex=index"></div>
        </div>
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
    label="所属类别"
    sortable
    prop="category"/>
    <el-table-column
    label="学科名称"
    sortable
    prop="courseName"/>
    <el-table-column
    label="学科拓展类"
    sortable
    prop="courseDomainStr"/>
    <el-table-column
    label="任课老师"
    sortable
    prop="teacherName"/>
    <el-table-column
    label="上课周数"
    sortable
    prop="weekNum"/>
    <el-table-column
    label="上课时间"
    sortable
    prop="courseTimes"/>
    <el-table-column
    label="学生选修条件"
    sortable
    prop="selectConditionStr"/>
    <el-table-column
      label="操作" width="350">
      <template slot-scope="props">
        <!-- <el-button type="primary" @click="openCourseSetting(props.row)" size="mini">增加课堂</el-button> -->
        <el-button type="text" size="mini" @click="editClassroom(props.row)">编辑</el-button>
        <el-button type="text" size="mini" @click="deleteClassroom(props.row.id)">删除</el-button>
        <el-button type="text" size="mini" @click="viewClassroom(props.row)">详情</el-button>
        <router-link style="margin-left:10px;"  to="/viewCourseStudents"><el-button type="text" size="mini">选课详情</el-button></router-link>
      </template>
    </el-table-column>
  </el-table>
  <el-pagination
  style="margin-top:20px;"
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
import EditOptionalCourse from './EditOptionalCourse'
export default {
  props: {
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
      selectShow: false,
      selectAllGrade: false,
      dialogVisible: false,
      activeIndex: 0,
      isEditable: false,
      isClassroomEditable: true,
      grades: [{
        value: 1,
        label: '一年级'
      },
      {
        value: 2,
        label: '二年级'
      },
      {
        value: 3,
        label: '三年级'
      },
      {
        value: 4,
        label: '四年级'
      },
      {
        value: 5,
        label: '五年级'
      },
      {
        value: 6,
        label: '六年级'
      },
      {
        value: 7,
        label: '七年级'
      },
      {
        value: 8,
        label: '八年级'
      }
      ],
      searchItems: [
        {
          type: 'input',
          label: '课程编号',
          value: ''
        },
        {
          type: 'input',
          label: '课程名称',
          value: ''
        },
        {
          type: 'select',
          label: '所属类别',
          value: '',
          options: [{
            id: 1,
            name: '活动'
          },
          {
            id: 2,
            name: '学科'
          }]
        },
        {
          type: 'select',
          label: '学科所属领域',
          value: '',
          options: [{
            id: 1,
            name: '学科拓展类'
          },
          {
            id: 2,
            name: '实用技能类'
          },
          {
            id: 3,
            name: '科学技术类'
          }
          ]
        },
        {
          type: 'select',
          label: '任课老师',
          value: '',
          options: [{
            id: 1,
            name: '张明'
          },
          {
            id: 2,
            name: '小王'
          },
          {
            id: 3,
            name: '黄芳'
          }
          ]
        }
      ],
      teachers: [{id: 1, name: '李萌'}, {id: 2, name: '王芳'}, {id: 3, name: '韩梅梅'}],
      optionalCourseData: [
        {
          id: 1,
          classCode: 'xxx123',
          className: '国画鉴赏',
          teacherName: '黄方明',
          category: '学科',
          courseName: '艺术',
          courseDomainStr: '学科拓展类',
          courseTimes: '18',
          selectCondition: '一五级，六年级',
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
          weeks: 18,
          selectConditionStr: '一年级,二年级',
          classrooms: [{
            name: '国画鉴赏-张三',
            teacherName: '张三',
            courseTimes: 18,
            site: '教A',
            courseLimit: 40,
            classLimit: 10,
            selectCondition: [{name: '一年级', id: 1}, {name: '二年级', id: 2}],
            weekNum: 18,
            selectConditionStr: '一年级,二年级',
            timeStr: '星期一第二节'
          },
          {
            name: '国画鉴赏-李四',
            teacherName: '李四',
            courseTimes: 18,
            site: '教A',
            courseLimit: 40,
            classLimit: 10,
            selectCondition: [{name: '一年级', id: 1}, {name: '二年级', id: 2}],
            weekNum: 18,
            selectConditionStr: '一年级,二年级',
            timeStr: '星期一第二节'
          }]

        }
      ]
    }
  },
  components: {
    EditOptionalCourse
  },
  methods: {
    editCourse (courseId) {
      if (this.editCallback) {
        this.editCallback(courseId)
      }
    },
    BACK () {
      history.back()
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
    },
    openCourseSetting () {
      this.dialogVisible = true
      this.isEditable = true
    },
    editClassroom (course) {
      this.course = course
      this.dialogVisible = true
      this.isClassroomEditable = true
    },
    viewClassroom (course) {
      this.course = course
      this.dialogVisible = true
      this.isClassroomEditable = false
    },
    deleteClassroom (cid) {
      this.$alert('确定删除当前课堂', '删除课堂', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        callback: action => {
          this.$message({
            type: 'success',
            message: `删除当前课堂成功!`
          })
        }
      })
    }
  }
}
</script>
<style>
  .demo-table-expand {
    width: 80%;
    margin: 30px auto;
    border: 1px solid #eee;
    border-radius: 8px;
    padding: 20px;
  }
  .demo-table-expand label,
  .search-container-form label {
    width: 100px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 40%;
  }
  .search-container-form .el-form-item {
    margin-right: 0;
    margin-bottom: 18px;
    width: 25%;
  }
  .search-container-form .el-form-item:last-child {
    width: 100%;
    text-align: center;
  }
  .pagination {
    position: absolute;
    right: 40px;
    top: 50%;
  }
  .pagination-item {
    width:16px;
    height:16px;
    border-radius:50%;
    border:1px solid #eee;
    margin-bottom: 10px;
    background: #eef;
  }
  .active {
    background: #08FB24;
  }
</style>
