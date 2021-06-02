const supertest = require('supertest');
const app = require('../../app');

describe('/address', () => {
    it('Should respond with something', async () => {
        const response = await supertest(app)
        .get('/api/v1/address')
        .expect('Content-Type', /json/)
        .expect(200);

        expect(response.body.length).toBeGreaterThan(0);
    })
})