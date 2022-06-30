import { ApiProperty } from "@nestjs/swagger";

export class ProfileDto {
  constructor(object: any) {
    this.email = object.email;
    this.name = object.name;
    this.surname = object.surname;    
    this.birthdaydate = object.birthdaydate;
    this.phone = object.phone;
  };
  email: string;
  @ApiProperty({type: String, required: false})
  readonly name: string;
  @ApiProperty({type: String, required: false})
  readonly surname: string;
  @ApiProperty({type: String, required: false})
  readonly birthdaydate: Date;
  @ApiProperty({type: String, required: false})
  readonly phone: string;
}