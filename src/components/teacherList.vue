<template>
  <div>
    <div class="class-menu-title">老师</div>
    <div class="teacher-list">
      <div class="teacher-item" v-for="(item, index) in teachers" :key="index"
      :class="{'active': activeIndex === index}" @click="clickItem(item, index)">
        {{item.ucName}}
      </div>
    </div>
  </div>
</template>

<script>
import baseService from '../service/base.service.js'
export default {
  data () {
    return {
      teachers: [],
      activeIndex: 0
    }
  },
  mounted () {
    this.getTeachers()
  },
  methods: {
    getTeachers () {
      baseService.getTeachers()
        .then(({data}) => {
          this.teachers = data.data
        })
    },
    clickItem (teacher, index) {
      console.log(teacher)
      this.$emit('click-teacher', teacher)
      this.activeIndex = index
    }
  }
}
</script>
