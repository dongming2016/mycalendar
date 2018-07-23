<template>
  <div>
    <div style="display:inline-block;">
    <div>
      <span class="arrange-label">选择老师</span>
      <el-select style="width:300px;" v-model="selectedTeacher">
        <el-option
          v-for="item in teachers"
          :key="item.id"
          :label="item.name"
          :value="item.id">
        </el-option>
      </el-select>
    </div>
    <div>
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
      selectedTeacher: '',
      isClassOut: true,
      classes: [{id: '1', name: '一年级（1）班'}, {id: '2', name: '二年级（1）班'}],
      teachers: [{id: '11', name: '张丽萍'}, {id: '12', name: '李希'}, {id: '13', name: '王灿'}]
    }
  }
}
</script>
