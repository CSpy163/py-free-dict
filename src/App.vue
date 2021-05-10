<template>
  <div id="app" :style="appStyle">
    <el-row v-show="!loaded">
      <el-col :span="24">
        <div class="py-first-frame">
          <div
            class="py-center-drop-box"
            @drop="handleDrop"
            @dragover="handleDragOver"
          >
            <i class="el-icon-magic-stick"></i> <span>请拖入xlsx或者xls</span>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row v-show="loaded" class="container">
      <el-col :span="8">
        <el-row>
          <el-col :span="12">
            <el-select v-model="dict" filterable placeholder="选择表格页">
              <el-option
                v-for="sheet in sheets"
                :label="sheet"
                :key="sheet"
                :value="sheet"
              ></el-option>
            </el-select>
          </el-col>
          <el-col :span="12">
            <el-select v-model="area" filterable placeholder="选择区市">
              <el-option
                v-for="bigCol in bigColNames"
                :label="bigCol"
                :key="bigCol"
                :value="bigCol"
              ></el-option>
            </el-select>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24" class="scroll-list">
            <ul style="overflow: auto">
              <li
                v-for="bigColRow in bigColRows"
                @click="setRow(bigColRow)"
                :key="bigColRow['rowId']"
                v-show="bigColRow['rowId']"
              >
                <el-card shadow="hover">
                  <el-tag
                    size="mini"
                    v-show="!bigColRow['belongs']['rowId']"
                    type="warning"
                    >未</el-tag
                  >
                  <el-tag
                    size="mini"
                    v-show="
                      bigColRow['belongs']['rowId'] &&
                      typeof bigColRow['belongs']['similar'] == 'number'
                    "
                    type=""
                    >{{
                      parseFloat(
                        Number(bigColRow["belongs"]["similar"] * 100).toFixed(2)
                      ) + "%"
                    }}</el-tag
                  >
                  {{ bigColRow["cols"].join(" / ") }}
                </el-card>
              </li>
            </ul>
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="16">
        <div v-show="curRow['rowId'] == ''" class="py-none">
          <span>请先点击左侧列表。</span>
        </div>
        <div v-show="curRow['rowId'] != ''">
          <div
            class="head"
            style="white-space: nowrap; overflow-x: auto; max-height: 56px"
          >
            <span style="font-size: 1.8em"
              >当前：[{{ curRow["cols"].join(" / ") }}] ➡️ ({{
                curRow["belongs"]["cols"].join(" / ")
              }})</span
            >
          </div>
          <div class="search">
            <el-input
              placeholder="请输入搜索内容"
              clearable
              v-model="searchKey"
            >
              <i slot="prefix" class="el-input__icon el-icon-search"></i>
            </el-input>
          </div>
          <div class="result">
            <ul>
              <li
                class="result-li"
                @click="bindToCur(item)"
                v-for="item in compareResults"
                :key="item['obj']['rowId']"
                v-show="item['obj']['rowId']"
              >
                <span style="color: grey">{{
                  parseFloat(Number(item["similar"] * 100).toFixed(2)) + "%"
                }}</span
                ><span>
                  {{
                    dictMap[dict] &&
                    item["obj"]["cols"][dictMap[dict]["_template"]]
                  }}
                </span>
              </li>
            </ul>
          </div>
        </div>
      </el-col>
    </el-row>
    <div v-show="loaded" class="func-footer">
      <el-button type="danger" size="medium" v-show="dict" @click="showTemplate"
        >查看标准项</el-button
      >
      <el-button type="warning" size="medium" v-show="area" @click="setCompare"
        >设置对比列</el-button
      >
      <el-button type="success" size="medium" v-show="area" @click="bindList"
        >快速匹配</el-button
      >
      <el-button
        type="danger"
        size="medium"
        v-show="area"
        @click="clearBindInList"
        >取消【{{ dict + "-" + area }}】所有匹配</el-button
      >

      <el-button
        type="danger"
        size="medium"
        v-show="curRow['belongs']['rowId']"
        @click="clearCurBind"
        >取消当前匹配</el-button
      >

      <el-dropdown style="padding-left: 15px" @command="beforeExport">
        <el-button type="primary">
          导出<i class="el-icon-arrow-down el-icon--right"></i>
        </el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="excel">导出 Excel</el-dropdown-item>
          <el-dropdown-item command="sql">导出 SQL</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>

    <el-dialog
      :title="dictDialogTitle"
      :visible.sync="compareDialog"
      width="80%"
      :close-on-click-modal="false"
    >
      <ul style="list-style: none">
        <li v-for="area in Object.keys(wbObj[dict] || {})" :key="area">
          <div>
            <el-row>
              <el-col :span="4">{{ area }}:</el-col>
              <el-col :span="20">
                <el-radio-group v-model="dictMap[dict][area]">
                  <el-radio
                    :label="len - 1"
                    v-for="len in wbObj[dict][area][0]['cols'].length"
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
        <el-button type="primary" @click="showTemplate">查看标准列</el-button>
        <el-button type="primary" @click="compareDialog = false"
          >关闭</el-button
        >
      </template>
    </el-dialog>

    <el-dialog
      :title="templateDialogTitle"
      :visible.sync="templateDialog"
      width="80%"
    >
      <ul style="list-style: none">
        <li v-for="row in templateRows" :key="row['rowId']">
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
        <el-button type="primary" @click="addTemplate">新增标准</el-button>
        <el-button type="primary" @click="templateDialog = false"
          >关闭</el-button
        >
      </template>
    </el-dialog>

    <el-dialog :title="sqlDialogTitle" :visible.sync="sqlDialog" width="80%">
      <el-row>
        <el-col :span="4">选择标准列</el-col>
        <el-col :span="4"
          ><el-select
            v-model="sql.temIndex"
            filterable
            placeholder="选择标准列"
          >
            <el-option
              v-for="bigCol in temColLength"
              :label="'列' + bigCol"
              :key="bigCol"
              :value="bigCol"
            ></el-option> </el-select
        ></el-col>
        <el-col :span="3">选择大列</el-col>
        <el-col :span="5"
          ><el-select v-model="sql.area" filterable placeholder="选择大列">
            <el-option
              v-for="bigCol in bigColNames"
              :label="bigCol"
              :key="bigCol"
              :value="bigCol"
            ></el-option> </el-select
        ></el-col>
        <el-col :span="3">选择列</el-col>
        <el-col :span="5"
          ><el-select v-model="sql.areaIndex" filterable placeholder="选择列">
            <el-option
              v-for="bigCol in bigColLength"
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
      <el-row>
        <el-col :span="6">模拟数据</el-col>
        <el-col :span="18"
          ><el-input
            clearable
            v-model="sql.demoData"
            placeholder="请输入模拟数据，“,” 分割"
          ></el-input
        ></el-col>
      </el-row>
      <el-row>
        <el-col :span="6">SQL 预览</el-col>
        <el-col :span="18"
          ><el-input type="textarea" disabled v-model="templateSQL"></el-input
        ></el-col>
      </el-row>
      <el-row>
        <el-col :span="6">完整 SQL 预览</el-col>
        <el-col :span="18"
          ><el-input type="textarea" disabled v-model="resultSQL"></el-input
        ></el-col>
      </el-row>
      <template slot="footer">
        <el-button type="primary" @click="templateSQLDialog = true"
          >打开模版配置</el-button
        >
        <el-button type="success" @click="copyTo(resultSQL)"
          >复制 SQL</el-button
        >
        <el-button type="primary" @click="sqlDialog = false">关闭</el-button>
      </template>
    </el-dialog>

    <el-dialog
      title="SQL 模版配置"
      :visible.sync="templateSQLDialog"
      width="80%"
    >
      <el-row>
        <el-col :span="6">SQL 前缀</el-col>
        <el-col :span="18"
          ><el-input
            clearable
            v-model="template.prefix"
            placeholder="请输入 SQL 前缀"
          ></el-input
        ></el-col>
      </el-row>
      <el-row>
        <el-col :span="6">SQL 后缀</el-col>
        <el-col :span="18"
          ><el-input
            clearable
            v-model="template.suffix"
            placeholder="请输入 SQL 后缀"
          ></el-input
        ></el-col>
      </el-row>
      <el-row>
        <el-col :span="6">单匹配</el-col>
        <el-col :span="6"
          ><el-input
            clearable
            v-model="template.singlePattern"
            placeholder="元素模版（单）"
          ></el-input
        ></el-col>
        <el-col :span="12"
          ><el-input
            clearable
            v-model="template.singleFullPattern"
            placeholder="请输入单匹配模版"
          ></el-input
        ></el-col>
      </el-row>
      <el-row>
        <el-col :span="6">多匹配</el-col>
        <el-col :span="6"
          ><el-input
            clearable
            v-model="template.multiPattern"
            placeholder="元素模版（多）"
          ></el-input
        ></el-col>
        <el-col :span="12"
          ><el-input
            clearable
            v-model="template.multiFullPattern"
            placeholder="请输入多匹配模版"
          ></el-input
        ></el-col>
      </el-row>
      <template slot="footer">
        <el-button type="primary" @click="applyTemplate"
          >应用模版配置</el-button
        >
        <el-button type="primary" @click="templateSQLDialog = false"
          >关闭</el-button
        >
      </template>
    </el-dialog>
  </div>
