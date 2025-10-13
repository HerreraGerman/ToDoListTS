"use strict";
import { warningText } from '../text/warning.ts';
import { Task } from '../task/taskPrototype.ts';
import type { ITask } from '../task/taskPrototype.ts';
import { makeMenu } from '../text/menus.ts';
import * as taskMakeData from '../prompt/taskMakeData.ts';
import * as mapas from '../task/maps.ts';
import { isNewEmptyCheck, rangeCheck } from './check.ts';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

const prompt = require('prompt-sync')();

export function taskMake(editTask: ITask | null ): ITask | null {
    let loop: boolean = true;
    let menu: number  = 0;
    let currentTask: ITask;
    let newFlag: boolean;
    
    if(!editTask) {
        currentTask = new Task();
        newFlag = true;
    } else {
        currentTask = editTask;
        newFlag = false;
    }

    do{
        console.clear();
        makeMenu(currentTask, mapas.estados, mapas.dificultades, newFlag);
        menu = Number(prompt());
        switch (menu) {
            case 1: // Nombre
                console.clear();   
                currentTask.titulo = taskMakeData.taskMakeString('el nombre', '(100 caracteres maximo)', 100);
                currentTask.updateLastEditDate();
                break;
            case 2: // Descripcion
                console.clear();
                currentTask.descripcion = taskMakeData.taskMakeString('una descripcion', '(500 caracteres maximo)', 500);
                currentTask.updateLastEditDate();
                break;
            case 3: // Estado
                console.clear();    
                currentTask.status = (taskMakeData.taskMakeNumber('el estado', currentTask.titulo + 
                    '\n[1] Pendiente\n[2] En curso\n[3] Terminada\n[4] Cancelada')) ?? 1;
                if (!rangeCheck(currentTask.status, 4)) currentTask.status = 1;
                currentTask.updateLastEditDate();
                break;
            case 4: // Dificultad
                console.clear();    
                currentTask.dificultad = (taskMakeData.taskMakeNumber('la dificultad', currentTask.titulo + 
                    '\n[1] Facil\n[2] Normal\n[3] Dificil')) ?? 1;
                if (!rangeCheck(currentTask.dificultad, 3)) currentTask.dificultad = 1;
                currentTask.updateLastEditDate();
                break;
            case 5: // Vencimiento
                console.clear();
                const newDate = taskMakeData.taskSetDate('vencimiento', '(yyyy-mm-dd)', currentTask.fechaCreacion);
                if (newDate) {
                    currentTask.vencimiento = newDate;
                    currentTask.updateLastEditDate();
                }
                break;
            case 0: // Guardar Tarea
                console.clear();
                const check = isNewEmptyCheck(currentTask);
                if (!check) {
                    loop = false;
                    return currentTask;
                } else {
                    warningText(check);
                }
                break;
            case -1:
                console.clear();
                loop = false;
                return null;
            default:
                console.clear();
                warningText(menu);
                break;
        }
        menu = 6;
    } while (loop);

    return null;
}