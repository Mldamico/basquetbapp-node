import connection from '../db/connection';

export enum TipoJugador {
  JUGADOR = 'jugador',
  ENTRENADOR = 'entrenador',
  ASISTENTE = 'asistente',
}

class User {
  protected dni: string;
  protected nombre: string;
  protected apellido: string;
  usuario: string;
  password: string;
  tipo: TipoJugador;
  protected urlFoto: string;
  protected fechaNacimiento: Date;
  constructor(
    nombre: string,
    apellido: string,
    dni: string,
    usuario: string,
    password: string,
    fechaNacimiento: Date,
    urlFoto: string,
    tipo: TipoJugador
  ) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.dni = dni;
    this.usuario = usuario;
    this.password = password;
    this.fechaNacimiento = fechaNacimiento;
    this.tipo = tipo;
    this.urlFoto = urlFoto;
  }

  static getUser(usuario: string): Promise<User[] | null> {
    return new Promise(function (resolve, reject) {
      connection.execute(
        'SELECT * FROM players WHERE usuario = ?',
        [usuario],
        function (err, results, fields) {
          if (err) {
            return reject(err);
          }
          const userDataString = JSON.stringify(results);
          const userData = JSON.parse(userDataString);
          if (results.toString()) {
            resolve(userData);
          } else {
            resolve(null);
          }
        }
      );
    });
  }

  static getUserById(id: number): Promise<User[] | null> {
    return new Promise(function (resolve, reject) {
      connection.execute(
        'SELECT * FROM players WHERE idplayer = ?',
        [id],
        function (err, results, fields) {
          if (err) {
            return reject(err);
          }
          const userDataString = JSON.stringify(results);
          const userData = JSON.parse(userDataString);
          if (results.toString()) {
            resolve(userData);
          } else {
            resolve(null);
          }
        }
      );
    });
  }

  static login(usuario: string, password: string) {
    return new Promise(function (resolve, reject) {
      connection.execute(
        'SELECT * FROM players WHERE usuario = ? AND password = ?',
        [usuario, password],
        function (err, results, fields) {
          if (err) {
            return reject(err);
          }
          resolve(results);
        }
      );
    });
  }
}

export class Jugador extends User {
  private dorsal: number;
  private puntos: number;
  private altura: number;
  protected activo: boolean;
  constructor(
    nombre: string,
    apellido: string,
    dni: string,
    usuario: string,
    password: string,
    fechaNacimiento: Date,
    urlFoto: string,
    dorsal: number,
    altura: number
  ) {
    super(
      nombre,
      apellido,
      dni,
      usuario,
      password,
      fechaNacimiento,
      urlFoto,
      TipoJugador.JUGADOR
    );
    this.dorsal = dorsal;
    this.puntos = 0;
    this.altura = altura;
    this.activo = false;
  }

  static getPlayers() {
    return new Promise(function (resolve, reject) {
      connection.query('SELECT * FROM player', function (err, results, fields) {
        if (err) {
          return reject(err);
        }
        const userDataString = JSON.stringify(results);
        const userData = JSON.parse(userDataString);

        resolve(userData);
      });
    });
  }

  save() {
    connection.execute(
      'INSERT INTO players (nombre, apellido, dni, usuario, password, fechaNacimiento, urlFoto, dorsal, altura, activo, tipo) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?,?, ?)',
      [
        this.nombre,
        this.apellido,
        this.dni,
        this.usuario,
        this.password,
        this.fechaNacimiento,
        this.urlFoto,
        this.dorsal,
        this.altura,
        this.activo,
        this.tipo,
      ]
    );
  }
}

export class Asistente extends User {
  constructor(
    nombre: string,
    apellido: string,
    dni: string,
    usuario: string,
    password: string,
    fechaNacimiento: Date,
    urlFoto: string
  ) {
    super(
      nombre,
      apellido,
      dni,
      usuario,
      password,
      fechaNacimiento,
      urlFoto,
      TipoJugador.ASISTENTE
    );
  }

  save() {
    connection.execute(
      'INSERT INTO players (nombre, apellido, dni, usuario, password, fechaNacimiento, urlFoto, tipo) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [
        this.nombre,
        this.apellido,
        this.dni,
        this.usuario,
        this.password,
        this.fechaNacimiento,
        this.urlFoto,
        this.tipo,
      ]
    );
  }

  static activatePlayer(usuarioId: number) {
    return new Promise(function (resolve, reject) {
      connection.execute(
        'UPDATE players SET activo = 0 WHERE idplayer = ?',
        [usuarioId],
        function (err, results, fields) {
          if (err) {
            return reject(err);
          }

          const userDataString = JSON.stringify(results);
          const userData = JSON.parse(userDataString);

          resolve(userData);
        }
      );
    });
  }
  static deactivatePlayer(usuarioId: number) {
    return new Promise(function (resolve, reject) {
      connection.execute(
        'UPDATE players SET activo = 1 WHERE idplayer = ?',
        [usuarioId],
        function (err, results, fields) {
          if (err) {
            return reject(err);
          }

          const userDataString = JSON.stringify(results);
          const userData = JSON.parse(userDataString);

          resolve(userData);
        }
      );
    });
  }
}

export class Entrenador extends User {
  private matricula: string;

  constructor(
    nombre: string,
    apellido: string,
    dni: string,
    usuario: string,
    password: string,
    fechaNacimiento: Date,
    urlFoto: string,
    matricula: string
  ) {
    super(
      nombre,
      apellido,
      dni,
      usuario,
      password,
      fechaNacimiento,
      urlFoto,
      TipoJugador.ENTRENADOR
    );
    this.matricula = matricula;
  }

  save() {
    connection.execute(
      'INSERT INTO players (nombre, apellido, dni, usuario, password, fechaNacimiento, urlFoto, tipo, matricula) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [
        this.nombre,
        this.apellido,
        this.dni,
        this.usuario,
        this.password,
        this.fechaNacimiento,
        this.urlFoto,
        this.tipo,
        this.matricula,
      ]
    );
  }
}

export default User;
