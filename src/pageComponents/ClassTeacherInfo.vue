<template>
  <div>
    <div style="text-align:right;">
      <span>过滤：</span>
      <el-select v-model="filter">
        <el-option v-for="(item, index) in courseTypes"
        :key="index"
        :label="item.name"
        :value="item.id"></el-option>
      </el-select>
    </div>
    <el-table :data="courseTeachers">
      <el-table-column
      label="课程名称"
      sortable
      prop="courseName"/>
      <el-table-column
      label="课程类型"
      prop="courseType"/>
      <el-table-column
      label="老师姓名"
      sortable>
      <template slot-scope="scope">
        <div v-if="isVew">
          {{scope.row.teacherName}}
        </div>
        <div v-else>
          <el-select v-model="scope.row.teacherName"
            placeholder="请输入老师姓名">
            <el-option
            v-for="item1 in teachers[scope.row.courseId]"
            :key="item1.value"
            :label="item1.label"
            :value="item1.value">
          </el-option>
          </el-select>
        </div>
      </template>
      </el-table-column>
      <el-table-column
      label="周课时"
      sortable>
      <template slot-scope="scope">
        <div v-if="isVew">
          {{scope.row.weekHours}}
        </div>
        <div v-else>
          <el-select v-model="scope.row.weekHours" placeholder="请选择周课时">
            <el-option
              v-for="item in 40"
              :key="item"
              :value="item">
            </el-option>
          </el-select>
        </div>
      </template>
      </el-table-column>
      <el-table-column
      label="总课时"
      sortable>
      <template slot-scope="scope">
        <div v-if="isVew">
            {{scope.row.totalHours}}
        </div>
        <div v-else>
          <el-input v-model="scope.row.totalHours"
          type="number" placeholder="请输入总课时"></el-input>
        </div>
      </template>
      </el-table-column>
    </el-table>
    <!-- <div style="display:inline-block;" v-for="(courseTeacher, index) in courseTeachers" :key="index">
      <div style="display:inline-block;margin:5px 10px;">{{courseTeacher.courseName}}:</div>
      <div style="display:inline-block;margin:5px 10px;" v-if="isVew">{{courseTeacher.teacherName}}</div>
      <div style="display:inline-block;margin:5px 10px;" v-if="isVew">{{courseTeacher.weekHours}}</div>
      <div style="display:inline-block;margin:5px 10px;" v-if="isVew">{{courseTeacher.totalHours}}</div>
      <div style="display:inline-block;margin:5px 10px;" v-if="isVew">
        <el-button type="text">详情</el-button>
      </div>
      <div v-else>
        <el-select v-model="courseTeacher.teacherName" :placeholder="courseTeacher.placeholder">
          <el-option
            v-for="item1 in teachers[courseTeacher.courseId].options"
            :key="item1.value"
            :label="item1.label"
            :value="item1.value">
          </el-option>
        </el-select>
      </div>
    </div> -->
    <el-pagination
      layout="total,prev, pager, next"
      :total="30">
    </el-pagination>
  </div>
</template>

<script>
export default {
  props: [
    'isVew',
    'classId'
  ],
  data () {
    return {
      filter: '全部',
      courseTypes: [{id: 0, name: '全部'}, {id: 1, name: '按国标过滤'}, {id: 0, name: '按校本过滤'}],
      courseTeachers: [{
        courseId: '0',
        courseName: '语文',
        courseType: '国标',
        teacherName: '李天',
        weekHours: 10,
        totalHours: 100,
        placeholder: '请选择语文老师'
      },
      {
        courseId: '1',
        courseName: '数学',
        courseType: '国标',
        teacherName: '王一',
        weekHours: 10,
        totalHours: 100,
        placeholder: '请选择英语老师'
      },
      {
        courseId: '2',
        courseName: '英语',
        courseType: '国标',
        teacherName: '韩梅梅',
        weekHours: 10,
        totalHours: 100,
        placeholder: '请选择数学老师'
      }],
      teachers: {
        '0': [{ value: 1, label: '李天' },
          { value: 2, label: '王一' },
          { value: 3, label: '王芳' }],
        '1': [{ value: 1, label: '李天' },
          { value: 2, label: '王一' },
          { value: 3, label: '王芳' }],
        '2': [{ value: 1, label: '李天' },
          { value: 2, label: '王一' },
          { value: 3, label: '王芳' }]
      }
    }
  }
}
</script>
