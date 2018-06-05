<template>
  <!-- 班级设置 -->
  <div>
    <el-button type="text" @click="dialogVisible = true">班级计划设置</el-button>
    <el-dialog title="班级计划设置" :visible.sync="dialogVisible" class="class-setting">
    </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      dialogVisible: false
    }
  }
}
</script>
