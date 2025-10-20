"use strict";
import type { ITask } from '../task/taskPrototype.ts';
import { taskMake } from '../menus/taskMake.ts';
import promptSync from 'prompt-sync';

const prompt = promptSync();

export function taskDetail(task: ITask | null) {
    let editar = '0';
    if(task) {

        // Metodo prototipo para mostrar los detalles
        task.displayDetails();

        console.log("\nSi deseas editarla, presiona E.");
        console.log("Presiona cualquier otra tecla para continuar.");
        editar = prompt(">");
        if (editar.toLowerCase() == 'e') {
            // Pasa el objeto tarea para ser editado
            taskMake(task);
        }
    }
}