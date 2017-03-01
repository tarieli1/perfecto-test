'use strict';

const express = require('express');
const logger = require('./../lib/logger');
const controller = require('./../controllers/product.controller.js');

const router = express.Router();

router.get('/', (req, res) => {
  controller.getAll((err, todos) => {
    if (err) {
        logger.error(err);
        return res.status(500).send('Unexpected error');
    }

    return res.send(todos);
  });
});

router.post('/', (req, res) => {
    if (!req.body || !req.body.text) {
        return res.status(404).send('Text is required');
    }

    controller.add(req.body.text, (err, todos) => {
        if (err) {
            logger.error(err);
            return res.status(500).send('Unexpected error');
        }

        controller.getAll((listErr, todos) => {
          if (listErr) {
              logger.error(listErr);
              return res.status(500).send('Unexpected error');
          }

          return res.send(todos);
        });
    });
});

router.delete('/:todo_id', (req, res) => {
    controller.remove(req.params.todo_id, (err, todos) => {
        if (err) {
            logger.error(err);
            return res.status(500).send('Unexpected error');
        }

        controller.getAll((listErr, todos) => {
          if (listErr) {
              logger.error(listErr);
              return res.status(500).send('Unexpected error');
          }

          return res.send(todos);
        });
    });
});

module.exports = router;
