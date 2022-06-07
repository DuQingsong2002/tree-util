const treeData = [
    {
        id: 1,
        name: 'A',
        children: [
            {
                id: 10,
                name: 'AA',
                children: [
                    {
                        id: 100,
                        name: 'AAA'
                    }
                ]
            }
        ]
    },
    {
        id: 2,
        name: 'B',
        children: [
            {
                id: 20,
                name: 'BB',
            }
        ]
    }
]

import * as TreeUtil from './../src/tree-util'

test('searchNode', () => {

    expect(TreeUtil.searchNode(treeData, (node) => node.id === 100))
        .toEqual({
                id: 100,
                name: 'AAA'
            })

    expect(TreeUtil.searchNode(treeData, (node) => node.id === 2))
    .toEqual(treeData[1])
    
})

test('searchFullNode', () => {

    expect(TreeUtil.searchFullNode(treeData, (node) => node.id === 100).map(v => v.id))
        .toEqual([1,10,100])
    expect(TreeUtil.searchFullNode(treeData, (node) => node.id === 20).map(v => v.id))
        .toEqual([2, 20])

})

test('searchAll', () => {
    expect(TreeUtil.searchAll(treeData, (node) => node.name.includes('A')).map(item => item.id))
        .toEqual([1,10,100])
    expect(TreeUtil.searchAll(treeData, (node) => true).map(item => item.id))
        .toEqual([1,10,100,2,20])

})