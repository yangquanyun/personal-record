/**
 * 扁平数据结构转Tree
 */

let arr = [
    {id: 1, name: '部门1', pid: 0},
    {id: 2, name: '部门2', pid: 1},
    {id: 3, name: '部门3', pid: 1},
    {id: 4, name: '部门4', pid: 3},
    {id: 5, name: '部门5', pid: 4},
]

// 输出结果
// [
//     {
//         "id": 1,
//         "name": "部门1",
//         "pid": 0,
//         "children": [
//             {
//                 "id": 2,
//                 "name": "部门2",
//                 "pid": 1,
//                 "children": []
//             },
//             {
//                 "id": 3,
//                 "name": "部门3",
//                 "pid": 1,
//                 "children": [
//                     // 结果 ,,,
//                 ]
//             }
//         ]
//     }
// ]

// 方法一： 不考虑性能实现，直接递归遍历查找
const getChildren = (data, result, pid) => {
    for (const item of data) {
        if (item.pid === pid) {
            const newItem = {...item, children: []};
            result.push(newItem);
            getChildren(data, newItem.children, item.id);
        }
    }
}

const arrayToTree1 = (data, pid) => {
    const result = [];
    getChildren(data, result, pid);
    return result;
}


// 方法二：先把数据转成Map去存储，之后遍历的同时借助对象的引用，直接从Map找对应的数据做存储
function arrayToTree2 (items) {
    const result = []; // 存放结果集
    const itemMap = {};

    for (const item of items) {
        itemMap[item.id] = {...item, children: []};
    }

    for (const item of items) {
        const id = item.id;
        const pid = item.pid;
        const treeItem = itemMap[id];
        if (pid === 0) {
            result.push(treeItem);
        } else {
            if (!itemMap[pid]) {
                itemMap[pid] = {
                    children: []
                }
            }
            itemMap[pid].children.push(treeItem);
        }
    }
    return result;
}

// 方法三: 最优解，先把数据转为Map去存储，之后遍历的同时借助对象的引用，直接从Map找对应的数据做存储。
// 不同点在遍历的时候即做Map存储，又找对应关系。性能会更好

function arrayToTree3(items) {
    const result = []; // 存放结果集
    const itemMap = {};
    for (const item of items) {
        const id = item.id;
        const pid = item.pid;

        if (!itemMap[id]) {
            itemMap[id] = {
                children: [],
            }
        }
        itemMap[id] = {
            ...item,
            children: itemMap[id]['children']
        }

        const treeItem = itemMap[id];

        if (pid === 0) {
            result.push(treeItem);
        } else {
            if (!itemMap[pid]) {
                itemMap[pid] = {
                    children: [],
                }
            }
            itemMap[pid].children.push(treeItem);
        }
    }
    return result;
}

// 方法四： 列表结构转为树结构，就是把所有非根节点放到对应父节点的children数组中，然后把根节点提取出来
const listToTree = (list) => {
    const info = list.reduce((map, node) => (map[node.id] = node, node.children = [], map), {})
    return list.filter(node => {
        node.pid && info[node.pid].children.push(node);
        return !node.pid;
    })
}
