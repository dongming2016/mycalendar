<template>
  <div style="text-align:center;">
    <header style="margin:20px;">
      添加教学组
    </header>
    <div>
      <label><span style="color:red">*</span>教学组名称</label>
      <el-input style="margin-left:20px;margin-bottom:10px;width:300px;"
      required v-model="groupName"/>
    </div>
     <div style="display: inline-block;text-align: left;margin-bottom:20px;">
      <label>
        <!-- 暂时先将所有成员都平铺显示 -->
        <span style="color:red;">*</span>所属学科</label>
        <el-select style="margin-left:20px;width:300px;" v-model="selectedCourse">
          <el-option
          v-for="(course, index) in courses" :key="index"
          :label="course.name"
          :value="course.id"/>
        </el-select>
    </div>
    <div>
      <label>教学组描述</label>
      <el-input style="margin-left:20px;margin-bottom:10px;width:300px;" v-model="groupDesc"/>
    </div>
    <div style="display: inline-block;text-align: left;">
      <label style="margin-left:-50px;">
        <!-- 暂时先将所有成员都平铺显示 -->
        <span style="color:red;">*</span>教学组成员</label>
        <div style="margin-top:10px;">
        <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
        <div style="margin: 15px 0;"></div>
        <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
          <el-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>
        </el-checkbox-group>
        </div>
    </div>
    <div style="margin:20px 0;">
      <label>所属年级</label>
        <el-select style="margin-left:20px;width:300px;" v-model="selectedGrades" multiple>
          <el-option
          v-for="(grade, index) in grades" :key="index"
          :label="grade.name"
          :value="grade.id"/>
        </el-select>
    </div>
    <footer style="margin-bottom:20px;">
      <el-button type="primary" @click="OK">确定</el-button>
      <el-button>取消</el-button>
    </footer>
  </div>
</template>
<script>
const cityOptions = ['安华', '小明', '李芳', '黄华']
export default {
  data () {
    return {
      groupName: '',
      groupDesc: '',
      checkAll: false,
      selectedCourse: '',
      checkedCities: ['安华', '小明'],
      cities: cityOptions,
      isIndeterminate: true,
      selectedGrades: [],
      courses: [{id: '1', name: '语文'}, {id: '2', name: '数学'}, {id: '3', name: '英语'}],
      grades: [{id: '1', name: '一年级'}, {id: '2', name: '二年级'}, {id: '3', name: '三年级'}]
    }
  },
  methods: {
    handleCheckAllChange (val) {
      this.checkedCities = val ? cityOptions : []
      this.isIndeterminate = false
    },
    handleCheckedCitiesChange (value) {
      let checkedCount = value.length
      this.checkAll = checkedCount === this.cities.length
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length
    },
    OK () {
      this.$message({
        message: '创建教学组成功',
        type: 'success'
      })
    }
  }
}
</script>
<style scoped>

</style>
