const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const nhacungcapValidation = require('../../validations/nhacungcap.validation');
const nhacungcapController = require('../../controllers/nhacungcap.controller');

const router = express.Router();

router
  .route('/')
  .post( validate(nhacungcapValidation.createNhacungcap), nhacungcapController.createNhacungcap)
  .get( validate(nhacungcapValidation.getNhacungcaps), nhacungcapController.getNhacungcaps);

router
  .route('/:nhacungcapId')
  .get(validate(nhacungcapValidation.getNhacungcap), nhacungcapController.getNhacungcap)
  .patch( validate(nhacungcapValidation.updateNhacungcap), nhacungcapController.updateNhacungcap)
  .delete( validate(nhacungcapValidation.deleteNhacungcap), nhacungcapController.deleteNhacungcap);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Nhacungcaps
 *   description: Nhacungcap management and retrieval
 */

/**
 * @swagger
 * /nhacungcaps:
 *   post:
 *     summary: Create a nhacungcap
 *     description: Only admins can create other nhacungcaps.
 *     tags: [Nhacungcaps]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *               - role
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *                 description: must be unique
 *               password:
 *                 type: string
 *                 format: password
 *                 minLength: 8
 *                 description: At least one number and one letter
 *               role:
 *                  type: string
 *                  enum: [nhacungcap, admin]
 *             example:
 *               name: fake name
 *               email: fake@example.com
 *               password: password1
 *               role: nhacungcap
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Nhacungcap'
 *       "400":
 *         $ref: '#/components/responses/DuplicateEmail'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *
 *   get:
 *     summary: Get all nhacungcaps
 *     description: Only admins can retrieve all nhacungcaps.
 *     tags: [Nhacungcaps]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Nhacungcap name
 *       - in: query
 *         name: role
 *         schema:
 *           type: string
 *         description: Nhacungcap role
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *         description: sort by query in the form of field:desc/asc (ex. name:asc)
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *         default: 10
 *         description: Maximum number of nhacungcaps
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Page number
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 results:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Nhacungcap'
 *                 page:
 *                   type: integer
 *                   example: 1
 *                 limit:
 *                   type: integer
 *                   example: 10
 *                 totalPages:
 *                   type: integer
 *                   example: 1
 *                 totalResults:
 *                   type: integer
 *                   example: 1
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 */

/**
 * @swagger
 * /nhacungcaps/{id}:
 *   get:
 *     summary: Get a nhacungcap
 *     description: Logged in nhacungcaps can fetch only their own nhacungcap information. Only admins can fetch other nhacungcaps.
 *     tags: [Nhacungcaps]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Nhacungcap id
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Nhacungcap'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   patch:
 *     summary: Update a nhacungcap
 *     description: Logged in nhacungcaps can only update their own information. Only admins can update other nhacungcaps.
 *     tags: [Nhacungcaps]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Nhacungcap id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *                 description: must be unique
 *               password:
 *                 type: string
 *                 format: password
 *                 minLength: 8
 *                 description: At least one number and one letter
 *             example:
 *               name: fake name
 *               email: fake@example.com
 *               password: password1
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Nhacungcap'
 *       "400":
 *         $ref: '#/components/responses/DuplicateEmail'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   delete:
 *     summary: Delete a nhacungcap
 *     description: Logged in nhacungcaps can delete only themselves. Only admins can delete other nhacungcaps.
 *     tags: [Nhacungcaps]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Nhacungcap id
 *     responses:
 *       "200":
 *         description: No content
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */
