<template>
  <div>
    <div style="text-align:right;">黄明</div>
    <div>
      <el-select v-model="selectedTerm">
        <el-option v-for="(item, index) in terms"
        :key="index"
        :label="item.name"
        :value="item.id"></el-option>
      </el-select>
      <el-button style="margin-left:20px;" type="primary">过滤</el-button>
    </div>
    <div>
      <el-table style="margin-top:18px;" :data="myCourse" border>
        <el-table-column prop="term" label="学年学期"/>
        <el-table-column prop="classCode" label="课程编号"/>
        <el-table-column prop="className" label="课程名称"/>
        <el-table-column prop="category" label="所属类别"/>
        <el-table-column prop="courseName" label="学科名称"/>
        <el-table-column prop="credit" label="学分"/>
        <el-table-column prop="totalHours" label="课时安排"/>
        <el-table-column prop="weekNum" label="上课周数"/>
        <el-table-column prop="site" label="设备及场地"/>
        <el-table-column prop="courseTimeStr" label="上课时间"/>
        <el-table-column label="操作" width="300">
          <template slot-scope="scope">
            <router-link to="/viewCourseStudents" style="margin-right:18px;">
              <el-button type="primary">选课详情</el-button>
            </router-link>
            <el-button type="primary" @click="edit(scope.row)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div>
      <el-dialog :visible.sync="dialogVisible" title="开课设置">
        <EditOptionalCourse :course="course"
        :isEditable="isEditable" :isTeacher="isTeacher"/>
        <div style="text-align:center;margin:20px 0;">
          <el-button type="primary" @click="dialogVisible=false">确定</el-button>
          <el-button type="primary" plain @click="dialogVisible=false">取消</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import EditOptionalCourse from './OptionalSetting/EditOptionalCourse'
export default {
  data () {
    return {
      dialogVisible: false,
      isTeacher: true,
      selectedTerm: '2018-2019学年第一学期',
      terms: [{
        name: '2018-2019学年第一学期',
        id: 1
      },
      {
        name: '2017-2018学年第二学期',
        id: 2
      },
      {
        name: '2017-2018学年第一学期',
        id: 3
      }],
      course: {},
      isEditable: false,
      myCourse: [
        {
          id: 1,
          term: '2018-2019学年第一学期',
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
          courseTimeStr: '星期一第二节',
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
  methods: {
    edit (course) {
      this.dialogVisible = true
      this.course = course
    }
  },
  components: {
    EditOptionalCourse
  }
}
</script>
