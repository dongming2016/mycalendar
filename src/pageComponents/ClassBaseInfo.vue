<template>
  <div>
    <div v-for="(item, index) in items" :key="index" class="item-container">
      <div class="base-info-label">{{item.label}}</div>
      <div v-if="item.type === 'text'" class="input-text">
        <el-input v-model="item.value" :placeholder="item.placeholder"/>
      </div>
      <div v-if="item.type === 'number'" class="input-text" size="small">
        <el-input-number v-model="item.value" :min="item.min" :max="item.max" label="描述文字"></el-input-number>
      </div>
      <div v-else-if="item.type === 'select'" class="input-text">
        <el-select v-model="item.value" :placeholder="item.placeholder">
          <el-option
            v-for="item1 in item.options"
            :key="item1.value"
            :label="item1.label"
            :value="item1.value">
          </el-option>
        </el-select>
      </div>
      <div v-else-if="item.type === 'textarea'" class="input-text">
        <el-input v-model="item.value" :placeholder="item.placeholder">
        </el-input>
      </div>
      <div v-else-if="item.type === 'radio'" class="input-text">
        <el-radio v-model="item.value" label="0">文科</el-radio>
        <el-radio v-model="item.value" label="1">理科</el-radio>
        <el-radio v-model="item.value" label="2">不区分</el-radio>
      </div>
    </div>
  </div>
</template>

<script>
import { ClassService } from '../service/class.service.js'
export default {
  props: {
    classId: ''
  },
  data () {
    return {
      dataInfo: {},
      items: [ {
        label: '年级：',
        type: 'select',
        placeholder: '请输入课程编号',
        value: '一年级',
        options: [ { value: 1, label: '一年级' }, { value: 2, label: '二年级' } ]
      },
      {
        label: '班级：',
        type: 'text',
        placeholder: '请输入课程名称',
        value: '（1）班级'
      },
      {
        label: '状态：',
        type: 'select',
        placeholder: '请输入任课老师',
        value: '正常使用',
        options: [ { value: 1, label: '正常使用' } ]
      },
      {
        label: '文/理科：',
        type: 'radio',
        value: '0'
      },
      {
        label: '教学楼及场地 ：',
        type: 'select',
        placeholder: '请输入所属类别',
        value: '教学楼',
        options: [ { value: 1, label: '教学楼' }, { value: 2, label: '艺体楼' } ]
      },
      {
        label: '教室 ：',
        type: 'select',
        placeholder: '请输入所属类别',
        value: '一年级（1）班',
        options: [ { value: 1, label: '一年级（1）班' }, { value: 2, label: '一年级（2）班' } ]
      },
      {
        label: '描述 ：',
        type: 'textarea',
        placeholder: '请输入所属类别',
        value: '教学楼',
        options: [ { value: 1, label: '教学楼' }, { value: 2, label: '艺体楼' } ]
      } ]
    }
  },
  mounted () {
    this.dataInfo = ClassService.getClassBriefInfo(this.classId)
  }
}
</script>

<style>
.base-info-label {
  display: inline-block;
  width: 105px;
  text-align: right;
}
.item-container .el-input__inner {
  width: 215px;
}
.item-container {
  margin-bottom: 10px;
}
</style>
