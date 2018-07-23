<template>
  <div>
    <div style="display:inline-block;">
      <div style="margin-bottom:16px;">
        <span class="arrange-label">选择年级</span>
        <el-select style="width:300px;" v-model="selectedGrade" placeholder="一年级" @change='gradesChange(selectedGrade)'>
          <el-option
            v-for="item in grades"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <SchoolNoCourseSetting/>
    </div>
  </div>
    <div style="display:inline-block;  margin-left: 30px;
      width: 250px;   vertical-align: top;" v-show="isClassOut">
      <ClassOTT :classes="classes"/>
    </div>
  </div>
</template>

<script>
import SchoolNoCourseSetting from './SchoolNoCourseSetting'
import ClassOTT from '../../components/ClassOTT'
export default {
  components: {
    SchoolNoCourseSetting,
    ClassOTT
  },
  data () {
    return {
      selectedGrade: 1,
      grades: [
        { value: 1, label: '一年级' },
        { value: 2, label: '二年级' },
        { value: 3, label: '三年级' }
      ],
      isClassOut: true,
      classes: [{id: '1', name: '一年级（1）班'}, {id: '2', name: '二年级（1）班'}]
    }
  }
}
</script>
