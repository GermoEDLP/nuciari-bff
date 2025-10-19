import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationPipe, VersioningType } from '@nestjs/common'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { TransformInterceptor } from './common/interceptors/transform.interceptor'
import { AppLogger } from './common/logging/app-logger.service'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true })
  const logger = app.get(AppLogger)
  app.useLogger(logger)

  app.setGlobalPrefix('api')
  app.enableVersioning({ type: VersioningType.URI, defaultVersion: '1' })

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }))
  app.useGlobalInterceptors(new TransformInterceptor())

  const config = new DocumentBuilder()
    .setTitle(process.env.SWAGGER_TITLE || 'API')
    .setDescription(process.env.SWAGGER_DESC || '')
    .setVersion(process.env.SWAGGER_VERSION || '1.0.0')
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('docs', app, document)

  const port = process.env.PORT || 3000
  await app.listen(port as number)
  logger.log(`🚀 API running on http://localhost:${port}/api/v1/health`)
  logger.log(`📚 Swagger at http://localhost:${port}/docs`)
}
bootstrap()
