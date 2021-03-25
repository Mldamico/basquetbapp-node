import { Jugador } from './User';
import connection from '../db/connection';

export class Match {
  fechaPartido: Date;
  rival: String;
  tanteadorEquipo: number;
  tanteadorRival: number;
  jugadoresCitados: number[];
  constructor(fecha: Date, rival: String, jugadores: number[]) {
    this.fechaPartido = fecha;
    this.rival = rival;
    this.jugadoresCitados = jugadores;
    this.tanteadorEquipo = 0;
    this.tanteadorRival = 0;
  }

  createMatch() {
    const jugadoresCitados = this.jugadoresCitados;
    // INSERT INTO matchs (fecha_partido, rival, tanteador_equipo, tanteador_rival) VALUES (?, ?, ?, ?)
    connection.execute(
      'INSERT INTO matchs (fecha_partido ,rival, tanteador_equipo, tanteador_rival) VALUES (?, ?, ?, ?)',
      [
        this.fechaPartido,
        this.rival,
        this.tanteadorEquipo,
        this.tanteadorRival,
      ],
      function (err, results, fields) {
        if (err) {
          console.log(err);
        }

        const userDataString = JSON.stringify(results);
        const userData = JSON.parse(userDataString);
        console.log(userData['insertId']);
        for (let jugadorId of jugadoresCitados) {
          connection.execute(
            'INSERT INTO matchs_players (match_id, player_id) VALUES (?, ?)',
            [userData['insertId'], jugadorId],
            function (error, res, field) {
              if (error) {
                console.log(error);
              }
              console.log(res);
            }
          );
        }
      }
    );
  }
}
