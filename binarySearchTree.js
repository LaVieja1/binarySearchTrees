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

    sortAndRemoveDuplicates(array) {
        const sorted = [...new Set(array)].sort((a, b) => a - b);
        return sorted;
    }

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
    }

    
}