<template>
  <div>
    <el-button type="text" @click="dialogVisible = true">基本设置</el-button>
    <el-dialog title="基本设置" :visible.sync="dialogVisible">
      <!-- <div class="base-setting">
        <span>每周</span>
        <el-select v-model="base.workdays" placeholder="请选择">
          <el-option
            v-for="item in 7"
            :key="item"
            :label="item"
            :value="item">
          </el-option>
        </el-select>
      </div> -->
      <div class="base-setting">
        <span>每天上</span>
        <el-select v-model="base.classNum" placeholder="请选择">
          <el-option
            v-for="item in 11"
            :key="item"
            :label="item"
            :value="item">
          </el-option>
        </el-select><span>节课</span>
      </div>
      <div class="base-setting">
        <span>允许最大连课节次：</span>
        <el-radio v-model="base.series" label="1">1</el-radio>
        <el-radio v-model="base.series" label="2">2</el-radio>
        <el-radio v-model="base.series" label="3">3</el-radio>
        <el-radio v-model="base.series" label="4">4</el-radio>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="OK">确 定</el-button>
        <el-button @click="dialogVisible = false">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      dialogVisible: false,
      base: {
        series: '2',
        workdays: 5,
        classNum: 8
      }
    }
  },
  methods: {
    OK () {
      this.dialogVisible = false
    }
  }
}
</script>

<style>
.el-dialog__footer {
  text-align:center;
}
.base-setting .el-select .el-input--suffix .el-input__inner {
    width: 56px;
    height: 22px;
    padding-left: 12px;
}
</style>
