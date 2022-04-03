/* eslint-disable */

import axios from 'axios';
import store from '../store/index';

const annonymousInstance = axios.create({
  baseURL: 'http://localhost:5000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

const fetchBoats = async (searchParams) => {
  const { token } = store.getState().auth;
  if (!searchParams) {
    const { data } = await annonymousInstance.get(`boats`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    return data;
  } else {
    const { data } = await annonymousInstance.get(`boats?${searchParams.toString()}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    return data;
  }
};

const fetchBoat = async (id) => {
  const { token } = store.getState().auth;
  const response = await annonymousInstance.get(`/boats/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
  return response.data;
};

const addBoat = async (boatData) => {
  const { token } = store.getState().auth;

  const response = await annonymousInstance.post(`/boat`, boatData, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  return response.data;
};

const deleteBoat = async (id) => {
  const { token } = store.getState().auth;
  const response = await annonymousInstance.delete(`/boats/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
  return response;
};

const updateBoat = async (id, data) => {
  const { token } = store.getState().auth;
  const response = await annonymousInstance.patch(`/boats/${id}`, {...data, id: id}, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
  return response;
}

const fetchAllBoats = async (searchParams) => {
  const [boats] = await Promise.all([
    fetchBoats(searchParams)
  ]);

  const formatedBoats = boats.map(
    ({ title, props, price, ...rest }) => {
      const boat = {
        ...rest,
        title,
        price: `${price.value} ${price.currency}`,
      };

      return boat;
    }
  );

  return formatedBoats;
};

const fetchFormatedBoats = async (searchParams) => {
  const [boats, types] = await Promise.all([
    fetchBoats(searchParams),
    fetchTypes()
  ]);

  const formatedBoats = boats.map(
    ({ title, props, price, type, ...rest }) => {
      const boat = {
        ...rest,
        title,
        price: `${price.value} ${price.currency}`,
        type: types.find(x => x.id === type).title
      };

      return boat;
    }
  );

  return formatedBoats;
};

const fetchFormatedBoat = async (id) => {
  const [boat, types] = await Promise.all([
    fetchBoat(id),
    fetchTypes()
  ]);

  const formattedBoat = {
    ...boat,
    price: `${boat.price.value} ${boat.price.currency}`,
    type: types.find(x => x.id === boat.type).title
  }

  return formattedBoat;
}

const checkEmail = (email) => new Promise(((success) => {
  const existingEmails = ['admin@gmail.com', 'user1@gmail.com'];
  setTimeout(() => {
    const emailAvailable = !existingEmails.includes(email);
    success(emailAvailable);
  }, 1000);
}));

const register = () => new Promise(((success) => {
  setTimeout(() => {
    success(true);
  }, 2000);
}));

const fetchFilters = async (typeId) => {
  const { token } = store.getState().auth;
  let queryParams = '';
  if (typeId) {
    queryParams = `?type=${typeId}`;
  }

  try {
    const { data } = await annonymousInstance.get(`/filters${queryParams}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

const fetchTypes = async () => {
  const { token } = store.getState().auth;
  try {
    const { data } = await annonymousInstance.get('/types', {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

const APIService = {
  fetchBoats,
  fetchAllBoats,
  fetchBoat,
  addBoat,
  deleteBoat,
  fetchFormatedBoat,
  updateBoat,
  checkEmail,
  register,
  fetchFilters,
  fetchTypes,
  fetchFormatedBoats,
};

export default APIService;
