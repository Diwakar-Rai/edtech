/**
 * @swagger
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *
 *   schemas:
 *     UserSignUp:
 *       type: object
 *       required:
 *         - username
 *         - email
 *         - password
 *         - confirmPassword
 *       properties:
 *         username:
 *           type: string
 *           example: user123
 *         email:
 *           type: string
 *           example: user@email.com
 *         password:
 *           type: string
 *           example: Password@123
 *         confirmPassword:
 *           type: string
 *           example: Password@123
 *
 *     SignUpResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: user created successfully
 *         statusCode:
 *           type: integer
 *           example: 201
 *
 *     EmailVerification:
 *       type: object
 *       required:
 *         - email
 *         - otp
 *       properties:
 *         email:
 *           type: string
 *           example: user@email.com
 *         otp:
 *           type: string
 *           example: "123456"
 *
 *     EmailVerificationResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: Email verified successfully
 *
 *     GetMeResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         data:
 *           type: object
 *           properties:
 *             username:
 *               type: string
 *               example: user123
 *             role:
 *               type: string
 *               example: user
 *             email:
 *               type: string
 *               example: user@email.com
 *
 *     LoginInput:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           example: user@email.com
 *         password:
 *           type: string
 *           example: Password@123
 *
 *     LoginResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: Logged in successfully
 *         token:
 *           type: string
 *           example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 */
