<template>
  <div>
    <!-- <div style="text-align:right;">
      <span>过滤：</span>
      <el-select v-model="filter">
        <el-option v-for="(item, index) in courseTypes"
        :key="index"
        :label="item.name"
        :value="item.id"></el-option>
      </el-select>
    </div> -->
    <!-- <div>
      <el-button type="primary" @click="addPlan">添加</el-button>
    </div> -->
    <el-table :data="courseTeachers" style="height:500px" height="500">
      <el-table-column
      label="班级"
      sortable
      prop="className"/>
      <el-table-column
      label="课程名称"
      sortable
      prop="courseName">
      <!-- <template slot-scope="scope">
        <div v-if="!scope.row.isEdit">
          {{scope.row.courseName}}
        </div>
        <div v-else>
          <el-select v-model="scope.row.courseName"
            placeholder="请输入课程名称">
            <el-option
            v-for="item1 in courses"
            :key="item1.value"
            :label="item1.label"
            :value="item1.value">
          </el-option>
          </el-select>
        </div>
      </template> -->
      </el-table-column>
      <!-- <el-table-column
      label="课程类型"
      prop="courseType"/> -->
      <el-table-column
      label="老师姓名"
      prop="teacherName"
      sortable>
      <!-- <template slot-scope="scope">
        <div v-if="!scope.row.isEdit">
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
      </template> -->
      </el-table-column>
      <el-table-column
      label="周课时"
      prop="weekHours"
      sortable>
      <!-- <template slot-scope="scope">
        <div v-if="!scope.row.isEdit">
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
      </template> -->
      </el-table-column>
      <el-table-column
      label="总课时"
      prop="totalHours"
      sortable>
      <!-- <template slot-scope="scope">
        <div v-if="!scope.row.isEdit">
            {{scope.row.totalHours}}
        </div>
        <div v-else>
          <el-input v-model="scope.row.totalHours"
          type="number" placeholder="请输入总课时"></el-input>
        </div>
      </template> -->
      </el-table-column>
            <el-table-column
            label="单双周"
            prop="courseType"
            >
              <!-- <template slot-scope="scope">
                <div v-if="scope.row.isEdit">

                </div>
                <el-select v-model="scope.row.courseType">
                <el-option
                  v-for="item in courseTypes"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
                </el-select>
              </template> -->
            </el-table-column>
            <el-table-column
            label="连课"
            prop="serialNum"
            >
            <!-- <template slot-scope="scope">
                <el-select v-model="scope.row.serialNum">
                <el-option
                  v-for="item in serialNums"
                  :key="item"
                  :label="item"
                  :value="item">
                </el-option>
                </el-select>
              </template> -->
            </el-table-column>
            <el-table-column
            label="排课方式"
            prop="isAuto"
            >
            </el-table-column>
            <el-table-column
            label="不排课设置"
            prop="noCourseTime"
            >
              <!-- <template slot-scope="scope">
                <el-input @focus="scope.row.isNotArrange=true" v-model="scope.row.noCourseTime" placeholder="请选择不排课时间">
                <i slot="prefix" @click="scope.row.isNotArrange=true" class="el-input__icon el-icon-date"></i>
                </el-input>
                <div v-show="scope.row.isNotArrange" class="tooltips">
                  <ClockTime/>
                  <footer style="text-align: right;
                          margin-top: 20px;">
                    <el-button type="text" @click="scope.row.isNotArrange=false">确定</el-button>
                    <el-button type="text" style="color:#ddd;" @click="scope.row.isNotArrange=false">取消</el-button>
                  </footer>
                </div>
              </template> -->
            </el-table-column>
            <el-table-column
            label="优先排课设置"
            prop="priorityTime"
            >
            <!-- <template slot-scope="scope">
              <el-input @focus="scope.row.isPriority=true" v-model="scope.row.noCourseTime" placeholder="请选择不排课时间">
                <i slot="prefix" @click="scope.row.isPriority=true" class="el-input__icon el-icon-date"></i>
              </el-input>
              <div v-show="scope.row.isPriority" class="tooltips">
                  <ClockTime/>
                  <footer style="text-align: right;
                          margin-top: 20px;">
                    <el-button type="text" @click="scope.row.isPriority=false">确定</el-button>
                    <el-button type="text" style="color:#ddd;" @click="scope.row.isPriority=false">取消</el-button>
                  </footer>
                </div>
            </template> -->
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <div>
                <el-button type="text" @click="edit(scope.row)">编辑</el-button>
                <el-button type="text">删除</el-button>
              </div>
              <!-- <div v-else>
                <el-button type="text" @click="scope.row.isEdit=false">确定</el-button>
                <el-button type="text" style="color:#ddd;" @click="scope.row.isEdit=false">取消</el-button>
              </div> -->
            </template>
          </el-table-column>
    </el-table>
    <el-pagination
      layout="total,prev, pager, next"
      :total="30">
    </el-pagination>

    <el-dialog :visible.sync="dialogVisible">
      <class-plan :isEditable="isEditable" :isNew="isNew" :title="title" :classPlan="classPlan"/>
      <div style="text-align:center;">
        <el-button type="primary" @click="dialogVisible=false">确定</el-button>
        <el-button @click="dialogVisible=false">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import ClockTime from '../components/clockTime'
