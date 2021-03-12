import { Response, Request } from 'express';
import User, { Jugador } from '../models/User';
import bcrypt from 'bcryptjs';
export const getPlayers = async (req: Request, res: Response) => {
  try {
    const results = await Jugador.getPlayers();
    res.json({
      ok: true,
      results,
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: "Couldn't find any users",
    });
  }
};

export const createPlayer = async (req: Request, res: Response) => {
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
      msg: "Couldn't Create new Post",
    });
  }
};
