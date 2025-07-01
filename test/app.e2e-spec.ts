import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/api/wanted (GET) should return wanted persons', async () => {
    const response = await request(app.getHttpServer())
      .get('/api/wanted')
      .expect(200);
    expect(response.body).toHaveProperty('total');
    expect(response.body).toHaveProperty('items');
    expect(Array.isArray(response.body.items)).toBe(true);
    expect(response.body).toHaveProperty('page');
    if (response.body.items.length > 0) {
      const item = response.body.items[0];
      expect(item).toHaveProperty('uid');
      expect(item).toHaveProperty('title');
      expect(item).toHaveProperty('description');
      expect(item).toHaveProperty('images');
      expect(item).toHaveProperty('poster_classification');
      expect(item).toHaveProperty('url');
    }
  });
});
