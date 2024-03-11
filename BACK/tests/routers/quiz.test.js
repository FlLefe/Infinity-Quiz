import request from 'supertest';
import { describe, expect, it } from 'vitest';
import app from '../../server.js';

describe('GET /v1/quiz/top', () => {
  it('should get top 5 quizzes', async () => {
    const response = await request(app).get('/v1/quiz/top');
    expect(response.status).toBe(200);
  });
});

describe('GET /v1/quiz/top/:id', () => {
  it('should get top quiz by ID', async () => {
    const response = await request(app).get('/v1/quiz/top/1');
    expect(response.status).toBe(200);
  });
});

describe('GET /v1/quiz/all', () => {
  it('should require authentication', async () => {
    const response = await request(app).get('/v1/quiz/all');
    expect(response.status).toBe(401);
  });

  it('should get all quizzes after authentication', async () => {
    const signinResponse = await request(app)
      .post('/v1/user/signin')
      .send({
        email: 'test@test.com',
        password: '@Testuser1',
      });
    expect(signinResponse.status).toBe(200);

    const { token } = signinResponse.body;

    const response = await request(app)
      .get('/v1/quiz/all')
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(200);
  });
});

describe('GET /v1/quiz/:id', () => {
  it('should require authentication', async () => {
    const response = await request(app).get('/v1/quiz/1');
    expect(response.status).toBe(401);
  });

  it('should get quiz by ID after authentication', async () => {
    const signinResponse = await request(app)
      .post('/v1/user/signin')
      .send({
        email: 'test@test.com',
        password: '@Testuser1',
      });
    expect(signinResponse.status).toBe(200);

    const { token } = signinResponse.body;

    const response = await request(app)
      .get('/v1/quiz/1')
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(200);
  });
});

describe('POST /v1/quiz/score', () => {
  it('should require authentication', async () => {
    const response = await request(app).post('/v1/quiz/score');
    expect(response.status).toBe(401);
  });

  it('should create score for a quiz after authentication', async () => {
    const signinResponse = await request(app)
      .post('/v1/user/signin')
      .send({
        email: 'test@test.com',
        password: '@Testuser1',
      });
    expect(signinResponse.status).toBe(200);

    const { token } = signinResponse.body;

    const response = await request(app)
      .post('/v1/quiz/score')
      .set('Authorization', `Bearer ${token}`)
      .send({
        quiz_id: 1,
      });
    expect(response.status).toBe(500);
  });
});
