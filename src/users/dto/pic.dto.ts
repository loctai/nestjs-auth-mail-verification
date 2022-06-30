import { ApiProperty } from '@nestjs/swagger';

export class PicDto {
    @ApiProperty({ type: 'string', format: 'binary'})
    profilepicture: string;
}