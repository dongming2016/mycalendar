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
    <NoCourseTable :options="getOptions" style="display:inline-block;"/>
    <div style="display:inline-block;  margin-left: 30px;
    width: 250px;  vertical-align: top;" v-show="isClassOut">
      <ClassOTT :classes="classes"/>
    </div>
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
import ClassOTT from './ClassOTT'

export default {
  data () {
    return {
      dialogVisible: false,
      notArrange: true,
      arrange: true,
      isClassOut: true,
      classes: [{id: '1', name: '一年级（1）班'}, {id: '2', name: '二年级（1）班'}]
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
    NoCourseTable,
    ClassOTT
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
