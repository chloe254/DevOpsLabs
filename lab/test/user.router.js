const app = require('../src/index');
const chai = require('chai');
const chaiHttp = require('chai-http');
const db = require('../src/dbClient');

chai.use(chaiHttp);

describe('User REST API', () => {

  beforeEach(() => {
    // Clean DB before each test
    db.flushdb();
  });

  after(() => {
    app.close();
    db.quit();
  });

  describe('POST /user', () => {

    it('create a new user', (done) => {
      const user = {
        username: 'sergkudinov',
        firstname: 'Sergei',
        lastname: 'Kudinov'
      };
      chai.request(app)
        .post('/user')
        .send(user)
        .then((res) => {
          chai.expect(res).to.have.status(201);
          chai.expect(res.body.status).to.equal('success');
          chai.expect(res).to.be.json;
          done();
        })
        .catch((err) => {
          throw err;
        });
    });

    it('pass wrong parameters', (done) => {
      const user = {
        firstname: 'Sergei',
        lastname: 'Kudinov'
      };
      chai.request(app)
        .post('/user')
        .send(user)
        .then((res) => {
          chai.expect(res).to.have.status(400);
          chai.expect(res.body.status).to.equal('error');
          chai.expect(res).to.be.json;
          done();
        })
        .catch((err) => {
          throw err;
        });
    });

  });

  describe('GET /user/:username', () => {

    it('successfully get user', (done) => {
      const user = {
        username: 'sergkudinov',
        firstname: 'Sergei',
        lastname: 'Kudinov'
      };

      // 1. Create user first
      chai.request(app)
        .post('/user')
        .send(user)
        .then(() => {
          // 2. Then get user
          chai.request(app)
            .get(`/user/${user.username}`)
            .then((res) => {
              chai.expect(res).to.have.status(200);
              chai.expect(res.body.username).to.equal(user.username);
              chai.expect(res.body.firstname).to.equal(user.firstname);
              chai.expect(res.body.lastname).to.equal(user.lastname);
              chai.expect(res).to.be.json;
              done();
            });
        })
        .catch((err) => {
          throw err;
        });
    });

    it('cannot get a user when it does not exist', (done) => {
      chai.request(app)
        .get('/user/unknownuser')
        .then((res) => {
          chai.expect(res).to.have.status(404);
          chai.expect(res.body.status).to.equal('error');
          chai.expect(res.body.message).to.equal('User not found');
          chai.expect(res).to.be.json;
          done();
        })
        .catch((err) => {
          throw err;
        });
    });

  });

});