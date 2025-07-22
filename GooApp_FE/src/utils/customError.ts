/**
 * CustomError
 *
 * constructor (statusCode : HTTP 상태 코드, errorCode : 에러 코드, message : 에러 메시지)
 */
export class CustomError extends Error {
  statusCode: number;
  errorCode: string;

  constructor(statusCode: number, errorCode: string, message: string) {
    super(message);
    this.statusCode = statusCode;
    this.errorCode = errorCode;
  }
}
