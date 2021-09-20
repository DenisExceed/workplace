/*
  Задача написать функцию baseExpect которая будет работать следующим образом
  Пример
  baseExpect(4).toBe(4) === true
  baseExpect(5).toBe(4) === false
  baseExpect(5).toBe.not(4) === true
  baseExpect(5).toBe.not(5) === false
  Примечание: Должно работать только с числами
 */

class Test {
  constructor(a) {
    this.a = a;
    this.toBe = {
      not (b) {
        console.log(b)
      }
    }
  }

  toBe (b) {
    return this.a === b
  }
}

function baseExpect(a) {
  return new Test(a);
}

window.baseExpect = baseExpect;

export default baseExpect;
