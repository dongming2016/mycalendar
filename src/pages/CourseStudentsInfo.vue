<template>
  <div style="text-align:left;">
    <!-- <router-link style="margin-left:60px;" to="/openCourse"> -->
      <el-button type="primary" class="el-icon-back" style="margin-bottom:16px;" @click="BACK">返回</el-button>
    <!-- </router-link> -->
    <div>
      <div style="margin-left:90px;">国画鉴赏-张三</div>
      <div style="text-align: center;margin-top:10px;">
        <div class="search-condition">
          <span>学生名称</span>
          <el-input placeholder="请输入学生名称" style="width:60%;margin-left:8px;"/>
        </div>
        <div class="search-condition">
          <span>年级</span>
          <el-input placeholder="请输入年级" style="width:60%;margin-left:8px;"/>
        </div>
        <div class="search-condition">
          <span>班级</span>
          <el-input placeholder="请输入班级" style="width:60%;margin-left:8px;"/>
        </div>
        <div style="margin-left: 20px;display:inline-block;"><el-button type="primary">查询</el-button></div>
      </div>
    </div>
    <el-table
    style="margin:auto;width:90%;"
    border
    :data="selectedStudents">
      <el-table-column
      prop="name"
      sortable
      label="姓名">
      <template slot-scope="scope">
        <router-link to="/myCourse/0">{{scope.row.name}}</router-link>
      </template>
      </el-table-column>
      <el-table-column
      prop="gender"
      label="性别"/>
      <el-table-column
      prop="grade"
      sortable
      label="年级"/>
      <el-table-column
      prop="class"
      sortable
      label="班级"/>
      <el-table-column
        label="操作">
        <template slot-scope="props">
          <el-button type="primary" icon="el-icon-delete" @click="deleteStudent(props.row.id)">移出课堂</el-button>
          <!-- <router-link to="/myCourse/0" style="margin-left:18px;"><el-button type="primary" icon="el-icon-detail" @click="deleteStudent(props.row.id)">详情</el-button></router-link> -->
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
  data () {
    return {
      selectedStudents: [ { name: '小明', gender: '男', grade: '一年级', class: '一班', slectedNumber: 1 } ],
      currentPage4: 1
    }
  },
  methods: {
    deleteStudent (studentId) {
      console.log(studentId)
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
    },
    BACK () {
      history.back()
    }
  }
}
</script>
