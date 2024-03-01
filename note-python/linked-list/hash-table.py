class HashTable:
    def __init__(self, length=5):
        self.max_len = length
        self.table = [[] for _ in range(self.max_len)]

    def _hash(self, key):
        res = sum([ord(s) for s in key])
        return res % self.max_len

    def set(self, key, value):
        index = self._hash(key)
        self.table[index].append((key, value))

    def get(self, key):
        index = self._hash(key)
        value = self.table[index]

        if not value:
            return None
        for v in value:
            if v[0] == key:
                return v[1]
        return None


if __name__ == "__main__":
    hashTable = HashTable()
    country = ["Korea", "America", "China", "England", "Türkiye"]
    city = ["Seoul", "Washington", "Beijing", "London", "Ankara"]

    for co, ci in zip(country, city):
        hashTable.set(co, ci)

    for i, v in enumerate(hashTable.table):
        print(i, v)

    print(hashTable.get("Korea"))
    print(hashTable.get("China"))
