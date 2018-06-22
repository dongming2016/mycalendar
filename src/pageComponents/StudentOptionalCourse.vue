<template>
  <div>
    <strong style="text-align:left;">选课管理</strong>
    <div style="margin-left:2%;">张晓明</div>
    <div>2017-2018年第二学期 选课时间：2018-03-04 00:00:00  至  2018-04-05 00:00:00 </div>
    <el-tabs type="border-card" v-model="activeName" style="width:90%;margin:auto;">
      <!-- 待选课程在超过选课时间后，不在显示待选课程 -->
      <el-tab-pane label="待选课程" name="first">
        <StudentUnselectedCourse/>
      </el-tab-pane>
      <el-tab-pane label="已选课程" name="second">
        <StudentSelectedCourse/>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import StudentSelectedCourse from './StudentSelectedCourse'
import StudentUnselectedCourse from './StudentUnselectedCourse'
export default {
  data () {
    return {
      activeName: 'first'
    }
  },
  components: {
    StudentSelectedCourse,
    StudentUnselectedCourse
  }
}
</script>
