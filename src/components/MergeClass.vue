<template>
    <div>
    <div style="margin-bottom:20px;">
      <!-- <div v-for="(item, index) in getCourses" :key="index">
        {{item.courseName}}
      </div> -->
      <span>课程</span>
      <el-tabs tab-position="left" :before-leave="checkSelected" style="height: 200px;">
        <el-tab-pane v-for="(item, index) in getCourses" :key="index" :label="item.courseName">
           <el-transfer ref="transfer"
            style="text-align: left; margin-left:20px; display: inline-block"
            v-model="item.mergedCourses"
            :props="{
              key: 'id',
              label: 'name'
            }"
            :format="{
              noChecked: '${total}',
              hasChecked: '${checked}/${total}'
            }"
            @left-check-change="change"
            @change="handleChange"
            :titles="['待合并课堂', '已合并课堂']"
            :data="item.classes">
          </el-transfer>
        </el-tab-pane>
      </el-tabs>
      <span v-show="!isTipsShow" style="margin-left:20px;color:red;">请至少选择两个课堂合并</span>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      selectedTeacher: '0',
      teachers: [{id: '0', name: '张丽萍'}, {id: '1', name: '李希'}],
      courses: {
        '0': [
          {
            id: 1,
            courseName: '音乐',
            mergedCourses: [],
            classes: [{id: 1, name: '音乐/一年级（1）班'}, {id: 2, name: '音乐/一年级（2）班'}]
          },
          {
            id: 2,
            courseName: '艺术',
            mergedCourses: [],
            classes: [{id: 1, name: '艺术/一年级（1）班'}, {id: 2, name: '艺术/一年级（2）班'}]
          },
          {
            id: 3,
            courseName: '手工',
            mergedCourses: [],
            classes: [{id: 1, name: '手工/一年级（1）班'}, {id: 2, name: '手工/一年级（2）班'}]
          }],
        '1': [
          {
            id: 4,
            courseName: '数学',
            mergedCourses: [],
            classes: [{id: 1, name: '数学/一年级（1）班'}, {id: 2, name: '数学/一年级（2）班'}]
          },
          {
            id: 5,
            courseName: '英语',
            mergedCourses: [],
            classes: [{id: 1, name: '英语/一年级（1）班'}, {id: 2, name: '英语/一年级（2）班'}]
          },
          {
            id: 6,
            courseName: '语文',
            mergedCourses: [],
            classes: [{id: 1, name: '语文/一年级（1）班'}, {id: 2, name: '语文/一年级（2）班'}]
          }
        ]
      },
      isMergable: true,
      isTipsShow: false
    }
  },
  computed: {
    getCourses () {
      return this.courses[this.selectedTeacher]
    }
  },
  methods: {
    change (option) {
      console.log(option)
      console.log(this.$refs.transfer)
      this.isMergable = option.length !== 1
    },
    handleChange (value, direction, movedKeys) {
      console.log(value, direction, movedKeys)
    },
    checkSelected () {
      this.isTipsShow = this.isMergable
      return this.isTipsShow
    }
  }
}
</script>
