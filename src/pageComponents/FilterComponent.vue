<template>
  <div>
    <div>
      <!-- <div class="filter-item">
        年级：
        <el-select v-model="selectedGrade">
          <el-option v-for="(item, index) in grades"
          :key="index" :label="item.name" :value="item.id"/>
        </el-select>
      </div> -->
      <div class="filter-item">
        班级：
        <el-select v-model="selectedClass">
          <el-option v-for="(item, index) in classes"
          :key="index" :label="item.name" :value="item.id"/>
        </el-select>
      </div>
      <div class="filter-item">
        课程名称：
        <el-select v-model="selectedCourse">
          <el-option v-for="(item, index) in courses"
          :key="index" :label="item.name" :value="item.id"/>
        </el-select>
      </div>
      <div class="filter-item">
        老师姓名：
        <el-select v-model="selectedTeacher">
          <el-option v-for="(item, index) in teachers"
          :key="index" :label="item.name" :value="item.id"/>
        </el-select>
      </div>
      <div class="filter-item">
        学生姓名：
        <el-select filterable remote v-model="selectedStudent">
          <el-option v-for="(item, index) in students"
          :key="index" :label="item.name" :value="item.id"/>
        </el-select>
      </div>
    </div>
    <div style="text-align:center;margin:20px 0;">
      <el-button type="primary">查询</el-button>
      <el-button type="primary" plain>重置</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      selectedCourse: '手工',
      selectedGrade: '一年级（1）班',
      selectedClass: '',
      selectedStudent: '',
      selectedTeacher: '',
      grades: [
        {
          id: 1,
          name: '一年级'
        },
        {
          id: 2,
          name: '二年级'
        },
        {
          id: 3,
          name: '三年级'
        }
      ],
      classes: [
        {
          id: 1,
          name: '一年级（1）班'
        },
        {
          id: 2,
          name: '二年级（1）班'
        },
        {
          id: 3,
          name: '三年级（1）班'
        }
      ],
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
        }
      ],
      teachers: [
        {
          id: 1,
          name: '张三'
        },
        {
          id: 2,
          name: '李四'
        },
        {
          id: 3,
          name: '王五'
        }
      ],
      students: [
        {
          id: 1,
          name: '小明'
        },
        {
          id: 2,
          name: '小芳'
        },
        {
          id: 3,
          name: '小美'
        }
      ]
    }
  }
}
</script>

<style>
.filter-item {
  display: inline-block;
  width: 25%;
  margin: 20px 0;
}
</style>
