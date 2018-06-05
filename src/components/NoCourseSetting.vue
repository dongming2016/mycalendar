<template>
<!-- 不排课设置   -->
<div>
  <el-button type="text" @click="dialogVisible = true">全校不排课设置</el-button>
  <el-dialog title="全校不排课设置" :visible.sync="dialogVisible">
    <div class="note">
      <span>说明：</span>
      <el-switch
        v-model="notArrange"
        active-text="不排课"
        inactive-text="排课">
      </el-switch>
    </div>
    <NoCourseTable :options="getOptions"/>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" plain  @click="OK">确定</el-button>
      <el-button plain @click="dialogVisible = false">取消</el-button>
    </div>
  </el-dialog>
</div>
</template>

<script>
import NoCourseTable from './NoCourseTable'
import { NoScheduleService } from '../service/noSchedule.service'

export default {
  data () {
    return {
      dialogVisible: false,
      notArrange: true,
      arrange: true
    }
  },
  methods: {
    OK () {
      // @todo 保存设置信息
      this.dialogVisible = false
    }
  },
  computed: {
    getOptions () {
      return { labels: NoScheduleService.getLabels(), courses: NoScheduleService.getNoSchedule() }
    }
  },
  components: {
    NoCourseTable
  }
}
</script>

<style>
.note {
  text-align: right;
  margin-bottom: 16px;
  margin-right: 12px;
}
.dialog-footer {
  text-align: center;
}
</style>
