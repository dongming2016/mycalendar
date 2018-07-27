<template>
  <div>
    <div class="step1-container">
      <div class="step-title">第一步：选择课程</div>
      <div class="search-box">
        <el-input v-model="searchCourse" placeholder="输入课程名称" clearable prefix-icon="el-icon-search">
        </el-input>
      </div>
      <div>
        <div v-for="(item, index) in courses" :key="index" class="course-item"
        :class="{'course-active-item': activeIndex === index}" @click="clickCourse(item, index)">
          {{item.courseName}}
        </div>
      </div>
    </div>
    <div class="step2-container">
      <div class="direction">
        <span class="el-icon-arrow-right step-arrow-right"></span>
      </div>
      <div style="display:inline-block;">
        <div class="step-title">第二步：选择班级</div>
        <div class="class-teacher-container" v-if="selectedCourse.classes.length > 0">
          <el-checkbox-group @change="checkClass" v-model="checkedClasses">
            <el-checkbox class="class-item"
            v-for="(item, index) in selectedCourse.classes" :key="index" :label="item">
              {{item.className}}（{{transformTeacher(item.teachers)}}）
            </el-checkbox>
          </el-checkbox-group>
        </div>
        <div v-else class="class-teacher-container">
          没有需要合并的班级
        </div>
      </div>
    </div>
    <div class="operation">
      <span class="el-icon-arrow-right step-arrow-right"></span>
      <div>
        <div>
          <el-button type="primary" plain :disabled="!isMergable" @click="mergeClass">
            合并班级
            <i class="el-icon-arrow-right"></i>
          </el-button>
        </div>
        <div style="margin-top:20px;">
          <el-button type="primary" plain :disabled="!isSplitable"  @click="splitClass">
            <i class="el-icon-arrow-left"></i>
            拆分班级
          </el-button>
        </div>
      </div>
       <span class="el-icon-arrow-right step-arrow-right"></span>
    </div>
    <div class="step3-container" >
      <div class="step-title">已合并班级</div>
      <div class="class-teacher-container" v-if="selectedCourse.mergedClasses.length > 0">
        <el-checkbox-group v-model="checkedMergedClasses" @change="checkMergedClass">

          <el-checkbox class="class-item" v-for="(mergedClass, index) in selectedCourse.mergedClasses" :key="index" :label="mergedClass">
            <!-- {{mergedClass}} -->
            <span v-for="(item, index) in mergedClass.classes" :key="index">
              {{item.className}}（{{transformTeacher(item.teachers)}}）
              <span v-if="index < mergedClass.classes.length - 1">/ </span>
            </span>
          </el-checkbox>
        </el-checkbox-group>
      </div>
      <div v-else  class="class-teacher-container">
        不存在已合并的班级
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      searchCourse: '',
      selectedTeacher: '0',
      activeIndex: 0,
      checkedClasses: [], // 选中的待合并班级
      checkedMergedClasses: [], // 选中的合并了的班级
      courses: [
        {
          id: 1,
          courseName: '音乐',
          classes: [
            {id: 1, className: '一年级一班', teachers: [{id: 1, teacherName: '李明'}]},
            {id: 2, className: '一年级二班', teachers: [{id: 1, teacherName: '李明'}]}
          ],
          mergedClasses: []
        },
        {
          id: 2,
          courseName: '体育',
          classes: [
            {id: 1, className: '一年级一班', teachers: [{id: 1, teacherName: '黄明'}]},
            {id: 2, className: '一年级二班', teachers: [{id: 1, teacherName: '黄明'}]}
          ],
          mergedClasses: []
        }
      ],
      isSplitable: false,
      selectedCourse: {},
      isMergable: false,
      isTipsShow: false
    }
  },
  created () {
    this.selectedCourse = this.courses[0]
  },
  beforeDestroy () {
    this.commitSettings()
  },
  watch: {
    '$store.getters.getSaveState' () {
      this.commitSettings()
    }
  },
  methods: {
    clickCourse (course, index) {
      this.activeIndex = index
      this.selectedCourse = course
    },
    commitSettings () {
      const mergedClasses = this.mergedClasses
      this.$store.commit('setArrangeSettings', {type: 'mergeClasses', setting: mergedClasses})
    },
    mergeClass () {
      const classes = this.checkedClasses
      const id = this.selectedCourse.id + '_' + this.selectedCourse.mergedClasses.length
      const mergedClass = {id, classes}
      this.selectedCourse.classes = this.selectedCourse.classes.filter(element => {
        const select = classes.find(el => {
          return el.id === element.id
        })
        return !select
      })
      this.selectedCourse.mergedClasses.push(mergedClass)
      this.checkedClasses = []
      this.isMergable = false
    },
    checkMergedClass () {
      console.log('hh')
      this.isSplitable = true
    },
    checkClass () {
      this.isMergable = this.checkedClasses.length > 1
    },
    splitClass () {
      this.checkedMergedClasses.forEach(element => {
        Array.prototype.push.apply(this.selectedCourse.classes, element.classes)
      })

      console.log(this.selectedCourse.classes)
      this.selectedCourse.mergedClasses = this.selectedCourse.mergedClasses.filter(element => {
        const select = this.selectedCourse.mergedClasses.find(el => {
          return el.id === element.id
        })
        return !select
      })
      this.checkedMergedClasses = []
      this.isSplitable = false
    },
    transformTeacher (teachers) {
      return teachers.map(element => {
        return element.teacherName
      }).join('、')
    }
  }
}
</script>

<style>
.direction,
.operation,
.step3-container,
.step2-container,
.step1-container {
  height: 300px;
  padding-right: 10px;
  border-right: 1px solid #eee;
  display: inline-block;
  text-align: center;
}
.direction,
.operation {
  vertical-align: top;
  display: inline-flex;
  align-items: center;
}
.direction {
  border: none;
}
.step-arrow-right {
  font-size: 24px;
  font-weight: 500;
  margin: 0 20px;
}
.step1-container {
  width: 150px;
}
.step2-container {
  vertical-align: top;
  width: 250px;
}
.step3-container {
  vertical-align: top;
  border: none;
  width: 300px;
}
.step2-container .el-checkbox+.el-checkbox {
  margin-left: 0;
}
.course-active-item {
  background: #409EFF;
  color: #fff;
  border-radius: 20px;
}
.course-item {
  height: 30px;
  line-height: 30px;
  width: 140px;
  margin: 10px auto;
}
.class-item {
  display: block;
  margin: 10px auto;
}
.search-box {
  margin-top: 20px;
}
.step-title {
  color: #F8A762;
  width: 100px;
}
.class-teacher-container {
  margin-top: 20px;
}
</style>
