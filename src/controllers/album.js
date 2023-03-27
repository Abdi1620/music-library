const db = require('../db/index');

const readAlbums = async (req, res) => {
  try {
    const { rows } = await db.query('SELECT * FROM Albums');
    // console.log(rows);
    res.status(200).json(rows);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

const getAlbumById = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const {
      rows: [album],
    } = await db.query('SELECT * FROM Albums WHERE id = $1', [id]);

    if (!album) {
      return res.status(404).json({ message: `album ${id} does not exist` });
    }

    res.status(200).json(album);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

const deleteAlbum = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      rows: [album],
    } = await db.query('DELETE FROM Albums WHERE id = $1  RETURNING *', [id]);

    if (!album) {
      return res.status(404).json({ message: `album ${id} does not exist` });
    }

    res.status(200).json(album);
  } catch (err) {
    res.status(500).json(err.message);
  }
};
module.exports ={
    readAlbums,
    getAlbumById,
    deleteAlbum
}