**TypeScript - Programación Orientada a Objetos (OOP) basada en Prototipos - Parte Teorica** (Ejercicio 1)


**1. Generalización simbólica:**
   - Casi todo es un objeto: La regla principal. Los únicos elementos que no son objetos son los tipos primitivos (string, number, boolean, null, undefined, symbol, bigint). Sin embargo, incluso los primitivos se comportan temporalmente como objetos cuando se accede a sus propiedades (ej. 'hola'.length).
   - Herencia a través de la "Cadena de Prototipos": Esta es la ley central del paradigma. Cada objeto tiene un enlace interno oculto (denominado [[Prototype]]) que apunta a otro objeto, su prototipo. Resolución de propiedades: Cuando se accede a una propiedad (ej. miObjeto.miMetodo), el motor de JS sigue esta regla:
     1. ¿Existe la propiedad en miObjeto? Si sí, se usa.
     2. Si no, ¿existe en el [[Prototype]] de miObjeto? Si sí, se usa.
     3. Si no, ¿existe en el [[Prototype]] del prototipo? Y así sucesivamente...
     4. Esto continúa hasta alcanzar Object.prototype, y finalmente null (el final de la cadena).
   - La propiedad prototype (en funciones): Las funciones (que también son objetos) tienen una propiedad especial llamada prototype. Este objeto no es el prototipo de la función en sí, sino el objeto que se asignará como [[Prototype]] a todas las nuevas instancias creadas usando esa función como constructor (con la palabra clave new).
   - La palabra clave new: Este operador automatiza la creación de instancias. Al ejecutar new MiConstructor(), JS:
     1. Crea un nuevo objeto vacío ({}).
     2. Asigna el [[Prototype]] de este nuevo objeto para que apunte a MiConstructor.prototype.
     3. Ejecuta MiConstructor con el this apuntando al nuevo objeto.
     4. Retorna el nuevo objeto.
   - El enlace this dinámico: Una regla crucial. El valor de this dentro de una función no se determina por dónde se definió (como en la herencia léxica), sino por cómo se invoca (el "sitio de llamada" o call-site). Esto es fundamental para que los métodos en un prototipo (ej. Array.prototype.map) operen sobre la instancia correcta (ej. miArray).


