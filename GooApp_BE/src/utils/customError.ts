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

export class UserCreateFail extends CustomError {
  constructor() {
    super(500, 'USER_CREATE_FAIL', '유저 생성에 실패했습니다.');
  }
}

export class UserNotFound extends CustomError {
  constructor() {
    super(404, 'USER_NOT_FOUND', '유저 검색에 실패했습니다.');
  }
}
