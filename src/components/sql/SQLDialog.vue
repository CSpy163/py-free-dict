<template>
  <el-dialog :title="sqlDialogTitle" :visible.sync="sqlDialog" width="80%">
    <el-row>
      <el-col :span="4">选择标准列</el-col>
      <el-col :span="4"
        ><el-select
          v-model="sql.modelIndex"
          filterable
          placeholder="选择标准列"
        >
          <el-option
            v-for="bigCol in mRowColLength"
            :label="'列' + bigCol"
            :key="bigCol"
            :value="bigCol"
          ></el-option> </el-select
      ></el-col>
      <el-col :span="3">选择大列</el-col>
      <el-col :span="5"
        ><el-select v-model="sql.bcName" filterable placeholder="选择大列">
          <el-option
            v-for="bigCol in Object.keys(dictObj)"
            :label="bigCol"
            :key="bigCol"
            :value="bigCol"
          ></el-option> </el-select
      ></el-col>
      <el-col :span="3">选择列</el-col>
      <el-col :span="5"
        ><el-select v-model="sql.bcIndex" filterable placeholder="选择列">
          <el-option
            v-for="bigCol in bcColLength"
            :label="'列' + bigCol"
            :key="bigCol"
            :value="bigCol"
          ></el-option> </el-select
      ></el-col>
    </el-row>
    <el-row>
      <el-col :span="6">SQL 前缀</el-col>
      <el-col :span="18"
        ><el-input
          clearable
          v-model="sql.prefix"
          placeholder="请输入 SQL 前缀"
        ></el-input
      ></el-col>
    </el-row>
    <el-row>
      <el-col :span="6">SQL 后缀</el-col>
      <el-col :span="18"
        ><el-input
          clearable
          v-model="sql.suffix"
          placeholder="请输入 SQL 后缀"
        ></el-input
      ></el-col>
    </el-row>
    <el-row>
      <el-col :span="6">单匹配</el-col>
      <el-col :span="6"
        ><el-input
          clearable
          v-model="sql.singlePattern"
          placeholder="元素模版（单）"
        ></el-input
      ></el-col>
      <el-col :span="12"
        ><el-input
          clearable
          v-model="sql.singleFullPattern"
          placeholder="请输入单匹配模版"
        ></el-input
      ></el-col>
    </el-row>
    <el-row>
      <el-col :span="6">多匹配</el-col>
      <el-col :span="6"
        ><el-input
          clearable
          v-model="sql.multiPattern"
          placeholder="元素模版（多）"
        ></el-input
      ></el-col>
      <el-col :span="12"
        ><el-input
          clearable
          v-model="sql.multiFullPattern"
          placeholder="请输入多匹配模版"
        ></el-input
      ></el-col>
    </el-row>
    <!-- <el-row>
      <el-col :span="6">模拟数据</el-col>
      <el-col :span="18"
        ><el-input
          clearable
          v-model="sql.demoData"
          placeholder="请输入模拟数据，“,” 分割"
        ></el-input
      ></el-col>
    </el-row> -->
    <!-- <el-row>
      <el-col :span="6">SQL 预览</el-col>
      <el-col :span="18"
        ><el-input type="textarea" disabled v-model="templateSQL"></el-input
      ></el-col>
    </el-row> -->
    <el-row>
      <el-col :span="6">完整 SQL 预览</el-col>
      <el-col :span="18"
        ><el-input type="textarea" disabled v-model="resultSQL"></el-input
      ></el-col>
    </el-row>
    <template slot="footer">
      <el-button type="primary" @click="showSQLTemplateDialog"
        >打开模版配置</el-button
      >
      <el-button type="success" @click="copyTo(resultSQL)">复制 SQL</el-button>
      <el-button type="primary" @click="sqlDialog = false">关闭</el-button>
    </template>
  </el-dialog>
</template>

<script>
import copy from "copy-to-clipboard";

