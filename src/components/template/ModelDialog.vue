<template>
  <el-dialog :title="modelDialogTitle" :visible.sync="modelDialog" width="80%">
    <ul style="list-style: none">
      <li v-for="row in modelRows" :key="row['rowId']">
        <div>
          <el-row>
            <el-col :span="6">RowId: {{ row["rowId"] }}:</el-col>
            <el-col :span="18">
              {{ row["cols"].join(" / ") }}
            </el-col>
          </el-row>
        </div>
      </li>
    </ul>
    <template slot="footer">
      <el-button type="primary" @click="addModel">新增标准</el-button>
      <el-button type="primary" @click="modelDialog = false">关闭</el-button>
    </template>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      modelDialog: false,
    };
  },
  methods: {
    show() {
      this.modelDialog = true;
    },
    addModel() {
      if (this.modelRows.length != 0) {
        // 构建正则表达式
        let count = this.modelRows[0]["cols"].length - 1;
        let regex = "^[^/]*";
        for (let c = 0; c < count; c++) {
          regex += "/[^/]*";
        }
        regex += "$";

        this.$prompt(
          `请输入新增标准，需包含${count}个“/”，建议添加前仔细核对。`,
          "提示",
          {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            inputPattern: new RegExp(regex),
            inputErrorMessage: `格式不正确，需包含${count}个“/”`,
          }
        ).then(({ value }) => {
          let result = value.split("/");
          this.$emit("saveNewModels", result);
        });
      }
    },
  },
  mounted() {
  },
  computed: {
    modelDialogTitle() {
      return `【${this.dictName}】 标准列查看`;
    },
  },
  props: ["dictName", "modelRows"],
};
</script>

<style>
</style>