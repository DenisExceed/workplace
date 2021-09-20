function basicCalc(operation, a, b) {
    switch (operation) {
        case operation = '+':
            return (a + b);
        case operation = '-':
            return (a - b);
        case operation = '*':
            return (a * b);
        case operation = '/':
            return (a / b);     
    }

}

window.basicCalc = basicCalc;

export default basicCalc;
