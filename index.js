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

function addNumbers(n) {
    const array = createRandomArray(n);
    for (let i = 0; i < n; i++) {
      tree.insert(array[i]);
    }
}

const tree = new Tree(createRandomArray(7));
prettyPrint(tree.root);

addNumbers(4);
prettyPrint(tree.root);

console.log(`Lever Order Transversal: ${tree.levelOrder()}`);
console.log(`Inorder Transversal: ${tree.inOrder()}`);
console.log(`Preorder Transversal: ${tree.preOrder()}`);
console.log(`Postorder Transversal: ${tree.postOrder()}`);