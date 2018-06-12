<template>
   <el-table
    border
    :data="optionalCourseData">
    <el-table-column type="expand">
      <template slot-scope="props">
        <el-form label-position="left" inline class="demo-table-expand">
          <el-form-item label="课程编号">
            <span>{{ props.row.classCode }}</span>
          </el-form-item>
          <el-form-item label="课程名称">
            <span>{{ props.row.className }}</span>
          </el-form-item>
          <el-form-item label="任课教师">
            <span>{{ props.row.teacherName }}</span>
          </el-form-item>
          <el-form-item label="所属类别">
            <span>{{ props.row.category }}</span>
          </el-form-item>
          <el-form-item label="学科名称">
            <span>{{ props.row.courseName }}</span>
          </el-form-item>
          <el-form-item label="课时安排">
            <span>{{ props.row.courseTimes }}</span>
          </el-form-item>
          <el-form-item label="学生选修条件">
            <span>{{ props.row.condition }}</span>
          </el-form-item>
          <el-form-item label="设备及场地">
            <span>{{ props.row.site }}</span>
          </el-form-item>
          <el-form-item label="考核要求">
            <span>{{ props.row.testMethod }}</span>
          </el-form-item>
          <el-form-item label="科目限选">
            <span>{{ props.row.number }}</span>
          </el-form-item>
          <el-form-item label="每班限选">
            <span>{{ props.row.studentsNum }}</span>
          </el-form-item>
        </el-form>
      </template>
    </el-table-column>
    <el-table-column
      label="课程名称"
      prop="className">
    </el-table-column>
    <el-table-column
      label="任课教师"
      prop="teacherName">
    </el-table-column>
    <el-table-column
      label="限选人数"
      prop="number"/>
    <el-table-column
      label="已选人数"
      prop="selectedNumber"
      v-if="!isEdit"/>
    <el-table-column
      label="操作" width="200">
      <template slot-scope="props">
        <el-button type="primary" icon="el-icon-view" size="mini" @click="viewCourse(props.row.id, props.row.className)">{{viewLabel}}</el-button>
        <el-button v-if="isEditable" type="primary" icon="el-icon-edit" @click="editCourse(props.row.id)" size="mini"></el-button>
        <el-button v-if="isEditable" type="primary" icon="el-icon-delete" size="mini" @click="deleteCourse(props.row.id)"></el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  props: {
    isEditable: {
      default () {
        return true
      }
    },
    isEdit: {
      default () {
        return true
      }
    },
    viewLabel: '',
    viewCallBack: {
      type: Function
    },
    editCallback: {
      type: Function
    }
  },
  data () {
    return {
      optionalCourseData: [
        {
          id: 1,
          classCode: 'xxx123',
          className: '国画鉴赏',
          teacherName: '黄方明',
          category: '学科',
          courseName: '艺术',
          courseTimes: '18',
          condition: '一五级，六年级',
          site: '美术楼',
          testMethod: '考核',
          number: 40,
          studentsNum: 2
        }
      ]
    }
  },
  methods: {
    editCourse (courseId) {
      if (this.editCallback) {
        this.editCallback(courseId)
      }
    },
    deleteCourse (courseId) {
      console.log(courseId)
    },
    viewCourse (courseId, courseName) {
      if (this.viewCallBack) {
        this.viewCallBack(courseId, courseName)
        this.$emit('viewCourse', {courseId, courseName})
      }
    }
  }
}
</script>
