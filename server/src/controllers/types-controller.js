import database from '../database/index.js';

export const getTypes = (req, res) => {
  const types = database.data.types;
  res.status(200).json(types);
}
