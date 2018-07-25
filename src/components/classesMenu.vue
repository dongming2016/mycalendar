<template>
  <div>
    <el-tree :data="classes" highlight-current :props="defaultProps" @node-click="handleNodeClick"></el-tree>
  </div>
</template>

<script>
import classUtil from '../util/classUtil.js'
export default {
  data () {
    return {
      classes: [],
      defaultProps: {
        children: 'children',
        label: 'label',
        type: 'type'
      }
    }
  },
  methods: {
    handleNodeClick (data) {
      this.$emit('clickNode', data)
    }
  },
  mounted () {
    // console.log(classUtil.getTreeClasses())
    classUtil.getTreeClasses()
      .then(data => {
        this.classes = data
      })
  }
}
</script>
