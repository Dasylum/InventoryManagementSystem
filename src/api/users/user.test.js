const supertest = require('supertest');
const app = require('../../app');

describe('/users', () => {
    it('Should respond with something', async () => {
        const response = await supertest(app)
        .get('/api/v1/users')
        .expect('Content-Type', /json/)
        .expect(200);

        expect(response.body.length).toBeGreaterThan(0);
    })
})