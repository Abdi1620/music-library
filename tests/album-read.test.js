const { expect } = require('chai');
const request = require('supertest');
const app = require('../src/app');
const db = require('../src/db');

describe('Read Albums', () => {
  let albums;
  beforeEach(async () => {
    const responses = await Promise.all([
      db.query(
        'WITH new_user AS (INSERT INTO Artists(name, genre) VALUES ($1, $2) RETURNING id) INSERT INTO Albums (artist_id, name , year) SELECT id, $3, $4 FROM new_user RETURNING *',
        ['Tame Impala', 'rock', 'sweet times', 2006]
      ),
      db.query(
        'WITH new_user AS (INSERT INTO Artists(name, genre) VALUES ($1, $2) RETURNING id) INSERT INTO Albums (artist_id, name , year) SELECT id, $3, $4 FROM new_user RETURNING *',
        ['Jack Pack', 'rnb', 'love', 2009]
      ),
      db.query(
        'WITH new_user AS (INSERT INTO Artists(name, genre) VALUES ($1, $2) RETURNING id) INSERT INTO Albums (artist_id, name , year) SELECT id, $3, $4 FROM new_user RETURNING *',
        ['Blobus Gear', 'reagea', 'sweet love', 2006]
      ),
    ]);

    albums = responses.map(({ rows }) => rows[0]);
  });

  describe('GET /albums', () => {
    it('returns all albums records in the database', async () => {
      const { status, body } = await request(app).get('/albums').send();

      expect(status).to.equal(200);
      expect(body.length).to.equal(3);

      body.forEach((albumRecord) => {
        const expected = albums.find((a) => a.id === albumRecord.id);

        expect(albumRecord).to.deep.equal(expected);
      });
    });
  });

  describe('GET /albums/{id}', () => {
    it('returns the album with the correct id', async () => {
      const { status, body } = await request(app)
        .get(`/albums/${albums[0].id}`)
        .send();

      expect(status).to.equal(200);
      expect(body).to.deep.equal(albums[0]);
    });

    it('returns a 404 if the album does not exist', async () => {
      const { status, body } = await request(app)
        .get('/albums/999999999')
        .send();

      expect(status).to.equal(404);
      expect(body.message).to.equal('album 999999999 does not exist');
    });
  });
});