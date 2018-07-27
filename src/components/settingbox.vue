<template>
  <div>
    <el-container>
      <el-aside width="200px">
        <classesMenu @clickNode="clickNode"/>
      </el-aside>
      <el-main>
        <settings :name="itemName" :type="type" :phaseType="id" :save="save"/>
        <div class="dialog-footer">
          <el-button class="save-button" @click="saveSetting">保存设置</el-button>
          <el-button class="preview-button" @click="$emit('preview-schedule')">预览课表</el-button>
        </div>
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
      itemName: '',
      save: false
    }
  },
  methods: {
    clickNode (data) {
      this.id = data.id
      this.type = data.type
      this.itemName = data.label
    },
    saveSetting () {
      console.log(this.$store.getters.getArrangeSettings)
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

<style>
.dialog-footer {
  text-align: center;
  margin-top: 20px;
}
.preview-button {
  background: #67C23A;
}
.save-button {
  background: #409EFF;
}
.preview-button,
.save-button{
  color: #fff;
}
</style>
