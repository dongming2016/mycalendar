import baseService from '../service/base.service.js'
async function getAsySchoolYear () {
  let schoolYear = sessionStorage.getItem('schoolYear')
  if (!schoolYear || schoolYear === 'undefined') {
    schoolYear = await baseService.getSchoolYear()
    sessionStorage.setItem('schoolYear', JSON.stringify(schoolYear.data.data))
    return schoolYear.data.data
  }
  return JSON.parse(schoolYear)
}

const getTermInfo = async () => {
  let allTerms = sessionStorage.getItem('all-terms')
  let schoolYearTerms = {}
  // allTerms中存放的是以term的id为键，term名称为值得对象
  if (allTerms !== 'undefined' && allTerms) {
    return JSON.parse(allTerms)
  } else {
    allTerms = {}
  }

  let schoolYear = {}
  const schoolYearStr = sessionStorage.getItem('schoolYear')
  if (schoolYearStr && schoolYearStr !== 'undefined') {
    schoolYear = JSON.parse(schoolYearStr)
  } else {
    schoolYear = await getAsySchoolYear()
  }

  for (let i = 0; i < schoolYear.length; i++) {
    if (schoolYear[i].isCurrent === 1) {
      sessionStorage.setItem('current-school-year', schoolYear[i].id)
    }
    const termsPromise = await baseService.getTermBySchooYear(schoolYear[i].id)
    const terms = termsPromise.data.data
    schoolYearTerms[schoolYear[i].id] = terms
    for (let j = 0, length = terms.length; j < length; j++) {
      if (terms[j].isCurrent === 1) {
        sessionStorage.setItem('current-term', terms[j].id)
      }
      allTerms[terms[j].id] = {schoolYear: schoolYear[i].schoolYear, schoolId: schoolYear[i].id, termName: terms[j].termName}
    }
  }
  sessionStorage.setItem('all-terms', JSON.stringify(allTerms))
  sessionStorage.setItem('school-year-terms', JSON.stringify(schoolYearTerms))
  return allTerms
}

// const setTermInfo = (schoolYearId, callback) => {
//   if (this.terms.length > 0) {
//     const termInfo = {}
//     const currentTerm = this.terms.filter(element => {
//       return element.isCurrent
//     })
//     if (currentTerm.length > 1) {
//       throw new Error('get current year error')
//     } else if (currentTerm.length === 1) {
//       termInfo.selectedTerm = currentTerm[0].id
//       termInfo.isCurrent = currentTerm[0].isCurrent
//     } else {
//       termInfo.selectedTerm = this.terms[0].id
//       termInfo.isCurrent = false
//     }
//     callback(schoolYearId, termInfo)
//   } else {
//     throw new Error('no term')
//   }
// }

export default {
  getAllTerms () {
    let allTerms = sessionStorage.getItem('all-terms')
    if (allTerms !== 'undefined' && allTerms) {
      return JSON.parse(allTerms)
    } else {
      allTerms = getTermInfo()
    }
    return allTerms
  },
  // getAsyncAllTerms () {
  //   getTermInfo()
  // },
  getCurrentTermId () {
    return sessionStorage.getItem('current-term')
  },
  getCurrentSchoolId () {
    return sessionStorage.getItem('current-school-year')
  }
}
