/**
 * @swagger
 * tags:
 *  name: Category
 *  description: Category modules and routes
 */

/**
 * @swagger
 *  components:
 *      schemas:
 *          CreateCategory:
 *              type: object
 *              required:
 *                  -   name
 *              properties:
 *                  name:
 *                      type: string
 *                      minLength: 3
 *                      maxLength: 100
 *                      default: ""
 *                  slug:
 *                      type: string
 *                      maxLength: 150
 *                      default: ""
 *                  parent:
 *                      type: string
 *                      maxLength: 24
 *                      default: ""
 */

/**
 * @swagger
 * /api/categories:
 *  get:
 *      summary: Gets all categories
 *      tags:
 *          -   Category
 *      responses:
 *          200:
 *              description: Categories list
 */

/**
 * @swagger
 * /api/categories:
 *  post:
 *      summary: Creates a new category
 *      tags:
 *          -   Category
 *      requestBody:
 *          content:
 *              application/x-www-form-urlencoded:
 *                  schema:
 *                      $ref: "#/components/schemas/CreateCategory"
 *              application/json:
 *                  schema:
 *                      $ref: "#/components/schemas/CreateCategory"
 *      responses:
 *          200:
 *              description: Category created successfully

 */
