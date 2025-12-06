/**
 * @swagger
 * tags:
 *   name: Bootcamp
 *   description: Bootcamp management APIs
 */

/**
 * @swagger
 * /bootcamp:
 *   post:
 *     summary: Create a bootcamp
 *     description: Only Admins and Publishers can create bootcamps.
 *     tags: [Bootcamp]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/BootcampInput'
 *     responses:
 *       201:
 *         description: Bootcamp created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BootcampResponse'
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (role not allowed)
 *
 *   get:
 *     summary: Get all bootcamps
 *     description: Requires login
 *     tags: [Bootcamp]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Bootcamps fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: success
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Bootcamp'
 */

/**
 * @swagger
 * /bootcamp/{id}:
 *   get:
 *     summary: Get a single bootcamp
 *     tags: [Bootcamp]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Bootcamp ID
 *     responses:
 *       200:
 *         description: Bootcamp found
 *
 *   put:
 *     summary: Update a bootcamp
 *     tags: [Bootcamp]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/BootcampInput'
 *     responses:
 *       200:
 *         description: Bootcamp updated successfully
 *       404:
 *         description: Bootcamp not found
 *
 *   delete:
 *     summary: Delete a bootcamp
 *     tags: [Bootcamp]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Bootcamp deleted successfully
 *       404:
 *         description: Bootcamp not found
 */
