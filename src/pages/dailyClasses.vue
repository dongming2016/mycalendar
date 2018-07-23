<template>
  <div>
  <div style="text-align:right;">
    <el-select v-model="selectedSchoolYear">
      <el-option v-for="(item, index) in schoolYear"
      :key="index" :label="item.name" :value="item.id"/>
    </el-select>
    <el-select v-model="selectedTerm">
      <el-option v-for="(item, index) in terms"
      :key="index" :label="item.name" :value="item.id"/>
    </el-select>
  </div>
  <div>
    <class-number/>
  </div>
  </div>
</template>

<script>
import classNumber from '../pageComponents/classNumber'
export default {
  data () {
    return {
      selectedSchoolYear: 1,
      selectedTerm: 1,
      schoolYear: [
        {
          id: 1,
          name: '2017-2018学年'
        },
        {
          id: 2,
          name: '2017-2018学年'
        },
        {
          id: 3,
          name: '2017-2018学年'
        }
      ],
      terms: [
        {
          id: 2,
          name: '上学期'
        },
        {
          id: 1,
          name: '下学期'
        }
      ]
    }
  },
  components: {
    classNumber
  }
}
</script>
