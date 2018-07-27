<template>
  <div>
    <el-form :model="baseSetting">
      <el-form-item label="每周上几天课">
        <el-input type="number" v-model="baseSetting.workdays"/>
      </el-form-item>
      <el-form-item label="每天上几节课">
        <el-input type="number" v-model="baseSetting.classNum" min="1" max="14"/>
      </el-form-item>
      <el-form-item class="series" label="最大连课数">
        <el-radio v-for="(item, index) in 6" :key="index" type="number"
        v-model="baseSetting.seriesNum" :label="index + 1"/>
      </el-form-item>
      <el-form-item class="not-series" label="不连课节次">
        <el-checkbox-group v-model="baseSetting.notSeries">
          <el-checkbox v-for="(item, index) in baseSetting.classNum" :label="index+1"
          :key="index">
            {{transformNotSeries(index+1)}}
          </el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item class="single" label="是否开启单双周">
        <el-radio  v-model="baseSetting.isSingle" label="false">否</el-radio>
        <el-radio v-model="baseSetting.isSingle" label="true">是</el-radio>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      baseSetting: {
        seriesNum: 4,
        workdays: 5,
        classNum: 8,
        isSingle: 'false',
        notSeries: [],
        saveState: this.$store.getters.switchSaveState
      }
    }
  },
  methods: {
    transformNotSeries (notSeriesId) {
      return `${notSeriesId}-${notSeriesId + 1}`
    },
    commitSettings () {
      const baseSetting = this.baseSetting
      this.$store.commit('setArrangeSettings', {type: 'baseSetting', setting: baseSetting})
    }
  },
  watch: {
    '$store.getters.getSaveState' () {
      this.commitSettings()
    }
  },
  beforeDestroy () {
    this.commitSettings()
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

.series .el-form-item__content,
.not-series .el-form-item__content {
  width: 70%;
  text-align: left;
}
.single {
  text-align: left;
}
</style>
