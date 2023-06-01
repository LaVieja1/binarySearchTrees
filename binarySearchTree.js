class Node {
    constructor (data = null, left = null, right = null) {
        this.data = data;
        this.left = left;
        this.right = right;
    }
}

class BinaryTree {
    constructor(array) {
        this.root = this.buildTree(array);
    }
}