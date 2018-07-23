<template>
  <div style="text-align:right;">
    <div>{{teacher}}</div>
    <div>
      选择学年学期：
      <el-select v-model="term">
        <el-option v-for="(item, index) in terms"
        :key="index" :label="item.name" :value="item.id"/>
      </el-select>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    teacher: String
  },
  data () {
    return {
      term: '2017-2018学年第一学期',
      terms: [
        {
          id: 1,
          name: '2016-2017学年第二学期'
        },
        {
          id: 2,
          name: '2016-2017学年第一学期'
        },
        {
          id: 3,
          name: '2015-2016学年第二学期'
        }
      ]
    }
  }
}
</script>
