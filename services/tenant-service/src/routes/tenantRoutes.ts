import { Router } from "express";
import {
  getAllTenants,
  getTenantById,
  createTenant,
  updateTenant,
} from "../controllers/tenantController";

const router = Router();

router.get("/", getAllTenants);
router.get("/:id", getTenantById);
router.post("/", createTenant);
router.put("/:id", updateTenant);

export default router;
