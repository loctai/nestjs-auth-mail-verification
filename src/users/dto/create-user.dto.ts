import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
  @ApiProperty({type: String, required: true})
  readonly name: string;
  @ApiProperty({type: String, required: true})
  readonly surname: string;
  @ApiProperty({type: String, required: true})
  readonly email: string;
  @ApiProperty({type: String, required: true})
  readonly phone: string;
  @ApiProperty({type: Date, required: true})
  readonly birthdaydate: Date;
  @ApiProperty({type: String, required: true})
  password: string;
}