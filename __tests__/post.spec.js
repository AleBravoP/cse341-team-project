const server = require('../server')
const supertest = require('supertest');
const { expect } = require('@jest/globals');

const request = supertest(server)


describe('Test Handlers', () => {
    test('responds to post /players', async () => {
        const res = await request.post('/players').send(    {
            ID: 3000,
            forename: "Andres",
            surname: "Bayona",
            imageURL: "https://cdn.soccerwiki.org/images/player/10138_1247126061.jpg",
        });
        expect(res.header['content-type']).toBe('application/json; charset=utf-8');
        expect(res.statusCode).toBe(201)
    })

    
})