<template>
  <div>
    <div v-for="(item, index) in items" :key="index">
      <span>{{item.label}}</span>
      <el-input v-model="item.value" placeholder="请输入教学内容" class="item-block"/>
    </div>
  </div>
</template>

<script>
const items = []
for (let i = 0; i < 10; i++) {
  items.push({ label: `第${i + 1}周教学内容`, value: '' })
}
export default {
  props: ['courseDescription'],
  data () {
    return {
      items
    }
  }
}
</script>

<style>
.item-block {
  display: inline-block;
  width: 400px;
  margin-left: 16px;
  margin-bottom: 8px;
}
</style>
