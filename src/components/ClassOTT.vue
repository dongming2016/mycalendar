<template>
  <!-- 超过了总课时的班级 -->
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>总课时超了的班级</span>
      </div>
      <div v-for="(item,index) in classes" :key="index" class="text item">
        {{item.name }}
        <router-link to="/class-plan"><el-button type="text">去设置课时</el-button></router-link>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  props: {
    classes: {
      default () {
        return {}
      }
    }
  }
}
</script>
