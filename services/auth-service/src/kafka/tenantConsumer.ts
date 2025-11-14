import { createConsumer } from "../utils/kafkaClient";
import { createUserService } from "../services/userService";
import { createCodeService } from "../services/CodeService";

const runTenantConsumer = async () => {
  const consumer = await createConsumer("user-service-group");
  await consumer.subscribe({ topic: "tenant.created", fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ message }) => {
      if (!message.value) return;
      const data = JSON.parse(message.value.toString());

      try {
        const adminUser = await createUserService({
          email: data.adminEmail,
          password: data.adminPassword,
          tenantId: data.tenantId,
          role: "admin",
        });

        await createCodeService(String(adminUser.user.id));

        console.log("Admin user created for tenant", data.tenantId);
      } catch (err) {
        console.error("Failed to create admin for tenant", data.tenantId, err);
      }
    },
  });
};

runTenantConsumer();
