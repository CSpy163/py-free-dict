# free-dict
> 用于字典快速比对。

## 项目详情
技术栈为 Vue + Element + Electron。通过主进程读取`xlsx`，封装成对象，传入渲染进程，进行数据操作。操作完毕之后，将对象传回主进程导出。提供`SQL`语句生成，方便快速编写。

## 现有功能
1. 字典快速比对
2. Excel导入导出
3. SQL语句生成

## 需要完善的地方
1. 发现一个bug，偶尔出现导出丢失一行的问题
2. 界面优化

## 操作指南
- 相关概念
> 列定义

![列定义](https://py-git.oss-cn-beijing.aliyuncs.com/free-dict/%E5%88%97%E5%AE%9A%E4%B9%89.png)
> 表格页

![表格页](https://py-git.oss-cn-beijing.aliyuncs.com/free-dict/%E8%A1%A8%E6%A0%BC%E9%A1%B5.png)
- 对比列
> 大列中，用于对比的列
![对比列](https://py-git.oss-cn-beijing.aliyuncs.com/free-dict/%E5%AF%B9%E6%AF%94%E5%88%97%E6%A6%82%E5%BF%B5.gif)
- SQL导出
> 用于SQL导出，建议认真观看模版后使用。
![SQL导出](https://py-git.oss-cn-beijing.aliyuncs.com/free-dict/sql%E5%AF%BC%E5%87%BA.gif)
> 多转一情况下，会用到`单元素模版`（第一项） + `多元素模版`（第二项及以后）的形式。