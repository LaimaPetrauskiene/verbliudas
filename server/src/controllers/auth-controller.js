import database from '../database/index.js';
import { v4 as createId } from 'uuid';
import { createToken } from '../helpers/token-helpers.js';

export const login = (req, res) => {
  const { email, password } = req.body;
  const { users } = database.data;

  const foundUser = users.find(x => x.email === email);

  if (!foundUser) {
    // Nerastas Vartotojas
    res.status(404).json({
      message: 'Vartotojas su tokiu paštu nerastas'
    });
    return;
  }

  if (foundUser.password === password) {
    const { password, ...user } = foundUser;
    // Viskas gerai
    res.status(200).json({
      user,
      token: createToken({ email, role: foundUser.role }),
    });
    return;
  }

  // Neteisingas slaptažodis
  res.status(400).json({
    message: 'Neteisingas slaptažodis'
  });
};

export const register = (req, res) => {
  const { email, name, surname, password, repeatPassword } = req.body;
  if (password !== repeatPassword) {
    res.status(400).json({
      message: 'Slaptažodžiai nesutampa'
    });
    return;
  }

  const userExists = database.data.users.find(x => x.email === email);

  if (userExists) {
    res.status(400).json({
      message: 'Vartotojas su tokiu paštu jau egzistuoja'
    });
    return;
  }

  const user = {
    id: createId(),
    email,
    name,
    surname,
    password,
    role: 'USER'
  };

  database.data.users.push(user);
  database.write();

  res.status(200).json({
    user,
    token: createToken({ email, role: user.role }),
  });
}

export const checkEmail = (req, res) => {
  const { email } = req.query;
  const emailIsTaken = Boolean(database.data.users.find(x => x.email === email));
  if (emailIsTaken) {
    res.status(200).json({
      available: false, 
      message: 'Vartotojas su tokiu paštu jau egzistuoja'
    });
  } else {
    res.status(200).json({
      available: true,
      message: 'Vartotojas galimas'
    });
  }
}