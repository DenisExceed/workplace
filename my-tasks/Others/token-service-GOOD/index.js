/*
  Задача
  Написать TokenService, в котором есть слудеющие функции
  subscribe(callback) - добавляет подписку на изменение токена (параметром будет новый токен, или null, если токен удален)
  setToken(token) - устанавливает значения токена (вызывает подписчиков)
  removeToken() - удаляет токен (вызвает подписчиков на изменеия)
  getToken() - возващяет токен
 */

class TokenService {
  
  token = '';
  callback;
   
  getToken(token) {
    return this.token;
  }

  setToken(token) {
    this.token = token;
    if (this.callback &&  typeof this.callback === 'function' ) {
    this.callback(this.token);
    }
  }  

  removeToken(token) {
     this.token = null;
     if (this.callback &&  typeof this.callback === 'function' ) {
     this.callback(this.token);
     } 
  }

  subscribe(callback) {
      this.callback = callback;
  }


}


window.TokenService = TokenService;

export default TokenService;
