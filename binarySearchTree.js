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
    } //Contruye el arbol apenas es llamado

    sortAndRemoveDuplicates(array) {
        const sorted = [...new Set(array)].sort((a, b) => a - b);
        return sorted;
    } //Ordena y elimina los valores duplicados del array

    buildTree(array) {
        let sorted = this.sortAndRemoveDuplicates(array);
        if (sorted.length === 0) return null;
        const mid = parseInt(sorted.length / 2);
        const root = new Node(
            sorted[mid],
            this.buildTree(sorted.slice(0, mid)),
            this.buildTree(sorted.slice(mid + 1))
        );
        return root;
    } //Construye el arbol, seteando un medio y usando la recursion para los demas niveles

    insert(value, root = this.root) {
        if (root === null) return new Node(value);

        root.data < value
            ? (root.right = this.insert(value, root.right))
            : (root.left = this.insert(value, root.left));
        return root;

    } //Agrega un nuevo nodo al arbol;

    minValue(root) {
        let minV = root.data;
        while (root.left != null) {
            minV = root.left.data;
            root = root.left;
        }
        return minV;
    } //Mira cual es el valor menor

    delete(value, root = this.root) {
        if (root === null) return root;

        if (root.data < value) root.right = this.delete(value, root.right);
        else if (root.key > value) root.left = this.delete(value, root.left);
        else {
            //Node 1 o 0 hijos
            if (root.left === null) return root.right;
            else if (root.right === null) return root.left;

            //Node 2 hijos
            root.data = this.minValue(root.right);
            root.right = this.delete(value, root.right);
        }
        return root;
    } //Elimina un nodo del arbol

}

const prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
};

let tree = new BinaryTree([3, 2, 4, 1]);

tree.insert(8);
tree.insert(10);
tree.insert(12);
tree.insert(5);

tree.delete(5);

prettyPrint(tree.root); // [3, 2, 4, 1, 8, 10, 12]