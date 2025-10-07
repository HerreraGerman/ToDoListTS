**TypeScript (TS) - Parte Teorica**


**1. Generalización simbólica:**
   - Tipos por inferencia: TypeScript conoce el lenguaje JavaScript y va a generar tipos por nosotros en varios casos. Por ejemplo, creando una variable y asignandole un valor particular, TS usara el valor como el tipo. VSC usa TS bajo el capo para hacer el trabajo mas facil con JS.
   - Definicion de Tipos: Se puede usar un alto rango de patrones de diseño en JS. Sin embargo, algunos patrones de diseño hacen dificil que los tipos sean inferidos automaticamente. Para cubrir estos casos, TS soporta una extension de JS, que ofrece lugares para decirle a TS que tipos deberian ser. Si provees un objecto que no coincide con la interface que el usuario proveyó, TS dara un aviso.
   - Typeof: Para aprender el tipo de variables.
   - Componiendo Tipos: Con TS, se puede crear tipos complejos combinando simples. Hay dos maneras populares de hacerlo: Uniones y genericos.
     - Uniones: Con union, se puede declarar que un tipo puede ser varios tipos. Por ejemplo, se puede describir un tipo boolean siendo verdadero o falso.
     - Genericos: Genericos proveen varaibles para tipos. Un ejemplo comun son los arreglos. Un arreglo sin genericos puede contener cualquier cosa. Un array con genericos puede describir los valores que el arreglo contiene.
   - Sistema de Tipeo Esturcutral: Uno de los nucleos principales de TS es que la comprobacion de tipeo se enfoca en la forma que tiene el valor. Esto se suele llamar "tipeo escructural". En un sistema de tipeo estrcutural, si dos objetos tiene la misma forma, son considerados del mismo tipo.


**2. Creencias de los profesionales:**
   1. Tipado estático: Esto permite detectar errores en tiempo de compilación en lugar de en tiempo de ejecución, lo que conduce a un código más confiable y seguro. Los desarrolladores pueden especificar tipos de datos para variables, parámetros de funciones y propiedades de objetos, lo que facilita la identificación temprana de errores y la prevención de comportamientos inesperados.
   2. Legibilidad mejorada del código: La declaración explícita de tipos en TS mejora de forma significativa la legibilidad del código. Los desarrolladores pueden comprender con facilidad qué tipos de datos se esperan y se producirán en cada parte del programa; esto facilita la colaboración en equipo y el mantenimiento del código.
   3. Mantenimiento simplificado: Gracias al tipado estático y la legibilidad mejorada del código, el mantenimiento de proyectos de software se vuelve más sencillo. Los desarrolladores pueden realizar cambios con confianza, sabiendo que los errores se detectarán antes de la ejecución. Esto lleva a un código más fiable y a una reducción en la cantidad de errores en producción.
   4. Compatibilidad con estándares JS: TS es compatible con las características de ECMAScript 6 (ES6) y versiones posteriores de JS. Esto significa que los desarrolladores pueden aprovechar las últimas funcionalidades del lenguaje, como las clases, los módulos y las funciones de flecha, sin problemas de compatibilidad.
   5. Amplia comunidad y ecosistema: Este lenguaje cuenta con una comunidad activa de desarrolladores y una amplia base de usuarios. Esto se traduce en una gran cantidad de recursos, bibliotecas y herramientas disponibles para ayudar a los desarrolladores en su trabajo. Asimismo, muchas de las bibliotecas y marcos de trabajo más populares, como Angular y React, ofrecen soporte nativo o común para TS.
