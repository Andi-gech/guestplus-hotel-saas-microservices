/**
 * @swagger
 * tags:
 *   name: Subscription Plans
 *   description: Subscription plan management endpoints
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     SubscriptionPlan:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         name:
 *           type: string
 *         maxRooms:
 *           type: integer
 *         maxStaff:
 *           type: integer
 *         monthlyPrice:
 *           type: number
 *           format: float
 *         features:
 *           type: object
 *           nullable: true
 *         createdAt:
 *           type: string
 *           format: date-time
 *         tenants:
 *           type: array
 *           items:
 *             type: string
 *       required:
 *         - id
 *         - name
 *         - maxRooms
 *         - maxStaff
 *         - monthlyPrice
 */
/**
 * @swagger
 * /subscription-plans:
 *   get:
 *     summary: Get all subscription plans
 *     tags: [Subscription Plans]
 *     responses:
 *       200:
 *         description: List of subscription plans
 */
/**
 * @swagger
 * /subscription-plans:
 *   post:
 *     summary: Create a new subscription plan
 *     tags: [Subscription Plans]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SubscriptionPlan'
 *           example:
 *             name: "Pro Plan"
 *             maxRooms: 50
 *             maxStaff: 10
 *             monthlyPrice: 49.99
 *             features:
 *               reporting: true
 *               multiProperty: false
 *               supportLevel: "priority"
 *             createdAt: "2025-01-01T00:00:00.000Z"
 *
 *     responses:
 *       201:
 *         description: Subscription plan created successfully
 *       400:
 *         description: Invalid request data
 */
/**
 * @swagger
 * /subscription-plans/{id}:
 *   get:
 *     summary: Get a subscription plan by ID
 *     tags: [Subscription Plans]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Subscription plan found
 *       404:
 *         description: Subscription plan not found
 */
/**
 * @swagger
 * /subscription-plans/{id}:
 *   put:
 *     summary: Update a subscription plan by ID
 *     tags: [Subscription Plans]
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
 *             $ref: '#/components/schemas/SubscriptionPlan'
 *     responses:
 *       200:
 *         description: Subscription plan updated successfully
 *       400:
 *         description: Invalid request data
 *       404:
 *         description: Subscription plan not found
 */
/**
 * @swagger
 * /subscription-plans/{id}:
 *   delete:
 *     summary: Delete a subscription plan by ID
 *     tags: [Subscription Plans]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Subscription plan deleted successfully
 *       404:
 *         description: Subscription plan not found
 */
