<template>
  <div>
    <canvas width="200" height="200" ref="myClock">
    </canvas>
  </div>
</template>

<script>
const SMALL_CIRCLE_R = 12
const DELTA = 10
const BIG_CIRCLE_R = 100
const BIG_CIRCLE_X = 100
const BIG_CIRCLE_Y = 100
const FONT_SIZE = 16
export default {
  props: {
    courseNum: {
      default () {
        return 8
      }
    }
  },
  methods: {
    draw () {
      const ctx = this.$refs.myClock.getContext('2d')
      ctx.fillStyle = '#eee'
      ctx.beginPath()
      ctx.arc(BIG_CIRCLE_X, BIG_CIRCLE_Y, BIG_CIRCLE_R, 0, 2 * Math.PI)
      ctx.fill()
      for (let i = 1; i <= this.courseNum; i++) {
        this.drawLabel(i, ctx)
      }
    },
    drawLabel (labelNO, ctx) {
      const { x, y } = this.calcLabelPosition(labelNO)
      ctx.fillStyle = '#fff'
      ctx.font = '20px Georgia'
      ctx.fillText(labelNO, x, y)
    },
    calcLabelPosition (labelNO) {
      const angle = labelNO * 2 * Math.PI / this.courseNum
      const y = BIG_CIRCLE_R - Math.cos(angle) * (BIG_CIRCLE_R - DELTA * 2)
      const x = BIG_CIRCLE_R + Math.sin(angle) * (BIG_CIRCLE_R - DELTA * 2)
      return { x, y }
    }
  },
  mounted () {
    this.draw()
  }
}
</script>
