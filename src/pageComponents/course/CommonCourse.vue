<template>
  <div>
    <el-dialog :visible.sync="commonCourseVisible" :title="title">
      <span style="margin:0 10px;">课程名称:</span>
      <el-input style="width:60%;" v-model="commonCourse"/>
      <button-group :OKCallback="OK1" :CancelCallback="Cancel1"/>
    </el-dialog>
    <el-button type="primary" size="mini" style="margin-bottom:18px;" @click="addCommon">添加公共课程</el-button>
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
  </div>
</template>

<script>
import ButtonGroup from '../ButtonGroup'
export default {
  data () {
    return {
      commonCourseVisible: false,
      commonCourse: '',
      course:
         [
           {typeId: 1, name: '数字技术', type: '选修', id: 1},
           {typeId: 1, name: '数字技术1', type: '选修', id: 2},
           {typeId: 1, name: '数字技术2', type: '选修', id: 3}],
      title: ''
    }
  },
  methods: {
    addCommon () {
      this.commonCourseVisible = true
      this.title = '添加校本课程'
    },
    OK1 () {
      this.commonCourseVisible = false
    },
    Cancel1 () {
      this.commonCourseVisible = false
    }
  },
  components: {
    ButtonGroup
  }
}
</script>
