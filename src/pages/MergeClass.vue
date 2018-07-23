<template>
  <div>
    <el-button type="text" @click="dialogVisible=true">合并课堂</el-button>
    <el-dialog :visible.sync="dialogVisible" title="合并课堂">
      <merge-class/>
      <div style="text-align:center;">
        <el-button type="primary" @click="dialogVisible=false">确定</el-button>
        <el-button type="primary" plain @click="dialogVisible=false">取消</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import MergeClass from '../pageComponents/MergeClass'
export default {
  data () {
    return {
      dialogVisible: false
    }
  },
  components: {
    MergeClass
  }
}
</script>
