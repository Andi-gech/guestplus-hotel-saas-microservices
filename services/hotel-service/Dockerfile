FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
ENV NODE_ENV=development
ENV PORT=3001
EXPOSE 3001
CMD ["npm", "run", "dev"]
