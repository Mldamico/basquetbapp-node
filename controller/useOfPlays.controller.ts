import { Response, Request } from 'express';
import { Match } from '../models/Match';
import { Plays } from '../models/Plays';

export const registerPlay = async (req: Request, res: Response) => {
  const {
    valor,
    jugadorAsistente,
    jugadorTirador,
    base,
    escolta,
    alero,
    alaPivot,
    pivot,
    idJugada,
    tiempo,
    cuarto,
    idMatch,
    convirtio,
  } = req.body;
  try {
    const partido = await Match.findById(idMatch);
    const play = await Plays.findById(idJugada);
    res.json({
      ok: true,
      partido,
      play,
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: "Couldn't find any users",
    });
  }
};
