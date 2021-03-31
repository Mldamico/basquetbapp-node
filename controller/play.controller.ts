import { Response, Request } from 'express';
import { Plays } from '../models/Plays';

export const createPlay = async (req: Request, res: Response) => {
  const {
    nombre,
    urlVideo,
    urlImagen,
    valorDefault,
    posicionTirador,
    posicionAsistente,
  } = req.body;
  const play = new Plays(
    nombre,
    urlVideo,
    urlImagen,
    valorDefault,
    posicionTirador,
    posicionAsistente
  );
  try {
    await play.save();
    res.json({
      ok: true,
      play,
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: 'Network Error',
    });
  }
};

export const getPlayById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const play = await Plays.findById(+id);
    console.log(play);
    res.json({
      ok: true,
      play,
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: 'Network Error',
    });
  }
};

export const getPlays = async (req: Request, res: Response) => {
  try {
    const plays = await Plays.getPlays();
    res.json({
      ok: true,
      plays,
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: 'Network Error',
    });
  }
};

export const searchPlay = async (req: Request, res: Response) => {
  const { nombre } = req.params;
  console.log(nombre);
  try {
    const plays = await Plays.search(nombre);
    console.log(plays);
    if (plays.length === 0) {
      res.status(404).json({
        ok: false,
        msg: 'No plays founds',
      });
    }

    res.json({
      ok: true,
      plays,
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: 'Network Error',
    });
  }
};
