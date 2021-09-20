
function stringToType(query) {
  
  if (query === 'null') return null;
  if (query === 'undefined') return undefined;
  if (query === 'true') return true;
  if (query === 'false') return false;

  if (!query) return '';

  const queryAsNumber = +query;

  if (typeof queryAsNumber === 'number' && !Number.isNaN(queryAsNumber)) {
    return queryAsNumber;
  }

  return query;

};

function queryToObject(query) {

  let newQuery = query; 

  if (newQuery.includes('?') && newQuery.length > 2) {
    newQuery = newQuery.replaceAll('?', ''); 
  }
  
  let resultQuery = {}; 

  if (!newQuery) {resultQuery = {}}

  let partsOfQuery = newQuery.split('&');

  partsOfQuery.forEach( 
    function (part) {
        let keyValue = part.split('=');
        resultQuery[keyValue[0]] = stringToType(keyValue[1]);

        if (resultQuery[keyValue[0]] === '?') {resultQuery = {}}
        if (resultQuery[keyValue[0]] === '') {resultQuery = {}}
      
    });
  
  

return resultQuery;

};


window.queryToObject = queryToObject;

export default queryToObject;