export default {
  data() {
    return {
      sqlDialog: false,

      sql: {
        bcName: "",

        modelIndex: "",
        bcIndex: "",
        prefix: "",
        suffix: "",
        singlePattern: "",
        singleFullPattern: "",
        multiPattern: "",
        multiFullPattern: "",
        demoData: "",
      },
      resultSQL: "",
    };
  },
  mounted() {},
  methods: {
    show() {
      this.sql.modelIndex = "";
      this.sql.bcName = "";
      this.sql.bcIndex = "";
      this.sql.prefix = "";
      this.sql.suffix = "";
      this.sql.singlePattern = "";
      this.sql.singleFullPattern = "";
      this.sql.multiPattern = "";
      this.sql.multiFullPattern = "";
      this.sqlDialog = true;
    },
    applyTemplate() {
      this.sql.prefix = this.$sqlTemplate.prefix;
      this.sql.suffix = this.$sqlTemplate.suffix;
      this.sql.singlePattern = this.$sqlTemplate.singlePattern;
      this.sql.singleFullPattern = this.$sqlTemplate.singleFullPattern;
      this.sql.multiPattern = this.$sqlTemplate.multiPattern;
      this.sql.multiFullPattern = this.$sqlTemplate.multiFullPattern;
    },
    showSQLTemplateDialog() {
      this.$emit("showSQLTemplateDialog");
    },
    copyTo(obj) {
      copy(obj);
      this.$message({
        message: "复制成功。",
        type: "success",
      });
    },
    // 刷新 SQL
    refreshSQL() {
      this.resultSQL = this.sql.prefix;
      this.dictObj["model"].forEach((tObj) => {
        let bcObjs = tObj["matches"].filter(
          (mr) => mr["bcName"] == this.sql.bcName
        );

        if (bcObjs) {
          let sqlTemplate = this.getSQLTemplate(bcObjs.length);

          for (let i = 0; i < bcObjs.length; i++) {
            let bcRow = this.dictObj[this.sql.bcName].find(
              (bcr) => bcr["rowId"] == bcObjs[i]["rowId"]
            );
            if (bcRow) {
              let r = `\${item${i == 0 ? "" : i}}`;
              sqlTemplate = ` ${sqlTemplate
                .replace(r, bcRow["cols"][this.sql.bcIndex - 1])
                .replace("${model}", tObj["cols"][this.sql.modelIndex - 1])} `;
            }
          }
          this.resultSQL += sqlTemplate;
        }
      });
      this.resultSQL += this.sql.suffix;
    },
    // 获取 SQL 模版
    getSQLTemplate(length) {
      switch (length) {
        case 0:
          return "";
        case 1:
          return `${this.sql.singleFullPattern}`.replace(
            "${singlePattern}",
            this.sql.singlePattern
          );
        default:
          return `${this.sql.multiFullPattern}`.replace(
            "${multiPatterns}",
            this.multiPatterns(length)
          );
      }
    },
    multiPatterns(length) {
      if (length >= 1) {
        let resultPattern = this.sql.singlePattern;
        for (let i = 1; i < length; i++) {
          resultPattern += this.sql.multiPattern.replace(
            "${item}",
            "${item" + i + "}"
          );
        }
        return resultPattern;
      } else {
        return "";
      }
    },
  },
  watch: {
    "sql.bcName"() {
      this.sql.bcIndex = "";
    },
    sql: {
      handler() {
        this.refreshSQL();
      },
      deep: true,
    },
  },
  computed: {
    mRowColLength() {
      if (this.dictObj["model"] && this.dictObj["model"].length != 0) {
        return this.dictObj["model"][0]["cols"].length;
      }
      return 0;
    },
    bcColLength() {
      if (this.sql.bcName && this.dictObj[this.sql.bcName]) {
        if (this.dictObj[this.sql.bcName].length != 0) {
          return this.dictObj[this.sql.bcName][0]["cols"].length;
        }
      }
      return 0;
    },
    sqlDialogTitle() {
      return `【${this.dictName}】 SQL 导出`;
    },
    // templateSQL() {
    //   return this.getSQLTemplate(this.dt.length);
    // },
    
    // dt() {
    //   return this.sql.demoData.split(",");
    // },
    // temColLength() {
    //   return this.dict
    //     ? this.wbObj[this.dict]["model"].length != 0
    //       ? this.wbObj[this.dict]["model"][0]["cols"].length
    //       : 0
    //     : 0;
    // },
  },
  props: ["dictName", "mRows", "dictObj"],
};
</script>

<style>
</style>