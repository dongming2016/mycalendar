<template>
  <div>
    <el-table :data="classCourseInfo" border>
      <el-table-column prop="openTime" label="开课时间"/>
      <el-table-column prop="className" label="班级"/>
      <el-table-column prop="name" sortable label="学生姓名"/>
      <el-table-column prop="courseName" sortable label="课程名称">
        <template slot-scope="scope">
          <router-link to="/course-base-info/0">
            {{scope.row.courseName}}
          </router-link>
        </template>
      </el-table-column>
      <el-table-column prop="teacherName" sortable label="老师名称">
        <template slot-scope="scope">
          <router-link to="/teacher-my-course">
            {{scope.row.teacherName}}
          </router-link>
        </template>
      </el-table-column>
      <el-table-column prop="category" label="所属类别"/>
      <el-table-column prop="time" label="上课时间"/>
    </el-table>
    <el-pagination style="margin:20px 0; text-align:center;"
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
  data () {
    return {
      currentPage4: 1,
      classCourseInfo: [
        {
          openTime: '2017-2018学年第二学期',
          className: '一年级（1）班',
          name: '小明',
          courseName: '国画鉴赏',
          teacherName: '张三',
          time: '星期一第一节',
          category: '学科'
        },
        {
          openTime: '2017-2018学年第二学期',
          className: '一年级（1）班',
          name: '小美',
          courseName: '国画鉴赏',
          teacherName: '张三',
          time: '星期一第一节',
          category: '学科'
        },
        {
          openTime: '2017-2018学年第二学期',
          className: '一年级（1）班',
          name: '小芳',
          courseName: '手工制作',
          teacherName: '王五',
          time: '星期一第一节',
          category: '学科'
        }
      ]
    }
  }
}
</script>
