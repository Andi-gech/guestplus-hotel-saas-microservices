import { Router } from "express";
import tenantRoutes from "./tenantRoutes";
import subscriptionPlanRoutes from "./subscriptionPlanRoutes";

const router = Router();

router.use("/tenants", tenantRoutes);
router.use("/subscription-plans", subscriptionPlanRoutes);

export default router;
