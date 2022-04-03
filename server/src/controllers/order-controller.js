import database from '../database/index.js';
import { v4 as createId } from "uuid";

export const createOrder = (req, res) => {
  const order = { ...req.body, id: createId() };
  database.data.orders.push(order);
  res.status(200).json(order);

  database.write();
}
