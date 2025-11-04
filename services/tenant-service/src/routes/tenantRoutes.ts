import { Router } from "express";
import {
  getAllTenants,
  getTenantById,
  createTenant,
  updateTenant,
  deleteTenant,
} from "../controllers/tenantController";

const router = Router();

router.get("/", getAllTenants);
router.get("/:id", getTenantById);
router.post("/", createTenant);
router.put("/:id", updateTenant);
router.delete("/:id", deleteTenant);

export default router;
