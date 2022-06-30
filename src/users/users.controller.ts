import {
  Controller,
  Get,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  UseGuards,
  UseInterceptors,
  Param,
  UploadedFile,
} from '@nestjs/common';
import { diskStorage } from 'multer';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOkResponse, ApiOperation,ApiParam,ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserDto } from './dto/user.dto';
import { UsersService } from './users.service';
import { IResponse } from '../common/interfaces/response.interface';
import { ResponseSuccess, ResponseError } from '../common/dto/response.dto';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { LoggingInterceptor } from '../common/interceptors/logging.interceptor';
import { TransformInterceptor } from '../common/interceptors/transform.interceptor';
import { AuthGuard } from '../../node_modules/@nestjs/passport';
import { ProfileDto } from './dto/profile.dto';
import { SettingsDto } from './dto/settings.dto';
import { UpdateGalleryDto } from './dto/update-gallery.dto';
import { CurrentUser } from 'common/decorators/current-user.decorator';
import { editFileName, imageFileFilter } from 'common/utils/file-uploading';
import { PicDto } from './dto/pic.dto';
import { User } from './interfaces/user.interface';

@ApiTags('User')
@ApiBearerAuth()
@Controller('users')
@UseGuards(AuthGuard('jwt'))
@UseInterceptors(LoggingInterceptor, TransformInterceptor)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Get('me')
  @UseGuards(RolesGuard)
  @Roles('User')
  @ApiOperation({ summary: 'UsersController_findOne' })
  @ApiOkResponse({
    description: 'The user records',
    type: ResponseSuccess
  })
  @HttpCode(HttpStatus.OK)
  public async findOne(
    @CurrentUser() user: any): Promise<IResponse>{
    try {
      return new ResponseSuccess("COMMON.SUCCESS", new UserDto(user));
    } catch(error){
      return new ResponseError("COMMON.ERROR.GENERIC_ERROR", error);
    }
  }
  
  @Get('all')
  @UseGuards(RolesGuard)
  @Roles('User')
  @ApiOperation({ summary: 'UsersController_findAll' })
  @ApiOkResponse({
    description: 'The user records',
    type: ResponseSuccess
  })
  @HttpCode(HttpStatus.OK)
  public async findAll(): Promise<IResponse>{
   
    try {
      var users =  await this.usersService.findAll();
      const _users = users.map(user => new UserDto(user))
      return new ResponseSuccess("COMMON.SUCCESS", _users);
    } catch(error){
      return new ResponseError("COMMON.ERROR.GENERIC_ERROR", error);
    }
  }

  @Get('user/:email')
  @UseGuards(RolesGuard)
  @Roles('User')
  @ApiOperation({ summary: 'UsersController_findById' })
  @ApiResponse({status: HttpStatus.OK, type: ResponseSuccess})
  @ApiParam({ type: String, name: 'email' })
  @HttpCode(HttpStatus.OK)
  public async findById(@Param() params): Promise<IResponse>{
    try {
      var user =  await this.usersService.findByEmail(params.email);
      return new ResponseSuccess("COMMON.SUCCESS", new UserDto(user));
    } catch(error){
      return new ResponseError("COMMON.ERROR.GENERIC_ERROR", error);
    }
  }
  
  @Post('profile/update')
  @UseGuards(RolesGuard)
  @Roles('User')
  @ApiOperation({ summary: 'UsersController_updateProfile' })
  @ApiResponse({status: HttpStatus.OK, type: ResponseSuccess})
  @ApiBody({type: ProfileDto})
  async updateProfile(
    @CurrentUser() _user: User,
    @Body() profileDto: ProfileDto,
    @UploadedFile() file
    ): Promise<IResponse> {
    try {
      profileDto.email = _user.email;
      var user =  await this.usersService.updateProfile(profileDto);
      return new ResponseSuccess("PROFILE.UPDATE_SUCCESS", new UserDto(user));
    } catch(error){
      return new ResponseError("PROFILE.UPDATE_ERROR", error);
    }
  }
  @Post('profile/pic')
  @UseGuards(RolesGuard)
  @Roles('User')
  @ApiOperation({ summary: 'UsersController_updateProfilePic' })
  @ApiResponse({status: HttpStatus.OK, type: ResponseSuccess})
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FileInterceptor('profilepicture', {
      storage: diskStorage({
        destination: './files',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  @ApiBody({type: PicDto})
  async updateProfilePic(
    @CurrentUser() _user: any,
    @UploadedFile() file
    ): Promise<IResponse> {
    try {
      var user =  await this.usersService.updateProfilePic(file, _user);
      return new ResponseSuccess("PROFILE.UPDATE_SUCCESS", new UserDto(user));
    } catch(error){
      return new ResponseError("PROFILE.UPDATE_ERROR", error);
    }
  }

  @Post('gallery/update')
  @UseGuards(RolesGuard)
  @Roles('User')
  @ApiOperation({ summary: 'UsersController_updateGallery',deprecated: true})
  @ApiResponse({status: HttpStatus.OK, type: ResponseSuccess})
  @ApiBody({type: UpdateGalleryDto})
  async updateGallery(@Body() galleryRequest: UpdateGalleryDto): Promise<IResponse> {
    try {
      console.log(galleryRequest);
      
      var user =  await this.usersService.updateGallery(galleryRequest);
      return new ResponseSuccess("PROFILE.UPDATE_SUCCESS", new UserDto(user));
    } catch(error){
      return new ResponseError("PROFILE.UPDATE_ERROR", error);
    }
  }

  @Post('settings/update')
  @UseGuards(RolesGuard)
  @Roles('User')
  @ApiOperation({ summary: 'UsersController_updateSettings', deprecated: true })
  @ApiResponse({status: HttpStatus.OK, type: ResponseSuccess})
  @ApiBody({type: SettingsDto})
  async updateSettings(@Body() settingsDto: SettingsDto): Promise<IResponse> {
    try {
      var user =  await this.usersService.updateSettings(settingsDto);
      return new ResponseSuccess("SETTINGS.UPDATE_SUCCESS", new UserDto(user));
    } catch(error){
      return new ResponseError("SETTINGS.UPDATE_ERROR", error);
    }
  }
  
}