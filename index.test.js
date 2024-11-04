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
        const response = await request(app).get('/musician');
    });

    test('testing musician endpoint', async () => {
        const response = await request(app).get('/musician');
        expect(response.statusCode).toBe(200);
    });

    test('testing musician endpoint', async () => {
        const response = await request(app).get('/musician');
        const responseData = JSON.parse(response.text);
        expect(response.statusCode).toBe(200);
        expect(Array.isArray(responseData)).toBe(true);

    });
    
    




    
})
