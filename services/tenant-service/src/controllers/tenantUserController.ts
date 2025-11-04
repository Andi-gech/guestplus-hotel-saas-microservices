import { Request, Response } from "express";
import {
  getAllTenantUsersService,
  getTenantUserByIdService,
  createTenantUserService,
  updateTenantUserService,
} from "../services/tenantUserService";

export const getAllTenantUsers = async (req: Request, res: Response) => {
  try {
    const users = await getAllTenantUsersService();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch tenant users" });
  }
};
export const getTenantUserById = async (req: Request, res: Response) => {
  try {
    const user = await getTenantUserByIdService(Number(req.params.id));
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch tenant user" });
  }
};
export const createTenantUser = async (req: Request, res: Response) => {
  try {
    const newUser = await createTenantUserService(req.body);
    res.status(201).json(newUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create tenant user" });
  }
};

export const updateTenantUser = async (req: Request, res: Response) => {
  try {
    const updatedUser = await updateTenantUserService(
      Number(req.params.id),
      req.body
    );
    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ error: "Failed to update tenant user" });
  }
};
