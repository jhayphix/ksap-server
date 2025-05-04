export function formDataToNestedObject(flatObj) {
  const result = {};

  for (const flatKey in flatObj) {
    const value = flatObj[flatKey];
    const keys = [];
    const regex = /([^\[\]]+)/g;

    let match;
    while ((match = regex.exec(flatKey))) {
      keys.push(match[1]);
    }

    let current = result;
    keys.forEach((key, index) => {
      const isLast = index === keys.length - 1;
      const nextKey = keys[index + 1];
      const isArray = /^\d+$/.test(nextKey);

      if (isLast) {
        current[key] = value;
      } else {
        if (!current[key]) {
          current[key] = isArray ? [] : {};
        }
        current = current[key];
      }
    });
  }

  return result;
}
