import { warningText } from '../text/warning.ts';
import { task } from '../task/task.ts';
import { makeMenu } from '../text/menus.ts';
import * as taskMakeData from '../prompt/taskMakeData.ts';
import * as mapas from '../task/maps.ts';
import { isNewEmptyCheck, rangeCheck } from './check.ts';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

const prompt = require('prompt-sync')();

export function taskMake(editTask: any) {
    let loop: boolean = true;
    let check: string | boolean = true;
    let menu: number  = 0;
    let newTask: any = null;
    let newFlag: boolean;
    if(!editTask) {
        newTask = new task();
        newFlag = true;
    } else {
        newTask = editTask;
        newFlag = false;
    }

    do{
        console.clear();
        makeMenu(newTask, mapas.estados, mapas.dificultades, newFlag);
        menu = Number(prompt());
        switch (menu) {
            case 1: // Nombre
                console.clear();   
                newTask.titulo = taskMakeData.taskMakeString('el nombre', '(100 caracteres maximo)', 100);
                newTask.ultimaEdicion = taskMakeData.lastEditDate();
                break;
            case 2: // Descripcion
                console.clear();
                newTask.descripcion = taskMakeData.taskMakeString('una descripcion', '(500 caracteres maximo)', 500);
                newTask.ultimaEdicion = taskMakeData.lastEditDate();
                break;
            case 3: // Estado
                console.clear();    
                newTask.status = (taskMakeData.taskMakeNumber('el estado', newTask.titulo + 
                    '\n[1] Pendiente\n[2] En curso\n[3] Terminada\n[4] Cancelada'));
                if (!rangeCheck(newTask.status, 4)) {
                    newTask.status = 1
                };
                newTask.ultimaEdicion = taskMakeData.lastEditDate();
                break;
            case 4: // Dificultad
                console.clear();    
                newTask.dificultad = (taskMakeData.taskMakeNumber('la dificultad', newTask.titulo + 
                    '\n[1] Facil\n[2] Normal\n[3] Dificil'));
                if (!rangeCheck(newTask.dificultad, 3)) {
                    newTask.dificultad = 1
                };
                newTask.ultimaEdicion = taskMakeData.lastEditDate();
                break;
            case 5: // Vencimiento
                console.clear();
                newTask.vencimiento = taskMakeData.taskSetDate('vencimiento', ' (yyyy-mm-dd)', newTask.fechaCreacion);
                newTask.ultimaEdicion = taskMakeData.lastEditDate();
                break;
            case 0: // Guardar Tarea
                console.clear();
                check = isNewEmptyCheck(newTask);
                if (!check) {
                    loop = false;
                    return newTask;
                } else {
                    warningText(check);
                }
                break;
            case -1:
                console.clear();
                loop = false;
                return false;
            default:
                console.clear();
                warningText(menu);
                break;
        }
        menu = 6;
    } while (loop);
}