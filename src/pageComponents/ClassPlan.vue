<template>
  <div>
    <el-form ref="form" :rules="rules" :model="classPlan" label-width="80px">
      <el-form-item label="课程名称">
        <span v-if="!isNew">{{classPlan.courseName}}</span>
        <el-select v-else v-model="classPlan.courseName"
            placeholder="请输入课程名称">
            <el-option
            v-for="item1 in courses"
            :key="item1.value"
            :label="item1.label"
            :value="item1.value">
          </el-option>
          </el-select>
      </el-form-item>
      <el-form-item label="老师姓名" prop="teacherName">
        <span v-if="!isEditable">{{classPlan.teacherName}}</span>
        <el-select style="width:300px;" v-else v-model="classPlan.teacherName"
            placeholder="请输入老师姓名">
            <el-option
            v-for="item1 in teachers[classPlan.courseId]"
            :key="item1.value"
            :label="item1.label"
            :value="item1.value">
          </el-option>
          </el-select>
      </el-form-item>
      <el-form-item label="周课时" prop="weekHours">
        <span v-if="!isEditable">{{classPlan.weekHours}}</span>
        <el-input v-else v-model="classPlan.weekHours" type="number"/>
      </el-form-item>
      <el-form-item label="总课时" prop="totalHours">
        <span v-if="!isEditable">{{classPlan.totalHours}}</span>
        <el-input v-else v-model="classPlan.totalHours" type="number"/>
      </el-form-item>
      <el-form-item label="单双周">
        <span v-if="!isEditable">{{classPlan.courseType}}</span>
        <el-radio v-model="classPlan.courseType" label="全排">全排</el-radio>
        <el-radio v-model="classPlan.courseType" label="单周">单周</el-radio>
        <el-radio v-model="classPlan.courseType" label="双周">双周</el-radio>
      </el-form-item>
      <el-form-item label="连课">
        <span v-if="!isEditable">{{classPlan.serialNum}}</span>
        <el-radio v-model="classPlan.serialNum" label="1">1</el-radio>
        <el-radio v-model="classPlan.serialNum" label="2">2</el-radio>
        <el-radio v-model="classPlan.serialNum" label="3">3</el-radio>
        <el-radio v-model="classPlan.serialNum" label="4">4</el-radio>
      </el-form-item>
      <el-form-item label="自动排课">
        <span v-if="!isEditable">{{classPlan.isAuto}}</span>
        <el-radio v-model="classPlan.isAuto" label="自动排课">自动排课</el-radio>
        <el-radio v-model="classPlan.isAuto" label="手动排课">手动排课</el-radio>
      </el-form-item>
      <el-form-item label="不排课设置">
        <span v-if="!isEditable">{{classPlan.courseName}}</span>
        <el-input @focus="isNotArrangeVisible=true" v-model="classPlan.noCourseTime" placeholder="请选择不排课时间,可多选">
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
      </el-form-item>
      <el-form-item label="优先排课设置">
        <el-input @focus="isPriorityVisible=true" v-model="classPlan.priorityTime" placeholder="请选择优先排课时间,可多选">
          <i slot="prefix" @click="isPriorityVisible=true" class="el-input__icon el-icon-date"></i>
        </el-input>
        <div v-show="isPriorityVisible" class="tooltips">
            <ClockTime/>
            <footer style="text-align: right;
                    margin-top: 20px;">
              <el-button type="text" @click="isPriority=false">确定</el-button>
              <el-button type="text" style="color:#ddd;" @click="isPriority=false">取消</el-button>
            </footer>
          </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import ClockTime from '../components/clockTime'
export default {
  props: {
    classPlan: {
      default () {
        return {}
      }
    },
    isNew: {
      default () {
        return false
      }
    },
    isEditable: {
      default () {
        return false
      }
    },
    title: {
      default () {
        return ''
      }
    }
  },
  data () {
    return {
      rules: {
        teacherName: [
          { required: true, message: '请选择老师', trigger: 'blur' }
        ],
        weekHours: [
          { required: true, message: '请设置周课时', trigger: 'blur' }
        ],
        totalHours: [
          { required: true, message: '请设置总课时', trigger: 'blur' }
        ]
      },
      priorityTime: '',
      isPriorityVisible: false,
      isNotArrangeVisible: false,
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
    ClockTime
  }
}
</script>

<style>
.el-form-item>label {
  width: 120px !important;
}
.el-form-item__content {
  margin-left: 130px !important;
  width: 300px;
}
</style>
