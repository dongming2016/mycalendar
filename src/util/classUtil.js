import baseService from '../service/base.service'

export default {
  /**
   * 生成树形的班级列表
   */
  async getTreeClasses () {
    const facultyCode = sessionStorage.getItem('facultyCode')
    const classesTree = sessionStorage.getItem('classes-tree')
    if (classesTree && classesTree !== 'undefined') {
      return JSON.parse(classesTree)
    }
    let gradeInfo = await baseService.getGradeInfo({facultyCode})
    gradeInfo = gradeInfo.data.data

    const xx = { id: 99999, label: '小学', type: 'phase', children: [] }
    const cz = { id: 88888, label: '初中', type: 'phase', children: [] }
    const gz = { id: 77777, label: '初中', type: 'phase', children: [] }
    const getClassInfo = async (gradeCode) => {
      let classInfo = await baseService.getClassInfoByGradeCode(gradeCode)
      classInfo = classInfo.data.data
      const classes = []
      classInfo.forEach((element) => {
        classes.push({label: element.expandName, type: 'class', id: element.id})
      })

      return classes
    }
    const result = []
    let xxFlag = false
    let czFlag = false
    let gzFlag = false
    for (let i = 0, length = gradeInfo.length; i < length; i++) {
      const classes = await getClassInfo(gradeInfo[i].gradeCode)
      if (gradeInfo[i].gradeCode.indexOf('xx') > -1) {
        xx.children.push({label: gradeInfo[i].gradeName, type: 'grade', children: classes, id: gradeInfo[i].id})
        xxFlag = true
      }
      if (gradeInfo[i].gradeCode.indexOf('cz') > -1) {
        cz.children.push({label: gradeInfo[i].gradeName, type: 'grade', children: classes, id: gradeInfo[i].id})
        czFlag = true
      }
      if (gradeInfo[i].gradeCode.indexOf('gz') > -1) {
        gz.children.push({label: gradeInfo[i].gradeName, type: 'grade', children: classes, id: gradeInfo[i].id})
        gzFlag = true
      }
    }
    if (xxFlag) {
      result.push(xx)
    }
    if (czFlag) {
      result.push(cz)
    }
    if (gzFlag) {
      result.push(gz)
    }
    console.log(result)
    sessionStorage.setItem('classes-tree', JSON.stringify(result))
    return result
  }
}
