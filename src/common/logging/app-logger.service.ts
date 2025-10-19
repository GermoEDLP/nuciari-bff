import { ConsoleLogger, Injectable, Scope } from '@nestjs/common'

@Injectable({ scope: Scope.DEFAULT })
export class AppLogger extends ConsoleLogger {
  log(message: any) { super.log(message) }
  error(message: any, stack?: string) { super.error(message, stack) }
  warn(message: any) { super.warn(message) }
  debug(message: any) { if (process.env.NODE_ENV !== 'production') super.debug(message) }
  verbose(message: any) { if (process.env.NODE_ENV !== 'production') super.verbose(message) }
}
