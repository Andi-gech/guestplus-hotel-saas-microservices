import { Router } from "express";
import tenantRoutes from "./tenantRoutes";
import subscriptionPlanRoutes from "./subscriptionPlanRoutes";
import tenantUserRoutes from "./tenantUserRoutes";
const router = Router();

router.use("/tenants", tenantRoutes);
router.use("/subscription-plans", subscriptionPlanRoutes);
router.use("/tenant-users", tenantUserRoutes);

export default router;
