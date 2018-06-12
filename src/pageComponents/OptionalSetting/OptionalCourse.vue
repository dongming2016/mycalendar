<template>
  <div>
    <!-- <el-button type="text" @click="setOptionalCourse"  class="term-setting-item">选修课程管理</el-button> -->
    <!-- <el-dialog title="选修课程管理" :visible.sync="optionalSettingVisible" class="optional-course"> -->
    <!-- <div>学科/类别设置</div> -->
    <div>
      <el-button  type="primary" @click="isEditShow=true" class="add-button">添加课程</el-button>
      <!-- <el-dialog title="选课基本设置" :visible.sync="isSettingShow" style="text-align: center"> -->

      <!-- </el-dialog> -->
      <!-- <el-row :gutter="20">
        <el-col :span="12" v-if="isEditShow">
          <OptionalCourseTable :isEditable="true" :viewCallBack="showEditCourse"/>
        </el-col> -->
        <!-- <el-col :span="24" v-if="!isEditShow"> -->
          <OptionalCourseTable :viewCallBack="showEditCourse" v-on:viewCourse="viewCourse"/>
        <!-- </el-col>
        <el-col :span="12" v-show="isEditShow"> -->
          <!-- 编辑或添加课程 -->
        <el-dialog :title="editTitle" :visible.sync="isEditShow" style="text-align: center">
          <EditOptionalCourse/>
           <div slot="footer" class="dialog-footer">
            <el-button type="primary" plain @click="isEditShow=false">确定</el-button>
            <el-button plain @click="isEditShow=false">取消</el-button>
          </div>
        </el-dialog>
        <!-- </el-col>
      </el-row> -->
      <!-- <div slot="footer" class="dialog-footer">
        <el-button type="primary" plain @click="optionalSettingVisible=false">确定</el-button>
        <el-button plain @click="optionalSettingVisible=false">取消</el-button>
      </div> -->
      <!-- <edit-optional-course :editTitle="editTitle" :isEditShow="isEditShow" v-on:isEditShow="hideEdit"/> -->
    </div>
     <!-- </el-dialog> -->
  </div>
</template>

<script>

import EditOptionalCourse from './EditOptionalCourse'
import OptionalBaseSetting from './OptionalBaseSetting'
import OptionalCourseTable from './OptionalCourseTable'
export default {
  data () {
    return {
      optionalSettingVisible: false,
      isEditShow: false,
      isSettingShow: false,
      startTime: '',
      endTime: '',
      editTitle: '添加课程',
      courseTime: 10,
      stundentsNum: 30
    }
  },
  methods: {
    editCourse (courseId) {},
    setOptionalCourse () {
      this.optionalSettingVisible = true
    },
    viewCourse () {
      console.log('hello')
      this.isEditShow = true
      this.editTitle = '查看选课信息'
    },
    showEditCourse (id) {
      this.isEditShow = true
      this.editTitle = '编辑选课信息'
    },
    okCallback (option) {
      this.isEditShow = false
      console.log(option)
    },
    hideEdit (isEditShow) {
      this.isEditShow = isEditShow
    }
  },
  components: {
    EditOptionalCourse,
    OptionalCourseTable,
    OptionalBaseSetting
  }
}
</script>

<style>
.setting-button,
.add-button {
  margin-bottom: 16px;
}
.setting-item {
  text-align: center;
}
.setting-item > div {
  display: inline-block;
  margin-bottom: 8px;
}
.el-dialog__body {
  text-align: left;
}
.optional-course .el-dialog {
  min-width: 1280px;
}
</style>
