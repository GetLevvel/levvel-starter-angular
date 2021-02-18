export interface IAuthenticateResponse {
  userInfo: any;
  token: any;
}

export interface IAuthenticateUserQuery {
  username: string;
  password: string;
}

export interface ISerializableException {
  message: string;
  stackTrace?: string | null;
  inner?: any[] | null;
}

export class SerializableException implements ISerializableException {
  message!: string;
  stackTrace?: string | null;
  inner?: SerializableException[] | null;

  constructor(data?: ISerializableException) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(_data?: any) {
    if (_data) {
      this.message =
        _data['message'] !== undefined ? _data['message'] : <any>null;
      this.stackTrace =
        _data['stackTrace'] !== undefined ? _data['stackTrace'] : <any>null;
      if (Array.isArray(_data['inner'])) {
        this.inner = [] as any;
        for (let item of _data['inner'])
          this.inner!.push(SerializableException.fromJS(item));
      }
    }
  }

  static fromJS(data: any): SerializableException {
    data = typeof data === 'object' ? data : {};
    let result = new SerializableException();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data['message'] = this.message !== undefined ? this.message : <any>null;
    data['stackTrace'] =
      this.stackTrace !== undefined ? this.stackTrace : <any>null;
    if (Array.isArray(this.inner)) {
      data['inner'] = [];
      for (let item of this.inner) data['inner'].push(item.toJSON());
    }
    return data;
  }
}
