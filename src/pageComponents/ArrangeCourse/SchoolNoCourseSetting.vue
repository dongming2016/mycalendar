<template>
  <div>
    <div style="display:inline-block;">
      <span class="arrange-label">
        选择不排课时间
      </span>
      <el-input style="width:300px;margin-top:20px;" @focus="isNotArrangeVisible=true"
      v-model="noCourseTime" placeholder="请选择不排课时间,可多选">
        <i slot="prefix" @click="isNotArrangeVisible=true" class="el-input__icon el-icon-date"></i>
      </el-input>
    </div>
    <footer style="text-align: center;
              margin-top: 20px;">
      <el-button type="primary">确定</el-button>
      <el-button type="primary" plain>取消</el-button>
    </footer>
    <div v-show="isNotArrangeVisible" class="tooltips">
      <ClockTime/>
      <footer style="text-align: right;
              margin-top: 20px;">
        <el-button type="text" @click="isNotArrangeVisible=false">确定</el-button>
        <el-button type="text" style="color:#ddd;" @click="isNotArrangeVisible=false">取消</el-button>
      </footer>
    </div>
  </div>
</template>

<script>
import ClockTime from '../../components/clockTime'

export default {
  components: {
    ClockTime
  },
  data () {
    return {
      isNotArrangeVisible: false,
      noCourseTime: '',
      isClassOut: true,
      classes: [{id: '1', name: '一年级（1）班'}, {id: '2', name: '二年级（1）班'}]
    }
  }
}
</script>
