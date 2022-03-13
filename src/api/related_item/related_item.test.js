const supertest = require('supertest');
const app = require('../../app');

describe('/related_item', () => {
    it('Should respond with something', async () => {
        const response = await supertest(app)
        .get('/api/v1/related_item')
        .expect('Content-Type', /json/)
        .expect(200);

        expect(response.body.length).toBeGreaterThan(0);
    })

    it('Should respond with a specific item relation id', async () => {
        const response = await supertest(app)
        .get('/api/v1/related_item/1')
        .expect('Content-Type', /json/)
        .expect(200);

        expect(response.body.id).toBe(1);
    })

    it('Should respond with 404 for relation found', async () => {
        await supertest(app)
        .get('/api/v1/related_item/32111')
        .expect('Content-Type', /json/)
        .expect(404);
    })

    it('Should respond with 200 for adding new item relation', async () => {
        const response = await supertest(app)
        .post('/api/v1/related_item')
        .send({
            data: {name: "test name 3", description: "test description"}
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200);

        expect(response.body.length).toBeGreaterThan(0);
    })

    it('Should response with 500 for adding invalid item relation', async () => {
        const response = await supertest(app)
        .post('/api/v1/related_item')
        .send({
            data: {name: "test name", descript: "test description"}
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(500);
    })

    it('Should response with 500 for updating invalid item relation', async () => {
        const response = await supertest(app)
        .post('/api/v1/related_item/1')
        .send({
            data: {name: "test name", descript: "test description"}
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(500);
    })

    it('Should response with 200 for updating item relation', async () => {
        const response = await supertest(app)
        .post('/api/v1/related_item/2')
        .send({
            data: {name: "test name 6", description: "test description"}
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200);

        expect(response.body).toBeGreaterThan(0);
    })
})