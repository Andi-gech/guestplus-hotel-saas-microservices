/**
 * @swagger
 * tags:
 *   name: RewardConfig
 *   description: API endpoints for managing reward configurations
 */

/**
 * @swagger
 * /rewards/config:
 *   get:
 *     summary: Get reward configuration
 *     tags: [RewardConfig]
 *     responses:
 *       200:
 *         description: Successful response
 *       404:
 *         description: Not found
 */

/**
 * @swagger
 * /rewards/config/{id}:
 *   get:
 *     summary: Get reward configuration by ID
 *     tags: [RewardConfig]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Reward configuration ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful response
 *       404:
 *         description: Not found
 */

/**
 * @swagger
 * /rewards/config:
 *   post:
 *     summary: Create a new reward configuration
 *     tags: [RewardConfig]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the reward configuration
 *               pointsEarn:
 *                 type: integer
 *                 description: Points earned for the reward configuration
 */

/**
 * @swagger
 * /rewards/config/{id}:
 *   put:
 *     summary: Update an existing reward configuration
 *     tags: [RewardConfig]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Reward configuration ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the reward configuration
 *               pointsEarn:
 *                 type: integer
 *                 description: Points earned for the reward configuration
 *             example:
 *               name: "Loyalty Bonus"
 *               pointsEarn: 100
 *     responses:
 *       200:
 *         description: Reward configuration updated successfully
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Reward configuration not found
 */

/**
 * @swagger
 * /rewards/config/{id}:
 *   delete:
 *     summary: Delete a reward configuration
 *     tags: [RewardConfig]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Reward configuration ID to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Reward configuration deleted successfully
 *       404:
 *         description: Reward configuration not found
 */
