import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { join } from 'path';
import * as express from 'express';
import { AllExceptionsFilter } from './common/filters/all-exception.filter';
import * as helmet from 'helmet';
import * as rateLimit from 'express-rate-limit';
import { HttpExceptionFilter } from 'common/filters/http-exception.filter';



async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.use('/public', express.static(join(__dirname, '../../public')));
  var bodyParser = require('body-parser');
  app.use(bodyParser.json({limit: '5mb'}));
  app.use(bodyParser.urlencoded({limit: '5mb', extended: true}));
  app.useGlobalFilters(
    new AllExceptionsFilter(),
    new HttpExceptionFilter(),
  );

  /* SECURITY */
  app.enable("trust proxy");
  app.use(helmet());

  app.use(rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message:
      "Too many requests from this IP, please try again later"
  }));
  const createAccountLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour window
    max: 5, // start blocking after 3 requests
    message:
      "Too many accounts created from this IP, please try again after an hour"
  });
  app.use("/auth/email/register", createAccountLimiter);
  /******/

  const config = new DocumentBuilder()
    .setTitle('NFT Market')
    .setDescription('A market place to buy NFT')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
    var options = {
      customCss: '.opblock-summary-description { text-align: right; margin-right: 10px; font-style: italic; font-weight: 600; }',
      customSiteTitle: "Snail Docs"
    };
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('docs', app, document, options);

    
  await app.listen(3000);
}
bootstrap();
