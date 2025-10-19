import { ApiProperty } from '@nestjs/swagger'
import { IsArray, IsEmail, IsNotEmpty, IsOptional, IsString, ValidateNested, IsNumber, Min } from 'class-validator'
import { Type } from 'class-transformer'

class BudgetItemDto {
  @ApiProperty() @IsString() sku: string
  @ApiProperty() @IsNumber() @Min(1) qty: number
  @ApiProperty() @IsNumber() @Min(0) unitPrice: number
}

export class CreateBudgetDto {
  @ApiProperty() @IsString() @IsNotEmpty() clientName: string
  @ApiProperty() @IsEmail() clientEmail: string
  @ApiProperty({ type: [BudgetItemDto] })
  @IsArray() @ValidateNested({ each: true }) @Type(() => BudgetItemDto)
  items: BudgetItemDto[]

  @ApiProperty({ required: false }) @IsOptional() @IsString() notes?: string
}
