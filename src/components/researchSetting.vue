<template>
  <!-- 教研活动 -->
  <div>
    <el-button type="text" @click="dialogVisible = true">教研活动设置</el-button>
    <el-dialog title="教研活动设置" :visible.sync="dialogVisible" class="research-setting">
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
