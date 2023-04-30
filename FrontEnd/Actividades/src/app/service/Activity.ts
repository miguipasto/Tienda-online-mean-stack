import { Buffer } from 'buffer';
export class Activity {
    titulo!: string;
    participantes!: string;
    localizacion!: string;
    precio!: string;
    duracion!: string;
    descripcion!: string;
    edad!: string;
    dificultad!: string;
    categoria!: string;
    imagen!: {
      data: Buffer,
      contentType: string,
      originalName: string
    };
    _id!:string;
    cantidad!: string; 
  }