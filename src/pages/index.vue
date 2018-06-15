<template>
  <div :class="{'outer-container': isSettingShow}">
    <div :class="{'term-card-mini': isSettingShow, 'term-card-container': !isSettingShow}">
      <div v-for="(option, index) in options" :key="index">
        <term-card :option="option" class="term-card" v-on:setOption="setOption"/>
      </div>
    </div>
    <!-- 动态组件 -->
    <component
      v-bind:is="currentTabComponent"
      v-show="isSettingShow"
      class="component-container"
    ></component>
  </div>
</template>

<script>
import TermCard from '../pageComponents/TermCard'
import { CourseService } from '../service/course.service'
import OptionalCourse from '../pageComponents/OptionalSetting/OptionalCourse'
import GradeCourseSetting from '../pageComponents/GradeCourseSetting'
import OptionalBaseSetting from '../pageComponents/OptionalSetting/OptionalBaseSetting'
import ClassSchedule from '../pageComponents/schedule/ClassSchedule'
import StandardSchool from '../pageComponents/classSetting/StandardSchool'
import TeachPlan from '../pageComponents/schedule/TeachingPlan'
export default {
  data () {
    return {
      options: [],
      componentName: 'optional-course',
      isSettingShow: false
    }
  },
  computed: {
    currentTabComponent () {
      return this.componentName
    }
  },
  methods: {
    setOption ({ termId, componentName }) {
      this.isSettingShow = true
      this.componentName = componentName
    }
  },
  components: {
    TermCard,
    OptionalCourse,
    GradeCourseSetting,
    OptionalBaseSetting,
    ClassSchedule,
    StandardSchool,
    TeachPlan
  },
  mounted () {
    this.options = CourseService.getSchoolYear()
  }
}
</script>

<style scoped>
.term-card-mini {
  display: inline-block;
  width: 20%;
  margin-left: 2%;
}
.term-card-container {
  width: 800px;
  margin: auto;
}
.outer-container {
  text-align: left;
  display: flex;
}
.component-container {
  margin-left: 5%;
  width: 70%;
  display: inline-block;
}

</style>
