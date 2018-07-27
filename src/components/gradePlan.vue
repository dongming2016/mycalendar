<template>
  <div>
    <div class="grade-course-container">
      <div>课程名称</div>
      <div v-if="allCourses.length <= 0" class="course-item-container">暂无课程数据</div>
      <div v-else class="course-item-container">
        <el-checkbox-group v-model="gradePlan">
          <el-checkbox v-for="(item, index) in allCourses" :key="index"
          :label="item">
            {{item.courseName}}
          </el-checkbox>
        </el-checkbox-group>
      </div>
    </div>
    <div class="table-container">
      <el-table :data="gradePlan">
        <el-table-column label="课程名称" prop="courseName"/>
        <el-table-column label="课程类型" prop="type">
          <template slot-scope="scope">
            {{scope.row.type==='standard'? '国标': '校本'}}
          </template>
        </el-table-column>
        <el-table-column label="周课时" prop="weekHours">
          <template slot-scope="scope">
            <el-input v-if="scope.row.isEdit" v-model="scope.row.weekHours"/>
            <span v-else>{{scope.row.weekHours}}</span>
          </template>
        </el-table-column>
        <el-table-column label="总课时" prop="totalHours">
          <template slot-scope="scope">
            <el-input v-if="scope.row.isEdit" v-model="scope.row.weekHours"/>
            <span v-else>{{scope.row.weekHours}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <span v-if="scope.row.isEdit" class="save-button" @click="save(scope.row)">保存</span>
            <div v-else>
              <span class="el-icon-edit edit-button" @click="scope.row.isEdit=true">编辑</span>
              <span class="el-icon-close delete-button" @click="deleteItem=scope.row;confirmBoxShow=true">删除</span>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog :visible.sync="confirmBoxShow" title="取消课程" append-to-body>
        <div>
          确认该年级不上{{deleteItem.courseName}}课？
        </div>
        <div style="text-align:center;margin:20px 0;">
          <el-button type="primary" @click="deletePlan">确定</el-button>
          <el-button type="primary" plain>取消</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import baseService from '../service/base.service.js'
export default {
  data () {
    return {
      gradePlan: [],
      allCourses: [],
      confirmBoxShow: false,
      deleteItem: {}
    }
  },
  mounted () {
    this.getAllCourse()
    this.getGradePlan()
  },
  methods: {
    getAllCourse () {
      baseService.getAllCourse()
        .then(data => {
          this.allCourses = data
        })
    },
    getGradePlan () {
      baseService.getGradePlan()
        .then(data => {
          this.gradePlan = data
        })
    },
    save (coursePlan) {
      coursePlan.isEdit = false
    },
    deletePlan () {

    }
  }
}
</script>

<style>
.grade-course-container {
  background: #F6F8FC;
  padding: 20px;
  border: 2px solid #eee;
}
.course-item-container {
  margin-top: 10px;
}
.save-button,
.delete-button,
.edit-button {
  cursor: pointer;
}
.edit-button {
  margin-right: 10px;
}
.table-container {
  margin-top: 15px;
}
</style>
