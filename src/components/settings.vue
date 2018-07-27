<template>
  <div>
    <div>
      <el-steps simple class="setting-step" style="margin-bottom: 20px;margin-top:-20px;">
        <el-step :status="getState[0]" title="学段设置" ></el-step>
        <el-step :status="getState[1]" title="年级设置" ></el-step>
        <el-step :status="getState[2]" title="班级设置" ></el-step>
      </el-steps>
      <div class="tab-container">
        <div class="tab-item" v-for="(item, index) in buttonGroup[type].buttons" :key="index"
        @click="clickTab(index, item)"
        :class="{'active-tab': buttonGroup[type].activeIndex===index}">
          {{item.name}}
        </div>
      </div>
      <div class="location">
        您正在设置{{name}}——{{buttonGroup[type].activeName}}
      </div>
      <component class="setting-container" :phaseType="phaseType" :is="buttonGroup[type].currentTabComponent"></component>
    </div>
  </div>
</template>

<script>
import baseSetting from './BaseSetting'
import noCourseSetting from './NoCourseSetting'
import courseNoCourseSetting from './CourseNoCourseSetting'
import teacherNoCourseSetting from './TeacherNoCourseSetting'
import researchSetting from './researchSetting'
import publicActivitySetting from './publicActivitySetting'
import mergeClass from './MergeClass'
import coursePlan from './coursePlan'
import gradePlan from './gradePlan'
import GradeNoSchedule from './GradeNoSchedule'
import classPlan from './classPlan'
export default {
  components: {
    baseSetting,
    noCourseSetting,
    courseNoCourseSetting,
    teacherNoCourseSetting,
    researchSetting,
    publicActivitySetting,
    mergeClass,
    coursePlan,
    gradePlan,
    GradeNoSchedule,
    classPlan
  },
  computed: {
    getState () {
      switch (this.type) {
        case 'phase':
          return ['finish', 'wait', 'wait']
        case 'grade':
          return ['wait', 'finish', 'wait']
        case 'class':
          return ['wait', 'wait', 'finish']
        default:
          return ['finish', 'wait', 'wait']
      }
    }
  },
  methods: {
    clickTab (index, item) {
      this.buttonGroup[this.type].activeIndex = index
      this.buttonGroup[this.type].currentTabComponent = item.componentName
      this.buttonGroup[this.type].activeName = item.name
    }

  },
  props: ['name', 'type', 'phaseType'],
  data () {
    return {
      buttonGroup: {
        phase: {
          buttons: [
            {
              name: '基础设置',
              componentName: 'baseSetting'
            },
            {
              name: '课程设置',
              componentName: 'coursePlan'
            },
            {
              name: '全校不排课',
              componentName: 'noCourseSetting'
            },
            {
              name: '课程不排课',
              componentName: 'courseNoCourseSetting'
            },
            {
              name: '老师不排课',
              componentName: 'teacherNoCourseSetting'
            },
            {
              name: '教研计划',
              componentName: 'researchSetting'
            },
            {
              name: '公共活动计划',
              componentName: 'publicActivitySetting'
            },
            {
              name: '合班计划',
              componentName: 'mergeClass'
            }
          ],
          activeIndex: 0,
          activeName: '基础设置',
          currentTabComponent: 'baseSetting'
        },
        grade: {
          buttons: [
            {
              name: '年级计划',
              componentName: 'gradePlan'
            },
            {
              name: '年级不排课设置',
              componentName: 'GradeNoSchedule'
            }
          ],
          activeIndex: 0,
          activeName: '年级计划',
          currentTabComponent: 'gradePlan'
        },
        class: {
          buttons: [
            {
              name: '班级计划',
              componentName: 'classPlan'
            }
          ],
          activeIndex: 0,
          activeName: '班级计划',
          currentTabComponent: 'classPlan'
        }
      }
    }
  }
}
</script>

<style>
.tab-container {
  text-align: right;
  border-bottom: 2px solid #F5811E;
}
.setting-step .el-step.is-simple .el-step__arrow {
  border-top: 2px solid #c0c4cc;
  margin: 10px 20px 0 20px;
}
.setting-step .el-step.is-simple .el-step__arrow::after,
.setting-step .el-step.is-simple .el-step__arrow::before {
  content: initial;
}
.tab-item {
  display: inline-block;
  margin-right: 20px;
  background: #F3F7F9;
  border-radius: 4px 4px 0 0;
  padding: 4px 8px;
  cursor: pointer;
}
.active-tab {
  background: #F5811E;
  color: #fff;
}
.location {
  margin: 20px 30px;
}
.setting-container {
  border: 1px solid #E6E6E6;
  padding: 30px 10px;
  /* display: flex;
  justify-content: center; */
}
.item-container {
  margin-right: 60px;
  width: 120px;
}
.item-header {
  padding: 8px 0;
  border:1px solid #eee;
}
.list-item {
  padding: 8px 0;
  width: 100px;
  margin: 10px auto;
  cursor: pointer;
  text-align: center;
}
.list-item-container {
  border: 1px solid #eee;
  border-top: 0;
  padding: 10px;
}
.active-item {
  background-color: #F5811E;
  border-radius: 30px;
  color: #fff;
}
.item-container,
.no-course-container {
  display: inline-block;
}
.no-course-container {
  vertical-align: top;
}
</style>
