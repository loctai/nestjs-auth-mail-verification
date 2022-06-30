// success: true => message, data
// success: false => errorMessage, error
import { ApiProperty } from '@nestjs/swagger';
import { IResponse } from '../interfaces/response.interface';

export class ResponseError implements IResponse{
  constructor (infoMessage:string, data?: any) {
    this.success = false;
    this.message = infoMessage;
    this.data = data;
    console.warn(new Date().toString() + ' - [Response]: ' + infoMessage + (data ? ' - ' + JSON.stringify(data): ''));
  };
  @ApiProperty({type: String, required: true})
  message: string;
  @ApiProperty()
  data: any[];
  errorMessage: any;
  @ApiProperty()
  error: any;
  @ApiProperty({type: Boolean})
  success: boolean;
}

export class ResponseSuccess implements IResponse{
  constructor (infoMessage:string, data?: any, notLog?: boolean, t?:any) {
    this.success = true;
    this.message = infoMessage;
    this.data = data;
    if(!notLog) {
      try {
        var offuscateRequest = JSON.parse(JSON.stringify(data));
        if(offuscateRequest && offuscateRequest.token) offuscateRequest.token = "*******";
        console.log(new Date().toString() + ' - [Response]: ' + JSON.stringify(offuscateRequest))
      } catch(error){}
    };
  };
  @ApiProperty({type: String, required: true})
  message: string;
  @ApiProperty({
    oneOf: [
      { type: 'array' },
      { type: 'object' },
      { type: 'string' }
    ]
  })
  data: any[];
  errorMessage: any;
  @ApiProperty({
    oneOf: [
      { type: 'object' },
      { type: 'string' },
      { type: 'array' },
    ]
  })
  error: any;
  @ApiProperty({type: Boolean})
  success: boolean;
}