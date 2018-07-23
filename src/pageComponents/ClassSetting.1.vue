<template>
  <div>
      <div style="margin-bottom:18px;">
        <span style="margin-right:18px;">选择年级</span>
        <el-select v-model="currentGrade" placeholder="请选择年级">
          <el-option
            v-for="item in grades"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </div>
      <!-- <div>
        <el-button type="primary">创建班级</el-button>
      </div> -->
      <div :style="{'display:flex': showClassInfo}">
        <div class="class-container" :class="{'class-list': showClassInfo }">
          <el-table
          border
          :data="classOption">
            <el-table-column
            prop="className"
            label="班级"
            fixed
            />
            <el-table-column
            prop="classMaster"
            label="班主任"
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
            prop="type"
            label="班级类型"/>
            <el-table-column
            prop="site"
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
        <!-- <div v-show="showClassInfo" :class="{'class-info': showClassInfo }"> -->
         <el-dialog title="班级信息" :visible.sync="showClassInfo">
          <class-info :classId="classId" :isVew="isVew"/>
          <div slot="footer" class="dialog-footer">
            <el-button type="primary" plain @click="showClassInfo = false">确定</el-button>
            <el-button plain @click="showClassInfo = false">取消</el-button>
          </div>
         </el-dialog>
        <!-- </div> -->
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
      currentGrade: '一年级',
      grades: [{id: '1', name: '一年级'}, {id: '2', name: '二年级'}, {id: '3', name: '三年级'}],
      classSettingVisible: false,
      classSettings: [],
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
      classId: '',
      isVew: true
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
