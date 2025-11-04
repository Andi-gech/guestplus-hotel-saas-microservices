/**
 * @swagger
 * tags:
 *   name: Tenant users
 *   description: Tenant user management endpoints
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     TenantUser:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         tenantId:
 *           type: integer
 *         userId:
 *           type: string
 *         role:
 *           type: string
 *           enum: [user, admin]
 *       required:
 *         - id
 *         - tenantId
 *         - userId
 *         - role
 * */
/**
 * @swagger
 * /tenant-users:
 *   get:
 *     summary: Get all tenant users
 *     responses:
 *       200:
 *         description: A list of tenant users
 *       500:
 *         description: Server error
 */
/**
 * @swagger
 * /tenant-users/{id}:
 *   get:
 *     summary: Get a tenant user by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the tenant user
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: The tenant user
 *       404:
 *         description: Tenant user not found
 *       500:
 *         description: Server error
 */
/**
 * @swagger
 * /tenant-users:
 *   post:
 *    summary: Create a new tenant user
 *   requestBody:
 *    required: true
 *   content:
 *    application/json:
 *     schema:
 *      $ref: '#/components/schemas/TenantUser'
 *  responses:
 *    201:
 *    description: Tenant user created successfully
 *   400:
 *    description: Bad request
 *  500:
 *   description: Server error
 * /**
 * @swagger
 * /tenant-users/{id}:
 *   put:
 *     summary: Update a tenant user by ID
 *    parameters:
 *      - in: path
 *       name: id
 *      required: true
 *    description: The ID of the tenant user
 *    schema:
 *      type: integer
 *  requestBody:
 *    required: true
 *    content:
 *      application/json:
 *        schema:
 *          $ref: '#/components/schemas/TenantUser'
 *   responses:
 *    200:
 *    description: Tenant user updated successfully
 *    400:
 *    description: Bad request
 *   404:
 *    description: Tenant user not found
 * 500:
 *  description: Server error
 * */
