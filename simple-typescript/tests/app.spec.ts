const Auth = require('@uniauth/express-middleware');
import { expect } from 'chai';
import { describe, it } from 'mocha';
import app from '../src/app';
import { agent as request } from 'supertest';
import { doesNotMatch } from 'assert';

const uniAuth = new Auth([
  {
    name: 'server1',
    url: 'http://localhost:5000',
    clientId: '6032634dd05be80880499244',
    clientSecret: '336fe562-33bf-4448-b87d-d17105eabb25',
    redirectUri: 'www.facebook.com',
    processor: (profile: any, next: any) => {
      /**
       * operate with data received from user
       */
      console.log('received user profile > ', profile);
      next();
    },
    endpoint: {
      auth: 'account/o/login',
      profile: 'account/o/access',
    },
  },
]);

describe('App test', () => {
  it('should always pass', function() {
    expect(true).to.equal(true);
  });
});

describe('/', () => {
  it('should GET /', async function() {
    const res = await request(app).get('/');
    expect(res.body).not.to.be.empty;
  });

  it('body should have alive as true', async function() {
    const res = await request(app).get('/');
    expect(res.body.alive).to.equal(true);
  });
  it('body should have login as open /login to initiate auth ', async function() {
    const res = await request(app).get('/');
    expect(res.body.login).to.equal('open /login to initiate auth');
  });
});

describe('/login', () => {
  it('should GET /login', async function() {});

  it('authenticate should be defined', async function() {
    const res = await request(app).get('/login');
    expect(uniAuth.authenticate).not.to.be.undefined;
  });
});

describe('/callback', async () => {
  it('should GET /callback', function() {});

  it('callback should be defined', async function(done) {
    const res = await request(app).get('/callback');
    expect(uniAuth.callback).not.to.be.undefined;
    done();
  });
});
