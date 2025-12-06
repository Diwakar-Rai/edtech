/**
 * @swagger
 * components:
 *   schemas:
 *     CourseInput:
 *       type: object
 *       required:
 *         - title
 *         - description
 *         - duration
 *         - bootcampId
 *       properties:
 *         title:
 *           type: string
 *           example: MERN Stack Development
 *         description:
 *           type: string
 *           example: Learn full stack web development using MongoDB, Express, React, and Node.js
 *         duration:
 *           type: number
 *           example: 12
 *         bootcampId:
 *           type: string
 *           example: 65c3b0e1f4ad8c00129997e3
 *
 *     Course:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         title:
 *           type: string
 *         description:
 *           type: string
 *         duration:
 *           type: number
 *         bootcampId:
 *           type: string
 *         createdAt:
 *           type: string
 *         updatedAt:
 *           type: string
 *
 *     CourseResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: Successfully Course Created
 *         data:
 *           $ref: '#/components/schemas/Course'
 */
