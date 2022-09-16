import { Logger, RequestMethod, ValidationPipe } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as config from 'config';
import * as dayjs from 'dayjs';
import * as isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import * as utc from 'dayjs/plugin/utc';
import * as express from 'express';
import helmet from 'helmet';
import {
  initializeTransactionalContext,
  patchTypeORMRepositoryWithBaseRepository,
} from 'typeorm-transactional-cls-hooked';

import { AppModule } from './app.module';
import { isProd } from './common/constant';
import { JwtAuthGuard } from './common/guard';

dayjs.extend(utc);
dayjs.extend(isSameOrAfter);

const logger = new Logger('bootstrap');

async function bootstrap() {
  initializeTransactionalContext();
  patchTypeORMRepositoryWithBaseRepository();

  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enable('trust proxy', true);
  app.setGlobalPrefix('v2', {
    exclude: [{ path: 'health', method: RequestMethod.GET }],
  });

  app.use(express.json({ limit: '2MB' }));
  if (isProd) {
    app.use(helmet());
  } else {
    app.use(
      helmet({
        contentSecurityPolicy: {
          directives: {
            defaultSrc: [`'self'`],
            styleSrc: [`'self'`, `'unsafe-inline'`, 'cdn.jsdelivr.net', 'fonts.googleapis.com'],
            fontSrc: [`'self'`, 'fonts.gstatic.com'],
            imgSrc: [`'self'`, 'data:', 'cdn.jsdelivr.net'],
            scriptSrc: [`'self'`, `https: 'unsafe-inline'`, `cdn.jsdelivr.net`],
          },
        },
      }),
    );
  }

  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.useGlobalGuards(new JwtAuthGuard(new Reflector()));

  const port = config.get<string>('port');
  await app.listen(port, () => {
    logger.log(`🚀 Server start http://localhost:${port}/graphql`);
  });
}

bootstrap();
