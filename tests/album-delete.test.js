const { expect } = require('chai');
const request = require('supertest');
const db = require('../src/db');
const app = require('../src/app');

describe('Delete Album', () => {
  let albums;
  beforeEach(async () => {
    const { rows } = await db.query(
      'WITH new_user AS (INSERT INTO Artists(name, genre) VALUES ($1, $2) RETURNING id) INSERT INTO Albums (artist_id, name , year) SELECT id, $3, $4 FROM new_user RETURNING *',
      ['Tame Impala', 'rnb', 'sweet times', 2006]
    );

    albums = rows[0];
  });

  describe('DELETE /albums/{id}', () => {
    it('deletes the albums and returns the deleted data', async () => {
      const { status, body } = await request(app)
        .delete(`/albums/${albums.id}`)
        .send();

      expect(status).to.equal(200);

      expect(body).to.deep.equal({
        artist_id: albums.artist_id,
        id: albums.id,
        name: albums.name,
        year: albums.year,
      });
    });

    it('returns a 404 if the album does not exist', async () => {
      const { status, body } = await request(app)
        .delete('/albums/90000')
        .send();

      expect(status).to.equal(404);
      expect(body.message).to.equal('album 90000 does not exist');
    });
  });
});