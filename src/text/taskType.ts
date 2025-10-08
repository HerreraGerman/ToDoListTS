interface Task {
    titulo: string;
    descripcion: string;
    status: number;
    dificultad: number;
    vencimiento: string;
    fechaCreacion: string;
    ultimaEdicion: string;
}

export function Task(this: Task, titulo: string, descripcion: string, status: number, dificultad: number, vencimiento: string, fechaCreacion: string, ultimaEdicion: string) {
    this.titulo = titulo;
    this.descripcion = descripcion;
    this.status = status;
    this.dificultad = dificultad;
    this.vencimiento = vencimiento;
    this.fechaCreacion = fechaCreacion;
    this.ultimaEdicion = ultimaEdicion;
}