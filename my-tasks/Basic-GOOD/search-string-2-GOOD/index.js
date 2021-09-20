function searchString(obj) {

  Object.keys(obj).forEach(key => (
    obj[key] === undefined || 
    obj[key] === null || 
    obj[key].length === 0) ? delete obj[key] : {});

  return Object.keys(obj).reduce(function (str, key, i) {
    let delimiter, value;
    delimiter = (i === 0) ? '?' : '&';
    key = encodeURIComponent(key);
    value = encodeURIComponent(obj[key]);
    return [str, delimiter, key, '=', value].join('');
  }, '');
}

window.searchString = searchString;

export default searchString;
