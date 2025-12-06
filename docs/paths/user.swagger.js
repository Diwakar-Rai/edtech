/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Auth related APIS
 */

/**
 * @swagger
 * /auth/user:
 *   post:
 *     summary: Register a new user
 *     description: Create a new user and send a verification OTP to email
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserSignUp'
 *     responses:
 *       201:
 *         description: User created Successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SignUpResponse'
 *       400:
 *         description: Bad Request
 *
 *   get:
 *     summary: Get logged-in user information
 *     description: Returns the authenticated user's profile information.
 *     tags:
 *       - User
 *     security:
 *       - BearerAuth: []   # Requires JWT authentication
 *     responses:
 *       200:
 *         description: Successfully retrieved user info
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GetMeResponse'
 *       404:
 *         description: User not found
 *       401:
 *         description: Unauthorized - Missing or invalid token
 *
 * /auth/verify:
 *  post:
 *      summary: verify user email using OTP
 *      description: Confirms the user's email by checking OTP and expiry time
 *      tags:
 *          - Auth
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/EmailVerification'
 *      responses:
 *          200:
 *              description: Email verified successfully
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/EmailVerificationResponse'
 *          400:
 *              description: Bad Request
 *          404:
 *              description: User not found
 *
 * /auth/login:
 *   post:
 *     summary: Login a user
 *     description: Authenticates user using email and password and returns a JWT token.
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginInput'
 *     responses:
 *       200:
 *         description: User logged in successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LoginResponse'
 *       401:
 *         description: Invalid email or password
 *
 *
 */
