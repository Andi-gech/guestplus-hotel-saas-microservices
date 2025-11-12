/**
 * @swagger
 * tags:
 *   name: Reservations
 *   description: Reservation endpoints for creating and managing reservations
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Reservation:
 *       type: object
 *       required:
 *         - userId
 *         - roomId
 *         - checkIn
 *         - checkOut
 *       properties:
 *         id:
 *           type: string
 *         userId:
 *           type: string
 *         roomId:
 *           type: string
 *         checkIn:
 *           type: string
 *           format: date-time
 *         checkOut:
 *           type: string
 *           format: date-time
 *         status:
 *           type: string
 *           enum:
 *             - PENDING
 *             - CONFIRMED
 *             - CANCELLED
 *             - COMPLETED
 *         guestName:
 *           type: string
 *         guestEmail:
 *           type: string
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */

/**
 * @swagger
 * /reservation/my-reservations:
 *   get:
 *     tags:
 *       - Reservations
 *     summary: Get reservations for the authenticated user
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         required: true
 *     responses:
 *       '200':
 *         description: List of reservations for the authenticated user
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Reservation'
 *       '401':
 *         description: Unauthorized
 */

/**
 * @swagger
 * /reservation:
 *   post:
 *     tags:
 *       - Reservations
 *     summary: Create a new reservation
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *               roomId:
 *                 type: string
 *               checkIn:
 *                 type: string
 *                 format: date-time
 *               checkOut:
 *                 type: string
 *                 format: date-time
 *               guestName:
 *                 type: string
 *               guestEmail:
 *                 type: string
 *     responses:
 *       '201':
 *         description: Reservation created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Reservation'
 *       '400':
 *         description: Bad request
 */

/**
 * @swagger
 * /reservation/{id}:
 *   get:
 *     tags:
 *       - Reservations
 *     summary: Get a reservation by ID
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         required: true
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Reservation found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Reservation'
 *       '404':
 *         description: Reservation not found
 *   delete:
 *     tags:
 *       - Reservations
 *     summary: Cancel (delete) a reservation by ID
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         required: true
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '204':
 *         description: Reservation cancelled successfully (no content)
 */

/**
 * @swagger
 * /reservation/{id}/complete:
 *   put:
 *     tags:
 *       - Reservations
 *     summary: Mark a reservation as completed
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         required: true
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Reservation marked as completed
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Reservation'
 *       '404':
 *         description: Reservation not found
 */

/**
 * @swagger
 * /reservation:
 *   get:
 *     tags:
 *       - Reservations
 *     summary: Get all reservations
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         required: true
 *     responses:
 *       '200':
 *         description: List of reservations
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Reservation'
 */

/**
 * @swagger
 * /reservation/room/{roomId}:
 *   get:
 *     tags:
 *       - Reservations
 *     summary: Get reservations by room ID
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         required: true
 *       - in: path
 *         name: roomId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: List of reservations for the room
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Reservation'
 */

/**
 * @swagger
 * /reservation/status/{status}:
 *   get:
 *     tags:
 *       - Reservations
 *     summary: Get reservations by status
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         required: true
 *       - in: path
 *         name: status
 *         required: true
 *         schema:
 *           type: string
 *           enum:
 *             - PENDING
 *             - CONFIRMED
 *             - CANCELLED
 *             - COMPLETED
 *     responses:
 *       '200':
 *         description: List of reservations filtered by status
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Reservation'
 */

/**
 * @swagger
 * /reservation/date-range:
 *   get:
 *     tags:
 *       - Reservations
 *     summary: Get reservations within a date range
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         required: true
 *       - in: query
 *         name: startDate
 *         required: true
 *         schema:
 *           type: string
 *           format: date-time
 *       - in: query
 *         name: endDate
 *         required: true
 *         schema:
 *           type: string
 *           format: date-time
 *     responses:
 *       '200':
 *         description: List of reservations within the specified date range
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Reservation'
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
