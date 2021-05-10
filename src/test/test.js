let wbObj = {
    compareIndexMap: {},
    // 自带 bind 方法
    bind: function (dict, bc, rowId, pRowId) {
        // 检查属性
        if (dict && this[dict] && Array.isArray(this[dict][bc]) && Array.isArray(this[dict]['model'])) {
            // 大列 中的行
            const bcRow = this[dict][bc].find(bcr => bcr['rowId'] == rowId);
            // model 中的行
            const mRow = this[dict]['model'].find(mr => mr['rowId'] == pRowId);
            if (bcRow && mRow) {
                // 设置 大列 中列
                bcRow['pRowId'] = pRowId;
                // 设置 model 中列
                if (!mRow['matches'][bc]) mRow['matches'][bc] = [];
                if (!mRow['matches'][bc].find(bcr => bcr['rowId'] == rowId)) {
                    mRow['matches'][bc].push({
                        similar: this.getSimilar(mRow['cols'][this['compareIndexMap'][dict]['model']], bcRow['cols'][this['compareIndexMap'][dict][bc]]),
                        bcName: bc,
                        rowId: rowId
                    })
                }
                return true;
            }
        }
        return false;
    },
    // 获取 相似度
    getSimilar: (template, val) => {
        if (template == null || val == null) return 0;
        template += ""
        val += ""

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
    }
}

wbObj.bind('dict', 'ss', 'c', 'd')

console.log("" ? true : false)
console.log(typeof (undefined + ""))

let arr = [2,1,3]
arr.sort()
console.log(arr)