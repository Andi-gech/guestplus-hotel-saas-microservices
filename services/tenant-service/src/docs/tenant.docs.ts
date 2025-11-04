/**
 * @swagger
 * tags:
 *   name: Tenants
 *   description: Tenant management endpoints
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
 *           type: string
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
 *           type: string
 *         isActive:
 *           type: boolean
 *         createdAt:
 *           type: string
 *           format: date-time
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
 *           example:
 *             name: "Acme Hotel"
 *             contactEmail: "contact@acmehotel.com"
 *             location: "Addis Ababa"
 *             description: "A boutique hotel"
 *             logoUrl: "https://example.com/logo.png"
 *             primaryColor: "#FF5722"
 *             secondaryColor: "#37474F"
 *             pointsPerDollarSpent: 1
 *             referralBonusPoints: 100
 *             birthdayBonusPoints: 50
 *             subscriptionPlanId: "550e8400-e29b-41d4-a716-446655440000"
 *             isActive: true
 *     responses:
 *       201:
 *         description: Tenant created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Tenant'
 *             example:
 *               id: "550e8400-e29b-41d4-a716-446655440000"
 *               name: "Acme Hotel"
 *               contactEmail: "contact@acmehotel.com"
 *               location: "Addis Ababa"
 *               description: "A boutique hotel"
 *               logoUrl: "https://example.com/logo.png"
 *               primaryColor: "#FF5722"
 *               secondaryColor: "#37474F"
 *               pointsPerDollarSpent: 1
 *               referralBonusPoints: 100
 *               birthdayBonusPoints: 50
 *               subscriptionPlanId: "550e8400-e29b-41d4-a716-446655440000"
 *               isActive: true
 *       400:
 *         description: Invalid request data
 *         content:
 *           application/json:
 *             schema:
 *                type: object
 *                properties:
 *                   error:
 *                     type: string
 *                example: { "error": "Invalid tenant data" }
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
 *           type: string
 *     responses:
 *       200:
 *         description: Tenant found
 *       404:
 *         description: Tenant not found
 */

/**
 * @swagger
 * /tenants/{id}:
 *   put:
 *     summary: Update a tenant by ID
 *     tags: [Tenants]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Tenant'
 *     responses:
 *       200:
 *         description: Tenant updated successfully
 *       400:
 *         description: Invalid request data
 *       404:
 *         description: Tenant not found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /tenants/{id}:
 *   delete:
 *     summary: Delete a tenant by ID
 *     tags: [Tenants]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Tenant deleted successfully
 *       404:
 *         description: Tenant not found
 *       500:
 *         description: Server error
 */
