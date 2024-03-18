class HashTable:
    def __init__(self, size=10, mode="digit-folding"):
        self.table = [[] for _ in range(size)]
        self.size = size
        self.mode = mode

    def _hash(self, data):
        key = 0
        if self.mode == "digit-folding":
            for d in str(data):
                key += ord(d)

        if self.mode == "polynomial-rolling":
            p = 31
            m = int(1e9) + 9

            string = str(data)

            for i in range(len(string)):
                key += ord(string[i]) * pow(p, i)
                key %= m

        return key % self.size

    def insert(self, _key, _value):
        key = self._hash(_key)

        index = 0
        for data in self.table[key]:
            k, _ = data
            if k == _key:
                self.table[key][index] = [_key, _value]
                return
            index += 1

        self.table[key].append([_key, _value])

    def delete(self, _key):
        key = self._hash(_key)

        index = 0
        for data in self.table[key]:
            k, _ = data
            if k == _key:
                removed = self.table[key][index]
                del self.table[key][index]
                return removed
            index += 1

        return "[KeyError] hash_key : " + str(key)

    def get(self, _key):
        key = self._hash(_key)

        index = 0
        for data in self.table[key]:
            k, v = data
            if k == _key:
                return v
            index += 1

        return "[KeyError] hash_key : " + str(_key)

    def set(self, _key, _data):
        key = self._hash(_key)

        index = 0
        for data in self.table[key]:
            k, _ = data
            if k == _key:
                self.table[key][index] = [_key, _data]
                return True
            index += 1

        return "[KeyError] hash_key : " + str(_key)

    def get_table(self):
        return self.table


if __name__ == "__main__":
    hash_table = HashTable(10, mode="polynomial-rolling")
    inserts = [
        ("a", 1),
        ("aa", 3),
        ("aab", 4),
        ("aabd", 5),
        ("aabc", 6),
        ("bbb", 7),
        ("b", 8),
        ("z1z2z", 9),
        ("c", 10),
        ("de", 11),
        ("a", 2),
        ("d", 11),
    ]
    gets = ["a", "aabd", "z1z"]
    deletes = ["aabd", "c", "z"]
    sets = [("aa", 8), ("cc", 12), ("de", 1110)]

    for t in inserts:
        key, value = t
        hash_table.insert(key, value)
    print("hash_table : ", hash_table.get_table())
    print()

    for t in gets:
        print("get: ", hash_table.get(t))
    print()

    for t in deletes:
        print("delete : ", hash_table.delete(t))
    print("hash_table : ", hash_table.get_table())
    print()

    for t in sets:
        key, value = t
        print("set : ", hash_table.set(key, value))
    print("hash_table : ", hash_table.get_table())
    print()
