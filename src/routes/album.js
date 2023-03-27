const express = require('express');
const albumController = require('../controllers/album');

const router = express.Router();

router.get('/', albumController.readAlbums);
router.get('/:id', albumController.getAlbumById);
router.delete('/:id', albumController.deleteAlbum);

module.exports = router;