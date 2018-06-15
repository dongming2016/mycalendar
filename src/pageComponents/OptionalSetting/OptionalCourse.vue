<template>
  <div>
    <!-- <el-button type="text" @click="setOptionalCourse"  class="term-setting-item">选修课程管理</el-button> -->
    <!-- <el-dialog title="选修课程管理" :visible.sync="optionalSettingVisible" class="optional-course"> -->
    <!-- <div>学科/类别设置</div> -->
    <div>
      <el-button  type="primary" @click="addCourse" class="add-button">增加课程</el-button>
      <div style="text-align: center;">
        <div class="search-condition">
          <span>课程编号</span>
          <el-input placeholder="按课程编号查询" style="width:60%;margin-left:8px;"/>
        </div>
        <div class="search-condition">
          <span>课程名称</span>
          <el-input placeholder="按课程查询" style="width:60%;margin-left:8px;"/>
        </div>
        <div class="search-condition">
          <span>老师姓名</span>
          <el-input placeholder="按老师姓名查询" style="width:60%;margin-left:8px;"/>
        </div>
        <div class="search-condition">
          <span>课程类别</span>
          <el-select placeholder="按类别查询" style="width:60%;margin-left:8px;"  v-model="category.value">
            <el-option
              v-for="item1 in category.options"
              :key="item1.value"
              :label="item1.label"
              :value="item1.value"
            >

              </el-option>
          </el-select>
        </div>
        <div class="search-condition">
          <span>学科名称</span>
          <el-select placeholder="按学科名称查询" style="width:60%;margin-left:8px;"  v-model="courses.value">
            <el-option
              v-for="item1 in courses.options"
              :key="item1.value"
              :label="item1.label"
              :value="item1.value"
            >

              </el-option>
          </el-select>
        </div>
        <div style="margin-left: 20px;display:inline-block;"><el-button type="primary">查询</el-button></div>
      </div>
      <!-- <el-dialog title="选课基本设置" :visible.sync="isSettingShow" style="text-align: center"> -->

      <!-- </el-dialog> -->
      <!-- <el-row :gutter="20">
        <el-col :span="12" v-if="isEditShow">
          <OptionalCourseTable :isEditable="true" :viewCallBack="showEditCourse"/>
        </el-col> -->
        <!-- <el-col :span="24" v-if="!isEditShow"> -->
          <OptionalCourseTable :viewCallBack="showEditCourse" :editCallback="showEditCourse" v-on:viewCourse="viewCourse"/>
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
      stundentsNum: 30,
      category: {
        value: '全选',
        options: [{value: 0, label: '全选'}, {value: 1, label: '学科'}, {value: 2, label: '课程'}]
      },
      courses: {
        value: '全选',
        options: [{value: 0, label: '全选'}, {value: 1, label: '数学'}, {value: 2, label: '语文'}]
      }
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
      this.editTitle = '查看课程信息'
    },
    showEditCourse (id) {
      this.isEditShow = true
      this.editTitle = '编辑课程信息'
    },
    okCallback (option) {
      this.isEditShow = false
      console.log(option)
    },
    hideEdit (isEditShow) {
      this.isEditShow = isEditShow
    },
    addCourse () {
      this.isEditShow = true
      this.editTitle = '添加课程'
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
.search-condition {
  width: 350px;
  display: inline-block;
  margin-right: 10px;
  margin-left: 10px;
  margin-bottom: 30px;
}
</style>
