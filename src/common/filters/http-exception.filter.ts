import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, Logger } from '@nestjs/common';

  
  @Catch(HttpException)
  export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();
        const env = process.env.NODE_ENV;
        if (env !== 'production') {
            Logger.error(exception);
        }
        const exceptionResponse = exception.getResponse() as any;
        
        const status = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

        const data: any = {
          success: false,
          code: status,
          error: HttpStatus[status],
          timestamp: new Date().toISOString(),
          path: request.url,
        };
        let errorMessage = 'internalError';

        if ( exceptionResponse.hasOwnProperty('message') &&  exceptionResponse.message instanceof Array ) {
            errorMessage  = exceptionResponse.message[0];
        } else if (typeof exceptionResponse.message === 'string') {
            errorMessage = exceptionResponse.message;
        } else if ( !exceptionResponse.message && typeof exceptionResponse === 'string') {
            errorMessage = exceptionResponse;
        }
        data.message = errorMessage;
        response.status(status).json(data);
  }
}