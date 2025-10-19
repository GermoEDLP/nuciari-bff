import { IsOptional, IsString } from 'class-validator'
import { PaginationDto } from '../../common/dto/pagination.dto'

export class QueryBudgetDto extends PaginationDto {
  @IsOptional() @IsString() status?: string
  @IsOptional() @IsString() search?: string
}
