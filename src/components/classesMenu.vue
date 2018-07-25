<template>
  <div>
    <div class="class-menu-title">学段/年级/班级</div>
    <el-tree :data="classes" highlight-current
    :props="defaultProps"
    node-key="id"
    :default-expanded-keys="[99999]"
    :default-checked-keys="['1']"
    :expand-on-click-node="false"
    @node-click="handleNodeClick"></el-tree>
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
        console.log(data)
      })
  }
}
</script>

<style>
.class-menu-title {
  background: #F6F8FC;
  height: 40px;
  line-height: 40px;
}
</style>
