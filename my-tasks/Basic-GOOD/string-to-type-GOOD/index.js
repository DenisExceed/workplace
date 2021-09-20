export default function stringToType(str) {
  
  if (str === 'null') return null;
  if (str === 'undefined') return undefined;
  if (str === 'true') return true;
  if (str === 'false') return false;

  if (!str) return '';

  const strAsNumber = +str;

  if (typeof strAsNumber === 'number' && !Number.isNaN(strAsNumber)) {
    return strAsNumber;
  }

  return str;

};

