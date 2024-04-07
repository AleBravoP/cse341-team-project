const app = require('../server');
const supertest = require('supertest');
const { expect } = require('@jest/globals');
const request = supertest(app);
const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');
dotenv.config();

describe('Test Handlers', () => {
  let connection;
  let db;

  beforeEach(async () => {
    connection = await MongoClient.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    db = await connection.db('players');
  });
  afterEach(async () => {
    await connection.close();
  });

  //**********************************************************************************//
  // PLAYERS CONTROLLER
  // Test for Get Players

  test('responds to /players', async () => {
    const res = await request.get('/players');
    expect(res.header['content-type']).toBe('application/json; charset=utf-8');
    expect(res.statusCode).toBe(200);
  });

  let id = '';
  // Test for post Players
  test('responds to post /players', async () => {
    const res = await request.post('/players').send({
      ID: 3000,
      forename: 'Juanito',
      surname: 'Alimana',
      imageURL: 'https://cdn.soccerwiki.org/images/player/10138_1247126061.jpg'
    });
    id = res.body.id;
    expect(res.header['content-type']).toBe('application/json; charset=utf-8');
    expect(res.statusCode).toBe(201);
  });

  //Test for update Players
  test('responds to put /players', async () => {
    const res = await request.put('/players/' + id).send({
      ID: 3000,
      forename: 'Juanito',
      surname: 'Alimana con mucha mana',
      imageURL: 'https://cdn.soccerwiki.org/images/player/10138_1247126061.jpg'
    });

    expect(res.header['content-type']).toBe('application/json; charset=utf-8');
    expect(res.statusCode).toBe(200);
  });

  // Test for Delete Players
  test('responds to delete /players', async () => {
    const res = await request.delete('/players/' + id);
    expect(res.statusCode).toBe(204);
  });

  //**********************************************************************************//
  //TEAM CONTROLLER//
  // Test for Get Teams

  test('responds to /teams', async () => {
    const res = await request.get('/teams');
    expect(res.header['content-type']).toBe('application/json; charset=utf-8');
    expect(res.statusCode).toBe(200);
  });

  let idTeam = '';
  // Test for post Teams
  test('responds to post /teams', async () => {
    const res = await request.post('/teams').send({
      ID: 3000,
      name: 'Team Alpha-Super-Awesome-Cool-Dynamite-Wolf-Squadron',
      shortName: 'Team Shrek',
      imageURL: 'https://cdn.soccerwiki.org/images/player/10138_1247126061.jpg'
    });
    idTeam = res.body.id;
    expect(res.header['content-type']).toBe('application/json; charset=utf-8');
    expect(res.statusCode).toBe(200);
  });

  //Test for update teams
  test('responds to put /teams', async () => {
    const res = await request.put('/teams/' + idTeam).send({
      ID: 3000,
      name: 'Team Alpha-Super-Awesome-Cool-Dynamite-Wolf-Squadron',
      shortName: 'Alimana con mucha mana',
      imageURL: 'https://cdn.soccerwiki.org/images/player/10138_1247126061.jpg'
    });

    expect(res.header['content-type']).toBe('application/json; charset=utf-8');
    expect(res.statusCode).toBe(200);
  });

  // Test for Delete teams
  test('responds to delete /teams', async () => {
    const res = await request.delete('/teams/' + idTeam);
    expect(res.statusCode).toBe(204);
  });

  //**********************************************************************************//
  //TOURNAMENT CONTROLLER//

  // Test for Get Tournaments

  test('responds to /tournaments', async () => {
    const res = await request.get('/tournaments');
    expect(res.header['content-type']).toBe('application/json; charset=utf-8');
    expect(res.statusCode).toBe(200);
  });

  let idTournament = '';
  // Test for post tournaments
  test('responds to post /tournaments', async () => {
    const res = await request.post('/tournaments').send({
      ID: 3000,
      name: 'Tournament Alpha-Super-Awesome-Cool-Dynamite-Wolf-Squadron',
      imageURL: 'https://cdn.soccerwiki.org/images/player/10138_1247126061.jpg'
    });
    idTournament = res.body.id;
    expect(res.header['content-type']).toBe('application/json; charset=utf-8');
    expect(res.statusCode).toBe(200);
  });

  //Test for update tournaments
  test('responds to put /tournaments', async () => {
    const res = await request.put('/tournaments/' + idTournament).send({
      ID: 5000,
      name: 'Tournament Alpha-Super-Awesome-Cool-Dynamite-Wolf-Squadron',
      imageURL: 'https://cdn.soccerwiki.org/images/player/10138_1247126061.jpg'
    });

    expect(res.header['content-type']).toBe('application/json; charset=utf-8');
    expect(res.statusCode).toBe(200);
  });

  // Test for Delete tournaments
  test('responds to delete /tournaments', async () => {
    const res = await request.delete('/tournaments/' + idTournament);
    expect(res.statusCode).toBe(204);
  });

  //**********************************************************************************//
  //USER CONTROLLER//

  // Test for Get Users

  test('responds to /users', async () => {
    const res = await request.get('/users');
    expect(res.header['content-type']).toBe('application/json; charset=utf-8');
    expect(res.statusCode).toBe(200);
  });

  let idUser = '';
  // Test for post users
  test('responds to post /users', async () => {
    const res = await request.post('/users').send({
      accountID: 5000,
      forename: 'Juanito',
      surname: 'Alimaña',
      email: 'juanito@gmail.com',
      birthday: '11/12/1992',
      favorite_color: 'Blue',
      favorite_team: 'Team Shrek',
      favorite_player: 'Encantador'
    });
    idUser = res.body.id;
    expect(res.header['content-type']).toBe('application/json; charset=utf-8');
    expect(res.statusCode).toBe(200);
  });

  //Test for update users
  test('responds to put /users', async () => {
    const res = await request.put('/users/' + idUser).send({
      accountID: 5000,
      forename: 'Juanote',
      surname: 'Alimañote',
      email: 'juanito@gmail.com',
      birthday: '11/12/1992',
      favorite_color: 'Blue',
      favorite_team: 'Team Shrek',
      favorite_player: 'Encantador'
    });

    expect(res.header['content-type']).toBe('application/json; charset=utf-8');
    expect(res.statusCode).toBe(200);
  });

  // Test for Delete users
  test('responds to delete /users', async () => {
    const res = await request.delete('/users/' + idUser);
    expect(res.statusCode).toBe(204);
  });
});
