<template>
  <div>
    <div style="margin-bottom:18px;">
      <el-button type="primary" @click="addItem">添加日程</el-button>
    </div>
    <div style="text-align:right;">
      <el-radio-group v-model="filter" style="margin-bottom: 20px;">
        <el-radio-button label="all">全部作息</el-radio-button>
        <el-radio-button label="classTime">上课时间</el-radio-button>
        <el-radio-button label="notClassTime">课间活动</el-radio-button>
      </el-radio-group>
    </div>
    <div>
      <el-table :data="getTimetableData">
        <el-table-column
        prop="phase"
        label="时段"/>
        <el-table-column
        prop="itemName"
        label="名称"/>
        <el-table-column
        prop="type"
        label="类型"/>
        <el-table-column
        prop="startTime"
        label="开始时间"/>
        <el-table-column
        prop="endTime"
        label="结束时间"/>
        <el-table-column
        prop="timeLength"
        label="时长（分）"/>
        <el-table-column
        prop="note"
        label="备注"/>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="editItem(scope.row.id)">编辑</el-button>
            <el-button type="primary" size="mini" @click="deleteItem(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        layout="total, prev, pager, next"
        :total="15">
      </el-pagination>
    </div>
    <el-dialog :title="title" :visible.sync="dialogVisible" class="class-setting">
      <div class="item-container">
        <span class="label">时段</span>
        <el-select v-model="selectedPhase">
          <el-option v-for="(item, index) in phases" :key="index"
           :label="item.name"
          :value="item.id">
          </el-option>
        </el-select>
      </div>
      <div class="item-container">
        <span class="label">名称</span>
        <el-input style="width:300px;" v-model="itemName"/>
      </div>
      <div class="item-container">
        <span class="label">类型</span>
        <el-input style="width:300px;" v-model="itemType"/>
      </div>
      <div class="item-container">
        <span class="label">开始时间</span>
        <el-time-picker
          v-model="startTime"
          :picker-options="{
            selectableRange: '6:00:00 - 23:00:00'
          }"/>
      </div>
      <div class="item-container">
        <span class="label">结束时间</span>
        <el-time-picker
          v-model="endTime"
          :picker-options="{
            selectableRange: '6:00:00 - 23:00:00'
          }"/>
      </div>
      <div class="item-container">
        <span class="label">备注</span>
        <el-input style="width:300px;" v-model="note"/>
      </div>
      <div style="text-align:center;">
        <el-button type="primary" @click="dialogVisible=false">确定</el-button>
        <el-button type="primary" plain @click="dialogVisible=false">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      filter: 'all',
      selectedPhase: '早晨',
      itemName: '',
      itemType: '',
      startTime: '',
      endTime: '',
      note: '',
      title: '添加日程',
      dialogVisible: false,
      phases: [
        {id: 0, name: '早晨'}, {id: 1, name: '上午'}, {id: 2, name: '下午'}, {id: 3, name: '晚上'} ]
    }
  },
  methods: {
    addItem () {
      this.title = '添加日程'
      this.dialogVisible = true
    },
    editItem () {
      this.title = '编辑日程'
      this.dialogVisible = true
    },
    deleteItem (id) {
    }
  },
  computed: {
    getTimetableData () {
      return [{
        phase: '早晨',
        itemName: '早自习',
        type: '上课',
        startTime: '6:30',
        endTime: '7:15',
        timeLength: '45',
        note: ''},
      {
        phase: '早晨',
        itemName: '早饭',
        type: '课间活动',
        startTime: '7:15',
        endTime: '8:00',
        timeLength: '45',
        note: ''},
      {
        phase: '上午',
        type: '上课',
        itemName: '第一节课',
        startTime: '8:00',
        endTime: '8:45',
        timeLength: '45',
        note: ''},
      {
        phase: '上午',
        type: '上课',
        itemName: '第二节课',
        startTime: '9:00',
        endTime: '9:45',
        timeLength: '45',
        note: ''},
      {
        phase: '上午',
        type: '上课',
        itemName: '第三节课',
        startTime: '10:00',
        endTime: '10:45',
        timeLength: '45',
        note: ''}
      ]
    }
  }
}
</script>

<style scoped>
.label {
  display: inline-block;
  width: 80px;
  text-align: right;
  margin:10px 10px;
}
.item-container {
  margin-bottom: 20px;
}
</style>
