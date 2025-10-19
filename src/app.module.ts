import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import databaseConfig from './config/database.config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { HealthModule } from './health/health.module'
import { BudgetsModule } from './budgets/budgets.module'
import { InfoRequestsModule } from './info-requests/info-requests.module'
import { AppLogger } from './common/logging/app-logger.service'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [databaseConfig] }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (cs: ConfigService) => ({
        type: 'postgres',
        host: cs.get<string>('database.host'),
        port: cs.get<number>('database.port'),
        username: cs.get<string>('database.username'),
        password: cs.get<string>('database.password'),
        database: cs.get<string>('database.database'),
        autoLoadEntities: true,
        synchronize: false, // ❗️Prod: false. En dev usar migraciones.
        migrationsRun: true,
        migrations: ['dist/src/db/migrations/*.js'],
        poolSize: 10,
      }),
    }),
    HealthModule,
    BudgetsModule,
    InfoRequestsModule,
  ],
  providers: [AppLogger],
})
export class AppModule {}
