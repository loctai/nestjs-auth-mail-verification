// success: true => message, data
// success: false => errorMessage, error

import { ApiProperty } from "@nestjs/swagger";

export interface IResponse{
  success: boolean;
  message: string;
  errorMessage: string;
  data: any[];
  error: any;
}

export class ResponseDto {
  @ApiProperty({type: Boolean})
  success: boolean;
  @ApiProperty({type: String})
  message: string;
  @ApiProperty({type: String})
  errorMessage: string;
  @ApiProperty({})
  data: any[];
  @ApiProperty({})
  error: any;
}
