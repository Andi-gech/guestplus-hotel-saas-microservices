import { Kafka, logLevel } from "kafkajs";

const brokers = (process.env.KAFKA_BROKERS || "kafka:9092").split(",");
const clientId = process.env.KAFKA_CLIENT_ID || "tenant-service";

export const kafka = new Kafka({
  clientId,
  brokers,
  logLevel: logLevel.INFO,
});

export const createProducer = async () => {
  const producer = kafka.producer();
  await producer.connect();
  return producer;
};

export const createConsumer = async (groupId: string) => {
  const consumer = kafka.consumer({ groupId });
  await consumer.connect();
  return consumer;
};
