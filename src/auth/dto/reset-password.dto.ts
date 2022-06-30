import { ApiProperty } from "@nestjs/swagger";

export class ResetPasswordDto {
  @ApiProperty({type: String, required: true})
  readonly email: string;
  @ApiProperty({type: String, required: true})
  readonly newPassword: string;
  @ApiProperty({type: String, required: true})
  readonly newPasswordToken: string;
  @ApiProperty({type: String, required: true})
  readonly currentPassword: string;
}