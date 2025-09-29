import { estados, dificultades } from '../task/maps.ts';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

const prompt = require('prompt-sync')();

export function taskDetail(task: any) {
    let editar = '0';
    if(task) {
        const taskEstado = estados.get(task.status);
        const taskDificultad = dificultades.get(task.dificultad);
        console.log("Esta es la tarea que elegiste\n");
        console.log(task.titulo);
        console.log(task.descripcion);
        console.log("Estado: " + task.status);
        console.log("Dificultad: " + taskDificultad);
        console.log("Vencimiento: " + task.vencimiento);
        console.log("Fecha de Creacion: " + task.fechaCreacion);

        console.log("\nSi deseas editarla, presiona E.");
        console.log("Presiona cualquier otra tecla para continuar.");
        editar = prompt();
        if (toLowerCase(editar) == 'e') {
            taskMake(task);
        }
    }
}