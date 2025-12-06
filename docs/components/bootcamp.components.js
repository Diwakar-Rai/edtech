/**
 * @swagger
 * components:
 *   schemas:
 *     BootcampInput:
 *       type: object
 *       required:
 *         - name
 *         - description
 *       properties:
 *         name:
 *           type: string
 *           example: MERN Stack Web Development
 *         description:
 *           type: string
 *           example: Learn MERN stack from scratch.
 *         location:
 *           type: string
 *           example: Bangalore, India
 *         duration:
 *           type: number
 *           example: 12
 *
 *     BootcampResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: Bootcamp Created
 *         data:
 *           $ref: '#/components/schemas/Bootcamp'
 *
 *     Bootcamp:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: 65c3b0e1f4ad8c00129997e3
 *         name:
 *           type: string
 *         description:
 *           type: string
 *         location:
 *           type: string
 *         duration:
 *           type: number
 *         createdAt:
 *           type: string
 *         updatedAt:
 *           type: string
 */
