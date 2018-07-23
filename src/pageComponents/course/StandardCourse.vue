<template>
  <div>
    <el-dialog :visible.sync="courseVisible" :title="title">
      <div style="margin: 25px 0;"></div>
      <el-checkbox-group style="margin-left:45px;">
        <el-checkbox v-for="city in cities" :label="city.id" :key="city">{{city}}</el-checkbox>
      </el-checkbox-group>
      <button-group :OKCallback="OK" :CancelCallback="Cancel"/>
    </el-dialog>
    <el-button type="primary" size="mini" style="margin-bottom:18px;" @click="setStandard">设置国标课程</el-button>
    <el-table
    :data="course"
    border>
    <el-table-column
      prop="name"
      label="课程名称">
    </el-table-column>
    <el-table-column
      prop="name"
      label="所属学科">
    </el-table-column>
    <el-table-column
      label="操作">
      <template slot-scope="props">
        <el-button v-if="props.row.typeId!==0" type="primary" size="mini">编辑</el-button>
        <el-button type="primary" size="mini">删除</el-button>
      </template>
    </el-table-column>
    </el-table>
    <el-pagination
      layout="prev, pager, next"
      :total="50">
    </el-pagination>
  </div>
</template>

<script>
import ButtonGroup from '../ButtonGroup'
export default {
  data () {
    return {
      courseVisible: false,
      schoolCourseVisible: false,
      course:
         [
           {typeId: 1, name: '数字技术', type: '选修', id: 1},
           {typeId: 1, name: '数字技术1', type: '选修', id: 2},
           {typeId: 1, name: '数字技术2', type: '选修', id: 3}
         ],
      checkAll: false,
      isIndeterminate: true,
      title: '',
      checkedCities: ['语文', '数学', '英语', '美术'],
      cities: ['语文', '数学', '英语', '物理',
        '化学', '生物', '历史', '政治', '地理', '音乐', '美术', '体育']
    }
  },
  methods: {
    setStandard () {
      this.courseVisible = true
      this.title = '设置国标课程'
    },
    OK () {
      this.schoolCourseVisible = false
    },
    handleCheckAllChange () {},
    handleCheckedCitiesChange () {},
    Cancel () {
      this.schoolCourseVisible = false
    }
  },
  components: {
    ButtonGroup
  }
}
</script>
