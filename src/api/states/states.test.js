const supertest = require('supertest');
const app = require('../../app');

describe('/states', () => {
    it('Should respond with something', async () => {
        const response = await supertest(app)
        .get('/api/v1/states')
        .expect('Content-Type', /json/)
        .expect(200);

        expect(response.body.length).toBeGreaterThan(0);
    })

    it('Should respond with a specific state id', async () => {
        const response = await supertest(app)
        .get('/api/v1/states/37')
        .expect('Content-Type', /json/)
        .expect(200);

        expect(response.body.id).toBe(37);
    })

    it('Should respond with 404 for states not found', async () => {
        await supertest(app)
        .get('/api/v1/states/32111')
        .expect('Content-Type', /json/)
        .expect(404);
    })
})