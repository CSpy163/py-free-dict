<template>
  <div id="app" :style="appStyle">
    <!-- <a-layout v-if="loaded" class="container">
      <a-layout-content>
        <a-row>
          <a-col :span="8">
            <a-row>
              <a-col :span="12">
                <a-dropdown>
                  <a-menu slot="overlay" @click="handleMenuClick">
                    <a-menu-item v-for="(sheet, index) in sheets" :key="index">
                      <a-icon type="user" />{{ sheet }}
                    </a-menu-item>
                  </a-menu>
                  <a-button style="margin-left: 8px">
                    Button <a-icon type="down" />
                  </a-button>
                </a-dropdown>
              </a-col>
              <a-col :span="12">
                <a-dropdown>
                  <a-menu slot="overlay" @click="handleMenuClick">
                    <a-menu-item key="1">
                      <a-icon type="user" />1st menu item
                    </a-menu-item>
                    <a-menu-item key="2">
                      <a-icon type="user" />2nd menu item
                    </a-menu-item>
                    <a-menu-item key="3">
                      <a-icon type="user" />3rd item
                    </a-menu-item>
                  </a-menu>
                  <a-button style="margin-left: 8px">
                    Button <a-icon type="down" />
                  </a-button>
                </a-dropdown>
              </a-col>
            </a-row>
            <a-row>
              <a-col :span="24">
                <a-list bordered :data-source="source">
                  <a-list-item slot="renderItem" slot-scope="item, index">
                    {{ item }}
                  </a-list-item>
                  <div slot="header">Header</div>
                  <div slot="footer">Footer</div>
                </a-list>
              </a-col>
            </a-row>
          </a-col>
          <a-col :span="16">
            <a-row>
              <a-col :span="24">
                <span>当前选中：事实上</span
                ><a-tag closable color="purple"> purple </a-tag>
              </a-col>
              <a-col :span="24">
                <a-input-search
                  placeholder="男"
                  style="width: 200px"
                  @search="onSearch"
                />
              </a-col>
              <a-col :span="24">
                <a-list bordered :data-source="source">
                  <a-list-item slot="renderItem" slot-scope="item, index">
                    {{ item }}
                  </a-list-item>
                  <div slot="header">Header</div>
                  <div slot="footer">Footer</div>
                </a-list>
              </a-col>
            </a-row>
          </a-col>
        </a-row>
      </a-layout-content>
      <a-layout-footer>
        <a-row>
          <a-col :span="24">
            <a-button type="danger" @click="loaded=false"> 取消操作 </a-button>
            <a-dropdown>
              <a-menu slot="overlay" @click="handleMenuClick">
                <a-menu-item key="1"> 导出为excel </a-menu-item>
                <a-menu-item key="2"> 导出为sql </a-menu-item>
              </a-menu>
              <a-button> 导出 <a-icon type="down" /> </a-button>
            </a-dropdown>
          </a-col>
        </a-row>
      </a-layout-footer>
    </a-layout>
    <a-layout v-else class="container">
      <div style="color: pink" @drop="handleDrop" @dragover="handleDragOver">
        <p class="ant-upload-drag-icon">
          <a-icon type="inbox" />
        </p>
        <p class="ant-upload-text">Click or drag file to this area to upload</p>
        <p class="ant-upload-hint">
          Support for a single or bulk upload. Strictly prohibit from uploading
          company data or other band files
        </p>
      </div>
    </a-layout> -->
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      appStyle: {
        width: "100%",
        height: "100%",
        background: "white",
      },
      sheets: [],
      source: ["ssss", "aaa"],
      loaded: false,
    };
  },
  mounted() {
    // if (window.ipcRenderer) {
    // }
    // window.ipcRenderer.on("file-loaded",  (event, arg)=> {
      // this.loaded = true;
      // this.sheets.splice(0);
      // this.sheets.push(...arg);
      // console.log("yes");
      // console.log(arg);
    // });
  },
  methods: {
    handleDrop(e) {
      // e.preventDefault();
      // const files = e.dataTransfer.files;
      // if (files && files.length >= 1) {
      //   const path = files[0].path;
      //   if (window.ipcRenderer) {
      //     window.ipcRenderer.invoke("load-file", path);
      //   }
      // }
    },
    handleDragOver(e) {
      e.preventDefault();
    },
  },
};
</script>

<style>
.container {
  height: 100%;
}
</style>
