import { ArgumentsHost, Catch, NotFoundException } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';

@Catch()
export class AllExceptionsFilter extends BaseExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    if ('name' in exception && exception.name === 'NotFoundError') {
      return super.catch(new NotFoundException('Resource not found'), host);
    }

    super.catch(exception, host);
  }
}
