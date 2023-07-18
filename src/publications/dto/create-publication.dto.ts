import { IsDateString, IsNotEmpty, IsString, IsUrl } from 'class-validator';

export class CreatePublicationDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  text: string;

  @IsString()
  @IsNotEmpty()
  @IsUrl()
  image: string;

  @IsDateString()
  @IsNotEmpty()
  dateToPublish: Date;

  @IsString()
  @IsNotEmpty()
  socialMedia: string;
}
