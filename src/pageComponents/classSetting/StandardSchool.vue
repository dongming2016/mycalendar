<template>
  <div>
    <div>
      <!-- <div>
        <span>国标课程</span>
        <el-button type="primary" size="mini" style="float:right;">添加</el-button>
      </div> -->
      <div>

        <el-button type="primary" size="mini" @mouseover="showMenu=true">增加课程</el-button>
        <div ref="addCourseMenu">
          <el-button type="primary" size="mini" style="margin-bottom:18px;" @click="addStandard">设置国标课程</el-button>
          <el-button type="primary" size="mini" style="margin-bottom:18px;" @click="addSchool">添加校本课程</el-button>
        </div>
      </div>
      <div style="margin: 18px 0;">

      <!-- <el-select style="margin:10px;"
        v-model="courseType"
      >

      <el-option
      v-for="item1 in courseTypes"
      :key="item1.id"
        :label="item1.name"
        :value="item1.id"
      />
        </el-select>-->
      <div style="border:1px solid #eee; text-align:center;">
        <span style="margin:10px;">筛选条件:</span>

      </div>
      </div>
      <div>
        <el-table
          :data="course"
          border>
          <el-table-column
            prop="courseName"
            label="课程名称">
          </el-table-column>
          <el-table-column
            prop="courseSubject"
            label="所属学科">
          </el-table-column>
          <el-table-column
            prop="courseType"
            label="课程类型">
          </el-table-column>
          <el-table-column
            label="操作">
            <template slot-scope="props">
              <!-- <el-button v-if="props.row.typeId!==0" type="primary" size="mini" @click="">编辑</el-button> -->
              <!-- <el-button type="primary" size="mini">删除</el-button> -->
            </template>
          </el-table-column>
        </el-table>
         <el-pagination
            layout="prev, pager, next"
            :total="50">
          </el-pagination>
      </div>
    </div>
    <!-- <el-dialog :visible.sync="courseVisible" :title="title">
      <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
      <div style="margin: 15px 0;"></div>
      <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
        <el-checkbox v-for="city in cities" :label="city.id" :key="city">{{city}}</el-checkbox>
      </el-checkbox-group>
      <button-group :OKCallback="OK" :CancelCallback="Cancel"/>
    </el-dialog> -->
    <el-dialog :visible.sync="editCourseVisible" :title="title">
      <span style="margin:0 10px;">课程名称:</span>
      <el-input style="width:60%;" v-model="shoolCourse"/>
      <button-group :OKCallback="OK" :CancelCallback="Cancel"/>
    </el-dialog>
  </div>
</template>
<script>
import ButtonGroup from '../ButtonGroup'
const cityOptions = ['化学', '物理', '政治', '生物']
export default {
  data () {
    return {
      checkedcourseType: ['全选'],
      showMenu: false,
      courseTypes: [ {name: '国标课程', id: 1}, {name: '校本课程', id: 2} ],
      shoolCourse: '',
      editCourseVisible: false,
      course:
         [{typeId: 0, name: '语文', type: '必修', id: 1},
           {typeId: 0, name: '数学', type: '必修', id: 2},
           {typeId: 0, name: '英语', type: '必修', id: 3},
           {typeId: 1, name: '数字技术', type: '选修', id: 1},
           {typeId: 1, name: '数字技术1', type: '选修', id: 2},
           {typeId: 1, name: '数字技术2', type: '选修', id: 3}],
      checkAll: false,
      checkedCities: ['上海', '北京'],
      cities: cityOptions,
      isIndeterminate: true,
      title: ''
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
    addStandard () {
      this.editCourseVisible = true
      this.title = '添加国标课程'
    },
    addSchool () {
      this.editCourseVisible = true
      this.title = '添加校本课程'
    },
    OK () {
      this.editCourseVisible = false
    },
    Cancel () {
      this.editCourseVisible = false
    }
  },
  components: {
    ButtonGroup
  }
}
</script>
