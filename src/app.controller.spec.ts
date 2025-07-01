import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService, ApiResponse, SearchParams } from './app.service';
import { CacheInterceptor, CACHE_MANAGER } from '@nestjs/cache-manager';

describe('AppController', () => {
  let appController: AppController;
  let appService: AppService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        {
          provide: AppService,
          useValue: {
            getWanted: jest.fn(),
          },
        },
        {
          provide: CACHE_MANAGER,
          useValue: {},
        },
      ],
    })
      .overrideInterceptor(CacheInterceptor)
      .useValue({ intercept: jest.fn((_, __, next) => next.handle()) })
      .compile();

    appController = app.get<AppController>(AppController);
    appService = app.get<AppService>(AppService);
  });

  describe('getWanted', () => {
    it('should return wanted persons from the service', async () => {
      const mockQuery: SearchParams = { search: 'John' };
      const mockResponse: ApiResponse = {
        total: 2,
        items: [
          {
            uid: '29dff6ac283a47029da519bc54659e27',
            title: 'DERRICK GROVES',
            description: 'Escaped Inmate\nNew Orleans, Louisiana',
            images: [
              {
                thumb: 'https://www.fbi.gov/wanted/law-enforcement-assistance/escaped-inmates-new-orleans-louisiana/@@images/image/thumb',
                original: 'https://www.fbi.gov/wanted/law-enforcement-assistance/escaped-inmates-new-orleans-louisiana/@@images/image',
                large: 'https://www.fbi.gov/wanted/law-enforcement-assistance/escaped-inmates-new-orleans-louisiana/@@images/image/large',
                caption: 'Derrick Groves',
              },
            ],
            warning_message: 'SHOULD BE CONSIDERED ARMED AND DANGEROUS',
            reward_text: 'The FBI is offering a reward of up to $20,000 for information leading to the arrest of Derrick Groves.',
            caution: "<p>The FBI's New Orleans Field Office is assisting the Orleans Parish Sheriff's Office in Louisiana with the search for and apprehension of Derrick Groves, the last of the state inmates who escaped from the Orleans Parish Jail on the morning of May 16, 2025. The FBI routinely offers assistance to our law enforcement partners, to provide additional manpower and specialized resources.</p>\n<p> </p>",
            details: null,
            field_offices: ['neworleans'],
            subjects: ['Law Enforcement Assistance'],
            publication: '2025-05-16T15:18:00',
            url: 'https://www.fbi.gov/wanted/law-enforcement-assistance/escaped-inmates-new-orleans-louisiana',
            poster_classification: 'law-enforcement-assistance',
            scars_and_marks: '',
            files: [
              {
                name: 'English',
                url: 'https://www.fbi.gov/wanted/law-enforcement-assistance/escaped-inmates-new-orleans-louisiana/download.pdf',
              },
            ],
          },
          {
            uid: 'cc7f9ba607774655a42907056542ef17',
            title: 'DESTRUCTION OF PROPERTY AND ASSAULT',
            description: 'Paramount, California\nJune 7, 2025',
            images: [
              {
                thumb: 'https://www.fbi.gov/wanted/seeking-info/destruction-of-property-and-assault/@@images/image/thumb',
                original: 'https://www.fbi.gov/wanted/seeking-info/destruction-of-property-and-assault/@@images/image',
                large: 'https://www.fbi.gov/wanted/seeking-info/destruction-of-property-and-assault/@@images/image/large',
                caption: null,
              },
              {
                thumb: 'https://www.fbi.gov/wanted/seeking-info/destruction-of-property-and-assault/launsub2.jpg/@@images/image/thumb',
                original: 'https://www.fbi.gov/wanted/seeking-info/destruction-of-property-and-assault/launsub2.jpg',
                large: 'https://www.fbi.gov/wanted/seeking-info/destruction-of-property-and-assault/launsub2.jpg/@@images/image/large',
                caption: '',
              },
            ],
            warning_message: null,
            reward_text: null,
            caution: null,
            details: null,
            field_offices: ['losangeles'],
            subjects: ['Seeking Information'],
            publication: '2025-06-25T08:03:00',
            url: 'https://www.fbi.gov/wanted/seeking-info/destruction-of-property-and-assault',
            poster_classification: 'information',
            scars_and_marks: '',
            files: [
              {
                name: 'English',
                url: 'https://www.fbi.gov/wanted/seeking-info/destruction-of-property-and-assault/download.pdf',
              },
            ],
          },
        ],
        page: 1,
      };
      (appService.getWanted as jest.Mock).mockResolvedValue(mockResponse);
      const result = await appController.getWanted(mockQuery);
      expect(result).toEqual(mockResponse);
      expect(appService.getWanted).toHaveBeenCalledWith(mockQuery);
    });
  });
});
