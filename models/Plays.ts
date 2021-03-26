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
}
