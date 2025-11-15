FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
ENV NODE_ENV=development
ENV PORT=3006
EXPOSE 3006
CMD ["npm", "run", "dev"]
