import { Controller, Get, Query, UseInterceptors } from '@nestjs/common';
import { AppService, ApiResponse, SearchParams, ApiResponseDto, WantedPersonDto } from './app.service';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { ApiTags, ApiQuery, ApiResponse as ApiDocResponse, ApiExtraModels } from '@nestjs/swagger';

@ApiExtraModels(ApiResponseDto, WantedPersonDto)
@ApiTags('wanted')
@Controller('/api')
@UseInterceptors(CacheInterceptor)
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/wanted')
  @ApiQuery({ name: 'page', required: false, type: String, description: 'Page number' })
  @ApiQuery({ name: 'field_offices', required: false, type: String, description: 'FBI field office' })
  @ApiQuery({ name: 'poster_classification', required: false, type: String, description: 'Poster classification' })
  @ApiQuery({ name: 'search', required: false, type: String, description: 'Search by name or keywords' })
  @ApiQuery({ name: 'hair', required: false, type: String, description: 'Hair color' })
  @ApiQuery({ name: 'eyes', required: false, type: String, description: 'Eye color' })
  @ApiQuery({ name: 'race', required: false, type: String, description: 'Race' })
  @ApiDocResponse({ status: 200, description: 'List of wanted persons', type: ApiResponseDto })
  async getWanted(@Query() query: SearchParams): Promise<ApiResponse> {
    return this.appService.getWanted(query);
  }
}
