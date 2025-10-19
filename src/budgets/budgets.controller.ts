import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { BudgetsService } from './budgets.service'
import { CreateBudgetDto } from './dto/create-budget.dto'
import { UpdateBudgetDto } from './dto/update-budget.dto'
import { QueryBudgetDto } from './dto/query-budget.dto'

@ApiTags('budgets')
@Controller({ path: 'budgets', version: '1' })
export class BudgetsController {
  constructor(private readonly service: BudgetsService) {}

  @Post() create(@Body() dto: CreateBudgetDto) { return this.service.create(dto) }
  @Get() findAll(@Query() q: QueryBudgetDto) { return this.service.findAll(q) }
  @Get(':id') findOne(@Param('id') id: string) { return this.service.findOne(id) }
  @Patch(':id') update(@Param('id') id: string, @Body() dto: UpdateBudgetDto) { return this.service.update(id, dto) }
  @Patch(':id/status/:status') status(@Param('id') id: string, @Param('status') status: any) { return this.service.updateStatus(id, status) }
  @Delete(':id') remove(@Param('id') id: string) { return this.service.remove(id) }
}
