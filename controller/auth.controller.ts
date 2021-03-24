import { Response, Request } from 'express';
import User, { Jugador } from '../models/User';
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

    const pass = bcrypt.compareSync(password, result![0].password);

    res.json({
      ok: true,
      result,
    });
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
      msg: "Couldn't Create new Post",
    });
  }
};
//2a$10$4/vgHGRxi2GIDWqGLVgR9./4jwrSLmTWlXPvaXGbHTvIqbuveO4OO
