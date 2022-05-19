// REVERSE ARRAY

const reverseArrayFirst = (array) => {
  newArray = [];
  for (let element of array) {
    newArray.unshift(element);
  }
  return newArray;
};

const reverseArraySecond = (array) => {
  newArray = [];
  for (let i = array.length - 1; i >= 0; i--) {
    newArray.push(array[i]);
  }
  return newArray;
};

const reverseArrayInPlaceFirst = (array) => {
  for (let item of [...array]) {
    array.unshift(item);
    array.pop();
  }
  return array;
};

const reverseArrayInPlaceSecond = (array) => {
  for (let i = 0; i <= Math.floor(array.length / 2); i++) {
    let swap = array[i];
    array[i] = array[array.length - 1 - i];
    array[array.length - 1 - i] = swap;
  }
  return array;
};

console.log(reverseArraySecond([2, 4, 6]));

// DEEP COMPARISON OF OBJECTS

const deepEqual = (obj1, obj2) => {
  if (obj1 === obj2) {
    return true;
  } else if (!isObject(obj1) || !isObject(obj2)) {
    return false;
  }
  let keys1 = Object.keys(obj1);
  let keys2 = Object.keys(obj2);

  if (keys1.length !== keys2.length) {
    return false;
  }

  for (key of keys1) {
    val1 = obj1[key];
    val2 = obj2[key];
    areObjects = isObject(val1) && isObject(val2);
    if (
      (!areObjects && val1 !== val2) ||
      (areObjects && !deepEqual(val1, val2))
    ) {
      return false;
    }
  }
  return true;
};

const isObject = (obj) => {
  return obj !== null && typeof obj === "object";
};

// LINKED LIST

const arrayToList1 = (array) => {
  let list = {};
  let nextNode = null;
  for (let el = array.length - 1; el >= 0; el--) {
    list = {
      value: array[el],
      pointer: nextNode,
    };
    nextNode = list;
  }
  return list;
};

const arrayToList2 = (array) => {
  let list = {};
  for (let el = array.length - 1; el >= 0; el--) {
    list = {
      value: array[el],
      pointer: list,
    };
  }
  return list;
};

const listToArray = (list) => {
  let result = [];
  for (let node = list; node; node = node.pointer) {
    if (node.pointer === undefined) {
      return result;
    }
    result.push(node["value"]);
  }
  return result;
};

const nth = (list, number) => {
  if (!list) {
    return undefined;
  } else if (number == 0) {
    return list.value;
  } else {
    return nth(list.pointer, number - 1);
  }
};

// FLATTEN ARRAYS

const flatten = (array) => {
  const result = array.reduce((prev, curr) => prev.concat(curr), []);
  return result;
};

// [[1, 2, 4], [3, 7], [5]]
// -> [1, 2, 4, 3, 7, 5]

//

// Functions defined in Chapter 5 (Higher Order Functions)

function characterScript(code) {
  // Given a character code, we can find the corresponding script (if any):

  for (let script of SCRIPTS) {
    if (
      script.ranges.some(([from, to]) => {
        return code >= from && code < to;
      })
    ) {
      return script;
    }
  }

  return null;
}

function countBy(items, groupName) {
  // Count the items belonging to each group name.

  let counts = [];

  for (let item of items) {
    let name = groupName(item);
    let known = counts.findIndex((c) => c.name == name);
    if (known == -1) {
      counts.push({ name, count: 1 });
    } else {
      counts[known].count++;
    }
  }

  return counts;
}

function dominantDirection(text) {
  // Returns the dominant direction (writing direction of majority of characters)
  // of the given text. Otherwise, return `null` if the text doesn't any character(s)
  // from any script specified in the Unicode character set.

  // Get an array containing an objects with info about
  // all the writing direction(s) observed in the given text.
  let writingDirections = countBy(text, (char) => {
    // The expression `char.codePointAt(0)` returns the Unicode code.
    // We can then use it as an argument to find the script(if any) of the
    // given character.
    let script = characterScript(char.codePointAt(0));
    return script ? script.direction : null;
  }).filter((direction) => direction.name !== null);

  // Special Case: `writingDirections` is an empty Array i.e., `text` doesn't contain any characters
  // belonging to any script specified in Unicode charset).
  if (!writingDirections.length) {
    return null;
  } else {
    // A `writingDirection` object which representing the dominant direction of the `text`
    // is returned when we use reduce() on `writingDirections`.
    const { name: dominantDirection } = writingDirections.reduce(
      (dominantDirection, writingDirection) => {
        return writingDirection.count > dominantDirection.count
          ? writingDirection
          : dominantDirection;
      }
    );

    return dominantDirection;
  }
}
