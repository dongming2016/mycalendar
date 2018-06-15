<template>
  <div>
    <div>当前班级：<span>一年级（2）班</span></div>
    <el-button type="primary">导入学生</el-button>
    <el-button type="primary">添加学生</el-button>
    <el-table :data="students">
      <el-table-column />
    </el-table>
  </div>
</template>

<script>
export default {
  data () {
    return {
      students: []
    }
  }
}
</script>
