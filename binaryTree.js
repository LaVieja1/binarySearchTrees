import Node from './node.js';

export default class Tree {
    constructor(arr) {
        this.root = this.buildTree(arr); //Construye el arbol apenas es llamado
        this.levelOrderTransversed = [];
        this.preorderTransversed = [];
        this.inorderTransversed = [];
        this.postorderTransversed = [];
    }

    buildTree(arr) {
        const sortedArray = this.sortArray(arr);
        const uniqueValuesArray = this.deleteDuplicates(sortedArray);
        console.log(uniqueValuesArray);
        const size = uniqueValuesArray.length;
        const root = this.sortedArrayToBST(uniqueValuesArray, 0, size - 1);
        return root;
    }

    sortArray(arr) {
        const sorted = arr.sort((a, b) => a - b); //Ordena el array
        return sorted;
    }

    deleteDuplicates(arr) {
        const uniques = [...new Set(arr)]; //Elimina duplicados
        return uniques;
    }

    sortedArrayToBST(arr, start, end) {
        if (start > end) {
            return null;
        }
        const mid = parseInt((start + end) / 2, 10);
        const node = new Node(arr[mid]);
        node.left = this.sortedArrayToBST(arr, start, mid - 1);
        node.right = this.sortedArrayToBST(arr, mid + 1, end);
        
        return node;
    }

    insert(data, node = this.root) {
        if (node == null) {
          node = new Node(data);
          return node;
        }
    
        if (data < node.data) node.left = this.insert(data, node.left);
        else if (data > node.data) node.right = this.insert(data, node.right);
        return node;
    }
    
    delete(data, node = this.root) {
        if (node == null) return node;
    
        if (data < node.data) node.left = this.delete(data, node.left);
        else if (data > node.data) node.right = this.delete(data, node.right);
        else {
          // node with only one child or no child
          if (node.left == null) return node.right;
          if (node.right == null) return node.left;
    
          // node with two children
          node.data = this.minValue(node.right);
          node.right = this.delete(node.data, node.right);
        }
        return node;
    }
    
    minValue(node) {
        let minv = node.data;
        while (node.left != null) {
          minv = node.left.data;
          node = node.left;
        }
        return minv;
    }

    find(data, node = this.root) {
        if (node.data === data) return node;

        if(data < node.data) return this.find(data, node.left);
        if(data > node.data) return this.find(data, node.right);
    }

    levelOrder(func = this.toArray) {
        this.levelOrderTransversed = [];
        if (this.root === null) return;

        const queue = [];
        queue.push(this.root); //Pone en fila todo el array del arbol

        while (queue.length > 0) {
            const node = queue[0];
            func(this.levelOrderTransversed, node.data);
            if (node.left != null) queue.push(node.left);
            if (node.right != null) queue.push(node.right); 
            queue.shift(); //Elimina el primer nodo de la fila y empieza por el siguiente
        }

        return this.levelOrderTransversed; //Devuelve un array con el orden del arbol por nivel
    }

    toArray(arr, value) {
        arr.push(value);
    }

    inOrder() {
        this.inorderTransversed = [];
        return this.recInOrder();
    }

    recInOrder(func = this.toArray, node = this.root) { //Usa la recursion para pasar a los nodos mas bajos
        if (node === null) return; 
        
        this.recInOrder(func, node.left); //Pasa el nodo izq a array
        func(this.inorderTransversed, node.data); //Pasa el nodo mid a array
        this.recInOrder(func, node.right); //Pasa el nodo der a array
        return this.inorderTransversed;
    }

    preOrder() {
        this.preorderTransversed = [];
        return this.recPreOrder();
    }

    recPreOrder(func = this.toArray, node = this.root) {
        if (node === null) return;

        func(this.preorderTransversed, node.data);
        this.recPreOrder(func, node.left);
        this.recPreOrder(func, node.right);
        return this.preorderTransversed;
    }

    postOrder() {
        this.postorderTransversed = [];
        return this.recPostOrder();
    }

    recPostOrder(func = this.toArray, node = this.root) {
        if (node === null) return;

        this.recPostOrder(func, node.left);
        this.recPostOrder(func, node.right);
        func(this.postorderTransversed, node.data);
        return this.postorderTransversed;
    }

    height(node) {
        if (node === null) return 0;

        const leftHeight = this.height(node.left);
        const rightHeight = this.height(node.right);
        return Math.max(leftHeight, rightHeight) + 1; //Devuelve la altura del arbol
    }

    depth(data, node = this.root, level = 0) {
        if (!data) return null;
        if (node === null) return 0;

        if (node.data === data.data) return level; 
        let count = this.depth(data, node.left, level + 1);
        if (count !== 0) return count;
        return this.depth(data, node.right, level + 1); //Devuelve la profundidad del dato
    }

    isBalanced() {
        const allNodes = this.inOrder();

        for (let i = 0; i < allNodes.length; i++) {
            const node = this.find(allNodes[i]);
            const leftSubtree = this.height(node.left);
            const rightSubtree = this.height(node.right);
            if (Math.abs(leftSubtree - rightSubtree) > 1) return false;
        }
        return true;
    }

    rebalance() {
        const currentTreeArray = this.inOrder();
        this.root = this.buildTree(currentTreeArray);
    }
}