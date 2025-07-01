import { Controller, Get, Query, UseInterceptors } from '@nestjs/common';
import { AppService, ApiResponse, SearchParams } from './app.service';
import { CacheInterceptor } from '@nestjs/cache-manager';

@Controller('/api')
@UseInterceptors(CacheInterceptor)
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/wanted')
  async getWanted(@Query() query: SearchParams): Promise<ApiResponse> {
    return this.appService.getWanted(query);
  }
}
