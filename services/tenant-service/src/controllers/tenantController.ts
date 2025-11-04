import { Request, Response } from "express";
import {
  getAllTenantsService,
  getTenantByIdService,
  createTenantService,
  updateTenantService,
  deleteTenantService,
} from "../services/tenantService";
import {
  sendSuccess,
  sendCreated,
  sendNotFound,
  sendServerError,
} from "../utils/responseHandler";

export const getAllTenants = async (req: Request, res: Response) => {
  try {
    const tenants = await getAllTenantsService();
    sendSuccess(res, tenants, "All tenants fetched");
  } catch (err) {
    sendServerError(res, "Failed to fetch tenants");
  }
};

export const getTenantById = async (req: Request, res: Response) => {
  try {
    const tenant = await getTenantByIdService(String(req.params.id));
    sendSuccess(res, tenant, "Tenant fetched");
  } catch (err: any) {
    if (err.message === "404") return sendNotFound(res, "Tenant not found");
    sendServerError(res, "Failed to fetch tenant");
  }
};

export const createTenant = async (req: Request, res: Response) => {
  try {
    const newTenant = await createTenantService(req.body);
    sendCreated(res, newTenant, "Tenant created");
  } catch (err: any) {
    if (err?.message === "404")
      return sendNotFound(res, "Subscription plan not found");
    sendServerError(res, "Failed to create tenant");
  }
};

export const updateTenant = async (req: Request, res: Response) => {
  try {
    const updatedTenant = await updateTenantService(
      String(req.params.id),
      req.body
    );
    sendSuccess(res, updatedTenant, "Tenant updated");
  } catch (err: any) {
    if (err.message === "404") return sendNotFound(res, "Tenant not found");
    sendServerError(res, "Failed to update tenant");
  }
};
export const deleteTenant = async (req: Request, res: Response) => {
  try {
    await deleteTenantService(String(req.params.id));
    sendSuccess(res, null, "Tenant deleted");
  } catch (err: any) {
    if (err.message === "404") return sendNotFound(res, "Tenant not found");
    sendServerError(res, "Failed to delete tenant");
  }
};
