<template>
  <div>
    <el-row type="flex"  class="title" justify="space-around">
      <el-col class="crumbs" :span="6"><div>教务 > 教学计划</div></el-col>
      <el-col class="crumbs" :span="6">
        <div v-if="showTime" class="time-container">
          <el-select @change="selectYear" v-model="selectedSchoolYear">
            <el-option v-for="(item, index) in schoolYears"
            :key="index" :label="item.schoolYear" :value="item.id"/>
          </el-select>
          <el-select @change="selectTerm" style="margin-left:20px;" v-model="selectedTerm"
          >
            <el-option v-for="(item, index) in terms"
            :key="index" :label="item.termName" :value="item.id"/>
          </el-select>
        </div>
      </el-col>
      <el-col :span="6">
        <div v-if="showMenu">
          <div class="menu-item" :class="{'title-active-item': activeIndex===index}"
          v-for="(item, index) in menus"
          @click="clickMenu(item, index)"
          :key="index">
            {{item.name}}
          </div>
        </div>
      </el-col>
      </el-row>
  </div>
</template>

<script>
// import baseService from '../service/base.service.js'
import termUtil from '../util/termUtil.js'
export default {
  props: ['showTime', 'showMenu', 'menus'],
  data () {
    return {
      terms: [],
      schoolYears: [],
      selectedSchoolYear: '',
      selectedTerm: '',
      termInfo: {},
      activeIndex: 0
    }
  },
  created () {
    this.getSchoolYear()
  },
  methods: {
    clickMenu (item, index) {
      this.activeIndex = index
      this.$emit('clickMenu', item)
    },
    selectYear (id) {
      this.getTermBySchooYear()
    },
    selectTerm (id) {
      const term = this.terms.find(element => {
        return element.id === id
      })
      this.isCurrent = term.isCurrent
      this.termInfo.termId = term.termId

      this.$set(this.termInfo, 'schoolYear', this.selectedSchoolYear)
      this.$set(this.termInfo, 'termId', term.termId)
      this.$set(this.termInfo, 'isCurrent', term.isCurrent)
    },
    getTermBySchooYear () {
      const setTermInfo = () => {
        if (this.terms.length > 0) {
          const currentTerm = this.terms.filter(element => {
            return element.isCurrent
          })
          if (currentTerm.length > 1) {
            throw new Error('get current year error')
          } else if (currentTerm.length === 1) {
            this.selectedTerm = currentTerm[0].id
            this.isCurrent = currentTerm[0].isCurrent
          } else {
            this.selectedTerm = this.terms[0].id
            this.isCurrent = false
          }
          this.$set(this.termInfo, 'schoolYear', this.selectedSchoolYear)
          this.$set(this.termInfo, 'termId', this.selectedTerm)
          this.$set(this.termInfo, 'isCurrent', this.isCurrent)
          this.reset = !this.reset
        } else {
          throw new Error('no term')
        }
      }
      let schoolYearTermStr = sessionStorage.getItem('school-year-terms')
      if (schoolYearTermStr && schoolYearTermStr !== 'undefined') {
        this.terms = JSON.parse(schoolYearTermStr)[this.selectedSchoolYear]
        setTermInfo()
      } else {
        console.log('hello')
        termUtil.getAllTerms()
          .then(({data}) => {
            console.log(data)
            schoolYearTermStr = sessionStorage.getItem('school-year-terms')
            this.terms = JSON.parse(schoolYearTermStr)[this.selectedSchoolYear]
            setTermInfo()
          })
      }
    },
    getSchoolYear () {
      const schoolYearHandler = () => {
        let schoolYear = this.schoolYears

        if (schoolYear && schoolYear.length > 0) {
          this.schoolYears = schoolYear
          const currentYear = schoolYear.filter(element => {
            return element.isCurrent
          })
          if (currentYear.length !== 1) {
            throw new Error('get current year error')
          }
          this.selectedSchoolYear = currentYear[0].id
          this.getTermBySchooYear()
        }
      }
      let schoolYearsStr = sessionStorage.getItem('schoolYear')
      if (schoolYearsStr && schoolYearsStr !== 'undefined') {
        this.schoolYears = JSON.parse(schoolYearsStr)
        schoolYearHandler()
      } else {
        termUtil.getAllTerms()
          .then(({data}) => {
            schoolYearsStr = sessionStorage.getItem('schoolYear')
            this.schoolYears = JSON.parse(schoolYearsStr)
            schoolYearHandler()
          })
      }
    }
  }
}
</script>

<style>
.crumbs,
.time-container {
  display: inline-block;
}
.menu-item {
  display:inline-block;
  margin-right:20px;
  height: 30px;
  line-height: 30px;
  cursor: pointer;
}
.title-active-item {
  border-bottom: 4px solid #5D86EA;
}
</style>
