import { ArgumentsHost, Catch, ExceptionFilter, Logger } from '@nestjs/common';


@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const env = process.env.NODE_ENV;
    if (env !== 'production') {
        Logger.error(exception);
    }
    let errorMessage = 'Unexpected error ocurred';
    if ( exception.hasOwnProperty('message') &&  exception.message instanceof Array ) {
        errorMessage  = exception.message[0];
    } else if (typeof exception.message === 'string') {
        errorMessage = exception.message;
    } else if ( !exception.message && typeof exception === 'string') {
        errorMessage = exception;
    }
    return response.status(500).json({
        success: false,
        code: 500,
        createdBy: 'FallbackExceptionFilter',
        message: errorMessage,
        timestamp: new Date().toISOString(),
        path: request.url,
    });
  }
}