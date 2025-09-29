"use strict";
import { warningText } from './text/warning.ts';
import { mainMenu, viewMenu } from './text/menus.ts';
import { taskMake } from './menus/taskMake.ts';
import { searchTask } from './menus/search.ts';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

const prompt = require('prompt-sync')();

function main() {
    let menu: number = 0;
    let loop: boolean = true;
    let newTask: any = null;
    const taskList: string[] = [];

    // Pregunta nombre de usuario
    console.clear();
    console.log("¿Cual es tu nombre?\n")
    let username: string = prompt();
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
                newTask = viewMenu(taskList);
                if (newTask) {
                    taskMake(newTask);
                    newTask = null;
                }
                break;
            case 2:
                // Buscar tarea
                console.clear();
                if (taskList.length == 0) {
                    console.log("Tu lista de tareas se encuentra vacia!");
                }
                else {
                    console.log("Ingrese el titulo de la tarea a buscar:");
                    newTask = searchTask(taskList, prompt())
                    if (newTask) {
                        taskMake(newTask);
                        newTask = null;
                    }
                }
                break;
            case 3:
                // Agregar tarea
                console.clear();
                newTask = taskMake(false);
                if (newTask) {
                    taskList.push(newTask);
                    newTask = null;
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