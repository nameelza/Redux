const deepEqual = (obj1, obj2) => {
    
    let keys1 = Object.keys(obj1);
    let keys2 = Object.keys(obj2);
    
    if (keys1.length !== keys2.length) {
        return false;
    }
    
    for (key of keys1) {
            val1 = obj1[key];
        val2 = obj2[key];
        areObjects = isObject(val1) && isObject(val2);
        if ((!areObjects && val1 !== val2) ||(areObjects && !deepEqual(val1, val2)) {
            return false;
        }
    }
    return true;
}

const isObject = (obj) => {
    return obj !== null && typeof obj === "object";
}

console.log(deepEqual(obj, {here: {is: "an"}, object: 2}));