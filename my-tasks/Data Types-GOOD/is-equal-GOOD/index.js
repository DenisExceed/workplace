function isEqual(obj1, obj2) {
  if (!obj1 || !obj2) {
    return false;
  }

  const obj1Keys = Object.keys(obj1);
  const obj2Keys = Object.keys(obj2);

  if (obj1Keys.length === 0 && obj2Keys.length == 0) {
    return true;
  }

  if (obj1Keys.length !== obj2Keys.length) {
    return false;
  }

  if (obj1Keys.filter(x => obj2Keys.includes(x)).length !== obj1Keys.length) {
    return false;
  }

  if (JSON.stringify(obj1) === JSON.stringify(obj2)) {
    return true;
  }

  return false;
}


window.isEqual = isEqual;

export default isEqual;
