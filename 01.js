class LRUCache {
    constructor(capacity) {
        this.capacity = capacity;
        this.map = new Map();
        this.head = { key: null, value: null, prev: null, next: null };
        this.tail = { key: null, value: null, prev: null, next: null };
        this.head.next = this.tail;
        this.tail.prev = this.head;
    }
    get(key) {
        if (!this.map.has(key)) {
            return -1;
        }
        const node = this.map.get(key);
        this.remove(node);
        this.addFirst(node);
        return node.value;
    }
    put(key, value) {
        if (this.map.has(key)) {
            const node = this.map.get(key);
            node.value = value;
            this.remove(node);
            this.addFirst(node);
            return;
        }
        const node = {
            key: key,
            value: value,
            prev: null,
            next: null
        };
        this.map.set(key, node);
        this.addFirst(node);
        if (this.map.size > this.capacity) {
            const last = this.tail.prev;
            this.remove(last);
            this.map.delete(last.key);
        }
    }
    remove(node) {
        node.prev.next = node.next;
        node.next.prev = node.prev;
    }
    addFirst(node) {
        node.prev = this.head;
        node.next = this.head.next;
        this.head.next.prev = node;
        this.head.next = node;
    }
}

const cache = new LRUCache(2);
cache.put("Ali", "Tashkent");
cache.put("Sara", "Samarkand");
console.log(cache.get("Ali")); // Tashkent
cache.put("John", "Bukhara");
console.log(cache.get("Sara")); // -1
console.log(cache.get("Ali"));  // Tashkent
console.log(cache.get("John")); // Bukhara