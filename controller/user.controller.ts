import { Response, Request } from 'express';
import User, { Jugador } from '../models/User';

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
