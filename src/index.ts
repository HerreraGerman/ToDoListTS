"use strict";
import { warningText } from './text/warning.ts';
import { mainMenu, viewMenu } from './text/menus.ts';
import { taskMake } from './menus/taskMake.ts';
import type { ITask } from './task/taskPrototype.ts';
import { searchTask } from './menus/search.ts';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

const prompt = require('prompt-sync')();

// <>
function main() {
    let menu: number = 0;
    let loop: boolean = true;
    let selectedTask: ITask | null = null;
    const taskList: ITask[] = [];

    // Pregunta nombre de usuario
    console.clear();
    console.log("¿Cual es tu nombre?\n")
    let username: string = prompt() || '';
    username.slice(0, 30);
    console.clear();

    // Muestra menu - Loop principal
    do {
        console.log(`¡Hola, ${username}!\n`);
        mainMenu();
        menu = Number(prompt());
        switch (menu) {
            case 0:
                // Termina programa
                loop = false;
                console.clear();
                console.log("Terminando programa - See you next time!")
                break;
            case 1:
                // Ver tareas
                console.clear();
                selectedTask = viewMenu(taskList);
                if (selectedTask) {
                    taskMake(selectedTask);
                    selectedTask = null;
                }
                break;
            case 2:
                // Buscar tarea
                console.clear();
                if (taskList.length === 0) {
                    console.log("Tu lista de tareas se encuentra vacia!");
                } else {
                    console.log("Ingrese el titulo de la tarea a buscar:");
                    const busqueda = prompt() || '';
                    selectedTask = searchTask(taskList, busqueda)
                    if (selectedTask) {
                        taskMake(selectedTask);
                        selectedTask = null;
                    }
                }
                break;
            case 3:
                // Agregar tarea
                console.clear();
                selectedTask = taskMake(null);
                if (selectedTask) {
                    taskList.push(selectedTask);
                    selectedTask = null;
                } else {
                    console.log("Se ha cancelado la tarea");
                }
                break;
            default:
                console.clear();
                warningText(menu);
                break;
        }
        menu = 0;
    } while (loop);
}

main();