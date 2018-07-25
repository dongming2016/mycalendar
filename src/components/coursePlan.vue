<template>
  <div>
    <div>
      <div>
        <div class="course-plan-title">设置国标课程</div>
        <div>
          <el-checkbox-group v-model="checkedStandardCourses">
            <el-checkbox v-for="(item, index) in standardCourses" :key="index" :label="item.courseName"></el-checkbox>
          </el-checkbox-group>
        </div>
      </div>
      <div>
        <div class="course-plan-title">设置校本课程</div>
        <div>
          <el-checkbox-group v-model="checkedSchoolCourses">
            <el-checkbox v-for="(item, index) in schoolCourses" :key="index" :label="item.courseName"></el-checkbox>
          </el-checkbox-group>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      standardCourses: [],
      checkedStandardCourses: [],
      schoolCourses: [],
      checkedSchoolCourses: []
    }
  }
}
</script>
<style>
.course-plan-title {
  color: #44A0FF;
}
</style>
