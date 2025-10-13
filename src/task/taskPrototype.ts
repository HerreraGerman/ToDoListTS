"use strict";
import { format } from 'date-fns';
import { estados, dificultades } from './maps.ts';

// Interfaz para definir la estructura de una instancia de Tarea
export interface ITask {
    titulo: string;
    descripcion: string;
    status: number;
    dificultad: number;
    vencimiento: string;
    fechaCreacion: string;
    ultimaEdicion: string;

    // Metodos que estaran en el prototipo
    getStatusString(): string | undefined;
    getDifficultyString(): string | undefined;
    updateLastEditDate(): void;
    displayDetails(): void;
}

// Constructor de la tarea
export const Task = function(this: ITask) {
    this.titulo = "sin nombre";
    this.descripcion = "sin descripcion";
    this.status = 1;
    this.dificultad = 1;
    this.vencimiento = "";
    this.fechaCreacion = format(new Date(), 'yyyy/MM/dd - hh:mm a') + ' Hora Estandar Argentina';
    this.ultimaEdicion = this.fechaCreacion;
} as any as { new (): ITask };

// Prototipo con los metodos compartidos
Task.prototype.getStatusString = function(this: ITask): string | undefined {
    return estados.get(this.status);
}

Task.prototype.getDifficultyString = function(this: ITask): string | undefined {
    return dificultades.get(this.dificultad);
}

Task.prototype.updateLastEditDate = function(this: ITask): void {
    this.ultimaEdicion = format(new Date(), 'yyyy/MM/dd - hh:mm a') + ' Hora Estandar Argentina';
}

Task.prototype.displayDetails = function(this: ITask): void {
    console.log("Esta es la tarea que elegiste\n");
    console.log(`Titulo: ${this.titulo}`);
    console.log(`Descripcion: ${this.descripcion}`);
    console.log(`Estado: ${this.getStatusString()}`);
    console.log(`Dificultad: ${this.getDifficultyString()}`);
    console.log(`Vencimiento: ${this.vencimiento || 'No establecido'}`);
    console.log(`fecha de Creacion: ${this.fechaCreacion}`);
    console.log(`Ultima Edicion: ${this.ultimaEdicion}`);
}