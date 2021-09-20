function sumCheck(a, b) {
    try {
        if (typeof a === 'number'  && typeof b === 'number') {
        return (a + b);
    } else {
        throw new Error
    }
    } catch (e) {
        { throw new Error("Wrong arguments type!") }
    }
  
}

window.sumCheck = sumCheck;

export default sumCheck;