**2. Creencias de los profesionales:**
   1. Creencia en la Simplicidad: "Objetos que heredan de objetos" es superior. La creencia fundamental es que el modelo de clases (como en Java o C#) introduce una abstracción innecesaria: la "Clase". En el modelo de prototipos, la ontología es más simple: solo existen objetos. Un objeto simplemente delega el comportamiento que no tiene a otro objeto (su prototipo). Se considera una forma más directa y limpia de herencia.
   2. Creencia en el Dinamismo y la Flexibilidad. Se cree que el modelo de prototipos es intrínsecamente más flexible. Dado que los prototipos son solo objetos, pueden ser modificados en tiempo de ejecución. Esto permite hazañas como:
      - Extensión en caliente (Hot-swapping): Puedes agregar un método a MiConstructor.prototype y todas las instancias existentes (incluso las ya creadas) ganarán acceso instantáneo a ese nuevo método. Esto es casi imposible en lenguajes clásicos estáticos.
      - Mutación de la herencia: Puedes cambiar el prototipo de un objeto en cualquier momento (usando Object.setPrototypeOf()), cambiando efectivamente su "clase" sobre la marcha.
   5. Creencia en el Minimalismo: Las clases son solo "azúcar sintáctico". Esta creencia se fortaleció cuando JS introdujo la sintaxis class (en ES6). Los puristas de los prototipos argumentan (correctamente) que la palabra clave class en JS no introduce un nuevo modelo de herencia; es solo una sintaxis alternativa ("azúcar") que opera exactamente sobre el mismo mecanismo de prototipos subyacente. La creencia es que usar prototipos directamente es más "honesto" y expone el verdadero funcionamiento del lenguaje.
   6. Creencia en la Composición sobre la Herencia. Aunque los prototipos implementan la herencia, el modelo (al ser tan flexible y basado en objetos) facilita mucho más los patrones de composición (como mixins o concatenación de objetos) que los modelos de clases rígidos. Se cree que la herencia de prototipos es menos frágil (menos propensa al "problema de la clase base frágil") porque la delegación es más explícita.

------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
**Carateristicas de OOP utilizadas** (Ejercicio 4)
1. Encapsulamiento: Razón principal de toda la refactorización.
- ¿Qué es? Es la idea de "empaquetar" o "encapsular" los datos (propiedades) de un objeto junto con los métodos (comportamientos) que operan sobre esos datos, todo dentro de una misma unidad.
- Fundamentación: Antes, lus datos (la interfaz Task) estaban en un archivo, y las funciones que los usaban (como taskDetail o taskMake) estaban en otros, importando maps y lógica por separado. Ahora, la propia Tarea "sabe" cómo hacer las cosas que le corresponden.
- Ejemplos:
   - Datos: titulo, descripcion, status, fechaCreacion.
   - Métodos: getStatusString(), getDifficultyString(), updateLastEditDate(), displayDetails().
   - Se creo una sola "cápsula" en Task.prototype.ts que contiene ambas cosas. La Tarea ya no es un objeto "tonto" que otros modifican; es un objeto "inteligente" que se gestiona a sí mismo.

2. Abstracción: La Abstracción es el resultado directo de un buen Encapsulamiento.
- ¿Qué es? Es ocultar los detalles complejos de implementación y exponer solo una interfaz simple para interactuar con el objeto. Es el principio de la "caja negra": no necesitas saber cómo funciona por dentro, solo qué puedes hacer con ella.
- Fundamentación: Se simplifico considerablemente el resto del programa. Los otros archivos ya no necesitan conocer la lógica interna de una Tarea.
- Ejemplos:
   - Antes (en taskDetail.ts): Para mostrar el estado, se debia importar estados y hacer const taskEstado = estados.get(task.status);. El archivo taskDetail tenía que saber que status era un number y que necesitaba un Map para traducirlo.
   - Ahora (en taskDetail.ts): Simplemente llamas a task.displayDetails(), y si quisieras solo el estado, llamarías a task.getStatusString(). El archivo taskDetail ya no sabe (ni le importa) si el estado se guarda como un número, un string o si se busca en un Map o un switch. La complejidad está abstraída dentro del método del prototipo.

3. Herencia (Específicamente: Herencia Prototípica)
- ¿Qué es? Es la capacidad de crear nuevos objetos que "heredan" propiedades y métodos de un objeto "padre" o prototipo. Esto promueve la reutilización de código.
- Fundamentación: Se usa el mecanismo de herencia nativo de JavaScript: los prototipos. No se usa la sintaxis de class (que es solo una capa por encima de esto), sino la función constructora y su .prototype.
- Ejemplos:
   - El Prototipo: El objeto Task.prototype es el "molde" que contiene todos los métodos compartidos (getStatusString, displayDetails, etc.).
   - La Instancia: Cuando en taskMake.ts se ejecuta currentTask = new Task();, estás creando un nuevo objeto.
   - La Herencia: Este nuevo objeto currentTask tiene sus propias propiedades de datos (su propio titulo, status, etc.), pero comparte los métodos del prototipo. Si se crean 1000 tareas, solo hay una copia de la función displayDetails en memoria, y las 1000 tareas la heredan y la usan.

**Caracteristicas de OOP NO utilizadas**
1. Polimorfismo
- ¿Qué es? Es la capacidad de que diferentes objetos respondan al mismo mensaje (la misma llamada a un método) de diferentes maneras. Por ejemplo, si tuvieras objetos Perro y Gato, ambos podrían tener un método hacerSonido(), pero uno ladraría y el otro maullaría.
- ¿Por qué no se uso? Porque en el proyecto, solo existe un tipo de objeto: ITask.
- Justificación: No se tiene variaciones de Tareas. Todas las tareas se comportan exactamente igual.
- El polimorfismo es una herramienta poderosa para cuando tu sistema crece y necesitas manejar diferentes "formas" de un mismo concepto. Para esta lista de tareas, no era necesario y habría añadido complejidad innecesaria.
