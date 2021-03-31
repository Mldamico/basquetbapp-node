import { Response, Request } from 'express';
import User, { Asistente, Entrenador, Jugador } from '../models/User';
import bcrypt from 'bcryptjs';

export const login = async (req: Request, res: Response) => {
  const { usuario, password } = req.body;

  try {
    const result = await User.getUser(usuario);
    console.log(result);
    if (!result) {
      res.status(401).json({
        ok: false,
        msg: "Couldn't find any users with those credentials.",
      });
    }

    const checkPassword = bcrypt.compareSync(password, result![0].password);

    if (checkPassword) {
      res.json({
        ok: true,
        result,
      });
    } else {
      res.status(401).json({
        ok: false,
        msg: "Couldn't find any users with those credentials.",
      });
    }
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: 'Network Error',
    });
  }
};

export const register = async (req: Request, res: Response) => {
  const {
    nombre,
    apellido,
    usuario,
    password,
    dni,
    fechaNacimiento,
    urlFoto,
    dorsal,
    altura,
  } = req.body;
  const salt = bcrypt.genSaltSync(10);
  const hashPassword = bcrypt.hashSync(password, salt);
  console.log(hashPassword);
  const player = new Jugador(
    nombre,
    apellido,
    dni,
    usuario,
    hashPassword,
    fechaNacimiento,
    urlFoto,
    dorsal,
    altura
  );

  try {
    await player.save();
    res.json({
      ok: true,
      player,
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: 'Network Error',
    });
  }
};

export const createAssist = async (req: Request, res: Response) => {
  const {
    nombre,
    apellido,
    usuario,
    password,
    dni,
    fechaNacimiento,
    urlFoto,
  } = req.body;
  const salt = bcrypt.genSaltSync(10);
  const hashPassword = bcrypt.hashSync(password, salt);
  const assist = new Asistente(
    nombre,
    apellido,
    dni,
    usuario,
    hashPassword,
    fechaNacimiento,
    urlFoto
  );

  try {
    await assist.save();
    res.json({
      ok: true,
      assist,
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: 'Network error',
    });
  }
};

export const createTrainer = async (req: Request, res: Response) => {
  const {
    nombre,
    apellido,
    usuario,
    password,
    dni,
    fechaNacimiento,
    urlFoto,
    matricula,
  } = req.body;
  const salt = bcrypt.genSaltSync(10);
  const hashPassword = bcrypt.hashSync(password, salt);
  const trainer = new Entrenador(
    nombre,
    apellido,
    dni,
    usuario,
    hashPassword,
    fechaNacimiento,
    urlFoto,
    matricula
  );

  try {
    await trainer.save();
    res.json({
      ok: true,
      trainer,
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: 'Network Error',
    });
  }
};
