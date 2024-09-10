class ErrorHandler extends Error {
  statusCode: number;

  constructor(errMessage: string, statusCode: number) {
    super(errMessage); // Error 클래스의 생성자 호출하고 Error 객체에 errMessage 할당
    this.statusCode = statusCode; // statusCode를 이 클래스의 statusCode에 할당
  }
}

export default ErrorHandler;
