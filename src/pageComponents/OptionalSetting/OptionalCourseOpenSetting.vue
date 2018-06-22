<template>
  <div>
    <div>2017-2018学年下学期</div>
    <div>
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
      <div>
        <el-button  type="primary" @click="addCourse" class="add-button">增加课程</el-button>
        <router-link to="/openCourse" style="margin-left:20px;"><el-button type="primary" icon="el-icon-edit" >开课设置</el-button></router-link>
      </div>
        <OptionalCourseTable :viewCallBack="showEditCourse" :editCallback="showEditCourse" v-on:viewCourse="viewCourse"/>
        <el-dialog :title="editTitle" :visible.sync="isEditShow" style="text-align: center">
          <OptionalCourseBase :course="course"/>
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

import OptionalCourseBase from './OptionalCourseBase'
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
      },
      courseDomains: {
        value: '全选',
        options: [{value: 0, label: '全选'}, {value: 1, label: '学科拓展类'}, {value: 2, label: '实用技能类'}, {value: 3, label: '科学技术类'}, {value: 4, label: '艺术教育类'}, {value: 5, label: '外国语类'}]
      },
      course: {}
    }
  },
  methods: {
    editCourse (courseId) {},
    setOptionalCourse () {
      this.optionalSettingVisible = true
    },
    viewCourse (course) {
      this.isEditShow = true
      this.editTitle = '查看课程信息'
      this.course = course
    },
    showEditCourse (course) {
      this.isEditShow = true
      this.editTitle = '编辑课程信息'
      this.course = course
    },
    okCallback (option) {
      this.isEditShow = false
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
    OptionalCourseBase,
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
