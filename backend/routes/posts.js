const express = require("express");

const PostController = require("../controllers/post");
const checkAuth = require('../middleware/check-auth');
const fileExtract = require('../middleware/file');
const router = express.Router();

router.get('', PostController.getPosts );

router.get('/:id', PostController.getPost);

router.post(
  '',
  checkAuth,
  fileExtract,
  PostController.createPost
);

router.put(
  '/:id',
  checkAuth,
  fileExtract,
  PostController.updatePost
);

router.delete(
  '/:id',
  checkAuth,
  PostController.deletePost
);

module.exports= router;
