import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

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
