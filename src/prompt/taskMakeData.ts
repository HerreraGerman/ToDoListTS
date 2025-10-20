import { warningText } from '../text/warning.ts';
import { format, parse } from 'date-fns';
import { dateCheck } from '../menus/check.ts';
import promptSync from 'prompt-sync';

const prompt = promptSync();

export function taskMakeNumber(dataName: string, extraData: string) {
    console.clear();
    console.log("Ingrese " + dataName + " de la tarea " + extraData);
    let taskData: number = Number(prompt(">"));
    if (isNaN(taskData)) {
        warningText(taskData);
        return;
    }
    return taskData;
}

export function taskMakeString(dataName: string, extraData: string, limit: number) {
    console.clear();
    console.log("Ingrese " + dataName + " de la tarea " + extraData);
    let taskData: string = prompt(">");
    return taskData.trimEnd();
}

export function taskSetDate(dataName: string, extraData: string, fechaCreacion: string) {
    console.clear();
    console.log("Ingrese " + dataName + " de la tarea " + extraData);
    let taskData = prompt(">");
    if (dateCheck(taskData)) {
        taskData = parse(taskData, 'yyyy-MM-dd', new Date());
        taskData = format(taskData, 'yyyy/MM/dd');
    }
    else {
        console.log("Fecha Invalida!");
        return null;
    }
    if (taskData > fechaCreacion) {
        return taskData;
    }
    else {
        console.log("La fecha no puede ser mas antigua que la creacion de la tarea!");
    }
}

export function lastEditDate() {
    let editDate = format(new Date, 'yyyy/MM/dd - hh:mm a') + ' Hora Estandar Argentina';
    return editDate;
}