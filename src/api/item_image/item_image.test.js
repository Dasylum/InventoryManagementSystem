const supertest = require('supertest');
const app = require('../../app');

describe('/item_images', () => {
    it('Should respond with something', async () => {
        const response = await supertest(app)
        .get('/api/v1/item_images')
        .expect('Content-Type', /json/)
        .expect(200);

        expect(response.body.length).toBeGreaterThan(0);
    })

    it('Should respond with a specific item image id', async () => {
        const response = await supertest(app)
        .get('/api/v1/item_images/1')
        .expect('Content-Type', /json/)
        .expect(200);

        expect(response.body.id).toBe(1);
    })

    it('Should respond with 404 for item images not found', async () => {
        await supertest(app)
        .get('/api/v1/item_images/32111')
        .expect('Content-Type', /json/)
        .expect(404);
    })

    it('Should respond with 200 for adding new item image', async () => {
        const response = await supertest(app)
        .post('/api/v1/item_images')
        .send({
            data: {name: "test name 3", description: "test description"}
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200);

        expect(response.body.length).toBeGreaterThan(0);
    })

    it('Should response with 500 for adding invalid item image', async () => {
        const response = await supertest(app)
        .post('/api/v1/item_images')
        .send({
            data: {name: "test name", descript: "test description"}
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(500);
    })

    it('Should response with 500 for updating invalid item image', async () => {
        const response = await supertest(app)
        .post('/api/v1/item_images/1')
        .send({
            data: {name: "test name", descript: "test description"}
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(500);
    })

    it('Should response with 200 for updating item image', async () => {
        const response = await supertest(app)
        .post('/api/v1/item_images/2')
        .send({
            data: {name: "test name 6", description: "test description"}
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200);

        expect(response.body).toBeGreaterThan(0);
    })
})