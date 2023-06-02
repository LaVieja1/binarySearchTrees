import Tree from "./binaryTree.js";

const prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
};

function createRandomArray(n) {
    const array = [];
    for (let i = 0; i < n; i++) {
      array[i] = Math.floor(Math.random() * 101);
    }
    return array;
}

const tree = new Tree(createRandomArray(7));
prettyPrint(tree.root);