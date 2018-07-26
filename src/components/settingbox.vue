<template>
  <div>
    <el-container>
      <el-aside width="200px">
        <classesMenu @clickNode="clickNode"/>
      </el-aside>
      <el-main>
        <settings :name="itemName" :type="type" :phaseType="id"/>
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
    const classTree = JSON.parse(sessionStorage.getItem('classes-tree'))
    this.id = classTree[0].id
    this.itemName = classTree[0].label
  }
}
</script>
