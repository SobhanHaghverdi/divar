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
 *                      minLength: 10
 *                      maxLength: 10
 *                      default: ""
 *          Update Counseling Session:
 *              type: object
 *              required:
 *                  -   status
 *              properties:
 *                  status:
 *                      type: object
 *                      default: {value: "reserve", label: "رزرو"}
 *                  description:
 *                      type: string
 *                      maxLength: 800
 *                      default: ""
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
