<template>
  <div style="text-align:center;margin-top:16px;">
    <el-button type="primary" plain @click="OKCallback">确定</el-button>
    <el-button plain @click="CancelCallback">取消</el-button>
  </div>
</template>

<script>
export default {
  props: {
    OKCallback: Function,
    CancelCallback: Function
  }
}
</script>
