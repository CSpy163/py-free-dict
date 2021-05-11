<template>
  <el-dialog title="SQL 模版配置" :visible.sync="templateSQLDialog" width="80%">
    <el-row>
      <el-col :span="6">SQL 前缀</el-col>
      <el-col :span="18"
        ><el-input
          clearable
          v-model="prefix"
          placeholder="请输入 SQL 前缀"
        ></el-input
      ></el-col>
    </el-row>
    <el-row>
      <el-col :span="6">SQL 后缀</el-col>
      <el-col :span="18"
        ><el-input
          clearable
          v-model="suffix"
          placeholder="请输入 SQL 后缀"
        ></el-input
      ></el-col>
    </el-row>
    <el-row>
      <el-col :span="6">单匹配</el-col>
      <el-col :span="6"
        ><el-input
          clearable
          v-model="singlePattern"
          placeholder="元素模版（单）"
        ></el-input
      ></el-col>
      <el-col :span="12"
        ><el-input
          clearable
          v-model="singleFullPattern"
          placeholder="请输入单匹配模版"
        ></el-input
      ></el-col>
    </el-row>
    <el-row>
      <el-col :span="6">多匹配</el-col>
      <el-col :span="6"
        ><el-input
          clearable
          v-model="multiPattern"
          placeholder="元素模版（多）"
        ></el-input
      ></el-col>
      <el-col :span="12"
        ><el-input
          clearable
          v-model="multiFullPattern"
          placeholder="请输入多匹配模版"
        ></el-input
      ></el-col>
    </el-row>
    <template slot="footer">
      <el-button type="primary" @click="applyTemplate">应用模版配置</el-button>
      <el-button type="primary" @click="templateSQLDialog = false"
        >关闭</el-button
      >
    </template>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      templateSQLDialog: false,
      prefix: "",
      suffix: "",
      singlePattern: "",
      singleFullPattern: "",
      multiPattern: "",
      multiFullPattern: "",
    };
  },
  methods: {
    show() {
      this.templateSQLDialog = true;
    },
    applyTemplate() {
      this.$emit("applyTemplate");
    },
  },
  watch: {
    prefix(val) {
      this.$sqlTemplate.prefix = val;
    },
    suffix(val) {
      this.$sqlTemplate.suffix = val;
    },
    singlePattern(val) {
      this.$sqlTemplate.singlePattern = val;
    },
    singleFullPattern(val) {
      this.$sqlTemplate.singleFullPattern = val;
    },
    multiPattern(val) {
      this.$sqlTemplate.multiPattern = val;
    },
    multiFullPattern(val) {
      this.$sqlTemplate.multiFullPattern = val;
    },
  },
};
</script>

<style>
</style>