import { ApiProperty } from "@nestjs/swagger";

export class Login {
    @ApiProperty({type: String, required: true})
    readonly email: string;
    @ApiProperty({type: String, required: true})
    readonly password: string;
  }