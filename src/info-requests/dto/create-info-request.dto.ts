import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsIn, IsNotEmpty, IsOptional, IsString } from 'class-validator'

export class CreateInfoRequestDto {
  @ApiProperty() @IsString() @IsNotEmpty() requester: string
  @ApiProperty() @IsEmail() contactEmail: string
  @ApiProperty({ enum: ['stock','price','delivery','other'] })
  @IsString() @IsIn(['stock','price','delivery','other']) type: any
  @ApiProperty({ required: false }) @IsOptional() payload?: Record<string, any>
}
