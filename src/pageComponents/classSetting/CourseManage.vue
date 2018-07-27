<template>
  <div>
    <div style="width:80%;margin:auto;">
      <div>
        <div class="add-btn-container">
          <el-button type="primary" round class="add-btn"  icon="el-icon-plus">新增</el-button>
          <div class="btn-items">
            <div @click="addStandard" class="btn-item">国标课程</div>
            <div @click="addSchool" class="btn-item">校本课程</div>
          </div>
        </div>
      </div>
      <div style="margin: 18px 0; text-align:left;">
      <div>
        <span style="margin:10px;">筛选条件:</span>
        <el-select placeholder="选择课程类型" style="margin:10px;" value-key="id" v-model="courseType">
          <el-option
            v-for="item in courseTypes"
            :key="item.id"
            :label="item.name"
            :value="item"
          />
        </el-select>
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
              <span class="operation-btn-item"  @click="editRecord(props.row)">
                <i class="el-icon-edit"></i>
                <span style="margin:0 10px 0 3px;">编辑</span>
              </span>
              <span class="operation-btn-item" @click="deleteRecord(props.row)">
                <i class="el-icon-close"></i>
                <span style="margin:0 10px 0 3px;">删除</span>
              </span>
            </template>
          </el-table-column>
        </el-table>
         <el-pagination
            layout="total, sizes, prev, pager, next, jumper"
            :total="50">
          </el-pagination>
      </div>
    </div>
    <el-dialog :visible.sync="editCourseVisible" :title="title">
      <span style="margin:0 10px;">课程名称:</span>
      <el-input style="width:60%;" v-model="courseItem.courseName"/>
      <button-group :OKCallback="OK" :CancelCallback="Cancel"/>
    </el-dialog>
    <el-dialog :visible.sync="confirmBoxShow" title="删除课程" append-to-body>
      <div>
        确认删除{{deletedRecord.courseName}}课?
      </div>
      <div style="text-align:center;margin:20px 0;">
        <el-button type="primary" @click="deleteCourse">确定</el-button>
        <el-button type="primary" plain @click="confirmBoxShow=false">取消</el-button>
      </div>
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
      courseTypes: [ {name: '全部课程', id: 0}, {name: '国标课程', id: 1}, {name: '校本课程', id: 2} ],
      shoolCourse: '',
      courseType: {},
      editCourseVisible: false,
      course:
         [{typeId: 0, courseName: '语文', courseSubject: '语文', courseType: '国标课程', id: 1},
           {typeId: 0, courseName: '数学', courseSubject: '数学', courseType: '国标课程', id: 2},
           {typeId: 0, courseName: '英语', courseSubject: '英语', courseType: '国标课程', id: 3},
           {typeId: 1, courseName: '数字技术', courseSubject: '数字技术', courseType: '校本课程', id: 1},
           {typeId: 1, courseName: '数字技术1', courseSubject: '数字技术1', courseType: '校本课程', id: 2},
           {typeId: 1, courseName: '数字技术2', courseSubject: '数字技术2', courseType: '校本课程', id: 3}],
      checkAll: false,
      checkedCities: ['上海', '北京'],
      cities: cityOptions,
      isIndeterminate: true,
      title: '',
      deletedRecord: {},
      confirmBoxShow: false,
      courseItem: {}
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
      this.courseItem = {}
    },
    addSchool () {
      this.editCourseVisible = true
      this.title = '添加校本课程'
      this.courseItem = {}
    },
    editRecord (record) {
      this.editCourseVisible = true
      this.title = record.courseType === '国标' ? '编辑国标课程' : '编辑校本课程'
      this.courseItem = record
    },
    deleteRecord (record) {
      this.confirmBoxShow = true
      this.deletedRecord = record
    },
    deleteCourse () {
      console.log(this.deleteRecord)
      this.confirmBoxShow = false
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
  },
  mounted () {
  }
}
</script>

<style>
.btn-items {
  display: none;
  width: 121px;
  border: 1px solid #E4E4E5;
}
.btn-item:first-child:before {
  content: '';
  position: absolute;
  top:-5px;
  background: #fff;
  width: 8px;
  height: 8px;
  border-top: 1px solid #E4E4E5;
  border-right: 1px solid #E4E4E5;
  transform: rotate(-45deg)
}
.btn-item:first-child:hover::before{
  background: #4876E7;
}
.add-btn-container:hover .btn-items,
.add-btn-container .btn-items:hover
{
  display: block;
  position: absolute;
  z-index: 2;
  background: #fff;
  margin-top: 6px;
}
.add-btn-container:hover {
  height: 118px;
}
.add-btn-container {
  display: inline-block;
  position: absolute;
  z-index: 2;
  right: 40px;
  cursor: pointer;
  /* position: absolute;
  z-index: 2; */
}
.btn-item:hover {
  background: #4876E7;
  color: #fff;
}
.btn-item {
  padding: 5px;
}
.add-btn {
  width: 130px;
  background:#4876E7;
}
.operation-btn-item {
  cursor: pointer;
}
/* .btn-item:first-child {
  border-bottom: 1px solid#E4E4E5;
} */
</style>
