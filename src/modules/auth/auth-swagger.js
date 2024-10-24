/**
 * @swagger
 * tags:
 *  name: Auth
 *  description: Auth modules and routes
 */

/**
 * @swagger
 *  components:
 *      schemas:
 *          SendOtp:
 *              type: object
 *              required:
 *                  -   phoneNumber
 *              properties:
 *                  phoneNumber:
 *                      type: string
 *                      minLength: 11
 *                      maxLength: 11
 *                      default: ""
 *          CheckOtp:
 *              type: object
 *              required:
 *                  -   code
 *                  -   phoneNumber
 *              properties:
 *                  code:
 *                      type: string
 *                      minLength: 5
 *                      maxLength: 5
 *                      default: ""
 *                  phoneNumber:
 *                      type: string
 *                      minLength: 11
 *                      maxLength: 11
 *                      default: ""
 */

/**
 * @swagger
 * /api/auth/log-out:
 *  get:
 *      summary: Logs out current user
 *      tags:
 *          -   Auth
 *      responses:
 *          200:
 *              description: Logged out successfully
 */

/**
 * @swagger
 * /api/auth/send-otp:
 *  post:
 *      summary: Sends a new otp for login
 *      tags:
 *          -   Auth
 *      requestBody:
 *          content:
 *              application/x-www-form-urlencoded:
 *                  schema:
 *                      $ref: "#/components/schemas/SendOtp"
 *              application/json:
 *                  schema:
 *                      $ref: "#/components/schemas/SendOtp"
 *      responses:
 *          200:
 *              description: Otp Sent successfully

 */

/**
 * @swagger
 * /api/auth/check-otp:
 *  post:
 *      summary: Checks otp for login
 *      tags:
 *          -   Auth
 *      requestBody:
 *          content:
 *              application/x-www-form-urlencoded:
 *                  schema:
 *                      $ref: "#/components/schemas/CheckOtp"
 *              application/json:
 *                  schema:
 *                      $ref: "#/components/schemas/CheckOtp"
 *      responses:
 *          200:
 *              description: Logged in successfully

 */
