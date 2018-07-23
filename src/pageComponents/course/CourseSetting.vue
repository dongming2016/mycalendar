<template>
  <div>
    <el-tabs type="border-card">
      <el-tab-pane label="国标课程">
        <StandardCourse/>
      </el-tab-pane>
      <el-tab-pane label="校本课程">
        <SchoolCourse/>
      </el-tab-pane>
      <el-tab-pane label="选修课程">
        <OptionalCourse/>
      </el-tab-pane>
      <!-- <el-tab-pane label="公共课程">定时任务补偿</el-tab-pane> -->
    </el-tabs>
  </div>
</template>

<script>
import OptionalCourse from './OptionalCourse'
import SchoolCourse from './SchoolCourse'
import StandardCourse from './StandardCourse'
export default {
  components: {
    OptionalCourse,
    StandardCourse,
    SchoolCourse

  }
}
</script>
