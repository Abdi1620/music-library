const { expect } = require('chai');
const request = require('supertest');
const app = require('../src/app');
const db = require('../src/db');

describe('create album', () => {
  let artist;
  beforeEach(async () => {
    const { rows } = await db.query(
      'INSERT INTO Artists (name, genre) VALUES( $1, $2) RETURNING *',
      ['Tame Impala', 'rock']
    );

    artist = rows[0];
  });

  describe('/album', () => {
    describe('POST', () => {
      it('creates a new artist and album in the database', async () => {
        const { status, body } = await request(app)
          .post(`/artists/${artist.id}/albums`)
          .send({
            year: 2006,
            albumName: 'Rock My Heart',
          });

        expect(status).to.equal(201);
        expect(body.name).to.equal('Rock My Heart');
        expect(body.year).to.equal(2006);
      });
    });
  });
});