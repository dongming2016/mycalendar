<template>
  <div>
    <span>选择年级</span>
    <el-select v-model="selectGrade" placeholder="请选择">
      <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
    </el-select>
    <students-optional :grade="selectGrade"/>
  </div>
</template>

<script>
import StudentsOptional from './StudentsOptional'
export default {
  data () {
    return {
      selectGrade: '一年级',
      options: [{value: '1', label: '一年级'}, {value: '2', label: '二年级'}, {value: '3', label: '三年级'}]
    }
  },
  components: {
    StudentsOptional
  }
}
</script>
