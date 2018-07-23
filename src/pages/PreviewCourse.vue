<template>
  <!-- 预览和微调课表 -->
  <div>
    <div style="margin-bottom:16px;">
      <span class="arrange-label">选择年级</span>
      <el-select v-model="selectedGrade" placeholder="一年级" @change='gradesChange(selectedGrade)'>
        <el-option
          v-for="item in grades"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </div>
    <div style="margin-bottom:16px;">
      <span class="arrange-label">选择班级</span>
      <el-select v-model="selectedClasses" placeholder="一年级" @change='gradesChange(selectedGrade)'>
        <el-option
          v-for="item in classes"
          :key="item.id"
          :label="item.name"
          :value="item.id">
        </el-option>
      </el-select>
    </div>
    <div>
      <WeekTemplate :events="events" :options="options" :currentWeek="currentWeek" :notArranged="notArranged"  ref="Week"/>
      <EventList style="top: 100px;right: 300px;" :fcEvents="notArranged" :dragArgs="{callback: moveEvent}" class="event-list"/>
    </div>
  </div>
</template>

<script>
import Event from '../model/Event'
import Label from '../model/Label'
import WeekTemplate from '../components/WeekTemplate'
import moment from 'moment'
import NotArrangedEvent from '../model/NotArrangedEvent'
import EventList from '../components/EventList'
const isLabelShow = (index) => {
  if (index === 0) {
    return true
  }

  return false
}

const labels = [
  new Label(0, '第一节', isLabelShow),
  new Label(1, '第二节', isLabelShow),
  new Label(2, '第三节', isLabelShow),
  new Label(3, '第四节', isLabelShow),
  new Label(4, '第五节', isLabelShow),
  new Label(5, '第六节', isLabelShow),
  new Label(6, '第七节', isLabelShow),
  new Label(7, '第八节', isLabelShow)
]

export default {
  components: {
    WeekTemplate,
    EventList,
    NotArrangedEvent
  },
  data () {
    return {
      fcHeader: [{id: 1, name: '节次', className: 'fc-my-header'}, {id: 2, name: '日程'}],
      options: { labels },
      events: [new Event(1, '2018-05-28', '第二节', '语文/张丽萍'), new Event(0, '2018-05-29', '第一节', '语文/张丽萍'), new Event(2, '2018-05-30', '第一节', '语文/张丽萍'), new Event(3, '2018-05-24', '第一节', '语文/张丽萍'),
        new Event(3, '2018-05-29', '第一节', '', false), new Event(5, '2018-05-30', '第六节', '', false), new Event(7, '2018-05-30', '第八节', '数学/abc', true)],
      currdate: moment(),
      notArranged: [ new NotArrangedEvent('数学/小李', 10), new NotArrangedEvent('数学/王梅梅', 7), new NotArrangedEvent('数学/李兰', 3) ],
      currentWeek: moment().startOf('week'),
      selectedGrade: 1,
      grades: [
        { value: 1, label: '一年级' },
        { value: 2, label: '二年级' },
        { value: 3, label: '三年级' }
      ],
      selectedClasses: '1',
      classes: [{id: '1', name: '一年级（1）班'}, {id: '2', name: '二年级（1）班'}, {id: '3', name: '三年级（1）班'}]
    }
  },
  methods: {
    moveEvent ([rect, content], option) {
      const showIndex = this.showIndex
      switch (showIndex) {
        case 0: {
          return this.$refs.Month.moveEvent([rect, content], option)
        }
        case 2: {
          return this.$refs.Day.moveEvent([rect, content], option)
        }
        default: {
          return this.$refs.Week.moveEvent([rect, content], option)
        }
      }
    }
  }
}
</script>
