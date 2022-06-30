import { ApiProperty } from "@nestjs/swagger";
import { CreatePhotoDto } from "common/dto/create-photo.dto";

export class UpdateGalleryDto {
  @ApiProperty({type: String})
  readonly email: string;
  newPhoto: CreatePhotoDto; //photo to add (action: add)
  @ApiProperty({type: String, required: false})
  readonly photoId: string; //photo id to remove (action: remove)
  @ApiProperty({type: String})
  readonly action: string;
}