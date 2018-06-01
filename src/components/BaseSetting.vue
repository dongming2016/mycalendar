<template>
  <div>
    <el-button type="text" @click="dialogVisible = true">基本设置</el-button>
    <el-dialog title="基本设置" :visible.sync="dialogVisible">
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
