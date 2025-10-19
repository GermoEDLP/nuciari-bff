import { IsOptional, IsString } from 'class-validator'
import { PaginationDto } from '../../common/dto/pagination.dto'

export class QueryInfoRequestDto extends PaginationDto {
  @IsOptional() @IsString() type?: string
  @IsOptional() @IsString() status?: string
  @IsOptional() @IsString() search?: string
}
