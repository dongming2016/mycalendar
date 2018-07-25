<template>
  <!-- 教研活动 -->
  <div>
    <el-button type="text" @click="dialogVisible = true">教研活动设置</el-button>
    <el-dialog title="教研活动设置" :visible.sync="dialogVisible" class="research-setting">
      <el-tabs type="border-card">
      <el-tab-pane label="添加教研活动">
        <div>
          <div v-show="!isWeekShow" style="text-align:center;">
            <div><span>教研活动名称：</span><el-input  style="margin-top:8px;margin-left:8px;width:200px;" v-model="researchName"/></div>
            <div><span>教研活动描述：</span><el-input style="margin-top:8px;margin-left:8px;width:200px;" v-model="researchDesc"/></div>
            <div style="display:inline-block;margin-top:10px;margin-left:-180px;"><span>选择老师：</span>
            <div style="margin:20px;margin-left: 170px;">
              <el-checkbox-group style="display:block;" v-model="checkedTeachers">
                <el-checkbox v-for="item in teachers"
                :key="item.id"
                :label="item.name">
                {{item.name}}
                </el-checkbox>
              </el-checkbox-group>
            </div>
            </div>
            <div><span>选择时间：</span>
            <el-input style="width:200px" @focus="isWeekShow=true" v-model="activityTime" placeholder="请选择活动时间">
              <i slot="prefix" @click="isWeekShow=true" class="el-input__icon el-icon-date"></i>
            </el-input></div>
            <div style="text-align:center;margin-top:20px;">
              <el-button type="primary" @click="OK">确定</el-button>
              <el-button @click="dialogVisible=false">取消</el-button>
            </div>
          </div>
          <div v-show="isWeekShow">
            <div>活动时间设置</div>
            <WeekTemplate
            :events="activityEvents"
            :options="options" :currentWeek="currentWeek" ref="Week"/>
            <footer style="text-align: center;
                        margin-top: 20px;">
              <el-button type="primary" @click="isWeekShow=false">确定</el-button>
              <el-button @click="isWeekShow=false">取消</el-button>
            </footer>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="教研活动列表">
        <el-row :gutter="20">
          <el-col :span="4">
            <el-button type="primary" size="mini">批量删除</el-button>
            <el-collapse v-model="activeNames">
            <el-collapse-item v-for="(item, index) in activities" :key="index" :title="item.researchName" :name="item.id">
              <div>{{item.researchDesc}}</div>
              <div><el-tag
                  v-for="tag in item.teachers"
                  :key="tag.id"
                  closable>
                  {{tag.name}}
                </el-tag></div>
            </el-collapse-item>
          </el-collapse>
          </el-col>
          <el-col :span="20">
            <WeekTemplate
            :events="activityEvents"
            :options="options" :currentWeek="currentWeek" ref="Week"/>
          </el-col>
        </el-row>
        <div style="text-align:center;margin-top:20px;">
          <el-button type="primary" @click="OK">确定</el-button>
          <el-button @click="dialogVisible=false">取消</el-button>
        </div>
        </el-tab-pane>
    </el-tabs>
    </el-dialog>
  </div>
</template>

<script>
import WeekTemplate from './WeekTemplate'
import moment from 'moment'
import Event from '../model/Event'
import { getLabels } from '../service/noSchedule.service.js'
const activityEvents = [new Event(1, '2018-05-28', '第二节', '语文教研/张丽萍'), new Event(0, '2018-05-29', '第一节', '英语教研/张丽萍'), new Event(2, '2018-05-30', '第一节', '语文教研/张丽萍')]
export default {
  data () {
    return {
      researchName: '',
      researchDesc: '',
      activeNames: 1,
      activities: [{id: 1, researchName: '语文教研', teachers: [{id: 1, name: '张丽萍'}]},
        {id: 2, researchName: '英语教研', teachers: [{id: 1, name: '张丽萍'}]}],
      isWeekShow: false,
      checkedTeachers: [],
      dialogVisible: false,
      activityEvents,
      activityTime: '',
      options: this.getOption,
      currentWeek: moment('2018-05-29').startOf('week'),
      teachers: [{id: '11', name: '张丽萍'}, {id: '12', name: '李希'}, {id: '13', name: '王灿'}]
    }
  },
  methods: {
    OK () {
      this.dialogVisible = false
    }
  },
  computed: {
    getOption () {
      return getLabels()
    }
  },
  components: {
    WeekTemplate
  }
}
</script>

<style scoped>
.el-checkbox+.el-checkbox {
  margin: 0;
}
</style>
