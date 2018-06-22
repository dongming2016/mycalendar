<template>
  <div>
    <div>
      <el-button type="primary" @click="addCategory">添加类别</el-button>
      <el-dialog :visible.sync="dialogVisible" :title="title">
        <div style="text-align:center;">
           <div style="margin-bottom:18px;">
          <span style="margin-right:18px;">类别名称</span>
          <el-input v-model="category.name" placeholder="请输入类别名称" style="width:200px;" v-if="isEdit"/>
          <el-input style="width:200px;" v-model="category.name" readonly="readonly" v-if="!isEdit"/>
          </div>
          <div style="margin-bottom:18px;">
            <span style="margin-right:18px;">上课时间</span>
            <el-input style="width:200px;" placeholder="请选择上课时间，可多选" v-model="category.time"/>
          </div>
          <div>
            <el-button type="primary" @click="dialogVisible=false">确定</el-button>
            <el-button type="primary" plain @click="dialogVisible=false">取消</el-button>
          </div>
        </div>
      </el-dialog>
    </div>
    <div>
      <el-table :data="categories">
        <el-table-column prop="name" label="名称"/>
        <el-table-column prop="time" label="上课时间"/>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button @click="editCategory(scope.row.id)">编辑</el-button>
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
      isEdit: false,
      category: {
        name: '',
        time: ''
      },
      categories: [
        {
          name: '活动',
          time: '星期一第七节',
          id: 0
        },
        {
          name: '学科',
          time: '星期二第三节',
          id: 0
        }
      ]
    }
  },
  methods: {
    addCategory () {
      this.dialogVisible = true
      this.title = '添加类别'
      this.isEdit = true
      this.category = {
        name: '',
        time: ''
      }
    },
    editCategory (id) {
      this.dialogVisible = true
      this.title = '编辑类别'
      this.isEdit = false
      this.category = this.categories.find(element => {
        return element.id === id
      })
    }
  }
}
</script>
