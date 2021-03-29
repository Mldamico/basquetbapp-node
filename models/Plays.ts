import connection from '../db/connection';

export class Plays {
  nombre: string;
  urlVideo: string;
  valorDefault: number;
  activa: boolean;
  posicionTirador: string;
  posicionAsistente: string;
  jugadaUtilizada: boolean;
  urlImagen: string;

  constructor(
    nombre: string,
    urlVideo: string,
    urlImagen: string,
    valorDefault: number,
    posicionTirador: string,
    posicionAsistente: string
  ) {
    this.nombre = nombre;
    this.urlVideo = urlVideo;
    this.urlImagen = urlImagen;
    this.valorDefault = valorDefault;
    this.activa = true;
    this.posicionTirador = posicionTirador;
    this.posicionAsistente = posicionAsistente;
    this.jugadaUtilizada = false;
  }

  save() {
    connection.execute(
      'INSERT INTO play (nombre, url_video, url_imagen, valor_default, activa, posicion_tirador, posicion_asistente, jugada_utilizada) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [
        this.nombre,
        this.urlVideo,
        this.urlImagen,
        this.valorDefault,
        this.activa,
        this.posicionTirador,
        this.posicionAsistente,
        this.jugadaUtilizada,
      ]
    );
  }

  static getPlays() {
    return new Promise(function (resolve, reject) {
      connection.execute(
        'SELECT * FROM play ',
        [],
        function (err, results, fields) {
          if (err) {
            return reject(err);
          }

          const playDataString = JSON.stringify(results);
          const playData = JSON.parse(playDataString);

          resolve(playData);
        }
      );
    });
  }

  static findById(id: number): Promise<Plays> {
    return new Promise(function (resolve, reject) {
      connection.execute(
        'SELECT * FROM play WHERE idplay = ?',
        [id],
        function (err, results, fields) {
          if (err) {
            return reject(err);
          }

          const playDataString = JSON.stringify(results);
          const playData = JSON.parse(playDataString);

          resolve(playData);
        }
      );
    });
  }
}
