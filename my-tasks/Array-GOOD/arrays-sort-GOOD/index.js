function arraysSort(arr) {
  if (arr.length === 1) {
    return [arr[0]];
  }

  const res = arr.sort((a, b) => {
    const maxA = Math.max.apply(null, a);
    const maxB = Math.max.apply(null, b);

    if (maxA > maxB) {
      return 1;
    }
    if (maxA < maxB) {
      return -1;
    }

    return 0;
  });

  return res;
};

window.arraysSort = arraysSort;

export default arraysSort;
