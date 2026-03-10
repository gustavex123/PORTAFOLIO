function cepillarDientes() {
    console.log("1. Cepillando los dientes .... (entra y sale de la pila rapido)");
}
 
function bañarse() {
    cepillarDientes(); //se apila encima de bañarse
    console.log("2. cuerpo limpio (bañarse termina ahora)");
}
 
function empezarDia(){
    bañarse(); //se apila encima de empezarDia
    console.log("3. listo para trabajar (pila vacia )");
}
 
empezarDia(); //se apila empezarDia
 
const botonProyectos = document.getElementById("ver-proyectos");
function mostrarProyectos() {
    const proyectosSection = document.getElementById("proyectos");
    proyectosSection.scrollIntoView({ behavior: "smooth" });
}
botonProyectos.addEventListener("click", mostrarProyectos);
 
  
 
// Cambiar tema
const botonTema = document.getElementById("btn-tema");
const cuerpoPagina = document.body;
/*function alternarTema() {
    if(cuerpoPagina.style.backgroundColor === "black") {
        cuerpoPagina.style.backgroundColor = "white";
        cuerpoPagina.style.color = "black"; //cambio del texto a negro
    }else{
        //si NO ES negro, lo cambiamos a tema negro
        cuerpoPagina.style.backgroundColor = "black";
        cuerpoPagina.style.color = "white"; //cambio del texto a blanco
    }
   
}
botonTema.addEventListener("click", alternarTema);*/
 
// ejemplo: alerta al hacer clic de un proyecto
 
const todasLasTarjetas = document.querySelectorAll(".proyecto-card");
 
todasLasTarjetas.forEach(tarjeta => {
    tarjeta.addEventListener("click", function() {
        const nombreProyecto = tarjeta.querySelector("h3").innerText;
        alert("Haz hecho clic en el proyecto: " + nombreProyecto);
    });
});
 
///variables: let (que puede cambiar)  - const (es fijo que no cambia)
const nombreDev= "Gustavo Arando"; // fijo  no cambia
let proyectosCompletados = 4; // puede aumentar o disminuir  o variar en el tiempo  dependiendo del scope
 
// tipos primitivos
let esInstructor = true; // boolean
let edad = 34;  //number
let saludo = "Gustavo Arando" //string
 
// tipos de datos complejos
let habilidades = ["JavaScript", "HTML", "CSS"];
let experiencia = {
    años: 10,
    empresas: ["Google", "Facebook", "Amazon"]
};
 
const proyectoNuevo = {
    nombre: "Portafolio Personal",
    descripcion: "Un sitio web para mostrar mis proyectos y habilidades.",
    tecnologias: ["HTML", "CSS", "JavaScript"],
    completado: false
};
const changeBackgroundButton = document.getElementById("change-bg-btn");
const originalBackgroundColor = getComputedStyle(document.body).backgroundColor;
let isMidnightBlue = false;

/*changeBackgroundButton.addEventListener("click", function () {
  if (isMidnightBlue) {
    document.body.style.backgroundColor = originalBackgroundColor;
  } else {
    document.body.style.backgroundColor = "midnightblue";
  }

  isMidnightBlue = !isMidnightBlue;
});*/
const elemento = document.getElementById("proyecto-card");

// Cambiar a rojo al pasar el mouse
elemento.addEventListener("mouseover", function() {
    elemento.style.backgroundColor = "blue";
});
// Volver al color original al salir
elemento.addEventListener("mouseout", function() {
    elemento.style.backgroundColor = ""; // Vacío elimina el estilo en línea
});


 
// entender la visibilidad de las variables y la memoria de las funciones
 
function crearContadorDeProyectos(inicial) {
    let contador = inicial; //variable privada gracias al closure
 
    return{
        incrementar: function() {
            contador++;
            return `Ahora tienes ${contador} proyectos.`;
        },
        obtenerTotal: () => contador //funcion flecha para obtener el valor actual del contador
    };
}  
 
const miContador = crearContadorDeProyectos(4);
console.log(miContador.incrementar()); // Ahora tienes 5 proyectos.
console.log(miContador.contador); // undefined, no se puede acceder directamente al contador
 
 
// otro ejemplo
function crearRastreador(){
    //local/function scope: solo vive aqui dentro de la funcion
    let conteo = 0; //variable privada, no accesible desde fuera
    return function() { //closure que mantiene acceso a conteo
        conteo++;
        return ` has intentado ver los proyectos ${conteo}`;
    };
}
 
const rastrearclick = crearRastreador();
console.log(rastrearclick()); // has intentado ver los proyectos 1
console.log(rastrearclick()); // has intentado ver los proyectos 2  
 
 
 
// mutaciones  
 
const misProyectos = [
    {nombre: "E-commerce", techs: ["React", "Node.js"]},
    {nombre: "Blog Personal", techs: ["Gatsby", "GraphQL"]},
    {nombre: "App de Tareas", techs: ["Vue", "Gatsby"]}
];
//usamoremos reduce para contar ocurrencias de cada tecnología en los proyectos
const stackStats = misProyectos
                .flatMap (p=> p.techs) //extraemos todas las techs en un solo array
                .reduce((acc, tech) => {
                    acc[tech] = (acc[tech] || 0) + 1;
                    return acc;
                }, {});
console.log(stackStats); // { React: 1, 'Node.js': 1, Gatsby: 2, GraphQL: 1, Vue: 1 }
 
// filter(): creamos un nuevo array con proyectos que usan React
const proyectosReact = misProyectos.filter(p => p.techs.includes("React"));
 
//map(): creamos un nuevo array con solo los nombres de los proyectos
const nombresProyectos = misProyectos.map(p => p.nombre);
 
// ejemplo de carga de portafolio  con fetch() y async/await
 
async function cargarProyectos() {
    try {
        const response = await fetch("https://api.github.com/users/loquendo2309/repos");
        if (!response.ok) {
            throw new Error("Error al cargar los proyectos");
        }
        const proyectos = await response.json();
        const contenedorProyectos = document.getElementById("contenedor-proyectos");
        contenedorProyectos.innerHTML = ""; //limpiar el contenedor antes de agregar nuevos proyectos
        proyectos.forEach(proyecto => {
            contenedorProyectos.innerHTML += `
                <div class="proyecto-card">
                    <h3>${proyecto.name}</h3>  
                    <p>${proyecto.description || "Sin descripción"}</p>
                    <a href="${proyecto.html_url}" target="_blank">Ver en GitHub</a>
                </div>
                    `;
        });
    } catch (error) {
        console.error("Error:", error);
    }
}
 
cargarProyectos();
 
/// modularidad
// controlador de interfaz
const UI = {
    cuerpo: document.body,
 
    alternarColor: function() {
        const esOscuro = this.cuerpo.style.backgroundColor === "gray";
        this.cuerpo.style.backgroundColor = esOscuro ? "black" : "gray";
        this.cuerpo.style.color = esOscuro ? "gray" : "black";
    },
    irAseccion: function(id) {
        document.getElementById(id).scrollIntoView({ behavior: "smooth" }); }
 
};
botonTema = document.getElementById("btn-tema");
botonTema.addEventListener("click", () => UI.alternarColor());