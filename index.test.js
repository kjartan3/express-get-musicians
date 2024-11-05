// install dependencies
const { execSync } = require('child_process');
execSync('npm install');
execSync('npm run seed');

const request = require("supertest")
const { db } = require('./db/connection');
const { Musician } = require('./models/index')
const app = require('./src/app');
const {seedMusician} = require("./seedData");


describe('./musicians endpoint', () => {
    // Write your tests here
    test('testing musician endpoint', async () => {
        const response = await request(app).get('/musicians');
    });

    test('testing musician endpoint 2', async () => {
        const response = await request(app).get('/musicians');
        expect(response.statusCode).toBe(200);
    });

    test('testing musician endpoint 3', async () => {
        const response = await request(app).get('/musicians');
        const responseData = JSON.parse(response.text);
        expect(response.statusCode).toBe(200);
        expect(Array.isArray(responseData)).toBe(true);

    });

    test('GET /musicians/:id', async () => {
        const response = await request(app).get('/musicians/1');
        expect(response.status).toBe(200);
    });

    test('return 404 if musician not found', async () => {
        const response = await request(app).get('/musicians/999');
        expect(response.status).toBe(404);
        expect(response.body).toEqual({ error: 'Musician not found' });
    });

    test('POST /musicians', async () => {
        const testEntry = { name: 'John Doe', instrument: 'Drum' };
        const response = await request(app).post('/musicians').send(testEntry);
        expect(response.status).toBe(200);
    });

    test('PUT /musicians/:id', async () => {
        const updatedTestEntry = { name: 'Jon Doe', instrument: 'Drum' };
        const response = await request(app).put('/musicians/:id').send(updatedTestEntry);
        expect(response.status).toBe(200);
    });

    test('DELETE /musicians/:id', async () => {
        const deletedTestEntry = {};
        const response = await request(app).delete('/musicians/:id').send(deletedTestEntry);
        expect(response.status).toBe(200);
    })
});
