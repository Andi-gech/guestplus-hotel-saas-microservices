/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     Hotel:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: "uuid-here"
 *         tenantId:
 *           type: string
 *           example: "tenant_123"
 *         name:
 *           type: string
 *           example: "Grand Plaza"
 *         description:
 *           type: string
 *           nullable: true
 *           example: "A modern hotel in downtown"
 *         address:
 *           type: string
 *           example: "123 Main St"
 *         city:
 *           type: string
 *           example: "Addis Ababa"
 *         country:
 *           type: string
 *           example: "Ethiopia"
 *         rating:
 *           type: number
 *           format: float
 *           nullable: true
 *           example: 4.5
 *         amenities:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/HotelAmenity'
 *         images:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/HotelImage'
 *         rooms:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Room'
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *     HotelAmenity:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         hotelId:
 *           type: string
 *         name:
 *           type: string
 *           example: "Free WiFi"
 *     HotelImage:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         hotelId:
 *           type: string
 *         url:
 *           type: string
 *           format: uri
 *           example: "https://example.com/image.jpg"
 *     Room:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         hotelId:
 *           type: string
 *         name:
 *           type: string
 *           example: "Deluxe Room"
 *         description:
 *           type: string
 *           nullable: true
 *         capacity:
 *           type: integer
 *           example: 2
 *         price:
 *           type: number
 *           format: float
 *           example: 120.5
 *         type:
 *           type: string
 *           enum: [STANDARD, DELUXE, SUITE]
 *         status:
 *           type: string
 *           enum: [AVAILABLE, BOOKED, MAINTENANCE]
 *         RewardConfig:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/RoomRewardConfig'
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *     RoomRewardConfig:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         roomId:
 *           type: string
 *         config:
 *           type: string
 *           example: '{ "points": 10 }'
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *     PaginatedHotels:
 *       type: object
 *       properties:
 *         items:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Hotel'
 *         total:
 *           type: integer
 */

/**
 * @swagger
 * /hotels:
 *   get:
 *     tags:
 *       - Hotels
 *     summary: Get all hotels
 *     description: Returns a list of hotels. Supports simple pagination via query params.
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 20
 *     responses:
 *       '200':
 *         description: A list of hotels
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PaginatedHotels'
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *   post:
 *     tags:
 *       - Hotels
 *     summary: Create a new hotel
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [tenantId, name]
 *             properties:
 *               tenantId:
 *                 type: string
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               address:
 *                 type: string
 *               city:
 *                 type: string
 *               country:
 *                 type: string
 *     responses:
 *       '201':
 *         description: Hotel created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Hotel'
 *       '400':
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       '401':
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

/**
 * @swagger
 * /hotels/{id}:
 *   get:
 *     tags:
 *       - Hotels
 *     summary: Get hotel by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Hotel object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Hotel'
 *       '404':
 *         description: Hotel not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *   put:
 *     tags:
 *       - Hotels
 *     summary: Update hotel
 *     security:
 *       - bearerAuth: []
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
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               address:
 *                 type: string
 *               city:
 *                 type: string
 *               country:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Updated hotel
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Hotel'
 *       '400':
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: Hotel not found
 *   delete:
 *     tags:
 *       - Hotels
 *     summary: Delete hotel
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Hotel deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Hotel deleted successfully"
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: Hotel not found
 */

/**
 * @swagger
 * /hotels/{hotelId}/rooms:
 *   get:
 *     tags:
 *       - Rooms
 *     summary: Get all rooms for a hotel
 *     parameters:
 *       - in: path
 *         name: hotelId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: List of rooms
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Room'
 *       '404':
 *         description: Hotel not found
 *   post:
 *     tags:
 *       - Rooms
 *     summary: Create a room for a hotel
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: hotelId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, capacity, price]
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               capacity:
 *                 type: integer
 *               price:
 *                 type: number
 *               type:
 *                 type: string
 *                 enum: [STANDARD, DELUXE, SUITE]
 *     responses:
 *       '201':
 *         description: Room created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Room'
 */

/**
 * @swagger
 * /hotels/rooms/{id}:
 *   get:
 *     tags:
 *       - Rooms
 *     summary: Get room by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Room object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Room'
 *       '404':
 *         description: Room not found
 *   put:
 *     tags:
 *       - Rooms
 *     summary: Update room
 *     security:
 *       - bearerAuth: []
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
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               capacity:
 *                 type: integer
 *               price:
 *                 type: number
 *               status:
 *                 type: string
 *                 enum: [AVAILABLE, BOOKED, MAINTENANCE]
 *     responses:
 *       '200':
 *         description: Updated room
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Room'
 *       '404':
 *         description: Room not found
 *   delete:
 *     tags:
 *       - Rooms
 *     summary: Delete a room
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Room deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Room deleted successfully"
 *       '404':
 *         description: Room not found
 */

/**
 * @swagger
 * /hotels/rooms/:id/reward-config:
 *   post:
 *     tags:
 *       - Rooms
 *     summary: Assign a reward configuration to a room
 *     security:
 *       - bearerAuth: []
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
 *             type: object
 *             required: [rewardConfigId]
 *             properties:
 *               rewardConfigId:
 *                 type: string
 *                 description: ID or JSON string representing the reward config (stored as string)
 *     responses:
 *       '200':
 *         description: Updated room with assigned reward config
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Room'
 *       '400':
 *         description: Bad request
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: Room not found
 */

/**
 * @swagger
 * /hotels/rooms/{id}/reward-config:
 *   get:
 *     tags:
 *       - Rooms
 *     summary: Get reward configurations for a room
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: List of reward configurations for the room
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/RoomRewardConfig'
 *       '404':
 *         description: Room not found
 */

/**
 * @swagger
 * /hotels/rooms/reward-config/{id}:
 *   delete:
 *     tags:
 *       - Rooms
 *     summary: Remove a reward configuration from a room
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Reward configuration removed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Room reward configuration removed successfully"
 *       '404':
 *         description: Reward configuration not found
 */
