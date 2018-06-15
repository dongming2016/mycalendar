<template>
  <div>
    <!-- <div style="text-align:center;">
      <span>查看方式：</span>
      <el-radio-group v-model="method">
        <el-radio :label="0">按年级</el-radio>
        <el-radio :label="1">按班级</el-radio>
        <el-radio :label="2">按老师</el-radio>
      </el-radio-group>
    </div> -->
    <div style="text-align:center;">
      <div style="display:inline-block;">
        <label>选择年级</label>
        <el-select style="margin:10px;"
        v-model="selectedGrade">

        <el-option
        v-for="item1 in grades"
        :key="item1.id"
          :label="item1.name"
          :value="item1.id"
        />
        </el-select>
      </div>
      <div style="display:inline-block;">
        <label>选择班级</label>
        <el-select style="margin:10px;"
        v-model="selectedClass">

        <el-option
        v-for="item1 in classes"
        :key="item1.id"
          :label="item1.name"
          :value="item1.id"
        />
        </el-select>
      </div>
      <div style="display:inline-block;margin-right:16px;">
        <label>老师姓名</label>
        <el-input style="margin-left:10px;width:300px;" v-model="teacherKey" placeholder="请输入教师名称"/>
      </div>
      <div style="display:inline-block;margin-right:16px;">
        <label>课程名称</label>
        <el-input style="margin-left:10px;width:300px;" v-model="teacherKey" placeholder="请输入课程名称"/>
      </div>
      <el-button type="primary" size="mini">查询</el-button>
    </div>
    <div>
       <el-table
          border
          :data="getPlanOption">
          <el-table-column
            prop="gradeName"
            label="年级"
            />
            <el-table-column
            prop="className"
            label="班级"
            />
            <el-table-column
            prop="teacherName"
            label="老师姓名"
            />
            <el-table-column
            prop="courseName"
            label="课程名称"
            />
            <el-table-column
            prop="totalTimes"
            label="总课时"
            />
            <el-table-column
            prop="weekTimes"
            label="周课时"
            />
       </el-table>
      <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage4"
      :page-sizes="[100, 200, 300, 400]"
      :page-size="100"
      layout="total, sizes, prev, pager, next, jumper"
      :total="400">
    </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      method: 0,
      selectedGrade: '1',
      selectedClass: '1',
      teacherKey: '',
      currentPage4: 1,
      grades: [{id: '1', name: '一年级'}, {id: '2', name: '二年级'}, {id: '3', name: '三年级'}],
      classes: [{id: '1', name: '(1)班'}, {id: '2', name: '（2）班'}, {id: '3', name: '（3）班'}]
    }
  },
  computed: {
    getPlanOption () {
      const GRADES = ['一年级', '二年级', '三年级', '四年级', '五年级', '六年级']
      const COURSES = [ '数学', '语文', '英语', '四年级', '五年级', '六年级' ]
      const TEARCHERS = [ '安华', '李雷', '黄华', '四年级', '五年级', '六年级' ]
      const genPlanOption = (type) => {
        const planOption = []
        for (let i = 0; i < 3; i++) {
          switch (method) {
            case 0:
              planOption.push({gradeName: GRADES[i], className: `一年级(${i + 1})班`, teacherName: TEARCHERS[i], courseName: COURSES[i], totalTimes: 100, weekTimes: 10})
              break
            case 1:
              planOption.push({className: `一年级(${i + 1})班`, courseName: COURSES[i], totalTimes: 100, weekTimes: 10})
              break
            case 2:
              planOption.push({teacherName: TEARCHERS[i], courseName: COURSES[i], totalTimes: 100, weekTimes: 10})
              break
            default:
              break
          }
        }

        return planOption
      }
      const method = this.method

      return genPlanOption()
    }
  },
  methods: {
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
    }
  }
}
</script>
