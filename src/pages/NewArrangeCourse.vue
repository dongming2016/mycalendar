<template>
  <div>
    <div class="choose-phase" style="margin-bottom:16px;" >
      <el-radio-group v-model="phase" >
        <el-radio-button label="1">小学</el-radio-button>
        <el-radio-button label="2">初中</el-radio-button>
        <el-radio-button label="3">高中</el-radio-button>
      </el-radio-group>
      <router-link to="/preview-classTable"><el-button type="primary" style="margin-left:20px;">
        课表预览与微调
      </el-button></router-link>
    </div>
    <el-tabs v-model="activeName">
      <el-tab-pane label="全校不排课设置" name="first">
        <SchoolNoCourseSetting/>
      </el-tab-pane>
      <el-tab-pane label="年级不排课设置" name="second">
        <GradeNoCourseSetting/>
      </el-tab-pane>
      <el-tab-pane label="老师不排课设置" name="third">
        <TeacherNoCourseSetting/>
      </el-tab-pane>
      <el-tab-pane label="公共课设置" name="fourth">
        <PublicCourseSetting/>
      </el-tab-pane>
      <el-tab-pane label="教研活动设置" name="fifth">
        <study-setting/>
      </el-tab-pane>
      <el-tab-pane label="合并课堂设置" name="sixth">
        <MergeClass/>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import SchoolNoCourseSetting from '../pageComponents/ArrangeCourse/SchoolNoCourseSetting'
import GradeNoCourseSetting from '../pageComponents/ArrangeCourse/GradeNoCourseSetting'
import TeacherNoCourseSetting from '../pageComponents/ArrangeCourse/TeacherNoCourseSetting'
import PublicCourseSetting from '../pageComponents/ArrangeCourse/PublicCourseSetting'
import StudySetting from '../pageComponents/ArrangeCourse/StudySetting'
import MergeClass from '../pageComponents/MergeClass'
export default {
  components: {
    SchoolNoCourseSetting,
    GradeNoCourseSetting,
    TeacherNoCourseSetting,
    MergeClass,
    PublicCourseSetting,
    StudySetting
  },
  data () {
    return {
      activeName: 'first',
      phase: '1'
    }
  }
}
</script>
