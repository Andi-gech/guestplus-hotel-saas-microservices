/**
 * @swagger
 * tags:
 *   name: Tenants
 *   description: Tenant management endpoints
 */

/**
 * @swagger
 * /tenants:
 *   get:
 *     summary: Get all tenants
 *     tags: [Tenants]
 *     responses:
 *       200:
 *         description: List of tenants
 */
/**
 * @swagger
 * /tenants:
 *   post:
 *     summary: Create a new tenant
 *     tags: [Tenants]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Tenant'
 *     responses:
 *       201:
 *         description: Tenant created successfully
 *     400:
 *       description: Invalid request data
 *       content:
 *         application/json:
 *
 */
/**
 * @swagger
 * /tenants/{id}:
 *   get:
 *     summary: Get a single tenant by ID
 *     tags: [Tenants]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Tenant found
 *       404:
 *         description: Tenant not found
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Tenant:
 *       type: object
 *       required:
 *         - name
 *         - contactEmail
 *       properties:
 *         id:
 *           type: integer
 *         name:
 *           type: string
 *         contactEmail:
 *           type: string
 *         location:
 *           type: string
 *         description:
 *           type: string
 *         logoUrl:
 *           type: string
 *         primaryColor:
 *           type: string
 *         secondaryColor:
 *           type: string
 *         pointsPerDollarSpent:
 *           type: integer
 *         referralBonusPoints:
 *           type: integer
 *         birthdayBonusPoints:
 *           type: integer
 *         subscriptionPlanId:
 *           type: integer
 *         users:
 *           type: array
 *           items:
 *             type: integer
 *         isActive:
 *           type: boolean
 *         createdAt:
 *           type: string
 *           format: date-time
 */
