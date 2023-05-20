import { NestFactory } from '@nestjs/core';
import { AllExceptionsFilter } from './filters/http-exception.filter';
import { AppModule } from './app.module';

import moment from 'moment-timezone';
import { LoggingInterceptor } from './interceptors/logging.interceptor';
import { TimeoutInterceptor } from './interceptors/timeout.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalInterceptors(new LoggingInterceptor(), new TimeoutInterceptor());
  app.useGlobalFilters(new AllExceptionsFilter());

  Date.prototype.toJSON = function () {
    return moment(this)
      .tz('America/Sao_Paulo')
      .format('YYYY-MM-DD HH:mm:ss.SSS');
  };

  await app.listen(3000);
}
bootstrap();
