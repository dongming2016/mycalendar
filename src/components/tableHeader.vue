<template>
  <div>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  props: {
    locale: {
      type: String,
      default () {
        return 'zh-cn'
      }
    },
    firstDay: {
      type: Number | String,
      validator (val) {
        let res = parseInt(val)
        return res >= 0 && res <= 6
      },
      default () {
        return 1
      }
    }
  },
  filters: {
    // 过滤器，将时间转化为本地的星期
    localeWeekDay (weekday, firstDay, locale) {
      firstDay = parseInt(firstDay)
      const localMoment = moment().locale(locale)
      return localMoment.localeData().weekdays()[(weekday + firstDay) % 7]
    }
  }
}
</script>

<style>
</style>
