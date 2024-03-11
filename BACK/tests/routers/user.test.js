import request from 'supertest';
import { describe, expect, it } from 'vitest';
import app from '../../server.js';

describe('GET /v1/user/nickname', () => {
  it('should get all nicknames', async () => {
    const response = await request(app).get('/v1/user/nickname');
    expect(response.status).toBe(200);
  });
});

describe('GET /v1/user/profile', () => {
  it('should require authentication', async () => {
    const response = await request(app).get('/v1/user/profile');
    expect(response.status).toBe(401);
  });

  it('should get user profile after authentication', async () => {
    const signinResponse = await request(app)
      .post('/v1/user/signin')
      .send({
        email: 'test@test.com',
        password: '@Testuser1',
      });
    expect(signinResponse.status).toBe(200);

    const { token } = signinResponse.body;

    const response = await request(app)
      .get('/v1/user/profile')
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(200);
  });
});

describe('PATCH /v1/user/profile', () => {
  it('should require authentication', async () => {
    const response = await request(app).patch('/v1/user/profile');
    expect(response.status).toBe(401);
  });

  it('should edit user profile after authentication', async () => {
    const signinResponse = await request(app)
      .post('/v1/user/signin')
      .send({
        email: 'test@test.com',
        password: '@Testuser1',
      });
    expect(signinResponse.status).toBe(200);

    const { token } = signinResponse.body;

    const response = await request(app)
      .patch('/v1/user/profile')
      .set('Authorization', `Bearer ${token}`)
      .send({
        lastPassword: '@Testuser1',
        newPassword: '@Testuser1',
        confirmNewPassword: '@Testuser1',
        nickname: 'testAccount',
        profile_picture: 'profil_picture1.png',
      });
    expect(response.status).toBe(400);
  });
});
