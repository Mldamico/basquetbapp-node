enum TipoJugador {
  JUGADOR = 'jugador',
  ENTRENADOR = 'entrenador',
  ASISTENTE = 'asistente',
}

class User {
  private dni: string;
  private nombre: string;
  private apellido: string;
  private usuario: string;
  private password: string;
  private tipo: TipoJugador;
  private activo: boolean;
  private urlFoto: string;
  private fechaNacimiento: Date;
  constructor(
    nombre: string,
    apellido: string,
    dni: string,
    usuario: string,
    password: string,
    fechaNacimiento: Date,
    tipo: TipoJugador,
    urlFoto: string
  ) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.dni = dni;
    this.usuario = usuario;
    this.password = password;
    this.fechaNacimiento = fechaNacimiento;
    this.tipo = tipo;
    this.activo = true;
    this.urlFoto = urlFoto;
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
    puntos: number,
    altura: number
  ) {
    super(
      nombre,
      apellido,
      dni,
      usuario,
      password,
      fechaNacimiento,
      TipoJugador.JUGADOR,
      urlFoto
    );
    this.dorsal = dorsal;
    this.puntos = puntos;
    this.altura = altura;
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
      TipoJugador.ASISTENTE,
      urlFoto
    );
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
      TipoJugador.ENTRENADOR,
      urlFoto
    );
    this.matricula = matricula;
  }
}

export default User;
