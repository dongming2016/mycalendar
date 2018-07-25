<template>
  <div>
    <div>
      <div>课程名称</div>
      <div>
        <el-checkbox-group v-model="gradePlan">
          <el-checkbox v-for="(item, index) in allCourses" :key="index"
          :label="item">
            {{item.courseName}}
          </el-checkbox>
        </el-checkbox-group>
      </div>
    </div>
    <div>
      <el-table :data="gradePlan">
        <el-table-column label="课程名称" prop="courseName"/>
        <el-table-column label="周课时" prop="weekHours">
          <template slot-scope="scope">
            <el-input v-if="scope.row.isEdit" v-model="scope.row.weekHours"/>
            <span v-else>{{scope.row.weekHours}}</span>
          </template>
        </el-table-column>
        <el-table-column label="总课时" prop="totalHours">
          <template slot-scope="scope">
            <el-input v-if="scope.row.isEdit" v-model="scope.row.weekHours"/>
            <span v-else>{{scope.row.weekHours}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <span v-if="scope.row.isEdit" @click="save(scope.row)">保存</span>
            <div v-else>
              <span class="el-icon-edit" @click="scope.row.isEdit=true">编辑</span>
              <span class="el-icon-close">删除</span>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      gradePlan: [],
      allCourses: []
    }
  }
}
</script>
