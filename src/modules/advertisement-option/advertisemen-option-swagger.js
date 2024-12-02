/**
 * @swagger
 * tags:
 *  name: Advertisement Option
 *  description: Advertisement option modules and routes
 */

/**
 * @swagger
 *  components:
 *      schemas:
 *          CreateAdvertisementOption:
 *              type: object
 *              required:
 *                  -   key
 *                  -   type
 *                  -   title
 *                  -   category
 *              properties:
 *                  key:
 *                      type: string
 *                      minLength: 1
 *                      maxLength: 100
 *                      default: ""
 *                  type:
 *                      type: string
 *                      enum:
 *                          -   array
 *                          -   number
 *                          -   string
 *                          -   boolean
 *                  title:
 *                      type: string
 *                      minLength: 3
 *                      maxLength: 100
 *                      default: ""
 *                  category:
 *                      type: string
 *                      minLength: 24
 *                      maxLength: 24
 *                      default: ""
 *                  enum:
 *                      type: array
 *                      default: []
 *                      items:
 *                          type: string
 *                  guide:
 *                      type: string
 *                      maxLength: 200
 *                      default: ""
 *                  required:
 *                      type: boolean
 */

/**
 * @swagger
 * /api/advertisement-options:
 *  get:
 *      summary: Gets all advertisement options
 *      tags:
 *          -   Advertisement Option
 *      responses:
 *          200:
 *              description: Advertisement options list
 */

/**
 * @swagger
 * /api/advertisement-options/{id}:
 *  get:
 *      summary: Gets advertisement option by id
 *      tags:
 *          -   Advertisement Option
 *      parameters:
 *          -   in: path
 *              name: id
 *              required: true
 *              schema:
 *                  type: string
 *                  minLength: 24
 *                  maxLength: 24
 *      responses:
 *          200:
 *              description: Advertisement option details
 */

/**
 * @swagger
 * /api/advertisement-options/category/{categoryId}:
 *  get:
 *      summary: Gets advertisement options by category id
 *      tags:
 *          -   Advertisement Option
 *      parameters:
 *          -   in: path
 *              name: categoryId
 *              required: true
 *              schema:
 *                  type: string
 *                  minLength: 24
 *                  maxLength: 24
 *      responses:
 *          200:
 *              description: Advertisement options list
 */

/**
 * @swagger
 * /api/advertisement-options/category-slug/{slug}:
 *  get:
 *      summary: Gets advertisement options by category slug
 *      tags:
 *          -   Advertisement Option
 *      parameters:
 *          -   in: path
 *              name: slug
 *              required: true
 *              schema:
 *                  type: string
 *                  minLength: 2
 *                  maxLength: 150
 *      responses:
 *          200:
 *              description: Advertisement options list
 */

/**
 * @swagger
 * /api/advertisement-options:
 *  post:
 *      summary: Creates a new advertisement option
 *      tags:
 *          -   Advertisement Option
 *      requestBody:
 *          content:
 *              application/x-www-form-urlencoded:
 *                  schema:
 *                      $ref: "#/components/schemas/CreateAdvertisementOption"
 *              application/json:
 *                  schema:
 *                      $ref: "#/components/schemas/CreateAdvertisementOption"
 *      responses:
 *          200:
 *              description: Advertisement option created successfully

 */

/**
 * @swagger
 * /api/advertisement-options/{id}:
 *  delete:
 *      summary: Deletes advertisement option by id
 *      tags:
 *          -   Advertisement Option
 *      parameters:
 *          -   in: path
 *              name: id
 *              required: true
 *              schema:
 *                  type: string
 *                  minLength: 24
 *                  maxLength: 24
 *      responses:
 *          200:
 *              description: Deleted successfully
 */
