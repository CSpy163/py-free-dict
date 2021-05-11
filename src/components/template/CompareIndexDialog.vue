<template>
  <el-dialog
    :title="compareIndexDialogTitle"
    :visible.sync="compareIndexDialog"
    width="80%"
    :close-on-click-modal="false"
  >
    <ul style="list-style: none">
      <li v-for="bcName in Object.keys(bcColsMap)" :key="bcName">
        <div>
          <el-row>
            <el-col :span="4">{{ bcName }}:</el-col>
            <el-col :span="20">
              <el-radio-group v-model="indexObj[bcName]">
                <el-radio
                  :label="len - 1"
                  v-for="len in bcRowLength(bcColsMap[bcName])"
                  :key="len"
                  >列{{ len }}</el-radio
                >
              </el-radio-group>
            </el-col>
          </el-row>
        </div>
      </li>
    </ul>
    <template slot="footer">
      <el-button type="primary" @click="showModelDialog">查看标准列</el-button>
      <el-button type="success" @click="saveCompareIndex">保存</el-button>
      <el-button @click="compareIndexDialog = false"
        >关闭</el-button
      >
    </template>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      indexObj: {},
      compareIndexDialog: false,
    };
  },

  methods: {
    show() {
      this.compareIndexDialog = true;
      this.$set(this, "indexObj", {});
      for (let bcName in this.bcColsMap) {
        this.$set(
          this.indexObj,
          bcName,
          this.$compareIndexMap[this.dictName][bcName]
        );
      }
    },
    showModelDialog() {
      this.$emit("showModelDialog");
    },
    saveCompareIndex() {
      for (let bcName in this.bcColsMap) {
        this.$compareIndexMap[this.dictName][bcName] = this.indexObj[bcName];
      }
      this.compareIndexDialog = false;
    },
    bcRowLength(rows) {
      console.log(rows);
      if (rows && rows.length != 0) {
        console.log(rows[0]["cols"].length);
        return rows[0]["cols"].length;
      }
      return 0;
    },
  },
  computed: {
    compareIndexDialogTitle() {
      return `【${this.dictName}】 对比列设置`;
    },
  },
  props: ["dictName", "bcColsMap"],
};
</script>

<style>
</style>