<template>
  <div>
    <el-container>
      <el-aside width="200px">
        <classesMenu @clickNode="clickNode"/>
      </el-aside>
      <el-main>
        <settings :name="itemName" :type="type"/>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import classesMenu from './classesMenu'
import settings from './settings'
export default {
  components: {
    classesMenu,
    settings
  },
  data () {
    return {
      type: 'phase',
      id: '',
      itemName: ''
    }
  },
  methods: {
    clickNode (data) {
      this.id = data.id
      this.type = data.type
      this.itemName = data.label
    }
  },
  mounted () {
    this.itemName = '小学'
  }
}
</script>
