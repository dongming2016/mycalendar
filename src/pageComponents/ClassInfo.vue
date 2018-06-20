<template>
  <div>
    <div style="margin-bottom:28px;">
      {{className}}
    </div>
    <el-tabs v-model="activeName" type="border-card">
      <el-tab-pane label="基本信息" name="first">
        <class-base-info :classId="classId"/>
      </el-tab-pane>
      <el-tab-pane label="班级老师" name="second">
        <class-teacher-info :classId="classId" :isVew="isVew"/>
      </el-tab-pane>
      <el-tab-pane label="班级学生" name="third">
        <class-students-info :classId="classId"/>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import ClassBaseInfo from './ClassBaseInfo'
import ClassStudentsInfo from './ClassStudentsInfo'
import ClassTeacherInfo from './ClassTeacherInfo'
export default {
  props: {
    classId: '',
    isVew: '',
    className: ''
  },
  data () {
    return {
      activeName: 'first'
    }
  },
  components: {
    ClassBaseInfo,
    ClassStudentsInfo,
    ClassTeacherInfo
  }
}
</script>