import ClassPlan from './ClassPlan'
export default {
  props: [
    'isVew',
    'classId'
  ],
  data () {
    return {
      filter: '全部',
      courseTypes: [{id: 1, name: '全排'}, {id: 2, name: '单周'}, {id: 3, name: '双周'}],
      mergeType: [{id: 1, name: '不允许'}, {id: 2, name: '允许'}],
      autoType: [{id: 1, name: '是'}, {id: 2, name: '否'}],
      serialNums: 2,
      dialogVisible: false,
      isNew: false,
      isEditable: false,
      title: '',
      classPlan: {},
      // courseTypes: [{id: 0, name: '全部'}, {id: 1, name: '按国标过滤'}, {id: 0, name: '按校本过滤'}],
      courseTeachers: [{
        courseId: '0',
        courseName: '语文',
        courseType: '单周',
        teacherName: '李天',
        weekHours: 10,
        totalHours: 100,
        isNotArrange: false,
        isPriority: false,
        serialNum: '2',
        noCourseTime: '第一节课',
        priorityTime: '第二节课',
        isEdit: false,
        isAuto: '自动排课',
        placeholder: '请选择语文老师',
        className: '一年级一班'
      },
      {
        courseId: '1',
        courseName: '数学',
        courseType: '双周',
        teacherName: '王一',
        serialNum: '2',
        weekHours: 10,
        totalHours: 100,
        noCourseTime: '第一节课',
        priorityTime: '第二节课',
        isNotArrange: false,
        isPriority: false,
        isEdit: false,
        isAuto: '自动排课',
        placeholder: '请选择英语老师',
        className: '一年级一班'
      },
      {
        courseId: '2',
        courseName: '英语',
        courseType: '全排',
        teacherName: '韩梅梅',
        serialNum: '2',
        weekHours: 10,
        totalHours: 100,
        isNotArrange: false,
        isPriority: false,
        noCourseTime: '第一节课',
        priorityTime: '第二节课',
        isEdit: false,
        isAuto: '手动排课',
        placeholder: '请选择数学老师',
        className: '一年级一班'
      }],
      courses: [
        {
          id: 1,
          name: '音乐'
        },
        {
          id: 2,
          name: '手工'
        },
        {
          id: 3,
          name: '国画'
        },
        {
          id: 4,
          name: '数学'
        },
        {
          id: 5,
          name: '英语'
        },
        {
          id: 6,
          name: '语文'
        }
      ],
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
  },
  components: {
    ClockTime,
    ClassPlan
  },
  methods: {
    edit (classPlan) {
      this.dialogVisible = true
      this.isNew = false
      this.isEditable = true
      this.classPlan = classPlan
    }
  }
}
</script>

<style scoped>
.tooltips {
  position: absolute;
  z-index: 2;
  left:-55px;
}
</style>
