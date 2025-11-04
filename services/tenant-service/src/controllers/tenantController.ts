import { Request, Response } from "express";
import {
  getAllTenantsService,
  getTenantByIdService,
  createTenantService,
  updateTenantService,
} from "../services/tenantService";

export const getAllTenants = async (req: Request, res: Response) => {
  try {
    const tenants = await getAllTenantsService();
    res.json(tenants);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch tenants" });
  }
};

export const getTenantById = async (req: Request, res: Response) => {
  try {
    const tenant = await getTenantByIdService(String(req.params.id));
    res.json(tenant);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch tenant" });
  }
};

export const createTenant = async (req: Request, res: Response) => {
  try {
    const newTenant = await createTenantService(req.body);
    res.status(201).json(newTenant);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create tenant" });
  }
};

export const updateTenant = async (req: Request, res: Response) => {
  try {
    const updatedTenant = await updateTenantService(
      String(req.params.id),
      req.body
    );
    res.json(updatedTenant);
  } catch (err) {
    res.status(500).json({ error: "Failed to update tenant" });
  }
};
