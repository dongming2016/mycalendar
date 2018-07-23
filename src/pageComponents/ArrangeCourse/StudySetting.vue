<template>
  <!-- 公共课设置 -->
  <div>
    <div style="text-align:left;">
      <el-button type="primary" @click="dialogVisible = true">添加教研活动</el-button>
    </div>
    <div>
      <el-table :data="getActivities">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column prop="researchName" label="教研活动名称"/>
        <el-table-column prop="researchDesc" label="教研活动描述"/>
        <el-table-column label="参与老师">
          <template slot-scope="scope">
            <el-tag style="margin-right:10px;margin-top:10px;"
              v-for="tag in scope.row.teachers"
              :key="tag.id"
              closable
              :disable-transitions="false"
              @close="handleClose(tag)">
              {{tag.name}}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="time" label="活动时间"/>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="dialogVisible=true">编辑</el-button>
            <el-button type="text">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog title="添加教研活动" :visible.sync="dialogVisible" class="public-class-setting">
      <div>
        <div>
          <div>
            <span>教研活动名称</span>
            <el-input  style="margin-top:8px;margin-left:8px;width:200px;" v-model="courseName"/>
          </div>
          <div>
            <span>教研活动描述</span>
            <el-input style="margin-top:8px;margin-left:8px;width:200px;" v-model="courseDesc"/>
          </div>
          <div style="display:inline-block;margin-top:10px;">
            <span>选择老师</span>
          <div style="margin:20px;">
              <el-checkbox-group style="display:block;" v-model="checkedTeachers">
                <el-checkbox v-for="item in teachers"
                :key="item.id"
                :label="item.name">
                {{item.name}}
                </el-checkbox>
              </el-checkbox-group>
            </div>
          </div>
          <div>
            <span class="arrange-label">
              选择时间
            </span>
            <el-input style="width:300px;margin-top:20px;" @focus="isNotArrangeVisible=true" v-model="noCourseTime" placeholder="选择时间">
              <i slot="prefix" @click="isNotArrangeVisible=true" class="el-input__icon el-icon-date"></i>
            </el-input>
            <div v-show="isNotArrangeVisible" class="tooltips">
              <ClockTime/>
              <footer style="text-align: right;
                      margin-top: 20px;">
                <el-button type="text" @click="isNotArrangeVisible=false">确定</el-button>
                <el-button type="text" style="color:#ddd;" @click="isNotArrangeVisible=false">取消</el-button>
              </footer>
            </div>
          </div>
          <div style="text-align:center;margin-top:20px;">
            <el-button type="primary" @click="dialogVisible=false">确定</el-button>
            <el-button @click="dialogVisible=false">取消</el-button>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import ClockTime from '../../components/clockTime'
import { CourseService } from '../../service/course.service'
export default {
  components: {
    ClockTime
  },
  data () {
    return {
      isNotArrangeVisible: false,
      noCourseTime: [],
      courseName: '',
      courseDesc: '',
      dialogVisible: false,
      activeIndex: 0,
      inputVisible: false,
      courses: [],
      newClass: [],
      isIndeterminate: true,
      grades: [],
      isWeekShow: false,
      selectedCourse: -1,
      checkAll: false,
      options: this.getOption,
      events: [],
      labels: [],
      checkedClasses: [],
      courseTime: '',
      inputValue: '',
      checkedTeachers: '',
      classes: [{id: 0, name: `一年级(1)班`}, {id: 1, name: `二年级(1)班`}, {id: 2, name: `三年级(1)班`}],
      teachers: [{id: '11', name: '张丽萍'}, {id: '12', name: '李希'}, {id: '13', name: '王灿'}]
    }
  },
  methods: {
    getClasses (selectedCourse) {
      return CourseService.getClasses(selectedCourse)
    },
    handleCheckAllChange () {
      this.isIndeterminate = false
    },
    foldClasses (grade) {
      grade.showClass = !grade.showClass
    },
    clearAll () {

    },
    switchCourse () {
    },
    savePublicSetting () {
      this.dialogVisible = false
    },
    handleClose (tag) {
      // this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1)
    },

    showInput () {
      this.inputVisible = true
      // this.$nextTick(_ => {
      //   this.$refs.saveTagInput.$refs.input.focus()
      // })
    },

    handleInputConfirm (course) {
      course.classes.push({id: '1' + this.newClass[0].id, name: this.newClass[0].name})
    }
  },
  mounted () {
    this.grades = this.getClasses(this.selectedCourse)
  },
  computed: {
    getAllClasses () {
      return [{id: 0, name: `一年级(1)班`}, {id: 1, name: `二年级(1)班`}, {id: 2, name: `三年级(1)班`}]
    },
    getActivities () {
      return [{id: 1, researchName: '语文教研', teachers: [{id: 1, name: '张丽萍'}], researchDesc: '语文教研', time: '星期一第一节'},
        {id: 2, researchName: '英语教研', teachers: [{id: 1, name: '张丽萍'}], researchDesc: '英语教研', time: '星期一第一节'}]
    }
  }
}
</script>

<style>
.class-checkbox {
  display: inline-block;
  margin-right: 8px;
}
.public-grade, .all-grade {
  text-align: left;
}
.classes-container {
  margin-left: 24px;
}
.public-class-setting .el-dialog {
  min-width: 1350px;
}
.public-grade-item {
  margin-left: 10px;
}
.all-grade {
  margin-left: 24px;
}
</style>
