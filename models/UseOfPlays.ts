import { Match } from './Match';
import { Plays } from './Plays';
import { Jugador } from './User';

export class UseOfPlays {
  valorPunto: number;
  puntosDeLaJugada: number;
  convirtio: boolean;
  base: Jugador;
  escolta: Jugador;
  alero: Jugador;
  alaPivot: Jugador;
  pivot: Jugador;
  jugadorAsistente: Jugador;
  jugadorAnotador: Jugador;
  cuarto: number;
  tiempoDelPartido: string;
  partido: Match;
  jugada: Plays;
  constructor(
    valor: number,
    puntosDeLaJugada: number,
    convirtio: boolean,
    base: Jugador,
    escolta: Jugador,
    alero: Jugador,
    alaPivot: Jugador,
    pivot: Jugador,
    jugadorAnotador: Jugador,
    jugadorAsistente: Jugador,
    cuarto: number,
    tiempoDelPartido: string,
    partido: Match,
    jugada: Plays
  ) {
    this.valorPunto = valor;
    this.puntosDeLaJugada = puntosDeLaJugada;
    this.convirtio = convirtio;
    this.base = base;
    this.escolta = escolta;
    this.alero = alero;
    this.alaPivot = alaPivot;
    this.pivot = pivot;
    this.jugadorAnotador = jugadorAnotador;
    this.jugadorAsistente = jugadorAsistente;
    this.cuarto = cuarto;
    this.tiempoDelPartido = tiempoDelPartido;
    this.partido = partido;
    this.jugada = jugada;
  }
}
