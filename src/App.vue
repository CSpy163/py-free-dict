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
            <el-select v-model="bcName" filterable placeholder="选择大列">
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
                :key="bigColRow['rowId']"
                @click="setRow(bigColRow)"
                v-show="bigColRow['rowId']"
              >
                <el-card shadow="hover">
                  <el-tag
                    size="mini"
                    v-show="!bigColRow['pRowId']"
                    type="warning"
                    >未</el-tag
                  >
                  <el-tag
                    size="mini"
                    v-show="
                      bigColRow['pRowId'] &&
                      typeof bigColRow['similar'] == 'number'
                    "
                    type=""
                    >{{
                      parseFloat(
                        Number(bigColRow["similar"] * 100).toFixed(2)
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
                getMappedModelRowCols(curRow["pRowId"])
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
                v-for="item in compareResults"
                :key="item['mRowId']"
                v-show="item['mRowId']"
                @click="bindToCur(item)"
              >
                <span style="color: grey">{{
                  parseFloat(Number(item["similar"] * 100).toFixed(2)) + "%"
                }}</span
                ><span>
                  {{ getMappedModelRowCols(item["mRowId"], true) }}
                </span>
              </li>
            </ul>
          </div>
        </div>
      </el-col>
    </el-row>
    <div v-show="loaded" class="func-footer">
      <el-button
        type="danger"
        size="medium"
        v-show="dict"
        @click="showModelDialog"
        >查看标准项</el-button
      >
      <el-button
        type="warning"
        size="medium"
        v-show="dict"
        @click="showCompareIndexDialog"
        >设置对比列</el-button
      >
      <el-button type="success" size="medium" v-show="bcName" @click="bindList"
        >快速匹配</el-button
      >
      <el-button
        type="danger"
        size="medium"
        v-show="bcName"
        @click="clearBindInList"
        >取消【{{ bcName }}】所有匹配</el-button
      >

      <el-button
        type="danger"
        size="medium"
        v-show="curRow['pRowId']"
        @click="clearCurBind"
        >取消当前匹配</el-button
      >
      <el-dropdown style="padding-left: 15px" @command="beforeExport">
        <el-button type="primary">
          导出<i class="el-icon-arrow-down el-icon--right"></i>
        </el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="excel">导出 Excel</el-dropdown-item>
          <el-dropdown-item :disabled="!dict" command="sql"
            >导出 SQL</el-dropdown-item
          >
        </el-dropdown-menu>
      </el-dropdown>
    </div>

    <ModelDialog
      ref="modelDialog"
      :dictName="dict"
      :modelRows="modelRow"
      @saveNewModels="saveNewModels"
    ></ModelDialog>

    <CompareIndexDialog
      ref="compareIndexDialog"
      :dictName="dict"
      :bcColsMap="bcColsMap"
      @showModelDialog="showModelDialog"
    ></CompareIndexDialog>

    <SQLDialog
      ref="sqlDialog"
      :dictName="dict"
      :mRows="modelRow"
      :dictObj="bcColsMap"
      @showSQLTemplateDialog="showSQLTemplateDialog"
    ></SQLDialog>
    <SQLTemplateDialog
      ref="sqlTemplateDialog"
      @applyTemplate="applyTemplate"
    ></SQLTemplateDialog>
  </div>
</template>

<script>
const { bindInWbObj } = require("./util/fd-xlsx");
import ModelDialog from "./components/template/ModelDialog";
import CompareIndexDialog from "./components/template/CompareIndexDialog";
import SQLDialog from "./components/sql/SQLDialog";
import SQLTemplateDialog from "./components/sql/SQLTemplateDialog";

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
      bcName: "",
      bigColNames: [],
      bigColRows: [
        {
          rowId: "",
          cols: [],
          matches: [],
          pRowId: "",
          similar: 0,
        },
      ],
      loaded: false,
      wbObj: {},
      searchKey: "",
      curRow: {
        rowId: "",
        cols: [],
        pRowId: "",
      },
      compareResults: [
        {
          similar: 0,
          mRowId: "",
          label: "",
        },
      ],
    };
  },
  components: {
    ModelDialog,
    CompareIndexDialog,
    SQLDialog,
    SQLTemplateDialog,
  },
  computed: {
    bcColsMap() {
      if (this.dict) {
        return this.wbObj[this.dict];
      }
      return {};
    },
    modelRow() {
      if (this.wbObj && this.dict) {
        return this.wbObj[this.dict]["model"];
      }
      return [];
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
      this.setGlobalCompareIndexMap();
      this.dict = "";

      this.sheets.push(...Object.keys(this.wbObj));
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
    // 自动获取当前 bc 的下标
    autoCompareIndex() {
      if (this.dict && this.bcName) {
        return this.$compareIndexMap[this.dict][this.bcName];
      }
      return 0;
    },
    // 保存 cols 到 model
    saveNewModels(newModelRow) {
      let rowIds = this.wbObj[this.dict]["model"].map((mRow) => mRow["rowId"]);
      let maxRowId = rowIds.sort()[rowIds.length - 1];
      let startId = maxRowId + 1;
      this.wbObj[this.dict]["model"].push({
        rowId: startId,
        cols: newModelRow,
        matches: [],
        pRowId: "",
      });
    },
    applyTemplate() {
      if (this.$refs["sqlDialog"]) {
        this.$refs["sqlDialog"].applyTemplate();
      }
    },
    showSQLTemplateDialog() {
      if (this.$refs["sqlTemplateDialog"]) {
        this.$refs["sqlTemplateDialog"].show();
      }
    },
    showSqlDialog() {
      if (this.$refs["sqlDialog"]) {
        this.$refs["sqlDialog"].show();
      }
    },
    showModelDialog() {
      if (this.$refs["modelDialog"]) {
        this.$refs["modelDialog"].show();
      }
    },
    showCompareIndexDialog() {
      if (this.$refs["compareIndexDialog"]) {
        this.$refs["compareIndexDialog"].show();
      }
    },
    // 获取 curRow 映射的对象行
    getMappedModelRowCols(mRowId, colOnly = false) {
      if (this.dict && this.bcName && mRowId) {
        let mRow = this.wbObj[this.dict]["model"].find(
          (mr) => mr["rowId"] == mRowId
        );
        if (mRow) {
          if (colOnly) {
            return mRow["cols"][this.$compareIndexMap[this.dict]["model"]];
          }
          return mRow["cols"].join(" / ");
        }
      }
      return "";
    },

    // 导出前汇总
    beforeExport(item) {
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
      this.showSqlDialog();
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
    // 绑定 list
    bindList() {
      this.$confirm(
        "自动匹配前，建议明确“标准列”与“当前列”的对比列！！！",
        "警告",
        {
          confirmButtonText: "前往设置对比列",
          cancelButtonText: "直接匹配",
          type: "warning",
        }
      )
        .then(() => {
          setTimeout(() => {
            this.showCompareIndexDialog();
          }, 200);
        })
        .catch(() => {
          this.bigColRows.forEach((bcr) => {
            let tmpArray = this.getCompareResult(
              bcr["cols"][this.autoCompareIndex()]
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
        this.clearCurRow();
      });
    },
    // 用来设置左侧列表和 wbObj
    // row 是对比结果 {similar, mRowId, label}
    setListAndWbObj(rowId, row) {
      if (row && row["mRowId"]) {
        // 填充左侧列表（控制列表上“未”的显示）
        let rowInBCR = this.bigColRows.find((bcr) => bcr["rowId"] == rowId);
        if (rowInBCR) {
          rowInBCR["pRowId"] = row["mRowId"];
          rowInBCR["similar"] = row["similar"];
        }
        // 填充 wbObj 原始数据（用于导出数据）
        bindInWbObj(this.wbObj, this.dict, this.bcName, rowId, row["mRowId"]);
      } else {
        // 清空左侧列表（控制列表上“未”的显示）
        let rowInBCR = this.bigColRows.find((bcr) => bcr["rowId"] == rowId);
        if (rowInBCR) {
          (rowInBCR["pRowId"] = ""), (rowInBCR["similar"] = 0);
        }
        // 清空 wbObj 原始数据（用于导出数据）
        bindInWbObj(this.wbObj, this.dict, this.bcName, rowId, "");
      }
    },
    // 绑定点击项到当前
    bindToCur(row) {
      if (this.curRow["rowId"] != "") {
        this.curRow["pRowId"] = row["mRowId"];
        this.setListAndWbObj(this.curRow["rowId"], row);
      }
    },
    // 以 curRow 为标准，清空当前绑定
    clearCurBind() {
      if (this.curRow["rowId"] != "") {
        //  清空当前右侧面板绑定（控制按钮显示）
        this.curRow["pRowId"] = "";
        this.setListAndWbObj(this.curRow["rowId"]);
      }
    },
    // 点击左侧列表中的值，设置到右侧面板中
    setRow(row) {
      // 复制普通属性
      this.curRow["rowId"] = row["rowId"];
      this.curRow["cols"].splice(0);
      this.curRow["cols"].push(...row["cols"]);
      this.curRow["pRowId"] = row["pRowId"];
      // 设置右侧搜索
      this.searchKey = row["cols"][this.autoCompareIndex()];
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
      this.wbObj[this.dict]["model"].forEach((tDict) => {
        let template = tDict["cols"][this.$compareIndexMap[this.dict]["model"]];
        let similar = this.getSimilar(template, searchKey);
        tmpArray.push({
          similar: similar,
          mRowId: tDict["rowId"],
          label: template,
        });
      });
      tmpArray.sort((a, b) => {
        return b["similar"] - a["similar"];
      });
      return tmpArray;
    },
    // 清空右侧面板
    clearCurRow() {
      this.curRow["rowId"] = "";
      this.curRow["cols"].splice(0);
      this.curRow["pRowId"] = "";
    },
    setGlobalCompareIndexMap() {
      for (let dict in this.wbObj) {
        this.$compareIndexMap[dict] = {};
        for (let bcName in this.wbObj[dict]) {
          this.$compareIndexMap[dict][bcName] = 0;
        }
      }
    },
    getSimilar(template, val) {
      if (template == null || val == null || !val || !template) return 0;
      template += "";
      val += "";

      let hit = 0;
      for (let i = 0; i < val.length; i++) {
        let char = val.charAt(i);
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
      return hit / val.length;
    },
  },
  watch: {
    dict(val, oldVal) {
      this.clearCurRow();
      this.bigColNames.splice(0);
      this.bcName = "";
      if (val != "") {
        for (let key in this.wbObj[val]) {
          if (key != "model") {
            this.bigColNames.push(key);
          }
        }
      }
    },
    bcName(val, oldVal) {
      this.clearCurRow();
      this.bigColRows.splice(0);

      if (val != "") {
        let dictObj = this.wbObj[this.dict];
        dictObj[val].forEach((bcr) => {
          let mRow = dictObj["model"].find(
            (mr) => mr["rowId"] == bcr["pRowId"]
          );
          bcr["similar"] = mRow
            ? this.getSimilar(
                mRow["cols"][this.$compareIndexMap[this.dict]["model"] || 0],
                bcr["cols"][this.$compareIndexMap[this.dict][val] || 0]
              )
            : 0;
        });
        this.bigColRows.push(...this.wbObj[this.dict][val]);
      }
    },
    searchKey(val, oldVal) {
      this.compareResults.splice(0);
      let tmpArray = this.getCompareResult(val);
      this.compareResults.push(...tmpArray);
    },
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
