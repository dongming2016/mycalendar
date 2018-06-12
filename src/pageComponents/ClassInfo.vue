<template>
  <div>
    <el-tabs v-model="activeName" type="border-card">
      <el-tab-pane label="基本信息" name="first">
        <class-base-info :classId="classId"/>
      </el-tab-pane>
      <el-tab-pane label="班级学生" name="second">
        <class-students-info :classId="classId"/>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import ClassBaseInfo from './ClassBaseInfo'
import ClassStudentsInfo from './ClassStudentsInfo'
export default {
  props: {
    classId: ''
  },
  data () {
    return {
      activeName: 'first'
    }
  },
  components: {
    ClassBaseInfo,
    ClassStudentsInfo
  }
}
</script>
