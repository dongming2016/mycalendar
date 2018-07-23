<template>
  <div>
    <div class="plan-input-container">
      <span class="label"><span style="color:red;">*</span>课程名称</span>
      <span v-if="!isNew">{{plan.courseName}}</span>
      <el-select v-else v-model="plan.courseName" class="plan-input">
        <el-option v-for="(item, index) in getCourses"
        :key="index" :label="item.name" :value="item.id"/>
      </el-select>
    </div>
    <!-- 因不同年级的课程计划可能一样，因此年级可多选，
    同时已经设置过某课程的年级，只能在编辑时选择，新增时应禁止选择 -->
    <div class="plan-input-container">
      <span class="label"><span style="color:red;">*</span>年级</span>
      <span v-if="!isNew">{{plan.grade}}</span>
      <el-select v-else multiple v-model="plan.grade"
      placeholder="请选择年级，可多选" class="plan-input">
        <el-option v-for="(item, index) in getGrades"
        :key="index" :label="item.name" :value="item.id"/>
      </el-select>
    </div>
    <div class="plan-input-container">
      <span class="label"><span style="color:red;">*</span>适用班级类型</span>
      <div class="plan-input" style="display:inline-block;">
        <el-radio v-model="plan.courseType" label="通用">不区分文理科</el-radio>
        <el-radio v-model="plan.courseType" label="理科">理科</el-radio>
        <el-radio v-model="plan.courseType" label="文科">文科</el-radio>
      </div>
    </div>
    <div class="plan-input-container">
      <span class="label"><span style="color:red;">*</span>周课时</span>
      <el-input class="plan-input" v-model="plan.weekHours" min="0" max="40" type="number"/>
    </div>
    <div class="plan-input-container">
      <span class="label"><span style="color:red;">*</span>总课时</span>
      <el-input class="plan-input" v-model="plan.totalHours" min="0" max="400" type="number"/>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    plan: {
      default () {
        return {}
      }
    },
    isNew: {
      default () {
        return false
      }
    }
  },
  computed: {
    getGrades () {
      return [{id: '1', name: '一年级'}, {id: '2', name: '二年级'}, {id: '3', name: '三年级'}]
    },
    getCourses () {
      return [
        {
          id: 1,
          name: '数学'
        },
        {
          id: 2,
          name: '语文'
        },
        {
          id: 3,
          name: '英语'
        },
        {
          id: 4,
          name: '政治'
        },
        {
          id: 5,
          name: '艺术'
        },
        {
          id: 6,
          name: '音乐'
        },
        {
          id: 7,
          name: '物理'
        }
      ]
    }
  }
}
</script>

<style scoped>
.plan-input-container {
  margin-bottom: 20px;
}
.label {
  width: 100px;
  display: inline-block;
  color: #99a9bf;
  margin-left: 20px;
}
.plan-input {
  width: 300px;
}
</style>
