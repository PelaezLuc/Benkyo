require('dotenv').config();

const { getConnection } = require('./getConnection');

console.log(process.env.MYSQL_USER);

async function main() {
    let connection;

    try {
        connection = await getConnection();

        console.log('Borrando base de datos');

        await connection.query('DROP DATABASE IF EXISTS benkyo')

        console.log('Creando base de datos...');

        await connection.query('CREATE DATABASE benkyo')

        console.log('Usando base de datos...');

        await connection.query('USE benkyo')

        console.log('Creando tabla USER');

        await connection.query(`
            CREATE TABLE IF NOT EXISTS user (
	            id int not null auto_increment primary key,
                name varchar(30) not null,
	            username varchar(10) not null,
	            stack varchar (50),
	            avatar varchar(255),
	            email varchar(100) not null,
	            password varchar(255) not null
            );
        `);

        console.log('Creando tabla LANGUAGE');

        await connection.query(`
            CREATE TABLE IF NOT EXISTS language (
                id int not null auto_increment primary key,
                name varchar(50) NOT NULL
            );
        `);

        console.log('Creando tabla DIFFICULTY');

        await connection.query(`
            CREATE TABLE IF NOT EXISTS difficulty (
                id int not null auto_increment primary key,
                name enum('junior', 'middle', 'senior')
            );
        `);

        console.log('Creando tabla DECK');

        await connection.query(`
            CREATE TABLE IF NOT EXISTS deck (
            	id int not null auto_increment primary key,
                name varchar(50),
            	language_id int not null,
            	difficulty_id int not null,
            	foreign key(language_id) references language(id),
            	foreign key(difficulty_id) references difficulty(id)
            );
        `);

        console.log('Creando tabla CARD');

        await connection.query(`        
            CREATE TABLE IF NOT EXISTS card (
	            id int not null auto_increment primary key,
	            language_id int not null,
	            difficulty_id int not null,
                deck_id int not null,
	            question varchar(600) not null,
	            answer varchar(600) not null,
	            true_answer varchar(600) not null,
	            false_answer varchar(600) not null,
	            foreign key(language_id) references language(id),
	            foreign key(difficulty_id) references difficulty(id),
                foreign key(deck_id) references deck(id)
            );
        `);

        console.log('Creando tabla TROPHY');

        await connection.query(`      
            CREATE TABLE IF NOT EXISTS trophy (
                id int not null auto_increment primary key,
                name VARCHAR(100),
                language_id int not null,
                difficulty_id int not null,
                foreign key(language_id) references language(id),
                foreign key(difficulty_id) references difficulty(id)
            );
        `);

        console.log('Creando tabla USER_DECK_TROPHIES');

        await connection.query(`  
            CREATE TABLE IF NOT EXISTS user_deck_trophies (
                id int not null auto_increment primary key,
                user_id int not null,
                deck_id int not null,
                trophy_earned boolean default false,
                foreign key(user_id) references user(id),
                foreign key(deck_id) references deck(id)
            );        
        `);

        console.log('Creando tabla USER_DECK')

        await connection.query(`
            CREATE TABLE user_deck (
            	id int not null auto_increment primary key,
                user_id int not null,
                deck_id int not null,
                foreign key(user_id) references user(id),
                foreign key(deck_id) references deck(id)
            );
        `);

        console.log('Creando tabla USER_DECK_CARD');

        await connection.query(`
            CREATE TABLE user_deck_card (
                id int not null auto_increment primary key,
                user_id int not null,
                deck_id int not null,
                card_id int not null,
                card_is_correct boolean default false,
                foreign key(user_id) references user(id),
                foreign key(deck_id) references deck(id),
                foreign key(card_id) references card(id)
            );
        `);

        console.log('Insertando LENGUAJES');

        await connection.query(`
            INSERT into language (name) VALUES
            ('JavaScript'),
            ('Java');
        `)

        console.log('Insertando DIFICULTADES');

        await connection.query(`
            INSERT into difficulty (name) VALUES
            ('junior'),
            ('middle'),
            ('senior');
        `)

        console.log('Insertando DECKS de JavaScript');

        await connection.query(`
            INSERT INTO deck (name, language_id, difficulty_id) VALUES
            ('Junior JavaScript', 1, 1),
            ('Middle JavaScript', 1, 2),
            ('Senior JavaScript', 1, 3);  
        `);

        console.log('Insertando DECKS de Java');

        await connection.query(`
            INSERT INTO deck (name, language_id, difficulty_id) VALUES 
            ('Junior Java', 2, 1),
            ('Middle Java', 2, 2),
            ('Senior Java', 2, 3);    
        `);

        console.log('Insertando tarjetas Junior de JavaScript');

        await connection.query(`
            INSERT INTO card (language_id, difficulty_id, deck_id, question, answer, true_answer, false_answer) VALUES 
            (1, 1, 1, '¿Cuál es el operador para sumar dos números en JavaScript?', '+', '+', '/'),
            (1, 1, 1, '¿Cuál es el resultado de "5" + 2 en JavaScript?', '52', '52', 'Error'),
            (1, 1, 1, '¿Qué es una función flecha en JavaScript?', 'Una función que utiliza una sintaxis de flecha (=>) para definir su cuerpo.', 'Una función que utiliza una sintaxis de flecha (=>) para definir su cuerpo.', 'Una función que escribe código en JavaScript para crear animaciones de flechas.'),
            (1, 1, 1, '¿Cuál es el operador que se utiliza para concatenar cadenas de texto en JavaScript?', '"+": este es el operador que se utiliza para concatenar cadenas de texto en JavaScript, el operador "-" se utiliza para restar números.', '+', '-'),
            (1, 1, 1, '¿Cuál es la forma correcta de crear un objeto en JavaScript?', 'const miObjeto = {}: esta es la forma correcta de crear un objeto en JavaScript utilizando la sintaxis de objetos literales.', 'const miObjeto = {}', 'const miObjeto = []'),
            (1, 1, 1, '¿Qué es una promesa en JavaScript?', 'Una promesa representa un valor que puede estar disponible en el futuro y permite escribir código asíncrono de manera más legible y fácil de entender.', 'Un objeto que representa un valor que puede estar disponible en el futuro.', 'Un objeto que representa un valor que está disponible de inmediato.'),
            (1, 1, 1, '¿Cuál es el método que se utiliza para agregar un elemento al final de un arreglo en JavaScript?', 'El método push() se utiliza para agregar un elemento al final de un arreglo en JavaScript.', 'push()', 'pop()'),
            (1, 1, 1, '¿Cuál es la forma correcta de manejar errores en JavaScript?', 'La estructura try...catch se utiliza para capturar excepciones y manejar errores en JavaScript. Esta estructura intenta ejecutar un bloque de código y, si se produce una excepción, la captura y la maneja en el bloque catch.', 'Con una estructura try...catch que captura y maneja excepciones.', 'Con una estructura if...else que verifica si hay errores en el código.'),
            (1, 1, 1, '¿Cuál es el método que se utiliza para eliminar el último elemento de un arreglo en JavaScript?', 'El método pop() se utiliza para eliminar el último elemento de un arreglo en JavaScript.', 'pop()', 'shift()'),
            (1, 1, 1, '¿Cuál es el método que se utiliza para unir dos arreglos en JavaScript?', 'El método concat() se utiliza para unir dos arreglos en JavaScript.', 'concat()', 'join()'),
            (1, 1, 1, '¿Cuál es el método que se utiliza para invertir el orden de los elementos en un arreglo en JavaScript?', 'El método reverse() se utiliza para invertir el orden de los elementos en un arreglo en JavaScript.', 'reverse()', 'sort()'),
            (1, 1, 1, '¿Cuál es el método que se utiliza para buscar un elemento en un arreglo en JavaScript?', 'El método find() se utiliza para buscar un elemento en un arreglo en JavaScript.', 'find()', 'filter()'),
            (1, 1, 1, '¿Cuál es el método que se utiliza para obtener una porción de un arreglo en JavaScript?', 'El método slice() se utiliza para obtener una porción de un arreglo en JavaScript.', 'slice()', 'splice()'),
            (1, 1, 1, '¿Cuál es el método que se utiliza para determinar si un elemento está presente en un arreglo en JavaScript?', 'El método includes() se utiliza para determinar si un elemento está presente en un arreglo en JavaScript.', 'includes()', 'indexOf()'),
            (1, 1, 1, '¿Cuál es el método que se utiliza para agregar un elemento al principio de un arreglo en JavaScript?', 'El método unshift() se utiliza para agregar un elemento al principio de un arreglo en JavaScript.', 'unshift()', 'push()'),
            (1, 1, 1, '¿Cuál es el método que se utiliza para obtener la longitud de un arreglo en JavaScript?', 'La propiedad length se utiliza para obtener la longitud de un arreglo en JavaScript.', 'length', 'size()'),
            (1, 1, 1, '¿Cuál es la palabra clave que se utiliza para declarar una variable en JavaScript?', 'var', 'var', 'let'),
            (1, 1, 1, '¿Cómo se llama el tipo de dato que puede representar un valor verdadero o falso en JavaScript?', 'boolean', 'boolean', 'number'),
            (1, 1, 1, '¿Qué operador se utiliza para comparar dos valores en JavaScript y devolver true si son iguales y false si son diferentes?', '==', '==', '==='),
            (1, 1, 1, '¿Cuál es la función que se utiliza para mostrar mensajes en la consola del navegador en JavaScript?', 'console.log()', 'console.log()', 'alert()'),
            (1, 1, 1, '¿Cuál es el operador de asignación en JavaScript?', '=', '=', '==');
        `);

        console.log('Insertando tarjetas Middle de JavaScript');

        await connection.query(`
            INSERT INTO card (language_id, difficulty_id, deck_id, question, answer, true_answer, false_answer) VALUES 
            (1, 2, 2, '¿Cuál es la diferencia entre let y var en JavaScript?', 'La diferencia principal radica en su alcance. let tiene un alcance de bloque, lo que significa que solo está disponible dentro del bloque en el que se declara, mientras que var tiene un alcance de función.', 'La diferencia principal radica en su alcance. let tiene un alcance de bloque, lo que significa que solo está disponible dentro del bloque en el que se declara, mientras que var tiene un alcance de función.', 'No hay diferencia significativa.'),
            (1, 2, 2, '¿Qué hace el método map() en JavaScript?', 'El método map() crea un nuevo arreglo con los resultados de llamar a una función proporcionada en cada elemento del arreglo llamador.', 'El método map() crea un nuevo arreglo con los resultados de llamar a una función proporcionada en cada elemento del arreglo llamador.', 'El método map() elimina elementos duplicados de un arreglo.'),
            (1, 2, 2, '¿Cuál es la diferencia entre == y === en JavaScript?', '=== compara tanto el valor como el tipo de los operandos, mientras que == solo compara el valor.', '=== compara tanto el valor como el tipo de los operandos, mientras que == solo compara el valor.', '== compara el valor y el tipo de los operandos, mientras que === solo compara el valor.'),
            (1, 2, 2, '¿Qué es una expresión ternaria en JavaScript?', 'Una expresión ternaria es un operador condicional que toma tres operandos y se usa para evaluar una expresión, devolviendo un valor basado en una condición.', 'Una expresión ternaria es un operador condicional que toma tres operandos y se usa para evaluar una expresión, devolviendo un valor basado en una condición.', 'Una expresión ternaria es un operador que siempre devuelve verdadero.'),
            (1, 2, 2, '¿Qué hace el método filter() en JavaScript?', 'El método filter() crea un nuevo arreglo con todos los elementos que pasan la prueba implementada por la función proporcionada.', 'El método filter() crea un nuevo arreglo con todos los elementos que pasan la prueba implementada por la función proporcionada.', 'El método filter() elimina elementos duplicados de un arreglo.'),
            (1, 2, 2, '¿Qué es la desestructuración en JavaScript?', 'La desestructuración es una característica de JavaScript que permite desempaquetar valores de arreglos o objetos en variables distintas.', 'La desestructuración es una característica de JavaScript que permite desempaquetar valores de arreglos o objetos en variables distintas.', 'La desestructuración es una técnica para dividir una cadena en un arreglo.'),
            (1, 2, 2, '¿Qué hace el método reduce() en JavaScript?', 'El método reduce() ejecuta una función reductora sobre cada elemento de un arreglo, devolviendo al final un único valor.', 'El método reduce() ejecuta una función reductora sobre cada elemento de un arreglo, devolviendo al final un único valor.', 'El método reduce() elimina elementos duplicados de un arreglo.'),
            (1, 2, 2, '¿Qué es una función recursiva?', 'Una función recursiva es una función que se llama a sí misma dentro de su definición.', 'Una función recursiva es una función que se llama a sí misma dentro de su definición.', 'Una función recursiva es una función que no realiza ningún tipo de cálculo.'),
            (1, 2, 2, '¿Qué es el operador spread (...) en JavaScript?', 'El operador spread (...) se utiliza para expandir una expresión en lugares donde se esperan múltiples argumentos (para llamadas a funciones) o múltiples elementos (para literales de arreglo).', 'El operador spread (...) se utiliza para expandir una expresión en lugares donde se esperan múltiples argumentos (para llamadas a funciones) o múltiples elementos (para literales de arreglo).', 'El operador spread (...) se utiliza para concatenar dos arreglos.'),
            (1, 2, 2, '¿Qué es el método forEach() en JavaScript?', 'El método forEach() ejecuta una función dada una vez por cada elemento del arreglo.', 'El método forEach() ejecuta una función dada una vez por cada elemento del arreglo.', 'El método forEach() se utiliza para eliminar elementos duplicados de un arreglo.'),
            (1, 2, 2, '¿Qué es una expresión regular en JavaScript?', 'Una expresión regular es un objeto que describe un patrón de caracteres.', 'Una expresión regular es un objeto que describe un patrón de caracteres.', 'Una expresión regular es un método que convierte una cadena en un número.'),
            (1, 2, 2, '¿Qué es el operador ternario en JavaScript?', 'El operador ternario es un operador condicional que asigna un valor a una variable según una condición.', 'El operador ternario es un operador condicional que asigna un valor a una variable según una condición.', 'El operador ternario es un operador que siempre devuelve verdadero.'),
            (1, 2, 2, '¿Qué es la herencia prototípica en JavaScript?', 'La herencia prototípica es un mecanismo en el que un objeto hereda propiedades y métodos de otro objeto.', 'La herencia prototípica es un mecanismo en el que un objeto hereda propiedades y métodos de otro objeto.', 'La herencia prototípica es un concepto que no existe en JavaScript.'),
            (1, 2, 2, '¿Qué es el método Object.keys() en JavaScript?', 'El método Object.keys() devuelve un arreglo de las propiedades de un objeto.', 'El método Object.keys() devuelve un arreglo de las propiedades de un objeto.', 'El método Object.keys() devuelve una cadena de las propiedades de un objeto.'),
            (1, 2, 2, '¿Qué es el método Object.values() en JavaScript?', 'El método Object.values() devuelve un arreglo con los valores de las propiedades de un objeto.', 'El método Object.values() devuelve un arreglo con los valores de las propiedades de un objeto.', 'El método Object.values() devuelve una cadena con los valores de las propiedades de un objeto.'),
            (1, 2, 2, '¿Qué es el método Object.entries() en JavaScript?', 'El método Object.entries() devuelve una matriz de pares de valores clave de un objeto.', 'El método Object.entries() devuelve una matriz de pares de valores clave de un objeto.', 'El método Object.entries() devuelve una cadena de pares de valores clave de un objeto.'),
            (1, 2, 2, '¿Qué es el método Object.assign() en JavaScript?', 'El método Object.assign() se utiliza para copiar los valores de todas las propiedades enumerables de uno o más objetos fuente a un objeto destino.', 'El método Object.assign() se utiliza para copiar los valores de todas las propiedades enumerables de uno o más objetos fuente a un objeto destino.', 'El método Object.assign() se utiliza para crear un nuevo objeto.'),
            (1, 2, 2, '¿Qué es la función setTimeOut() en JavaScript?', 'La función setTimeOut() se utiliza para ejecutar una función después de esperar una cantidad específica de tiempo en milisegundos.', 'La función setTimeOut() se utiliza para ejecutar una función después de esperar una cantidad específica de tiempo en milisegundos.', 'La función setTimeOut() se utiliza para detener la ejecución del código.'),
            (1, 2, 2, '¿Qué es la función setInterval() en JavaScript?', 'La función setInterval() se utiliza para ejecutar una función cada cierto intervalo de tiempo especificado en milisegundos.', 'La función setInterval() se utiliza para ejecutar una función cada cierto intervalo de tiempo especificado en milisegundos.', 'La función setInterval() se utiliza para detener la ejecución del código.'),
            (1, 2, 2, '¿Qué es el método Object.freeze() en JavaScript?', 'El método Object.freeze() se utiliza para congelar un objeto, lo que significa que no se pueden agregar, eliminar o modificar sus propiedades existentes.', 'El método Object.freeze() se utiliza para congelar un objeto, lo que significa que no se pueden agregar, eliminar o modificar sus propiedades existentes.', 'El método Object.freeze() se utiliza para eliminar un objeto del código.');
        `);

        console.log('Insertando tarjetas senior de JavaScript');

        await connection.query(`
            INSERT INTO card (language_id, difficulty_id, deck_id, question, answer, true_answer, false_answer) VALUES 
            (1, 3, 3, '¿Qué es el hoisting en JavaScript?', 'El hoisting es un comportamiento en JavaScript donde las declaraciones de variables y funciones se mueven al principio de su ámbito durante la fase de compilación.', 'El hoisting es un comportamiento en JavaScript donde las declaraciones de variables y funciones se mueven al principio de su ámbito durante la fase de compilación.', 'El hoisting es un proceso de optimización en JavaScript.'),
            (1, 3, 3, '¿Qué es el event loop en JavaScript?', 'El event loop es un mecanismo en JavaScript que permite que el código asíncrono se ejecute en un entorno de un solo hilo, garantizando que las operaciones de larga duración no bloqueen la ejecución del programa.', 'El event loop es un mecanismo en JavaScript que permite que el código asíncrono se ejecute en un entorno de un solo hilo, garantizando que las operaciones de larga duración no bloqueen la ejecución del programa.', 'El event loop es un mecanismo en JavaScript que divide el código en múltiples hilos para mejorar el rendimiento.'),
            (1, 3, 3, '¿Qué es el closure en JavaScript?', 'Un closure es una función que recuerda el ámbito en el que fue creada y puede acceder a variables definidas en ese ámbito, incluso después de que la función haya sido devuelta.', 'Un closure es una función que recuerda el ámbito en el que fue creada y puede acceder a variables definidas en ese ámbito, incluso después de que la función haya sido devuelta.', 'Un closure es una función que se ejecuta inmediatamente después de ser declarada.'),
            (1, 3, 3, '¿Qué son las promesas en JavaScript?', 'Las promesas son objetos que representan el resultado de una operación asíncrona en JavaScript. Permiten manejar el éxito o el fracaso de la operación de forma más elegante que los callbacks.', 'Las promesas son objetos que representan el resultado de una operación asíncrona en JavaScript. Permiten manejar el éxito o el fracaso de la operación de forma más elegante que los callbacks.', 'Las promesas son objetos que se utilizan para representar datos estáticos en JavaScript.'),
            (1, 3, 3, '¿Qué es el Event Bubbling en JavaScript?', 'El Event Bubbling es un comportamiento en el que los eventos se propagan desde el elemento más interno hacia el elemento más externo en el árbol DOM.', 'El Event Bubbling es un comportamiento en el que los eventos se propagan desde el elemento más interno hacia el elemento más externo en el árbol DOM.', 'El Event Bubbling es un comportamiento en el que los eventos se propagan desde el elemento más externo hacia el elemento más interno en el árbol DOM.'),
            (1, 3, 3, '¿Qué es el Event Capturing en JavaScript?', 'El Event Capturing es un comportamiento en el que los eventos se propagan desde el elemento más externo hacia el elemento más interno en el árbol DOM.', 'El Event Capturing es un comportamiento en el que los eventos se propagan desde el elemento más externo hacia el elemento más interno en el árbol DOM.', 'El Event Capturing es un comportamiento en el que los eventos se propagan desde el elemento más interno hacia el elemento más externo en el árbol DOM.'),
            (1, 3, 3, '¿Qué es la delegación de eventos en JavaScript?', 'La delegación de eventos es un patrón en JavaScript donde un elemento padre maneja los eventos en lugar de asignar un controlador de eventos a cada elemento hijo. Esto es útil para elementos generados dinámicamente.', 'La delegación de eventos es un patrón en JavaScript donde un elemento padre maneja los eventos en lugar de asignar un controlador de eventos a cada elemento hijo. Esto es útil para elementos generados dinámicamente.', 'La delegación de eventos es un patrón en JavaScript que no se utiliza para mejorar el rendimiento.'),
            (1, 3, 3, '¿Qué es el Prototype en JavaScript?', 'El Prototype es un mecanismo en JavaScript que permite la herencia de propiedades y métodos entre objetos. Cada objeto tiene una referencia a su Prototype, y si una propiedad o método no se encuentra en el objeto actual, se busca en su Prototype.', 'El Prototype es un mecanismo en JavaScript que permite la herencia de propiedades y métodos entre objetos. Cada objeto tiene una referencia a su Prototype, y si una propiedad o método no se encuentra en el objeto actual, se busca en su Prototype.', 'El Prototype es un mecanismo en JavaScript que solo se utiliza para objetos predefinidos.'),
            (1, 3, 3, '¿Qué es el async/await en JavaScript?', 'El async/await es una característica en JavaScript que permite escribir código asíncrono de manera síncrona, haciendo que el código sea más legible y fácil de entender.', 'El async/await es una característica en JavaScript que permite escribir código asíncrono de manera síncrona, haciendo que el código sea más legible y fácil de entender.', 'El async/await es una característica en JavaScript que solo se utiliza para ejecutar código en un hilo diferente.'),
            (1, 3, 3, '¿Qué es el JSON Web Token (JWT) en JavaScript?', 'El JSON Web Token (JWT) es un estándar abierto (RFC 7519) que define una forma compacta y segura de transmitir información entre partes como un objeto JSON. Se utiliza para la autenticación y la transferencia segura de información.', 'El JSON Web Token (JWT) es un estándar abierto (RFC 7519) que define una forma compacta y segura de transmitir información entre partes como un objeto JSON. Se utiliza para la autenticación y la transferencia segura de información.', 'El JSON Web Token (JWT) es una función en JavaScript que se utiliza para manipular objetos JSON.'),
            (1, 3, 3, '¿Qué es el DOM en JavaScript?', 'El DOM (Document Object Model) es una interfaz de programación de aplicaciones (API) para documentos HTML y XML. Representa la estructura del documento como un árbol de objetos, lo que permite a los programas acceder y manipular el contenido y la estructura del documento.', 'El DOM (Document Object Model) es una interfaz de programación de aplicaciones (API) para documentos HTML y XML. Representa la estructura del documento como un árbol de objetos, lo que permite a los programas acceder y manipular el contenido y la estructura del documento.', 'El DOM (Document Object Model) es un tipo de dato en JavaScript que se utiliza para almacenar documentos HTML.'),
            (1, 3, 3, '¿Qué es el Web Storage en JavaScript?', 'El Web Storage es una API en JavaScript que permite a las aplicaciones web almacenar datos de manera persistente en el navegador del usuario. Hay dos tipos de Web Storage: localStorage y sessionStorage.', 'El Web Storage es una API en JavaScript que permite a las aplicaciones web almacenar datos de manera persistente en el navegador del usuario. Hay dos tipos de Web Storage: localStorage y sessionStorage.', 'El Web Storage es una API en JavaScript que se utiliza para almacenar datos en un servidor remoto.'),
            (1, 3, 3, '¿Qué es el Cross-Origin Resource Sharing (CORS) en JavaScript?', 'El Cross-Origin Resource Sharing (CORS) es un mecanismo en JavaScript que permite a los servidores indicar a los navegadores si se pueden cargar recursos desde un origen diferente al del documento actual.', 'El Cross-Origin Resource Sharing (CORS) es un mecanismo en JavaScript que permite a los servidores indicar a los navegadores si se pueden cargar recursos desde un origen diferente al del documento actual.', 'El Cross-Origin Resource Sharing (CORS) es un mecanismo en JavaScript que impide a los navegadores cargar recursos desde un origen diferente al del documento actual.'),
            (1, 3, 3, '¿Qué es el Strict Mode en JavaScript?', 'El Strict Mode es una característica en JavaScript que introduce un conjunto de restricciones para escribir un código más seguro y robusto. Ayuda a evitar errores comunes y hace que el código sea más predecible.', 'El Strict Mode es una característica en JavaScript que introduce un conjunto de restricciones para escribir un código más seguro y robusto. Ayuda a evitar errores comunes y hace que el código sea más predecible.', 'El Strict Mode es una característica en JavaScript que permite escribir código menos seguro y menos robusto.'),
            (1, 3, 3, '¿Qué es el Event Driven Programming en JavaScript?', 'El Event Driven Programming es un paradigma de programación en JavaScript donde el flujo de control del programa está determinado por eventos que ocurren en el sistema, como clics de ratón, pulsaciones de teclado o recepción de datos.', 'El Event Driven Programming es un paradigma de programación en JavaScript donde el flujo de control del programa está determinado por eventos que ocurren en el sistema, como clics de ratón, pulsaciones de teclado o recepción de datos.', 'El Event Driven Programming es un paradigma de programación en JavaScript que no se utiliza en entornos de desarrollo modernos.'),
            (1, 3, 3, '¿Qué es el Prototype Chain en JavaScript?', 'El Prototype Chain es un mecanismo en JavaScript que permite a los objetos heredar propiedades y métodos de otros objetos mediante su Prototype. Cada objeto tiene una cadena de prototipos que se remonta hasta Object.prototype.', 'El Prototype Chain es un mecanismo en JavaScript que permite a los objetos heredar propiedades y métodos de otros objetos mediante su Prototype. Cada objeto tiene una cadena de prototipos que se remonta hasta Object.prototype.', 'El Prototype Chain es un mecanismo en JavaScript que no se utiliza para la herencia de objetos.'),
            (1, 3, 3, '¿Qué es el Garbage Collection en JavaScript?', 'El Garbage Collection es un proceso en JavaScript que automáticamente recupera la memoria que ya no está en uso, liberando así recursos y evitando la fragmentación de la memoria.', 'El Garbage Collection es un proceso en JavaScript que automáticamente recupera la memoria que ya no está en uso, liberando así recursos y evitando la fragmentación de la memoria.', 'El Garbage Collection es un proceso en JavaScript que consume recursos adicionales sin mejorar el rendimiento del programa.'),
            (1, 3, 3, '¿Qué es el call stack en JavaScript?', 'El call stack es una estructura de datos en JavaScript que registra las llamadas a funciones en ejecución. Permite al intérprete rastrear dónde se encuentra en la ejecución del programa.', 'El call stack es una estructura de datos en JavaScript que registra las llamadas a funciones en ejecución. Permite al intérprete rastrear dónde se encuentra en la ejecución del programa.', 'El call stack es una estructura de datos en JavaScript que se utiliza para almacenar datos de forma permanente.'),
            (1, 3, 3, '¿Qué es el Prototype-based Inheritance en JavaScript?', 'El Prototype-based Inheritance es un tipo de herencia en JavaScript donde los objetos heredan propiedades y métodos de otros objetos mediante su Prototype. No hay clases en este modelo, solo objetos.', 'El Prototype-based Inheritance es un tipo de herencia en JavaScript donde los objetos heredan propiedades y métodos de otros objetos mediante su Prototype. No hay clases en este modelo, solo objetos.', 'El Prototype-based Inheritance es un tipo de herencia en JavaScript que no permite la reutilización de código.'),
            (1, 3, 3, '¿Qué es el Object.defineProperty() en JavaScript?', 'Object.defineProperty() es un método en JavaScript que permite definir una nueva propiedad directamente en un objeto, o modificar una propiedad existente, y especificar ciertas características de la propiedad, como su configurabilidad, escribibilidad y enumerabilidad.', 'Object.defineProperty() es un método en JavaScript que permite definir una nueva propiedad directamente en un objeto, o modificar una propiedad existente, y especificar ciertas características de la propiedad, como su configurabilidad, escribibilidad y enumerabilidad.', 'Object.defineProperty() es un método en JavaScript que no se utiliza para definir propiedades en objetos.'),
            (1, 3, 3, '¿Qué es el polyfill en JavaScript?', 'Un polyfill es un fragmento de código (generalmente una librería o script) que proporciona implementaciones de funcionalidades modernas de JavaScript para navegadores más antiguos que no las admiten nativamente.', 'Un polyfill es un fragmento de código (generalmente una librería o script) que proporciona implementaciones de funcionalidades modernas de JavaScript para navegadores más antiguos que no las admiten nativamente.', 'Un polyfill es un fragmento de código (generalmente una librería o script) que se utiliza para añadir funcionalidades a JavaScript de forma insegura.'),
            (1, 3, 3, '¿Qué es el ECMAScript en JavaScript?', 'ECMAScript es el estándar en el que se basa JavaScript. Define la sintaxis del lenguaje, los tipos de datos, las estructuras de control y las funciones incorporadas, entre otros aspectos.', 'ECMAScript es el estándar en el que se basa JavaScript. Define la sintaxis del lenguaje, los tipos de datos, las estructuras de control y las funciones incorporadas, entre otros aspectos.', 'ECMAScript es un estándar en JavaScript que no se utiliza en la actualidad.');        
        `)

        console.log('Insertando tarjetas junior de Java');

        await connection.query(`
            INSERT INTO card (language_id, difficulty_id, deck_id, question, answer, true_answer, false_answer) VALUES 
            (2, 1, 4, '¿Cuál es el tipo de datos primitivo para representar enteros en Java?', 'int', 'int', 'string'),
            (2, 1, 4, '¿Cómo se declara una variable en Java?', 'Usando la sintaxis tipo nombreVariable = valor;', 'Usando la sintaxis tipo nombreVariable = valor;', 'Declarando primero el valor y luego el tipo de la variable.'),
            (2, 1, 4, '¿Cuál es la salida del siguiente código en Java? System.out.println(5 + 3 * 2);', '11', '11', '16'),
            (2, 1, 4, '¿Qué palabra clave se utiliza para definir una clase en Java?', 'class', 'class', 'Type'),
            (2, 1, 4, '¿Cómo se inicia un array en Java?', 'int[] nombreArray = new int[tamaño];', 'int[] nombreArray = new int[tamaño];', 'int[] nombreArray;'),
            (2, 1, 4, '¿Qué palabra clave se utiliza para definir un método en Java?', 'void', 'void', 'method'),
            (2, 1, 4, '¿Cuál es el resultado de 10 % 3 en Java?', '1', '1', '3'),
            (2, 1, 4, '¿Cómo se declara un array de Strings en Java?', 'String[] nombreArray = new String[tamaño];', 'String[] nombreArray = new String[tamaño];', 'String nombreArray[] = new String[tamaño];'),
            (2, 1, 4, '¿Qué operador se utiliza para comparar dos valores en Java?', '==', '==', '='),
            (2, 1, 4, '¿Cuál es la salida del siguiente código en Java? System.out.println("Hola, " + "mundo!");', 'Hola, mundo!', 'Hola, mundo!', 'Hola mundo!'),
            (2, 1, 4, '¿Qué palabra clave se utiliza para hacer referencia al objeto actual en Java?', 'this', 'this', 'self'),
            (2, 1, 4, '¿Cuál es la sintaxis correcta para un bucle "for" en Java?', 'for (int i = 0; i < limite; i++) { /* código */ }', 'for (int i = 0; i < limite; i++) { /* código */ }', 'loop (int i = 0; i < limite; i++) { /* código */ }'),
            (2, 1, 4, '¿Qué método se utiliza para obtener la longitud de un array en Java?', 'length', 'length', 'size()'),
            (2, 1, 4, '¿Qué palabra clave se utiliza para definir una constante en Java?', 'final', 'final', 'const'),
            (2, 1, 4, '¿Qué palabra clave se utiliza para hacer que un método no pueda ser sobrescrito en una subclase en Java?', 'final', 'final', 'static'),
            (2, 1, 4, '¿Cuál es la sintaxis correcta para declarar un método en Java?', 'tipoRetorno nombreMetodo(parametros) { /* código */ }', 'tipoRetorno nombreMetodo(parametros) { /* código */ }', 'nombreMetodo(parametros) { /* código */ } tipoRetorno'),
            (2, 1, 4, '¿Qué operador se utiliza para concatenar cadenas en Java?', '+', '+', '++'),
            (2, 1, 4, '¿Cuál es la salida del siguiente código en Java? System.out.println(5 == 5 && 3 < 5);', 'true', 'true', 'false'),
            (2, 1, 4, '¿Qué palabra clave se utiliza para salir de un bucle en Java?', 'break', 'break', 'exit'),
            (2, 1, 4, '¿Cuál es la salida del siguiente código en Java? System.out.println(Math.abs(-10));', '10', '10', '-10');  
        `)

        console.log('Insertando tarjetas middle de Java');

        await connection.query(`
            INSERT INTO card (language_id, difficulty_id, deck_id, question, answer, true_answer, false_answer) VALUES 
            (2, 2, 5, '¿Qué significa JVM y cuál es su función principal en Java?', 'JVM significa Java Virtual Machine y su función principal es ejecutar programas Java convirtiendo el bytecode en instrucciones ejecutables para la máquina anfitriona.', 'JVM significa Java Virtual Machine y su función principal es ejecutar programas Java convirtiendo el bytecode en instrucciones ejecutables para la máquina anfitriona.', 'JVM significa Java Virtual Machine y su función principal es compilar código Java a código de máquina.'),
            (2, 2, 5, 'Explique brevemente el principio de encapsulamiento en Java.', 'El principio de encapsulamiento en Java consiste en ocultar los detalles internos de cómo funciona una clase y proporcionar una interfaz clara y consistente para que los usuarios interactúen con ella.', 'El principio de encapsulamiento en Java consiste en ocultar los detalles internos de cómo funciona una clase y proporcionar una interfaz clara y consistente para que los usuarios interactúen con ella.', 'El principio de encapsulamiento en Java consiste en exponer todos los detalles internos de una clase.'),
            (2, 2, 5, '¿Qué es la sobrecarga de operadores en Java?', 'La sobrecarga de operadores en Java es la capacidad de definir el comportamiento de un operador para los tipos definidos por el usuario.', 'La sobrecarga de operadores en Java es la capacidad de definir el comportamiento de un operador para los tipos definidos por el usuario.', 'La sobrecarga de operadores en Java es la capacidad de utilizar un operador con diferentes significados en diferentes contextos.'),
            (2, 2, 5, '¿Cuál es la diferencia entre una clase abstracta y una interfaz en Java?', 'Una clase abstracta puede contener métodos concretos, mientras que una interfaz en Java solo puede contener métodos abstractos.', 'Una clase abstracta puede contener métodos concretos, mientras que una interfaz en Java solo puede contener métodos abstractos.', 'Una clase abstracta no puede tener subclases, mientras que una interfaz en Java puede tener subclases.'),
            (2, 2, 5, 'Explique el concepto de polimorfismo en Java.', 'El polimorfismo en Java se refiere a la capacidad de objetos de diferentes clases de responder al mismo mensaje o método.', 'El polimorfismo en Java se refiere a la capacidad de objetos de diferentes clases de responder al mismo mensaje o método.', 'El polimorfismo en Java se refiere a la capacidad de un objeto cambiar su tipo durante la ejecución.'),
            (2, 2, 5, '¿Qué es una excepción en Java y cómo se maneja?', 'Una excepción en Java es un problema que ocurre durante la ejecución de un programa. Se maneja utilizando bloques try-catch o declarando que un método puede lanzar una excepción específica.', 'Una excepción en Java es un problema que ocurre durante la ejecución de un programa. Se maneja utilizando bloques try-catch o declarando que un método puede lanzar una excepción específica.', 'Una excepción en Java es un problema que ocurre durante la compilación del programa.'),
            (2, 2, 5, '¿Por qué es importante el uso de interfaces en Java?', 'Las interfaces en Java proporcionan un mecanismo para lograr la abstracción y el polimorfismo, lo que permite el desarrollo de software más flexible y mantenible.', 'Las interfaces en Java proporcionan un mecanismo para lograr la abstracción y el polimorfismo, lo que permite el desarrollo de software más flexible y mantenible.', 'Las interfaces en Java son solo una convención y no son necesarias para el desarrollo de software.'),
            (2, 2, 5, '¿Cuál es la diferencia entre una clase interna estática y una clase interna no estática?', 'Una clase interna estática no tiene acceso a las variables de instancia de la clase externa, mientras que una clase interna no estática sí tiene acceso.', 'Una clase interna estática no tiene acceso a las variables de instancia de la clase externa, mientras que una clase interna no estática sí tiene acceso.', 'Una clase interna estática solo puede ser instanciada por la clase externa, mientras que una clase interna no estática puede ser instanciada por cualquier clase.'),
            (2, 2, 5, '¿Cuál es la diferencia entre "==" y "equals()" en Java?', '"==" se utiliza para comparar referencias de objetos, mientras que "equals()" se utiliza para comparar los contenidos de los objetos.', '"==" se utiliza para comparar referencias de objetos, mientras que "equals()" se utiliza para comparar los contenidos de los objetos.', '"==" se utiliza para comparar los contenidos de los objetos, mientras que "equals()" se utiliza para comparar referencias de objetos.'),
            (2, 2, 5, '¿Cuál es la diferencia entre una clase y un objeto en Java?', 'Una clase en Java es un plano para crear objetos, mientras que un objeto es una instancia específica de una clase.', 'Una clase en Java es un plano para crear objetos, mientras que un objeto es una instancia específica de una clase.', 'Una clase en Java es una instancia específica de un objeto, mientras que un objeto es un plano para crear clases.'),
            (2, 2, 5, '¿Qué es la serialización de objetos en Java?', 'La serialización de objetos en Java es el proceso de convertir un objeto en una secuencia de bytes para que pueda ser almacenado en la memoria, en un archivo o transmitido a través de la red.', 'La serialización de objetos en Java es el proceso de convertir un objeto en una secuencia de bytes para que pueda ser almacenado en la memoria, en un archivo o transmitido a través de la red.', 'La serialización de objetos en Java es el proceso de convertir una secuencia de bytes en un objeto.'),
            (2, 2, 5, '¿Qué es un constructor en Java y cuál es su propósito?', 'Un constructor en Java es un método especial que se llama automáticamente cuando se crea una instancia de una clase. Su propósito es inicializar los campos de la clase.', 'Un constructor en Java es un método especial que se llama automáticamente cuando se crea una instancia de una clase. Su propósito es inicializar los campos de la clase.', 'Un constructor en Java es un método que se llama manualmente para crear una instancia de una clase.'),
            (2, 2, 5, '¿Qué es una clase anidada en Java y por qué se usa?', 'Una clase anidada en Java es una clase que está definida dentro de otra clase. Se utiliza para encapsular la funcionalidad relacionada y mantenerla dentro del alcance de la clase externa.', 'Una clase anidada en Java es una clase que está definida dentro de otra clase. Se utiliza para encapsular la funcionalidad relacionada y mantenerla dentro del alcance de la clase externa.', 'Una clase anidada en Java es una clase que puede heredar de una clase externa.'),
            (2, 2, 5, '¿Qué es un arreglo en Java?', 'Un arreglo en Java es una estructura de datos que almacena una colección de elementos del mismo tipo, accesibles mediante un índice.', 'Un arreglo en Java es una estructura de datos que almacena una colección de elementos del mismo tipo, accesibles mediante un índice.', 'Un arreglo en Java es una estructura de datos que almacena una colección de elementos de diferentes tipos.'),
            (2, 2, 5, '¿Qué es la recursividad y cómo se utiliza en Java?', 'La recursividad es un proceso en el que un método se llama a sí mismo para resolver un problema más pequeño. Se utiliza en Java para resolver problemas que se pueden dividir en subproblemas más simples.', 'La recursividad es un proceso en el que un método se llama a sí mismo para resolver un problema más pequeño. Se utiliza en Java para resolver problemas que se pueden dividir en subproblemas más simples.', 'La recursividad es un proceso en el que un método se llama a otros métodos para resolver un problema.'),
            (2, 2, 5, '¿Qué son los genéricos en Java y cuál es su ventaja?', 'Los genéricos en Java permiten que los tipos de datos sean parámetros cuando se definen clases, interfaces y métodos. Su ventaja es proporcionar seguridad de tipos y reutilización de código.', 'Los genéricos en Java permiten que los tipos de datos sean parámetros cuando se definen clases, interfaces y métodos. Su ventaja es proporcionar seguridad de tipos y reutilización de código.', 'Los genéricos en Java son una característica de la programación funcional.'),
            (2, 2, 5, '¿Qué es el polimorfismo de tiempo de ejecución en Java?', 'El polimorfismo de tiempo de ejecución en Java se refiere a la capacidad de un objeto de cambiar de forma durante la ejecución, lo que permite que un objeto se comporte como su tipo base o como su tipo derivado según el contexto.', 'El polimorfismo de tiempo de ejecución en Java se refiere a la capacidad de un objeto de cambiar de forma durante la ejecución, lo que permite que un objeto se comporte como su tipo base o como su tipo derivado según el contexto.', 'El polimorfismo de tiempo de ejecución en Java se refiere a la capacidad de una clase de cambiar de forma durante la compilación.'),
            (2, 2, 5, '¿Qué es el operador ternario en Java y cómo se utiliza?', 'El operador ternario en Java es una forma compacta de escribir una instrucción if-else en una sola línea. Se utiliza para asignar un valor a una variable basándose en una condición.', 'El operador ternario en Java es una forma compacta de escribir una instrucción if-else en una sola línea. Se utiliza para asignar un valor a una variable basándose en una condición.', 'El operador ternario en Java se utiliza para comparar dos valores y devolver true o false.'),
            (2, 2, 5, '¿Qué es la clase Math en Java y cuáles son algunos de sus métodos?', 'La clase Math en Java es una clase integrada que proporciona métodos estáticos para realizar operaciones matemáticas comunes, como raíz cuadrada, valor absoluto, seno, coseno, etc.', 'La clase Math en Java es una clase integrada que proporciona métodos estáticos para realizar operaciones matemáticas comunes, como raíz cuadrada, valor absoluto, seno, coseno, etc.', 'La clase Math en Java es una clase que se utiliza para crear objetos matemáticos.'),
            (2, 2, 5, '¿Qué es el manejo de excepciones en Java y por qué es importante?', 'El manejo de excepciones en Java es el proceso de gestionar situaciones excepcionales que pueden ocurrir durante la ejecución de un programa. Es importante porque permite que un programa maneje errores de manera controlada y evita que se bloquee.', 'El manejo de excepciones en Java es el proceso de gestionar situaciones excepcionales que pueden ocurrir durante la ejecución de un programa. Es importante porque permite que un programa maneje errores de manera controlada y evita que se bloquee.', 'El manejo de excepciones en Java es un proceso opcional y no es importante.');
        `)

        console.log('Insertando tarjetas senior de Java');

        await connection.query(`
            INSERT INTO card (language_id, difficulty_id, deck_id, question, answer, true_answer, false_answer) VALUES 
            (2, 3, 6, '¿Qué es la sobrecarga y la sobrescritura en Java y cuál es la diferencia entre ellas?', 'La sobrecarga en Java se refiere a la capacidad de una clase de tener múltiples métodos con el mismo nombre pero diferentes parámetros. La sobrescritura, por otro lado, se refiere a la capacidad de una subclase de proporcionar una implementación específica para un método que ya está definido en su superclase. La diferencia principal es que la sobrecarga ocurre en la misma clase mientras que la sobrescritura ocurre en clases diferentes dentro de una jerarquía de herencia.', 'La sobrecarga en Java se refiere a la capacidad de una clase de tener múltiples métodos con el mismo nombre pero diferentes parámetros. La sobrescritura, por otro lado, se refiere a la capacidad de una subclase de proporcionar una implementación específica para un método que ya está definido en su superclase. La diferencia principal es que la sobrecarga ocurre en la misma clase mientras que la sobrescritura ocurre en clases diferentes dentro de una jerarquía de herencia.', 'La sobrecarga y la sobrescritura en Java son términos intercambiables.'),
            (2, 3, 6, '¿Qué es la serialización y deserialización de objetos en Java?', 'La serialización en Java es el proceso de convertir un objeto en una secuencia de bytes para que pueda ser almacenado en la memoria, en un archivo o transmitido a través de la red. La deserialización es el proceso inverso, que convierte la secuencia de bytes en un objeto. Estos procesos son útiles para el almacenamiento persistente de objetos y la comunicación entre aplicaciones distribuidas.', 'La serialización en Java es el proceso de convertir un objeto en una secuencia de bytes para que pueda ser almacenado en la memoria, en un archivo o transmitido a través de la red. La deserialización es el proceso inverso, que convierte la secuencia de bytes en un objeto. Estos procesos son útiles para el almacenamiento persistente de objetos y la comunicación entre aplicaciones distribuidas.', 'La serialización y deserialización en Java se utilizan solo para la comunicación entre objetos en el mismo programa.'),
            (2, 3, 6, '¿Qué es la concurrencia en Java y cómo se maneja?', 'La concurrencia en Java se refiere a la ejecución simultánea de múltiples hilos dentro de un programa. Se maneja utilizando mecanismos como sincronización, locks, semáforos y clases concurrentes del paquete java.util.concurrent. Estos mecanismos ayudan a garantizar la consistencia y la integridad de los datos compartidos entre hilos.', 'La concurrencia en Java se refiere a la ejecución simultánea de múltiples hilos dentro de un programa. Se maneja utilizando mecanismos como sincronización, locks, semáforos y clases concurrentes del paquete java.util.concurrent. Estos mecanismos ayudan a garantizar la consistencia y la integridad de los datos compartidos entre hilos.', 'La concurrencia en Java se refiere a la ejecución secuencial de múltiples hilos dentro de un programa.'),
            (2, 3, 6, '¿Qué es la inmutabilidad en Java y por qué es importante?', 'La inmutabilidad en Java se refiere a la incapacidad de modificar el estado de un objeto una vez que se ha creado. Es importante porque garantiza que los objetos sean seguros para usar en entornos concurrentes y que no se produzcan efectos secundarios inesperados debido a la modificación del estado. Los objetos inmutables son más fáciles de razonar y menos propensos a errores.', 'La inmutabilidad en Java se refiere a la incapacidad de modificar el estado de un objeto una vez que se ha creado. Es importante porque garantiza que los objetos sean seguros para usar en entornos concurrentes y que no se produzcan efectos secundarios inesperados debido a la modificación del estado. Los objetos inmutables son más fáciles de razonar y menos propensos a errores.', 'La inmutabilidad en Java se refiere a la capacidad de modificar el estado de un objeto después de que se ha creado.'),
            (2, 3, 6, '¿Qué es el garbage collector en Java y cómo funciona?', 'El garbage collector en Java es un componente del tiempo de ejecución que gestiona la memoria automáticamente, liberando objetos que ya no son referenciados por la aplicación. Funciona utilizando algoritmos de recopilación de basura para identificar y eliminar objetos no referenciados, liberando así memoria que puede ser reutilizada por la aplicación.', 'El garbage collector en Java es un componente del tiempo de ejecución que gestiona la memoria automáticamente, liberando objetos que ya no son referenciados por la aplicación. Funciona utilizando algoritmos de recopilación de basura para identificar y eliminar objetos no referenciados, liberando así memoria que puede ser reutilizada por la aplicación.', 'El garbage collector en Java es un componente del tiempo de ejecución que debe ser invocado manualmente por el programador para liberar memoria.'),
            (2, 3, 6, '¿Qué es la reflexión en Java y cuáles son sus usos?', 'La reflexión en Java es un mecanismo que permite a un programa examinar y modificar su propia estructura en tiempo de ejecución. Se utiliza para crear herramientas de desarrollo, frameworks de inyección de dependencias, pruebas unitarias y en casos donde la estructura de una clase no es conocida de antemano.', 'La reflexión en Java es un mecanismo que permite a un programa examinar y modificar su propia estructura en tiempo de ejecución. Se utiliza para crear herramientas de desarrollo, frameworks de inyección de dependencias, pruebas unitarias y en casos donde la estructura de una clase no es conocida de antemano.', 'La reflexión en Java es un mecanismo que permite a un programa crear objetos de manera reflexiva.'),
            (2, 3, 6, '¿Qué es un deadlock y cómo se puede evitar en Java?', 'Un deadlock en Java es una situación en la que dos o más hilos están bloqueados indefinidamente esperando que el otro libere un recurso. Se puede evitar utilizando técnicas como el ordenamiento de recursos, la prevención de espera circular y la liberación de recursos en un orden predefinido.', 'Un deadlock en Java es una situación en la que dos o más hilos están bloqueados indefinidamente esperando que el otro libere un recurso. Se puede evitar utilizando técnicas como el ordenamiento de recursos, la prevención de espera circular y la liberación de recursos en un orden predefinido.', 'Un deadlock en Java es una situación en la que un hilo se bloquea indefinidamente esperando que otro hilo libere un recurso. Se puede evitar utilizando un solo recurso compartido.'),
            (2, 3, 6, '¿Qué es la programación orientada a aspectos (AOP) en Java?', 'La programación orientada a aspectos (AOP) en Java es un paradigma de programación que permite separar las preocupaciones transversales, como la seguridad, el registro y la transacción, del código de negocios. Se logra utilizando aspectos para encapsular y modularizar el código relacionado con la preocupación transversal.', 'La programación orientada a aspectos (AOP) en Java es un paradigma de programación que permite separar las preocupaciones transversales, como la seguridad, el registro y la transacción, del código de negocios. Se logra utilizando aspectos para encapsular y modularizar el código relacionado con la preocupación transversal.', 'La programación orientada a aspectos (AOP) en Java es un paradigma de programación que permite separar las preocupaciones transversales, como la seguridad, el registro y la transacción, del código de negocios. Se logra utilizando patrones de diseño.'),
            (2, 3, 6, '¿Qué es el patrón de diseño Factory Method en Java y cómo se implementa?', 'El patrón de diseño Factory Method en Java se utiliza para definir una interfaz para crear un objeto, pero permite a las subclases decidir qué clase instanciar. Se implementa mediante la definición de un método en una clase abstracta que las subclases implementan para crear objetos. Esto proporciona una manera flexible de crear objetos sin tener que especificar la clase exacta.', 'El patrón de diseño Factory Method en Java se utiliza para definir una interfaz para crear un objeto, pero permite a las subclases decidir qué clase instanciar. Se implementa mediante la definición de un método en una clase abstracta que las subclases implementan para crear objetos. Esto proporciona una manera flexible de crear objetos sin tener que especificar la clase exacta.', 'El patrón de diseño Factory Method en Java se utiliza para instanciar objetos de una clase concreta sin crear una fábrica.'),
            (2, 3, 6, '¿Qué es el patrón de diseño Abstract Factory en Java y cuál es su propósito?', 'El patrón de diseño Abstract Factory en Java se utiliza para proporcionar una interfaz para crear familias de objetos relacionados o dependientes sin especificar sus clases concretas. Su propósito es abstraer la creación de objetos y proporcionar una manera de crear familias de objetos relacionados sin depender de sus implementaciones concretas.', 'El patrón de diseño Abstract Factory en Java se utiliza para proporcionar una interfaz para crear familias de objetos relacionados o dependientes sin especificar sus clases concretas. Su propósito es abstraer la creación de objetos y proporcionar una manera de crear familias de objetos relacionados sin depender de sus implementaciones concretas.', 'El patrón de diseño Abstract Factory en Java se utiliza para instanciar objetos de una clase concreta sin crear una fábrica.'),
            (2, 3, 6, '¿Qué es el patrón de diseño Proxy en Java y cómo se utiliza?', 'El patrón de diseño Proxy en Java se utiliza para proporcionar un sustituto o marcador de posición para otro objeto con el fin de controlar el acceso a él. Se utiliza para agregar funcionalidades adicionales, como la seguridad, el registro y el control de acceso, sin modificar el código del objeto real.', 'El patrón de diseño Proxy en Java se utiliza para proporcionar un sustituto o marcador de posición para otro objeto con el fin de controlar el acceso a él. Se utiliza para agregar funcionalidades adicionales, como la seguridad, el registro y el control de acceso, sin modificar el código del objeto real.', 'El patrón de diseño Proxy en Java se utiliza para acceder directamente al objeto real sin ninguna restricción.'),
            (2, 3, 6, '¿Qué es el patrón de diseño Builder en Java y cuál es su propósito?', 'El patrón de diseño Builder en Java se utiliza para construir objetos complejos paso a paso. Su propósito es separar la construcción de un objeto de su representación, permitiendo la creación de diferentes tipos y representaciones del mismo objeto.', 'El patrón de diseño Builder en Java se utiliza para construir objetos complejos paso a paso. Su propósito es separar la construcción de un objeto de su representación, permitiendo la creación de diferentes tipos y representaciones del mismo objeto.', 'El patrón de diseño Builder en Java se utiliza para construir objetos simples.'),
            (2, 3, 6, '¿Qué es el patrón de diseño Singleton en Java y cómo se implementa?', 'El patrón de diseño Singleton en Java se utiliza para garantizar que una clase tenga una sola instancia y proporcionar un punto de acceso global a esa instancia. Se implementa utilizando un constructor privado, un método estático para obtener la instancia y una variable estática privada para almacenarla.', 'El patrón de diseño Singleton en Java se utiliza para garantizar que una clase tenga una sola instancia y proporcionar un punto de acceso global a esa instancia. Se implementa utilizando un constructor privado, un método estático para obtener la instancia y una variable estática privada para almacenarla.', 'El patrón de diseño Singleton en Java se utiliza para crear múltiples instancias de una clase.'),
            (2, 3, 6, '¿Cuál es la diferencia entre la serialización y la externalización en Java?', 'La serialización en Java es el proceso de convertir un objeto en una secuencia de bytes para que pueda ser almacenado en la memoria, en un archivo o transmitido a través de la red. La externalización es una forma más flexible de serialización que permite a un objeto controlar su propia serialización y deserialización mediante los métodos writeExternal() y readExternal().', 'La serialización en Java es el proceso de convertir un objeto en una secuencia de bytes para que pueda ser almacenado en la memoria, en un archivo o transmitido a través de la red. La externalización es una forma más flexible de serialización que utiliza una interfaz externa para controlar la serialización.', 'La serialización en Java es un proceso que solo se puede aplicar a objetos inmutables. La externalización es un proceso que solo se puede aplicar a objetos mutables.'),
            (2, 3, 6, '¿Cómo se manejan las excepciones controladas y no controladas en Java?', 'En Java, las excepciones controladas son aquellas que se deben declarar en la firma del método o atrapar con un bloque try-catch. Las excepciones no controladas, como las de tiempo de ejecución, no requieren una declaración explícita y pueden ser atrapadas opcionalmente.', 'En Java, las excepciones controladas son aquellas que se deben declarar en la firma del método o atrapar con un bloque try-catch. Las excepciones no controladas, como las de tiempo de ejecución, se deben atrapar obligatoriamente.', 'En Java, las excepciones controladas son aquellas que pueden ser manejadas por el programador. Las excepciones no controladas son aquellas que no se pueden manejar y causan errores en tiempo de ejecución.'),
            (2, 3, 6, '¿Qué es la reflexión en Java y cuál es su utilidad?', 'La reflexión en Java es un mecanismo que permite a un programa examinar y modificar su propia estructura en tiempo de ejecución. Se utiliza para crear herramientas de desarrollo, frameworks de inyección de dependencias, pruebas unitarias y en casos donde la estructura de una clase no es conocida de antemano.', 'La reflexión en Java es un mecanismo que permite a un programa modificar la estructura de una clase en tiempo de ejecución. Se utiliza para crear aplicaciones con interfaces gráficas dinámicas.', 'La reflexión en Java es un mecanismo que permite a un programa examinar y modificar clases predefinidas en tiempo de ejecución.'),
            (2, 3, 6, '¿Cómo se implementa el patrón de diseño Decorator en Java y cuál es su propósito?', 'El patrón de diseño Decorator en Java se implementa creando una jerarquía de clases donde cada clase envuelve a la siguiente en la cadena. Su propósito es añadir funcionalidades a un objeto dinámicamente, sin alterar su interfaz.', 'El patrón de diseño Decorator en Java se implementa creando una jerarquía de clases donde cada clase hereda de la anterior. Su propósito es añadir funcionalidades a un objeto estático, sin alterar su interfaz.', 'El patrón de diseño Decorator en Java se implementa creando una jerarquía de clases donde cada clase implementa métodos adicionales. Su propósito es añadir funcionalidades a un objeto estático, alterando su interfaz.'),
            (2, 3, 6, '¿Qué es el patrón de diseño Observer en Java y cómo se implementa?', 'El patrón de diseño Observer en Java es un patrón de comportamiento que define una dependencia de uno a muchos entre objetos de modo que cuando un objeto cambie de estado, todos sus dependientes sean notificados y actualizados automáticamente. Se implementa utilizando una interfaz Observable y una interfaz Observer.', 'El patrón de diseño Observer en Java es un patrón de creación que define una dependencia de uno a muchos entre objetos de modo que cuando un objeto cambie de estado, todos sus dependientes sean notificados y actualizados automáticamente. Se implementa utilizando una clase Observable y una clase Observer.', 'El patrón de diseño Observer en Java es un patrón de comportamiento que define una dependencia de uno a uno entre objetos de modo que cuando un objeto cambie de estado, su dependiente sea notificado y actualizado automáticamente.'),
            (2, 3, 6, '¿Qué es el patrón de diseño Singleton en Java y cómo se asegura que sea realmente único?', 'El patrón de diseño Singleton en Java se utiliza para garantizar que una clase tenga una sola instancia y proporcionar un punto de acceso global a esa instancia. Para asegurar que sea realmente único, se implementa utilizando un constructor privado, un método estático para obtener la instancia y una variable estática privada para almacenarla.', 'El patrón de diseño Singleton en Java se utiliza para crear múltiples instancias de una clase. Para asegurar que sea realmente único, se implementa utilizando un constructor privado y un método estático para obtener la instancia.', 'El patrón de diseño Singleton en Java se utiliza para garantizar que una clase tenga una sola instancia y proporcionar un punto de acceso global a esa instancia. Se asegura que sea realmente único utilizando un constructor público y una variable estática pública.'),
            (2, 3, 6, '¿Qué es la inyección de dependencias y cómo se implementa en Java?', 'La inyección de dependencias en Java es un patrón de diseño que se utiliza para suministrar las dependencias de un objeto desde el exterior, en lugar de crearlas dentro del objeto mismo. Se implementa utilizando constructores, métodos de configuración o frameworks de inyección de dependencias como Spring.', 'La inyección de dependencias en Java es un patrón de diseño que se utiliza para crear dependencias dentro del objeto mismo. Se implementa utilizando constructores y métodos de inicialización.', 'La inyección de dependencias en Java es un patrón de diseño que se utiliza para suministrar las dependencias de un objeto desde el exterior. Se implementa utilizando frameworks de inyección de dependencias como Spring.');
        `)
    } catch (error) {
        console.error(error);

    } finally {
        if (connection) connection.release();
        process.exit();
    }
}

main();