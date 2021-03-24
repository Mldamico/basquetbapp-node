import connection from '../db/connection';

enum TipoJugador {
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
  protected tipo: TipoJugador;
  protected activo: boolean;
  protected urlFoto: string;
  protected fechaNacimiento: Date;
  constructor(
    nombre: string,
    apellido: string,
    dni: string,
    usuario: string,
    password: string,
    fechaNacimiento: Date,
    urlFoto: string
  ) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.dni = dni;
    this.usuario = usuario;
    this.password = password;
    this.fechaNacimiento = fechaNacimiento;
    this.tipo = TipoJugador.JUGADOR;
    this.activo = true;
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
    super(nombre, apellido, dni, usuario, password, fechaNacimiento, urlFoto);
    this.dorsal = dorsal;
    this.puntos = 0;
    this.altura = altura;
  }

  static getPlayers() {
    return new Promise(function (resolve, reject) {
      connection.query(
        'SELECT * FROM players',
        function (err, results, fields) {
          if (err) {
            return reject(err);
          }
          resolve(results);
        }
      );
    });
  }

  save() {
    connection.execute(
      'INSERT INTO players (nombre, apellido, dni, usuario, password, fechaNacimiento, urlFoto, dorsal, altura) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
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
    super(nombre, apellido, dni, usuario, password, fechaNacimiento, urlFoto);
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
    super(nombre, apellido, dni, usuario, password, fechaNacimiento, urlFoto);
    this.matricula = matricula;
  }
}

export default User;
