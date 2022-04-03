import database from '../database/index.js';

export const getFilters = (req, res) => {
  let filters = database.data.filters;
  const type = database.data.types.find(x => x.id === req.query.type);
  if (type && type.filters) {
    filters = filters.filter(x => type.filters.includes(x.id));
  }

  filters = filters.map((filter) => {
        let boat = database.data.boat;
        if (type && type.id) boat = boat.filter(x => x.type === type.id);
        filter.min = 0;
        filter.max = 0;
        if (boat.length > 0) {
          const sortedBoats = boat.sort((a, b) => a.price.value - b.price.value);
          filter.min = sortedBoats[0].price.value;
          filter.max = sortedBoats[sortedBoats.length - 1].price.value;
        }

    return filter;
  });
  res.status(200).json(filters);
}

