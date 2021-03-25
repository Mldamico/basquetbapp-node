import { Response, Request } from 'express';
import { Match } from '../models/Match';

export const beginMatch = async (req: Request, res: Response) => {
  const { fechaPartido, rival, jugadoresCitados } = req.body;
  const match = new Match(fechaPartido, rival, jugadoresCitados);
  try {
    await match.createMatch();
    res.json({
      ok: true,
      msg: match,
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: 'Network error',
    });
  }
};
