<template>
  <!-- 学生选修课设置 -->
  <div>
    <el-button type="text" @click="dialogVisible = true">学生选修课设置</el-button>
    <el-dialog title="学生选修课设置" :visible.sync="dialogVisible">
    </el-dialog>
  </div>
</template>
