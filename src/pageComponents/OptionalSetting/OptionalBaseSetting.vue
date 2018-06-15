<template>
  <div>
    <div>选课基本设置</div>
    <div style="text-align:center;">
    <div class="setting-item">
      <div>选课开始日期：</div>
      <el-date-picker
          v-model="baseSetting.startTime"
          type="datetime"
          placeholder="选择日期时间">
      </el-date-picker>
    </div>
    <div class="setting-item">
      <div>选课结束日期：</div>
        <el-date-picker
          v-model="baseSetting.endTime"
          type="datetime"
          placeholder="选择日期时间">
      </el-date-picker>
    </div>
    </div>
    <div style="text-align:center;">
    <div class="setting-item">
      <div>课程课时(周)：</div>
      <el-input-number v-model="baseSetting.courseTime"/>
    </div>
    <div class="setting-item">
      <div>每人限选课程数量：</div>
        <el-input-number v-model="baseSetting.chooseNum"/>
    </div>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" plain @click="OK">确定</el-button>
      <el-button plain @click="Cancel">取消</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      baseSetting: {
        startTime: '',
        endTime: '',
        courseTime: '',
        chooseNum: ''
      }
    }
  },
  methods: {
    OK () {
      // this.$emit('invisible')
    },
    Cancel () {

    }
  }
}
</script>
<style scoped>
.setting-item {
  margin-left: 12px;
}
</style>
