const supertest = require('supertest');
const app = require('../../app');

describe('/inventory_locations', () => {
    it('Should respond with something', async () => {
        const response = await supertest(app)
        .get('/api/v1/inventory_location')
        .expect('Content-Type', /json/)
        .expect(200);

        expect(response.body.length).toBeGreaterThan(0);
    })

    it('Should respond with a specific state id', async () => {
        const response = await supertest(app)
        .get('/api/v1/inventory_location/1')
        .expect('Content-Type', /json/)
        .expect(200);

        expect(response.body.id).toBe(1);
    })

    it('Should respond with 404 for states not found', async () => {
        await supertest(app)
        .get('/api/v1/inventory_location/32111')
        .expect('Content-Type', /json/)
        .expect(404);
    })

    it('Should respond with 200 for adding new inventory location', async () => {
        const response = await supertest(app)
        .post('/api/v1/inventory_location')
        .send({
            data: {name: "test name 3", description: "test description"}
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200);

        expect(response.body.length).toBeGreaterThan(0);
    })

    it('Should response with 500 for adding invalid inventory location', async () => {
        const response = await supertest(app)
        .post('/api/v1/inventory_location')
        .send({
            data: {name: "test name", descript: "test description"}
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(500);
    })

    it('Should response with 500 for updating invalid inventory location', async () => {
        const response = await supertest(app)
        .post('/api/v1/inventory_location/1')
        .send({
            data: {name: "test name", descript: "test description"}
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(500);
    })

    it('Should response with 200 for updating inventory location', async () => {
        const response = await supertest(app)
        .post('/api/v1/inventory_location/2')
        .send({
            data: {name: "test name 6", description: "test description"}
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200);

        expect(response.body).toBeGreaterThan(0);
    })
})