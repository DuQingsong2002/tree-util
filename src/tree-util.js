/**
 * 
 * @typedef {Object} treeSearchConfig
 * @property {Boolean} isSingle 是否单节点
 * @property {Boolean} isGlobal 是否贪心
 * 
 * @param {Array} tree 
 * @param {Function} compare 
 * @param {String} childrenKey 
 * @param {treeSearchConfig} config 
 * @returns {Array || Object}
 */
const search = function(tree, compare, childrenKey = 'children', config, level = 0, result, globalResultList = []) {

    for (const node of tree) {
        if(!config.isSingle) {
            if(level === 0) {
                result = []
            }
            result.push(node)
        }

        if(compare(node)) {
            const r = config.isSingle ? node : result

            if(config.isGlobal) {
                globalResultList.push(r)
            }else {
                return r
            }
        }

        if(!!node[childrenKey] && node[childrenKey].length > 0) {
            const r = search(node[childrenKey], compare, childrenKey, config, level+1, result, globalResultList)
            if(!config.isGlobal && !!r) {
                return r
            }
        }
    }

    return config.isGlobal ? globalResultList : undefined
}

/**
 * 搜索节点
 * @param {Array} tree 
 * @param {Array} compare 
 * @param {Array} childrenKey 
 */
export const searchNode = function(tree, compare, childrenKey) {

    return search(tree, compare, childrenKey, {
        isSingle: true,
        isGlobal: false
    })
}

/**
 * 搜索节点
 * @param {Array} tree 
 * @param {Array} compare 
 * @param {Array} childrenKey 
 */
 export const searchFullNode = function(tree, compare, childrenKey) {

    return search(tree, compare, childrenKey, {
        isSingle: false,
        isGlobal: false
    })
}

/**
 * 搜索集合
 * @param {*} tree 
 * @param {*} compare 
 * @param {*} childrenKey 
 * @returns 
 */
export const searchAll = function(tree, compare, childrenKey) {
    
    return search(tree, compare, childrenKey, {
        isSingle: true,
        isGlobal: true
    })

}