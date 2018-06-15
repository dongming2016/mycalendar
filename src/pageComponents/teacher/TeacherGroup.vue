<template>
  <div>
    <el-tabs type="border-card">
      <el-tab-pane label="新增教学组">
        <add-group/>
      </el-tab-pane>
      <el-tab-pane label="教学组列表">
        <GroupList/>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import AddGroup from './AddGroup'
import GroupList from './GroupList'
export default {
  components: {
    AddGroup,
    GroupList
  }
}
</script>
