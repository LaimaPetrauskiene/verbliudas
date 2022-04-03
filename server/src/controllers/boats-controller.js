import database from "../database/index.js";
import { v4 as createId } from "uuid";

const filterByRange = (boats, filter, queryParams) => {
  const min = Number(queryParams[`${filter.name}_min`]);
  const max = Number(queryParams[`${filter.name}_max`]);
  if (min) {
    boats = boats.filter(x => x[filter.property].value >= min);
  }
  if (max) {
    boats = boats.filter(x => x[filter.property].value <= max);
  }
  return boats;
};

const filterFunctionMap = {
  range: filterByRange,
}

export const getBoats = (req, res) => {
  const boats = database.data.boats;
  const filters = database.data.filters;
  const types = database.data.types;
  
  if(Object.keys(req.query).length === 0){
    res.status(200).json(boats);
    return;
  }

  const {
    type: typeId,
    ...queryParams
  } = req.query;

  let selectedBoats = boats
  .filter(x => x.type === typeId)
  .map(({ ...boat }) => boat);

  const type = types.find(x => x.id === typeId);
  const typeFilters = type.filters.map(filterId => filters.find(x => x.id === filterId));

  typeFilters.forEach(filter => {
    selectedBoats = filterFunctionMap[filter.type](selectedBoats, filter, queryParams);
    if (filter.collection) {
      selectedBoats = mapWithFilterCollection(selectedBoats, filter, database.data);
    }
  });

  res.status(200).json(selectedBoats);
};

export const getBoat = (req, res) => {
  const boat = database.data.boat.find((boat) => boat.id === req.params.id);
  res.status(200).json(boat);
};

export const addBoat = (req, res) => {
  const boat = { ...req.body, id: createId() };
  database.data.boats.push(boat);
  database.write();
  res.status(200).json(boat);
};

export const updateBoat = (req, res) => {
  const { title, place, type, img, price } = req.body;

  const foundBoat = database.data.boats.find((x) => x.id === req.body.id);

  if (title && title !== foundBoat.title) foundBoat.title = title;
  if (place && place !== foundBoat.place) foundBoat.place = place;
  if (type && type !== foundBoat.type) foundBoat.type = type;
  if (img && img !== foundBoat.img) foundBoat.img = img;
  if (price.value && price.value !== foundBoat.price.value)
    foundBoat.price.value = price.value;
  if (price.currency && price.currency !== foundBoat.price.currency)
    foundBoat.price.currency = price.currency;

  database.write();

  res.status(200).json(foundBoat);
};

export const deleteBoat = (req, res) => {
  database.data.boats = database.data.boats.filter(
    (x) => x.id !== req.params.id
  );

  database.write();

  res.status(200).json(true);
};
