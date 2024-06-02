const createTree = (arr,parentID = "") => {
    const tree = []
    arr.forEach(item => {
        if(item.parent_id === parentID){
            const newItem = item;
            const children = createTree(arr,item.id);
            if(children.length > 0){
                newItem.children = children;
            }
            tree.push(newItem);
        }
    });
    return tree;
}


module.exports.tree = (arr,parentID = "") => {
    const tree = createTree(arr,parentID = "")
    return tree;
}