let count = 0;
const createTree = function (arr, parentID="") {
    const tree = [];
    arr.forEach((item) => {
        if (item.parent_id == parentID) {
            const newItem = item;
            count++;
            newItem.index = count;
            const children = createTree(arr, item.id);
            if (children.length > 0) {
                newItem.children = children;
            }
            tree.push(newItem);
        }
    });
    return tree;
}

module.exports.tree = function(items, parentID="") {
    count = 0;
    return createTree(items, parentID);
}