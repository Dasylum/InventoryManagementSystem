const supertest = require('supertest');
const app = require('../../app');

describe('/countries', () => {
    it('Should respond with something', async () => {
        const response = await supertest(app)
        .get('/api/v1/countries')
        .expect('Content-Type', /json/)
        .expect(200);

        expect(response.body.length).toBeGreaterThan(0);
    })

    it('Should respond with a specific country id', async () => {
        const response = await supertest(app)
        .get('/api/v1/countries/250')
        .expect('Content-Type', /json/)
        .expect(200);

        expect(response.body.id).toBe(250);
    })

    it('Should respond with 404 for countries not found', async () => {
        await supertest(app)
        .get('/api/v1/countries/32111')
        .expect('Content-Type', /json/)
        .expect(404);
    })
})