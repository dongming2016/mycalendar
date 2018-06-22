<template>
<div>
      <div>

        <div
          v-for="(item, index) in getCourseItem"
          :key="index"
          class="item-span"
          :class="{'item-div': item.type === 'checkbox'}"
        >

         <span class="base-info-label"><span v-if="item.isNeeded" style="color:red;">*</span>{{item.label}}</span>

          <div
            v-if="item.type === 'text'"
            class="input-text"
          >

            <el-input
              v-model="item.value"
              :placeholder="item.placeholder"
            />

</div>

<div
  v-if="item.type === 'number'"
  class="input-text"
  size="small"
>

  <el-input-number
    v-model="item.value"
    :min="item.min"
    :max="item.max"
    label="描述文字"
  ></el-input-number>

    </div>

    <div
      v-else-if="item.type === 'select'"
      class="input-text"
    >

      <el-select
        v-model="item.value"
        :placeholder="item.placeholder"
      >

        <el-option
          v-for="item1 in item.options"
          :key="item1.value"
          :label="item1.label"
          :value="item1.value"
        >

          </el-option>

          </el-select>

          </div>

          <div
            v-else-if="item.type === 'checkbox'"
            class="input-text"
          >
             <el-input style="width:200px;" v-model="item.selectedGrades" @blur="showGradeList=false" @focus="showGradeList=true" placeholder="请输入年级">

             </el-input>
    <div v-show="showGradeList" style="position: absolute;
    z-index: 100;width: 300px; background: #fff; border: 1px solid #eee; border-radius: 8px;
    padding: 16px;">
               <el-checkbox
              :indeterminate="item.isIndeterminate"
              v-model="item.checkAll"
            >全选</el-checkbox>
              <el-checkbox-group v-model="item.value">
                <el-checkbox
                  v-for="(item1, index) in item.options"
                  :label="item1.value"
                  :key="index"
                >{{item1.label}}</el-checkbox>
              </el-checkbox-group>
             </div>
              </div>

          <div
            v-else-if="item.type === 'date'"
            class="input-text"
          >

            <el-input
              :placeholder="item.placeholder"
              :value="item.value"
              @focus="showCalendar(item)"
            >

              <i
                slot="suffix"
                class="el-input__icon el-icon-date"
                @click="showCalendar(item)"
              ></i>

                </el-input>

                </div>

                <div
                  v-else-if="item.type === 'select-group'"
                  class="input-text"
                >

              <el-select
                v-model="item.value"
                :placeholder="item.placeholder"
                v-show="!item.showInput"
              >

                <el-option
                  v-for="item1 in item.options"
                  :key="item1.value"
                  :label="item1.label"
                  :value="item1.value"
                >

                <span>{{item1.label}}</span>

                <el-button
                  type="text"
                  style="float: right;"
                  class="el-icon-delete"
                ></el-button>

                  <el-button
                    type="text"
                    style="float: right;"
                    class="el-icon-edit"
                  ></el-button>

                    </el-option>

                    </el-select>

                    <el-button
                      type="text"
                      class="el-icon-plus"
                      @click="item.showInput=true"
                      v-show="!item.showInput"
                    >{{item.buttonName}}</el-button>

                      <!-- <el-dialog :title="item.buttonName" :visible.sync="item.showInput"> -->

                      <div v-show="item.showInput">

                      <el-input
                        style="display:inline-block; width:87%;"
                        :placeholder="item.placeholder1"
                        v-model="item.inputValue"
                      />

                      <el-button
                        type="text"
                        style="display:inline-block;"
                        @click="item.OKCallback(item)"
                      >确定</el-button>

                    </div>
                </div>
              </div>
            </div>
        </div>
</template>

<script>
import OptionalCourseDetail from './OptionalCourseDetail'

import WeekTemplate from '../../components/WeekTemplate'

export default {
  props: {
    course: {
      default () {
        return {}
      }
    },
    editTitle: '',
    isEditShow: Boolean
  },

  data () {
    return {
      editVisible: true,
      showGradeList: false
    }
  },
  computed: {
    getCourseItem () {
      const courseDomain = this.course.courseDomain && this.course.courseDomain.name
      return [{
        label: '课程编号',
        type: 'text',
        placeholder: '请输入课程编号',
        value: this.course.classCode || '',
        isNeeded: true
      },
      {
        label: '课程名称',
        type: 'text',
        placeholder: '请输入课程名称',
        value: this.course.className || '',
        isNeeded: true
      },
      {
        label: '所属类别',

        type: 'select',

        placeholder: '请输入所属类别',

        value: this.course.category || '活动',

        options: [{
          value: 1,

          label: '活动'
        },
        {
          value: 2,

          label: '学科'
        }
        ],

        buttonIcon: 'el-icon-plus',

        showInput: false,

        buttonName: '添加类别',

        inputValue: '',

        OKCallback: this.addItem('category'),
        isNeeded: true
      },
      {
        label: '所属学科',

        type: 'select',

        placeholder: '请输所属学科',

        value: this.course.courseSubject || '体育',

        options: [{
          value: 1,

          label: '体育'
        },
        {
          value: 2,

          label: '艺术'
        }
        ],

        showInput: false,

        buttonName: '添加学科',

        inputValue: '',

        OKCallback: this.addItem('subject'),
        isNeeded: true
      },
      {
        label: '课程所属领域',

        type: 'select',

        placeholder: '请输入课程所属领域',

        value: courseDomain || '科学技术类',

        options: [{
          value: 1,

          label: '实用技能类'
        },
        {
          value: 2,

          label: '科学技术类'
        }
        ],

        showInput: false,

        buttonName: '添加学科',

        inputValue: '',

        OKCallback: this.addItem('subject'),
        isNeeded: true
      },
      {
        label: '学分',
        type: 'number',
        placeholder: '',
        value: this.course.credit || 2,
        isNeeded: true
      },
      {
        label: '考核要求',

        type: 'text',

        placeholder: '请输入考核要求',

        value: this.course.testMethod || '',
        isNeeded: true
      }
      ]
    },
    showEdit () {
      return this.isEditShow
    }
  },
  methods: {
    handleClick () {},

    addItem (itemCategory) {
      return item => {
        item.showInput = false
      }
    },

    selectedTime (inputTime, calendarShow) {
      calendarShow = false
    },

    showCalendar (item) {
      this.calendarShow = true
      this.calendarItem = item
    },
    OKCallback () {
      if (this.calendarShow) {
        this.calendarShow = false
      } else {
        this.$emit('isEditShow', false)
      }
    },
    CancelCallback () {
      if (this.calendarShow) {
        this.calendarShow = false
      } else {
        this.$emit('isEditShow', false)
      }
    }
  },

  components: {
    OptionalCourseDetail,
    WeekTemplate
  }
}
</script>

<style>
.base-info-label {
  margin-right: 12px;
}

.item-span,
.input-text {
  display: inline-block;
}

.item-span {
  margin-left: 40px;
  width: 500px;
  margin-bottom: 10px;
}

.item-div {
  display: block;
}

.el-select-dropdown__item .el-button-text {
  padding: 0;
}
</style>
