import { Response, Request, NextFunction } from 'express';
import User, { Asistente, Jugador } from '../models/User';
import { TipoJugador } from '../models/User';
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
      msg: 'Network Error',
    });
  }
};

export const activatePlayer = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { usuarioId } = req.body;

  try {
    const result = await User.getUserById(usuarioId);
    if (!result) {
      res.status(404).json({
        ok: false,
        msg: 'No se pudo encontrar un usuario con ese ID.',
      });
    }
    if (result![0].tipo !== TipoJugador.ASISTENTE) {
      res.status(404).json({
        ok: false,
        msg: 'Debe ser un asistente para activar al usuario.',
      });
    }
    const results = await Asistente.activatePlayer(+id);
    res.json({
      ok: true,
      results,
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: 'Network Error',
    });
  }
};

export const deactivatePlayer = async (req: Request, res: Response) => {
  const { id } = req.params;

  const { usuarioId } = req.body;
  try {
    const result = await User.getUserById(usuarioId);
    if (!result) {
      res.status(404).json({
        ok: false,
        msg: 'No se pudo encontrar un usuario con ese ID.',
      });
    }
    if (result![0].tipo !== TipoJugador.ASISTENTE) {
      res.status(404).json({
        ok: false,
        msg: 'Debe ser un asistente para desactivar el usuario.',
      });
    }
    const results = await Asistente.deactivatePlayer(+id);
    res.json({
      ok: true,
      results,
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: 'Network Error',
    });
  }
};
