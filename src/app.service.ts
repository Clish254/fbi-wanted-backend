import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { ApiProperty } from '@nestjs/swagger';

export class WantedPersonDto {
  @ApiProperty()
  uid: string;
  @ApiProperty()
  title: string;
  @ApiProperty()
  description: string;
  @ApiProperty({ type: () => [Object] })
  images: Array<{
    thumb: string;
    original: string;
    large: string;
    caption: string | null;
  }>;
  @ApiProperty({ nullable: true })
  warning_message: string | null;
  @ApiProperty({ nullable: true })
  reward_text: string | null;
  @ApiProperty({ nullable: true })
  caution: string | null;
  @ApiProperty({ nullable: true })
  details: string | null;
  @ApiProperty({ type: [String] })
  field_offices: string[];
  @ApiProperty({ type: [String] })
  subjects: string[];
  @ApiProperty()
  publication: string;
  @ApiProperty()
  url: string;
  @ApiProperty()
  poster_classification: string;
  @ApiProperty({ required: false })
  hair?: string;
  @ApiProperty({ required: false })
  eyes?: string;
  @ApiProperty({ required: false })
  race?: string;
  @ApiProperty({ required: false })
  sex?: string;
  @ApiProperty({ required: false })
  age_min?: number;
  @ApiProperty({ required: false })
  age_max?: number;
  @ApiProperty({ required: false })
  height_min?: number;
  @ApiProperty({ required: false })
  height_max?: number;
  @ApiProperty({ required: false })
  weight_min?: number;
  @ApiProperty({ required: false })
  weight_max?: number;
  @ApiProperty({ required: false })
  scars_and_marks?: string;
  @ApiProperty({ required: false, type: [String] })
  aliases?: string[];
  @ApiProperty({ required: false, type: [String] })
  occupations?: string[];
  @ApiProperty({ required: false })
  nationality?: string;
  @ApiProperty({ required: false })
  place_of_birth?: string;
  @ApiProperty({ required: false, type: [String] })
  dates_of_birth_used?: string[];
  @ApiProperty({ required: false })
  additional_information?: string;
  @ApiProperty({ required: false, type: [Object] })
  files?: Array<{
    name: string;
    url: string;
  }>;
}

export class ApiResponseDto {
  @ApiProperty()
  total: number;
  @ApiProperty({ type: [WantedPersonDto] })
  items: WantedPersonDto[];
  @ApiProperty()
  page: number;
}

export interface WantedPerson {
  uid: string;
  title: string;
  description: string;
  images: Array<{
    thumb: string;
    original: string;
    large: string;
    caption: string | null;
  }>;
  warning_message: string | null;
  reward_text: string | null;
  caution: string | null;
  details: string | null;
  field_offices: string[];
  subjects: string[];
  publication: string;
  url: string;
  poster_classification: string;
  hair?: string;
  eyes?: string;
  race?: string;
  sex?: string;
  age_min?: number;
  age_max?: number;
  height_min?: number;
  height_max?: number;
  weight_min?: number;
  weight_max?: number;
  scars_and_marks?: string;
  aliases?: string[];
  occupations?: string[];
  nationality?: string;
  place_of_birth?: string;
  dates_of_birth_used?: string[];
  additional_information?: string;
  files?: Array<{
    name: string;
    url: string;
  }>;
}

export interface ApiResponse {
  total: number;
  items: WantedPerson[];
  page: number;
}

export interface SearchParams {
  page?: string;
  field_offices?: string;
  poster_classification?: string;
  search?: string;
  hair?: string;
  eyes?: string;
  race?: string;
}

@Injectable()
export class AppService {
  constructor(private readonly httpService: HttpService) {}

  async getWanted(searchParams: SearchParams): Promise<ApiResponse> {
    const params = new URLSearchParams();

    if (searchParams.page) {
      params.append('page', searchParams.page);
    }

    if (searchParams.field_offices) {
      params.append('field_offices', searchParams.field_offices);
    }

    if (searchParams.poster_classification) {
      params.append('poster_classification', searchParams.poster_classification);
    }

    if (searchParams.search) {
      params.append('title', searchParams.search);
    }

    if (searchParams.hair) {
      params.append('hair', searchParams.hair);
    }

    if (searchParams.eyes) {
      params.append('eyes', searchParams.eyes);
    }

    if (searchParams.race) {
      params.append('race', searchParams.race);
    }

    const url = `https://api.fbi.gov/wanted/v1/list${params.toString() ? `?${params.toString()}` : ''}`;

    try {
      const response = await firstValueFrom(
        this.httpService.get<ApiResponse>(url, {
          headers: {
            'User-Agent': 'FBI-Wanted-App/1.0',
          },
        })
      );

      return response.data;
    } catch (error) {
      console.error('Error fetching from FBI API:', error);
      return { total: 0, items: [], page: 1 };
    }
  }
}
