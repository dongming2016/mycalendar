<template>
  <div>
    <div>
      <el-button type="primary" @click="addDomain">新增所属领域</el-button>
      <el-dialog :visible.sync="dialogVisible" :title="title">
        <div style="text-align:center;">
          <div style="margin-bottom:18px;">
          <span style="margin-right:18px;">名称</span>
          <el-input v-model="domain.name" placeholder="请输入名称" style="width:200px;"/>
          </div>
          <div>
            <el-button type="primary" @click="dialogVisible=false">确定</el-button>
            <el-button type="primary" plain @click="dialogVisible=false">取消</el-button>
          </div>
        </div>
      </el-dialog>
    </div>
    <div>
      <el-table :data="domains">
        <el-table-column prop="name" label="名称"/>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button @click="editDomain(scope.row)">编辑</el-button>
            <el-button>删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      title: '',
      dialogVisible: false,
      domain: {name: ''},
      domains: [
        {
          id: 0,
          name: '学科拓展类'
        },
        {
          id: 1,
          name: '实用技能类'
        },
        {
          id: 2,
          name: '科学技术类'
        }
      ]
    }
  },
  methods: {
    addDomain () {
      this.dialogVisible = true
      this.title = '添加课程领域'
      this.domain = {
        name: ''
      }
    },
    editDomain (domain) {
      this.dialogVisible = true
      this.title = '编辑课程领域'
      this.domain = domain
    }
  }
}
</script>
