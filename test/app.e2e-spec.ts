import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { AppService } from './../src/app.service';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let server: any;
  let appService: AppService;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    appService = app.get<AppService>(AppService);
    server = app.getHttpServer();
    await app.init();
  });

  describe('/GET', () => {
    it(`should return a 403 when an invalid api key is used`, () => {
      return request(server).get('/').set(`x-api-key`, `invalid`).expect(403);
    });
    it(`should return a 403 when an no api key is passed`, () => {
      return request(server).get('/').expect(403);
    });

    it(`should return a random emoji`, () => {
      const emojis = appService.getEmojis();
      return request(server)
        .get('/')
        .set(`x-api-key`, `SECRET`)
        .set(`user-agent`, `Chrome`)
        .expect(200)
        .expect(({ body }) => {
          const response = body.data;
          console.log(response);
          expect(response).toBeDefined();
          expect(response.browser).toBe(`Chrome`);
          expect(emojis).toContain(response.emoji);
        });
    });

    it(`should respective user agent`, () => {
      const emojis = appService.getEmojis();
      return request(server)
        .get('/')
        .set(`x-api-key`, `SECRET`)
        .set(`user-agent`, `Chrome`)
        .expect(200)
        .expect(({ body }) => {
          const response = body.data;
          console.log(response);
          expect(response).toBeDefined();
          expect(response.browser).toBe(`Chrome`);
          expect(emojis).toContain(response.emoji);
        });
    });

    it(`Valid index query param`, () => {
      const emojis = appService.getEmojis();
      const index = 0;
      const indexEmoji = emojis[index];
      return request(server)
        .get('/?index=0')
        .set(`x-api-key`, `SECRET`)
        .set(`user-agent`, `Chrome`)
        .expect(200)
        .expect(({ body }) => {
          const response = body.data;
          console.log(response);
          expect(response.emoji).toContain(indexEmoji);
        });
    });

    it(`Should return a 400 when out of range index is used`, () => {
      const emojis = appService.getEmojis();
      const emojiLength = emojis.length;
      const range = emojiLength + 1;
      console.log(range);
      return request(server)
        .get(`/?index=${range}`)
        .set(`x-api-key`, `SECRET`)
        .expect(400);
    });

    it(`should return a 400 if an non-number index is passed in`, () => {
      return request(app.getHttpServer())
        .get(`/?index=not-a-number`)
        .set(`x-api-key`, `SECRET`)
        .expect(400);
    });

    //when invalid api key return 403
    // when no api key return 403
    // GET should return an emoji
    // ?index=0 GET should return first emoji
  });
});
