<template>
<div>

  <!-- <el-dialog
    :title="editTitle"
    :visible.sync="isEditShow"
    style="text-align: center"
  > -->

    <el-tabs
      v-model="activeName"
      type="border-card"
      v-show="!calendarShow"
    >

      <el-tab-pane
        label="基本信息"
        name="first"
      >

        <div
          v-for="(item, index) in items"
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

              <div
                v-else-if="item.type === 'date'"
                class="input-text"
              >

                <el-input
                  :placeholder="item.placeholder"
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

                                <!-- </el-dialog> -->

                                </div>

                                </div>

                                <div class="item-span">

                                  <span style="margin-right:10px;display: inline-block;
    text-align: right;width:105px;">课程相关图片</span>
                                  <input type="file" placeholder="上传图片">

                                </div>
                                 <div class="item-span">课程简介（教学目标）</div>

                                </el-tab-pane>

                                <el-tab-pane
                                  label="教学内容"
                                  name="second"
                                >

                                  <OptionalCourseDetail/>

                                  </el-tab-pane>

                                  </el-tabs>

                                  <div v-show="calendarShow">

                                    <WeekTemplate/>

                                  </div>

                      <!-- <div
                        slot="footer"
                        class="dialog-footer"
                      >

                        <el-button
                          type="primary"
                          plain
                          @click="OKCallback"
                        >确定</el-button>

                          <el-button
                            plain
                            @click="CancelCallback"
                          >取消</el-button>

                            </div>

                            </el-dialog> -->
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
      activeName: 'first',

      calendarShow: false,

      calendarItem: {},

      items: [{
        label: '课程编号',

        type: 'text',

        placeholder: '请输入课程编号',

        value: '',
        isNeeded: true
      },

      {
        label: '课程名称',

        type: 'text',

        placeholder: '请输入课程名称',

        value: '',
        isNeeded: true
      },

      {

        label: '任课教师',

        type: 'select',

        placeholder: '请输入任课老师',

        value: '',

        options: [ { value: 1, label: '安平' } ]

      },

      {
        label: '上课时间',

        type: 'date',

        placeholder: '请选择上课时间',

        value: '',

        calendarShow: false,

        OKCallback: this.selectedTime,
        isNeeded: true
      },

      {
        label: '所属类别',

        type: 'select-group',

        placeholder: '请输入所属类别',

        value: '活动',

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

        type: 'select-group',

        placeholder: '请输所属学科',

        value: '体育',

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
        label: '学分',

        type: 'number',

        placeholder: '',

        value: 2,
        isNeeded: true
      },
      {
        label: '学生选修条件',

        type: 'checkbox',

        options: [{
          value: 1,

          label: '一年级'
        },
        {
          value: 2,

          label: '二年级'
        }
        ]
      },
      {
        label: '课时安排',

        type: 'number',

        placeholder: '请输入课时',

        value: '',
        isNeeded: true
      },
      {
        label: '上课周数',

        type: 'number',

        placeholder: '请输入上课周数',

        value: '',
        isNeeded: true
      },

      {
        label: '场地',

        type: 'text',

        placeholder: '请输入场地',

        value: '',
        isNeeded: true
      },

      {
        label: '考核要求',

        type: 'text',

        placeholder: '请输入考核要求',

        value: '',
        isNeeded: true
      },

      {
        label: '科目限选人数',

        type: 'number',

        placeholder: '请输入科目限选',

        value: '',
        isNeeded: true
      },
      {
        label: '每班限选人数',
        type: 'number',
        placeholder: '请输入每班限选',
        value: '',
        isNeeded: true
      }
      ]
    }
  },
  computed: {
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
