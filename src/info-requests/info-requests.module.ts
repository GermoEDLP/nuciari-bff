import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { InfoRequest } from './info-request.entity'
import { InfoRequestsService } from './info-requests.service'
import { InfoRequestsController } from './info-requests.controller'

@Module({
  imports: [TypeOrmModule.forFeature([InfoRequest])],
  providers: [InfoRequestsService],
  controllers: [InfoRequestsController],
})
export class InfoRequestsModule {}
