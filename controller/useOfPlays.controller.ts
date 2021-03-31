import { Response, Request } from 'express';
import { Match } from '../models/Match';
import { Plays } from '../models/Plays';
import { UseOfPlays } from '../models/UseOfPlays';

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
  const usoJugada = new UseOfPlays(
    valor,
    convirtio,
    base,
    escolta,
    alero,
    alaPivot,
    pivot,
    jugadorTirador,
    jugadorAsistente,
    cuarto,
    tiempo,
    idMatch,
    idJugada
  );
  try {
    await usoJugada.save();
    res.json({
      ok: true,
      usoJugada,
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: 'Network Error',
    });
  }
};
