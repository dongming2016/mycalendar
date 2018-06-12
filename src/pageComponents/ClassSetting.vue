<template>
  <div>
    <!-- <el-button type="text" @click="classSettingVisible=true">班级设置</el-button>
    <el-dialog title="班级设置" :visible.sync="classSettingVisible">
      <el-button type="primary" style="margin-bottom:16px" @click="createClass()">增加班级</el-button>
      <div style="margin-bottom:16px;">
        <span>选择年级：</span>
        <el-select v-model="chosedGrade" placeholder="请选择年级">
          <el-option
            v-for="item in grades"
            :key="item.value"
            :label="item.label"
            :value="item.value">
            <span style="float: left">{{ item.label }}</span>
            <span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span>
          </el-option>
        </el-select>
      </div> -->
      <div :style="{'display:flex': showClassInfo}">
        <div class="class-container" :class="{'class-list': showClassInfo }">
          <el-table
          :data="classOption">
            <el-table-column
            prop="className"
            label="班级"
            fixed
            />
            <el-table-column
            prop="classMaster"
            label="班主任"
            fixed
            >
            <template slot-scope="scope">
              <el-select v-model="scope.row.classMaster">
                <el-option
                  v-for="item1 in teachers.masters.options"
                  :key="item1.value"
                  :label="item1.label"
                  :value="item1.value">
                </el-option>
              </el-select>
            </template>
            </el-table-column>
            <el-table-column
            prop="math"
            label="数学">
            <template slot-scope="scope">
              <el-select v-model="scope.row.math">
                <el-option
                  v-for="item1 in teachers.math.options"
                  :key="item1.value"
                  :label="item1.label"
                  :value="item1.value">
                </el-option>
              </el-select>
            </template>
            </el-table-column>
            <el-table-column
            prop="chinese"
            label="语文"
            >
            <template slot-scope="scope">
              <el-select v-model="scope.row.chinese">
                <el-option
                  v-for="item1 in teachers.chinese.options"
                  :key="item1.value"
                  :label="item1.label"
                  :value="item1.value">
                </el-option>
              </el-select>
            </template>
            </el-table-column>
            <el-table-column
            prop="site"
            fixed="right"
            label="教学场地"
            />
            <el-table-column
            label="操作"
            fixed="right"
            width="250">
              <template slot-scope="scope">
                <el-button type="primary" size="mini" class="el-icon-view" @click="viewClass(scope.row.id)">查看</el-button>
                <el-button type="primary" size="mini" class="el-icon-edit" @click="editClass(scope.row.id)">编辑</el-button>
                <el-button type="primary" size="mini" class="el-icon-delete" @click="deleteClass(scope.row.id)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div v-show="showClassInfo" :class="{'class-info': showClassInfo }">
          <class-info :classId="classId"/>
        </div>
      </div>
      <!-- <div slot="footer" class="dialog-footer">
        <el-button type="primary" plain @click="saveClassSetting">确定</el-button>
        <el-button plain @click="classSettingVisible = false">取消</el-button>
      </div>
    </el-dialog> -->
  </div>
</template>

<script>
import { CourseService } from '../service/course.service'
import ClassInfo from './ClassInfo'

export default {
  data () {
    return {
      classSettingVisible: false,
      classSettings: [],
      grades: [],
      showClassInfo: false,
      chosedGrade: '',
      classOption: [{ className: '1班', classMaster: '李天', math: '王一', chinese: '王芳', site: '教学楼A一年级（1）班' }],
      teachers: {
        masters: { placeholder: '请选择班主任',
          options: [
            { value: 1, label: '李天' },
            { value: 2, label: '王一' },
            { value: 3, label: '王芳' } ] },
        math: { placeholder: '请选择数学老师',
          options: [
            { value: 1, label: '李天' },
            { value: 2, label: '王一' },
            { value: 3, label: '王芳' }] },
        chinese: { placeholder: '请选择语文老师',
          options: [
            { value: 1, label: '李天' },
            { value: 2, label: '王一' },
            { value: 3, label: '王芳' }] }
      },
      classId: ''
    }
  },
  methods: {
    saveClassSetting () {
      this.classSettingVisible = false
    },
    viewClass (classId) {
      this.showClassInfo = true
      this.classId = classId
    },
    editClass (classId) {
      this.showClassInfo = true
      this.classId = classId
    },
    addClass () {
    },
    deleteClass (classId) {
      console.log(classId)
    },
    createClass () {
      console.log('createClass')
      this.showClassInfo = true
    }
  },
  components: {
    ClassInfo
  },
  mounted () {
    this.grades = CourseService.getGrades()
    if (this.grades.length > 0) {
      this.chosedGrade = this.grades[0]
    }
  }
  // render: function (createElement) {
  //   console.log(this.$slots)
  //   return this.tableOption.map(element => {
  //     return createElement(TableColumn,
  //       { attrs: {
  //         prop: element.prop,
  //         label: element.name
  //       }
  //       }, this.$slots.tableColumns)
  //   })
  // }
}
</script>

<style>
.el-table .cell {
  text-align: left;
}
.class-list {
  width: 60%;
  display: inline-block;
}
.class-info {
  width: 35%;
  display: inline-block;
}
.class-list {
  margin-right: 5%;
  float: left;
}
.el-dialog {
  min-width: 1300px;
}
</style>
