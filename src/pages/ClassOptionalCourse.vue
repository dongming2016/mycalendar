<template>
  <div>
    <common-header :teacher="teacher"/>
    <filter-component/>
    <class-optional-table/>
  </div>
</template>

<script>
import CommonHeader from '../pageComponents/CommonHeader'
import FilterComponent from '../pageComponents/FilterComponent'
import ClassOptionalTable from '../pageComponents/ClassOptionalTable'
export default {
  data () {
    return {
      teacher: '小李'
    }
  },
  components: {
    CommonHeader,
    FilterComponent,
    ClassOptionalTable
  }
}
</script>
