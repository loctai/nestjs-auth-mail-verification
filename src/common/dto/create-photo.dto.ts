import { ApiProperty } from "@nestjs/swagger";

export class CreatePhotoDto {
  constructor(object: any = {}) {
    this.description = object.description;
    this.tags = object.tags;
    this.imageData = object.imageData;
  };
  @ApiProperty({type: String, required: true})
  readonly description: string;
  @ApiProperty({type: String, required: true})
  readonly tags: string[];
  @ApiProperty({type: String, required: true})
  readonly imageData: string;
}