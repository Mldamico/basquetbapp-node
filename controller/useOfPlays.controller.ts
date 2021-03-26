import { Response, Request } from 'express';
import { Match } from '../models/Match';

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
    res.json({
      ok: true,
      partido,
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: "Couldn't find any users",
    });
  }
};
