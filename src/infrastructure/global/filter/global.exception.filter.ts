import { ArgumentsHost, Catch, HttpException, HttpStatus } from '@nestjs/common';
import { AxiosError } from 'axios';
import { Request, Response } from 'express';

@Catch()
export class GlobalExceptionFilter {
    catch(exception: unknown, host: ArgumentsHost): void {
        const ctx = host.switchToHttp();
        const request = ctx.getRequest<Request>();
        const response = ctx.getResponse<Response>();

        let status = HttpStatus.INTERNAL_SERVER_ERROR;
        let message = 'Internal Server Error';
        if (exception instanceof HttpException) {
            status = exception.getStatus();
            message = exception.message;
        } else if (exception instanceof AxiosError) {
            console.error(exception.response.data);
            status = exception.response.status;
            message = 'Axios Server Error';
        } else {
            console.error(exception)
        }

        const responseBody = {
            statusCode: status,
            message: message,
            timestamp: new Date().toISOString(),
            path: request.path,
        };

        response
            .status(status)
            .json(responseBody);
    }
}