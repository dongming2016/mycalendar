<template>
  <div>
    <div style="margin:20px 0;text-align:center;">
      教学组列表
    </div>
    <div style="margin-bottom:20px;">
      <div class="search-container">
        <div style="margin-bottom:20px;">
          <span>教学组名称</span>
          <el-input style="margin-left:20px;width:300px;" v-model="groupName" placeholder="请输入教学组名称"/>
        </div>
        <div style="margin-bottom:20px;">
          <span>所属学科</span>
          <el-select style="margin-left:20px;width:300px;" v-model="selectedCourse" multiple>
          <el-option
          v-for="(course, index) in courses" :key="index"
          :label="course.name"
          :value="course.id"/>
          </el-select>
        </div>
        <div style="margin-bottom:20px;">
          <span>教学组描述</span>
          <el-input style="margin-left:20px;width:300px;" v-model="groupName" placeholder="请输入教学组描述"/>
        </div>
        <div style="margin-bottom:20px;">
          <span>教学组成员</span>
          <el-select style="margin-left:20px;width:300px;" v-model="selectedTeacher">
            <el-option
            v-for="(teacher, index) in teachers" :key="index"
            :label="teacher.name"
            :value="teacher.id"/>
          </el-select>
        </div>
        <div style="margin-bottom:20px;">
          <span>所属年级</span>
          <el-select style="margin-left:20px;width:300px;" v-model="selectedGrades">
            <el-option
            v-for="(grade, index) in grades" :key="index"
            :label="grade.name"
            :value="grade.id"/>
          </el-select>
        </div>
        <el-button type="primary" size="mini">查询</el-button>
      </div>
      <div style="margin:20px 0;">
        <el-button type="primary" @click="batchDelete">批量删除</el-button>
      </div>
      <el-table
      ref="groupTable"
      border
      :data="groupList">
      <el-table-column
      type="selection"
      width="55"/>
      <el-table-column
      prop="name"
      sortable
      label="教学组名称"/>
      <el-table-column
      prop="course"
      label="所属学科"/>
      <el-table-column
      prop="desc"
      label="教学组描述"/>
      <el-table-column
      prop="members"
      label="成员"/>
      <el-table-column
      prop="grades"
      label="年级"/>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="edit(scope.row)">编辑</el-button>
          <el-button type="primary" @click="deleteItem(scope.row)">删除</el-button>
        </template>
      </el-table-column>
      </el-table>
    </div>
     <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage4"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="10"
      layout="total, sizes, prev, pager, next, jumper"
      :total="30">
    </el-pagination>
    <el-dialog :visible.sync="editVisible">
      <AddGroup/>
    </el-dialog>
  </div>
</template>

<script>
import AddGroup from './AddGroup'
export default {
  data () {
    return {
      groupList: [
        { id: 1, name: '英语教学组', course: '英语', desc: '英语教学组', members: '李丽，黄敏', grades: '一年级，二年级' },
        { id: 1, name: '语文教学组', course: '语文', desc: '语文教学组', members: '王毅，于文涛', grades: '二年级，三年级' },
        { id: 1, name: '数学教学组', course: '数学', desc: '数学教学组', members: '李天，小明', grades: '一年级，二年级' }
      ],
      selectedCourse: '',
      groupName: '',
      currentPage4: 4,
      editVisible: false,
      selectedTeacher: '',
      selectedGrades: '',
      courses: [{id: '1', name: '语文'}, {id: '2', name: '数学'}, {id: '3', name: '英语'}],
      teachers: [{id: 1, name: '安华'}, {id: 2, name: '小明'}, {id: 3, name: '李芳'}, {id: 4, name: '黄华'}],
      grades: [{id: '1', name: '一年级'}, {id: '2', name: '二年级'}, {id: '3', name: '三年级'}]
    }
  },
  methods: {
    batchDelete () {
      console.log(this.$refs.groupTable)
      this.$refs.groupTable.toggleRowSelection(0, true)
      // this.$alert('确定删除所选教学组？', '批量删除', {
      //   confirmButtonText: '确定',
      //   callback: action => {
      //     this.$message({
      //       type: 'success',
      //       message: `恭喜你，删除成功！`
      //     })
      //   }
      // })
    },
    edit (item) {
      this.editVisible = true
    },
    deleteItem (item) {
      this.$alert('确定删除该教学组？', '删除', {
        confirmButtonText: '确定',
        callback: action => {
          this.$message({
            type: 'success',
            message: `恭喜你，删除成功！`
          })
        }
      })
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
    }
  },
  components: {
    AddGroup
  }
}
</script>
<style scoped>
.search-container{
  border: 1px solid #eee;
  border-radius: 8px;
  padding: 20px;
  text-align: center;
}
</style>
