/**
 * @swagger
 * /rewards/me:
 *   get:
 *     tags:
 *       - Rewards
 *     summary: Get rewards for the authenticated user
 *     description: Returns the reward record for the currently authenticated user.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         required: true
 *     responses:
 *       '200':
 *         description: Reward object for the authenticated user
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Reward'
 *             example:
 *               id: "reward_01FEXAMPLE"
 *               userId: "user_01FEXAMPLE"
 *               points: 1200
 *               transactions:
 *                 - id: "txn_01FEXAMPLE"
 *                   rewardId: "reward_01FEXAMPLE"
 *                   type: "credit"
 *                   amount: 1200
 *                   createdAt: "2025-01-01T00:00:00Z"
 *               createdAt: "2025-01-01T00:00:00Z"
 *               updatedAt: "2025-01-01T00:00:00Z"
 *       '401':
 *         description: Unauthorized - missing or invalid authentication token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             example:
 *               message: "Unauthorized"
 *       '404':
 *         description: Reward not found for the authenticated user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             example:
 *               message: "Reward not found"
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             example:
 *               message: "Internal server error"
 */

/**
 * @swagger
 * /rewards:
 *   post:
 *     tags:
 *       - Rewards
 *     summary: Create a new reward record
 *     description: Create a reward for a user. Requires authentication via Authorization header (bearer token).
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         required: true
 *
 *     responses:
 *       '201':
 *         description: Reward created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Reward'
 *             example:
 *               id: "reward_01FEXAMPLE"
 *               userId: "user_01FEXAMPLE"
 *               points: 0
 *               transactions: []
 *               createdAt: "2025-01-01T00:00:00Z"
 *               updatedAt: "2025-01-01T00:00:00Z"
 *       '400':
 *         description: Bad request - validation error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             example:
 *               message: "Invalid request body"
 *       '401':
 *         description: Unauthorized - missing or invalid authentication token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             example:
 *               message: "Unauthorized"
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             example:
 *               message: "Internal server error"
 */

/**
 * @swagger
 * /rewards/{id}:
 *   delete:
 *     tags:
 *       - Rewards
 *     summary: Delete a reward by id
 *     description: Delete the specified reward. Requires authentication.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Reward id to delete
 *     responses:
 *       '204':
 *         description: Reward deleted successfully (no content)
 *       '401':
 *         description: Unauthorized - missing or invalid authentication token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             example:
 *               message: "Unauthorized"
 *       '404':
 *         description: Reward not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             example:
 *               message: "Reward not found"
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             example:
 *               message: "Internal server error"
 */

/**
 * @swagger
 * /rewards/earn:
 *   post:
 *     tags:
 *       - Rewards
 *     summary: Earn reward points
 *     description: Earn reward points for the authenticated user.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               points:
 *                 type: integer
 *             example:
 *               points: 100
 *     responses:
 *       '200':
 *         description: Points credited successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             example:
 *               message: "Points credited"
 */

/**
 * @swagger
 * /rewards/redeem:
 *   post:
 *     tags:
 *       - Rewards
 *     summary: Redeem reward points
 *     description: Redeem reward points for the authenticated user. Requires authentication via Authorization header (bearer token).
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               points:
 *                 type: integer
 *                 minimum: 1
 *             required:
 *               - points
 *             example:
 *               points: 500
 *     responses:
 *       '200':
 *         description: Points redeemed successfully - returns updated reward record
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Reward'
 *             example:
 *               id: "reward_01FEXAMPLE"
 *               userId: "user_01FEXAMPLE"
 *               points: 700
 *               transactions:
 *                 - id: "txn_01FEXAMPLE"
 *                   rewardId: "reward_01FEXAMPLE"
 *                   type: "debit"
 *                   amount: 500
 *                   createdAt: "2025-01-02T00:00:00Z"
 *               createdAt: "2025-01-01T00:00:00Z"
 *               updatedAt: "2025-01-02T00:00:00Z"
 *       '400':
 *         description: Bad request - validation error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             example:
 *               message: "Invalid request body"
 *       '422':
 *         description: Unprocessable Entity - insufficient points to redeem
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             example:
 *               message: "Insufficient points"
 *       '401':
 *         description: Unauthorized - missing or invalid authentication token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             example:
 *               message: "Unauthorized"
 *       '404':
 *         description: Reward not found for the authenticated user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             example:
 *               message: "Reward not found"
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             example:
 *               message: "Internal server error"
 */
/**
 * @swagger
 * /rewards/my-transactions:
 *   get:
 *     tags:
 *       - Rewards
 *     summary: Get transactions for the authenticated user
 *     description: Returns a list of reward transactions for the currently authenticated user. Requires authentication via Authorization header (bearer token).
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: List of transactions
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Transaction'
 *             example:
 *               - id: "txn_01FEXAMPLE"
 *                 rewardId: "reward_01FEXAMPLE"
 *                 type: "credit"
 *                 amount: 1200
 *                 createdAt: "2025-01-01T00:00:00Z"
 *       '401':
 *         description: Unauthorized - missing or invalid authentication token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             example:
 *               message: "Unauthorized"
 *       '404':
 *         description: No transactions found for the authenticated user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             example:
 *               message: "No transactions found"
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             example:
 *               message: "Internal server error"
 */

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */
