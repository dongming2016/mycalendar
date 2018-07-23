<template>
<div>
  <div class="container">
    <span>上午</span>
    <el-radio-group v-model="classNum[0]">
      <el-radio label="0">0</el-radio>
      <el-radio label="1">1</el-radio>
      <el-radio label="2">2</el-radio>
      <el-radio label="3">3</el-radio>
      <el-radio label="4">4</el-radio>
      <el-radio label="5">5</el-radio>
    </el-radio-group>
  </div>
  <div class="container">
    <span>下午</span>
    <el-radio-group v-model="classNum[1]">
      <el-radio label="0">0</el-radio>
      <el-radio label="1">1</el-radio>
      <el-radio label="2">2</el-radio>
      <el-radio label="3">3</el-radio>
      <el-radio label="4">4</el-radio>
      <el-radio label="5">5</el-radio>
    </el-radio-group>
  </div>
  <div class="container">
    <span>晚上</span>
    <el-radio-group v-model="classNum[2]">
      <el-radio label="0">0</el-radio>
      <el-radio label="1">1</el-radio>
      <el-radio label="2">2</el-radio>
      <el-radio label="3">3</el-radio>
      <el-radio label="4">4</el-radio>
      <el-radio label="5">5</el-radio>
    </el-radio-group>
  </div>
  <div class="container">每天上{{parseInt(classNum[0]) + parseInt(classNum[1]) + parseInt(classNum[2])}}节课</div>
  <div style="text-align:center;">
    <el-button type="primary">确定</el-button>
  </div>
</div>
</template>

<script>
export default {
  data () {
    return {
      classNum: ['0', '0', '0']
    }
  }
}
</script>

<style scope>
.container {
  margin-bottom: 20px;
  text-align: center;
}
.container>span {
  margin-right: 15px;
}
</style>
