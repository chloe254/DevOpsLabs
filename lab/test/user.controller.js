const { expect } = require('chai');
const userController = require('../src/controllers/user');
const db = require('../src/dbClient');

describe('User', () => {
  
  beforeEach(() => {
    // Clean DB before each test
    db.flushdb();
  });

  describe('Create', () => {

    it('create a new user', (done) => {
      const user = {
        username: 'sergkudinov',
        firstname: 'Sergei',
        lastname: 'Kudinov'
      };
      userController.create(user, (err, result) => {
        expect(err).to.be.equal(null);
        expect(result).to.be.equal('OK');
        done();
      });
    });

    it('passing wrong user parameters', (done) => {
      const user = {
        firstname: 'Sergei',
        lastname: 'Kudinov'
      };
      userController.create(user, (err, result) => {
        expect(err).to.not.be.equal(null);
        expect(result).to.be.equal(null);
        done();
      });
    });

  });

  describe('Get', () => {

    it('get a user by username', (done) => {
      const user = {
        username: 'sergkudinov',
        firstname: 'Sergei',
        lastname: 'Kudinov'
      };

      // 1. Create user first
      userController.create(user, (err, result) => {
        expect(err).to.be.equal(null);
        expect(result).to.be.equal('OK');

        // 2. Then get user
        userController.get(user.username, (err, result) => {
          expect(err).to.be.equal(null);
          expect(result).to.deep.equal(user);
          done();
        });
      });
    });

    it('cannot get a user when it does not exist', (done) => {
      userController.get('unknownuser', (err, result) => {
        expect(err).to.not.be.equal(null);
        expect(result).to.be.equal(null);
        done();
      });
    });

  });

});