</template>

<script>
// const { wbObj } = require("./mock/mockData");
import copy from "copy-to-clipboard";

export default {
  name: "App",
  data() {
    return {
      fullScreenLoading: "",
      appStyle: {
        width: "calc(100wh - 16px)",
        height: "calc(100vh - 16px)",
        background: "white",
      },
      dict: "",
      sheets: [],
      area: "",
      bigColNames: [],
      bigColRows: [
        {
          rowId: "",
          cols: [],
          belongs: {
            rowId: "",
            cols: [],
            similar: 0,
          },
          matches: [],
        },
      ],
      loaded: false,
      wbObj: {},
      searchKey: "",
      curRow: {
        rowId: "",
        cols: [],
        belongs: { rowId: "", cols: [] },
      },
      dictMap: {},
      compareDialog: false,
      compareResults: [
        {
          similar: 0,
          obj: {
            rowId: "",
            matches: [],
            cols: [],
          },
        },
      ],
      templateDialog: false,
      templateRows: [],
      sqlDialog: false,
      sql: {
        prefix: "",
        suffix: "",
        singlePattern: "",
        multiPattern: "",
        singleFullPattern: "",
        multiFullPattern: "",
        demoData: "a,b,c,d,e",
        area: "",
        temIndex: "",
        areaIndex: "",
      },
      sqlTemList: [],
      resultSQL: "",
      templateSQLDialog: false,

      template: {
        prefix: "",
        suffix: "",
        singlePattern: "'${item}'",
        multiPattern: ",'${item}'",
        singleFullPattern: "case ${singlePattern} then ${tem}",
        multiFullPattern: "case in (${multiPatterns}) then ${tem}",
      },
    };
  },
  computed: {
    templateSQL() {
      return this.getSQLTemplate(this.dt.length);
    },
    multiPatterns() {
      if (this.dt.length > 1) {
        let resultPattern = this.sql.singlePattern;
        for (let i = 1; i < this.dt.length; i++) {
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
    dt() {
      return this.sql.demoData.split(",");
    },
    temColLength() {
      return this.dict
        ? this.wbObj[this.dict]["_template"].length != 0
          ? this.wbObj[this.dict]["_template"][0]["cols"].length
          : 0
        : 0;
    },
    bigColLength() {
      if (this.dict && this.sql.area && this.wbObj[this.dict][this.sql.area]) {
        return this.wbObj[this.dict][this.sql.area].length != 0
          ? this.wbObj[this.dict][this.sql.area][0]["cols"].length
          : 0;
      }
      return 0;
    },
    dictDialogTitle() {
      return `设置【${this.dict}】对比列`;
    },
    templateDialogTitle() {
      return `标准 【${this.dict}】Dict`;
    },
    sqlDialogTitle() {
      return `导出 【${this.dict}】SQL`;
    },
  },
  mounted() {
    window.ipcRenderer.on("file-loaded", (event, wbObj) => {
      if (wbObj == null) {
        this.$message.error("文件解析错误，请检查格式！");
        if (this.fullScreenLoading) {
          this.fullScreenLoading.close();
        }
        return;
      }
      this.sheets.splice(0);
      this.wbObj = wbObj;
      // console.log(this.wbObj)
      this.dict = "";

      for (let key in this.wbObj) {
        this.sheets.push(key);
        this.$set(this.dictMap, key, {});
        for (let areaKey in this.wbObj[key]) {
          this.$set(this.dictMap[key], areaKey, 0);
        }
      }
      this.loaded = true;
      if (this.fullScreenLoading) {
        this.fullScreenLoading.close();
      }
    });

    window.ipcRenderer.on("export-excel-ended", (event, obj) => {
      if (this.fullScreenLoading) {
        this.fullScreenLoading.close();
      }
      if (obj["success"]) {
        this.loaded = false;
        this.$message({
          message: `导出成功。文件名《${obj["fileName"]}》`,
          type: "success",
        });
      } else {
        this.$message.error("导出失败！");
      }
    });
  },
  methods: {
    copyTo(obj) {
      copy(obj);
      this.$message({
        message: "复制成功。",
        type: "success",
      });
    },
    // 将自定义的 sql 模版设置到 SQL 上
    applyTemplate() {
      this.sql.prefix = this.template.prefix;
      this.sql.suffix = this.template.suffix;
      this.sql.singlePattern = this.template.singlePattern;
      this.sql.multiPattern = this.template.multiPattern;
      this.sql.singleFullPattern = this.template.singleFullPattern;
      this.sql.multiFullPattern = this.template.multiFullPattern;
      this.templateSQLDialog = false;
    },
    // 初始化 SQL 导出面板
    initSQLDialog() {
      this.sql.prefix = "";
      this.sql.suffix = "";
      this.sql.singlePattern = "";
      this.sql.multiPattern = "";
      this.sql.singleFullPattern = "";
      this.sql.multiFullPattern = "";
      this.sql.demoData = "a,b,c,d,e";
      this.sql.area = "";
      this.sql.temIndex = "";
      this.sql.areaIndex = "";
    },
    // 刷新 SQL
    refreshSQL() {
      this.resultSQL = this.sql.prefix;
      this.wbObj[this.dict]["_template"].forEach((tObj) => {
        let areaObjs = tObj["matches"][this.sql.area];
        if (areaObjs) {
          console.log(areaObjs)
          let sqlTemplate = this.getSQLTemplate(areaObjs.length);
          console.log(sqlTemplate)
          for (let i = 0; i < areaObjs.length; i++) {
            let r = `\${item${i == 0 ? "" : i}}`;
            sqlTemplate = ` ${sqlTemplate
              .replace(r, areaObjs[i]["cols"][this.sql.areaIndex - 1])
              .replace("${tem}", tObj["cols"][this.sql.temIndex - 1])} `;
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
            this.multiPatterns
          );
      }
    },
    // 新增标准
    addTemplate() {
      if (this.wbObj[this.dict]["_template"].length != 0) {
        // 构建正则表达式
        let count = this.wbObj[this.dict]["_template"][0]["cols"].length - 1;
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
          let ids = this.wbObj[this.dict]["_template"].map(
            (tObj) => tObj["rowId"]
          );
          // 默认行号为 2
          let rowId = 2;
          if (ids.length != 0) {
            rowId = ids.sort((a, b) => parseInt(b) - parseInt(a))[0] + 1;
          }
          let obj = {
            rowId: rowId,
            cols: result,
            matches: [],
            belongs: {
              rowId: "",
              cols: [],
            },
          };

          // 增加到 wbObj 中
          this.wbObj[this.dict]["_template"].push(obj);
          this.templateDialog = false;
          this.$message({
            message: "新增成功。",
            type: "success",
          });
        });
      } else {
        this.$message.error("当前模版存在问题，请检查Excel。");
      }
    },
    // 导出前汇总
    beforeExport(item) {
      // 先遍历 wbObj 的 sheet
      for (let sheetName in this.wbObj) {
        let sheetObj = this.wbObj[sheetName];
        let templateObj = sheetObj["_template"];
        for (let bigCol in sheetObj) {
          if (bigCol != "_template") {
            let bigColObj = sheetObj[bigCol];
            // 遍历 bigCol
            bigColObj.forEach((bigColRow) => {
              if (bigColRow["belongs"]) {
                let belongRowId = bigColRow["belongs"]["rowId"];
                if (belongRowId) {
                  let tObj = templateObj.find(
                    (to) => to["rowId"] == belongRowId
                  );
                  // 将已匹配的行塞到 template 的 matches 中
                  if (tObj) {
                    if (!tObj["matches"][bigCol]) tObj["matches"][bigCol] = [];
                    if (
                      tObj["matches"][bigCol].findIndex(
                        (mObj) => mObj["rowId"] == bigColRow["rowId"]
                      ) == -1
                    ) {
                      tObj["matches"][bigCol].push(bigColRow);
                    }
                  }
                }
              }
            });
          }
        }
      }

      switch (item) {
        case "excel":
          this.exportExcel();
          break;
        case "sql":
          this.exportSQL();
          break;
        default:
      }
    },
    // 导出 sql
    exportSQL() {
      this.beforeExport();
      if (this.dict) {
        this, this.initSQLDialog();
        this.sqlDialog = true;
      } else {
        this.$message.error("请先选择一个字典！");
      }
    },
    // 调用后端生成 Excel
    exportExcel() {
      this.fullScreenLoading = this.$loading({
        lock: true,
        text: "导出表格中，请勿操作。",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.8)",
      });
      if (window.ipcRenderer) {
        window.ipcRenderer.invoke("export-excel", this.wbObj);
      }
    },
    // 查看当前标准项
    showTemplate() {
      this.templateRows.splice(0);
      this.templateRows.push(...this.wbObj[this.dict]["_template"]);
      this.templateDialog = true;
    },
    // 绑定 list
    bindList() {
      this.$confirm(
        "自动匹配前，建议明确 template 与 本Dict 的对比列！！！",
        "警告",
        {
          confirmButtonText: "前往设置对比列",
          cancelButtonText: "直接匹配",
          type: "warning",
        }
      )
        .then(() => {
          this.compareDialog = true;
        })
        .catch(() => {
          this.bigColRows.forEach((bcr) => {
            let tmpArray = this.getCompareResult(
              bcr["cols"][this.dictMap[this.dict][this.area]]
            );
            // 只设置最准确的
            if (
              tmpArray.length == 1 ||
              (tmpArray.length >= 2 &&
                tmpArray[0]["similar"] != tmpArray[1]["similar"])
            ) {
              this.setListAndWbObj(bcr["rowId"], tmpArray[0]);
            } else {
              this.setListAndWbObj(bcr["rowId"]);
            }
          });
          this.$message({
            type: "success",
            message: "自动匹配完成。",
          });
        });
    },
    // 清空 list
    clearBindInList() {
      this.bigColRows.forEach((bcr) => {
        this.setListAndWbObj(bcr["rowId"]);
      });
    },
    // 用来设置左侧列表和 wbObj
    // row 是对比结果 {similar, obj}
    setListAndWbObj(rowId, row) {
      if (row && row["obj"] && row["obj"]["rowId"]) {
        // 填充左侧列表（控制列表上“未”的显示）
        let rowInBCR = this.bigColRows.find((bcr) => bcr["rowId"] == rowId);
        if (rowInBCR) {
          rowInBCR["belongs"]["rowId"] = row["obj"]["rowId"];
          rowInBCR["belongs"]["cols"].splice(0);
          rowInBCR["belongs"]["cols"].push(...row["obj"]["cols"]);
          rowInBCR["belongs"]["similar"] = row["similar"] ? row["similar"] : 0;
        }
        // 填充 wbObj 原始数据（用于导出数据）
        let rowObj = this.wbObj[this.dict][this.area].find(
          (wb) => wb["rowId"] == rowId
        );
        if (rowObj) {
          rowObj["belongs"]["rowId"] = row["obj"]["rowId"];
          rowObj["belongs"]["cols"].splice(0);
          rowObj["belongs"]["cols"].push(...row["obj"]["cols"]);
        }
      } else {
        // 清空左侧列表（控制列表上“未”的显示）
        let rowInBCR = this.bigColRows.find((bcr) => bcr["rowId"] == rowId);
        if (rowInBCR) {
          rowInBCR["belongs"]["rowId"] = "";
          this.$set(rowInBCR["belongs"], "cols", []);
          rowInBCR["belongs"]["similar"] = 0;
        }
        // 清空 wbObj 原始数据（用于导出数据）
        let rowObj = this.wbObj[this.dict][this.area].find(
          (wb) => wb["rowId"] == rowId
        );
        if (rowObj) {
          rowObj["belongs"]["rowId"] = "";
          rowObj["belongs"]["cols"] = [];
        }
      }
    },
    // 绑定点击项到当前
    bindToCur(row) {
      if (this.curRow["rowId"] != "") {
        // 填充右侧面板绑定（控制按钮显示）
        this.curRow["belongs"]["rowId"] = row["obj"]["rowId"];
        this.curRow["belongs"]["cols"].splice(0);
        this.curRow["belongs"]["cols"].push(...row["obj"]["cols"]);
        this.setListAndWbObj(this.curRow["rowId"], row);
      }
    },
    // 以 curRow 为标准，清空当前绑定
    clearCurBind() {
      if (this.curRow["rowId"] != "") {
        //  清空当前右侧面板绑定（控制按钮显示）
        this.curRow["belongs"]["rowId"] = "";
        this.curRow["belongs"]["cols"].splice(0);
        this.setListAndWbObj(this.curRow["rowId"]);
      }
    },
    // 列对比设置弹窗
    setCompare() {
      if (this.dict == "") {
        this.$notify.error({
          title: "错误",
          message: "请先选择Dict！",
        });
        return;
      }
      this.compareDialog = true;
    },
    // 点击左侧列表中的值，设置到右侧面板中
    setRow(row) {
      // 复制普通属性
      this.curRow["rowId"] = row["rowId"];
      this.curRow["cols"].splice(0);
      this.curRow["cols"].push(...row["cols"]);
      // 复制所属 row 属性
      this.curRow.belongs["rowId"] = row["belongs"]
        ? row["belongs"]["rowId"]
        : "";
      this.curRow.belongs.cols.splice(0);
      if (row["belongs"]) {
        this.curRow.belongs.cols.push(...row["belongs"]["cols"]);
      }

      // 设置右侧搜索
      this.searchKey = row["cols"][this.dictMap[this.dict][this.area]];
    },
    handleDrop(e) {
      e.preventDefault();

      const files = e.dataTransfer.files;
      if (files && files.length >= 1) {
        const path = files[0].path;
        if (window.ipcRenderer) {
          window.ipcRenderer.invoke("load-file", path);
          this.fullScreenLoading = this.$loading({
            lock: true,
            text: "解析表格内容中，请勿操作。",
            spinner: "el-icon-loading",
            background: "rgba(0, 0, 0, 0.8)",
          });
        }
      }
    },
    handleDragOver(e) {
      e.preventDefault();
    },
    // 获取对比结果集
    getCompareResult(searchKey) {
      let tmpArray = [];
      this.wbObj[this.dict]["_template"].forEach((tDict) => {
        let s = this.dictDiff(
          tDict["cols"][this.dictMap[this.dict]["_template"]],
          searchKey
        );

        // 注意 tDict 写法
        tmpArray.push({
          similar: s,
          obj: {
            rowId: tDict["rowId"],
            cols: [...tDict["cols"]],
          },
        });
      });
      tmpArray.sort((a, b) => {
        return b["similar"] - a["similar"];
      });
      return tmpArray;
    },
    // 对比相似度
    dictDiff(template, str) {
      template = template + "";
      if (!template) return 0;
      if (!str || str.length == 0) return 0;
      let hit = 0;
      for (let i = 0; i < str.length; i++) {
        let char = str.charAt(i);
        let tIndex = template.indexOf(char);
        if (tIndex != -1) {
          hit++;
          if (tIndex != template.length - 1) {
            template =
              template.substring(0, tIndex) +
              template.substring(tIndex + 1, template.length);
          } else {
            template = template.substring(0, tIndex);
          }
        }
      }
      return hit / str.length;
    },
    // 清空右侧面板
    clearCurRow() {
      this.curRow["rowId"] = "";
      this.curRow["cols"].splice(0);
      this.curRow["belongs"]["rowId"] = "";
      this.curRow["belongs"]["cols"].splice(0);
    },
  },
  watch: {
    sql: {
      handler(val) {
        this.refreshSQL();
      },
      deep: true,
    },
    templateDialog(val, oldVal) {
      if (val) {
        this.clearCurRow();
      }
    },
    dict(val, oldVal) {
      this.clearCurRow();
      this.bigColNames.splice(0);
      this.area = "";
      if (val != "") {
        for (let key in this.wbObj[val]) {
          if (key != "_template") {
            this.bigColNames.push(key);
          }
        }
      }
    },
    area(val, oldVal) {
      this.clearCurRow();
      this.bigColRows.splice(0);
      if (val != "") {
        //  switch
        this.wbObj[this.dict][val].forEach((wb) => {
          if (!wb["belongs"]) {
            wb["belongs"] = {
              rowId: "",
              cols: [],
              similar: 0,
            };
          } else {
            wb["belongs"]["similar"] = this.dictDiff(
              wb["belongs"]["cols"][this.dictMap[this.dict]["_template"]],
              wb["cols"][this.dictMap[this.dict][this.area]]
            );
          }
        });
        //
        this.bigColRows.push(...this.wbObj[this.dict][val]);
      }
    },
    searchKey(val, oldVal) {
      this.compareResults.splice(0);
      let tmpArray = this.getCompareResult(val);
      this.compareResults.push(...tmpArray);
    },
  },
  beforeDestroy() {
    // console.log("destroy");
    // if (window.ipcRenderer) {
    //   window.ipcRenderer.remove("file-loaded");
    // }
  },
};
</script>

<style>
html {
  box-sizing: border-box;
}
html,
body {
  padding: 0;
  margin: 0;
}
*,
*:before,
*:after {
  box-sizing: inherit;
}
#app {
  --footer-height: 60px;
}

.func-footer {
  display: fixed;
  bottom: 0;
  left: 0;
  height: var(--footer-height);
  white-space: nowrap;
  overflow-x: auto;
}

.container {
  max-height: calc(100vh - var(--footer-height));
  height: calc(100vh - var(--footer-height));
}
.container ul {
  padding-left: 0;
  margin: 0;
}

.container li {
  list-style: none;
}
.el-card .el-card__body {
  padding: 2px;
  cursor: pointer;
}
.scroll-list {
  max-height: calc(100vh - 16px - 40px - var(--footer-height));
  overflow: auto;
}
.result {
  max-height: calc(100vh - 16px - 40px - 41px - var(--footer-height));
  overflow: auto;
}

.result-li {
  padding: 4px;
  cursor: pointer;
}

.py-first-frame {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
.py-center-drop-box {
  height: 50vh;
  width: 65vw;
  border: cornflowerblue 1px dotted;
  display: flex;
  align-items: center;
  justify-content: center;
}

.py-none {
  height: calc(100vh - var(--footer-height));
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
