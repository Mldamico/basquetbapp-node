import connection from '../db/connection';

export class UseOfPlays {
  valorPunto: number;
  convirtio: boolean;
  base: number;
  escolta: number;
  alero: number;
  alaPivot: number;
  pivot: number;
  jugadorAsistente: number;
  jugadorAnotador: number;
  cuarto: number;
  tiempoDelPartido: string;
  partido: number;
  jugada: number;
  constructor(
    valor: number,
    convirtio: boolean,
    base: number,
    escolta: number,
    alero: number,
    alaPivot: number,
    pivot: number,
    jugadorAnotador: number,
    jugadorAsistente: number,
    cuarto: number,
    tiempoDelPartido: string,
    partido: number,
    jugada: number
  ) {
    this.valorPunto = valor;
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

  save() {
    connection.execute(
      'INSERT INTO useOfPlays (valor_punto, convirtio, base, escolta, alero, ala_pivot, pivot, jugador_asistente, jugador_tirador, cuarto, tiempo_partido, partido, jugada) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [
        this.valorPunto,
        this.convirtio,
        this.base,
        this.escolta,
        this.alero,
        this.alaPivot,
        this.pivot,
        this.jugadorAsistente,
        this.jugadorAnotador,
        this.cuarto,
        this.tiempoDelPartido,
        this.partido,
        this.jugada,
      ]
    );
  }
}
