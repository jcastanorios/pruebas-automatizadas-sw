import LoginGhost from "../../../support/login"; // Importar módulo de inicio de sesión
import TagTest from "../../../support/tagTest7"; // Importar el Tag Object creado
//import { faker } from '@faker-js/faker'; // Importar faker para generar datos falsos

const dataPrueba = require("./data/titulo_corto.json");
const dataPrueba2 = require("./data/titulos_largos.json");


describe("Escenario para validar y verificar la creación y la publicación de un tag en la aplicación ghost", () => {
    //Credenciales de ghost
    const USER_GHOST = "wilderlopezm@gmail.com"; 
    const PASS_GHOST = "12345678901"; 

    beforeEach(() => {
        //Inciar sesión en ghost antes de comenzar la prueba
        LoginGhost.visit(); 
        LoginGhost.diligenciarEmail(USER_GHOST); 
        LoginGhost.diligenciarPassword(PASS_GHOST);
        LoginGhost.clickBotonSignIn(); 
    });

    it("Primer caso: Crear tag con datos aleatorios, no limitados en Ghost...", () => {
        let indice = new Number();
        let indice2 = new Number();
        let tituloTag = new String();
        let slug = new String();
        let descript = new String();

        //título
        indice = getRandom(0, dataPrueba.length);
        tituloTag = dataPrueba[indice];
        console.log("Datos Tag ", dataPrueba);
        tituloTag = JSON.stringify(dataPrueba[indice].title).replace(/"/g, '');
        //slug
        slug = JSON.stringify(dataPrueba[indice].title).replace(/"/g, '');
        //descripcion
        indice2 = getRandom(0, dataPrueba2.length);
        descript = dataPrueba2[indice2];
        console.log("Datos descript ", dataPrueba2);
        descript = JSON.stringify(dataPrueba2[indice2].title).replace(/"/g, '');
        
        newTag(); // Llamar a la función para crear y publicar un tag
        createTag(tituloTag, slug, descript); // datos new tag
        saveTag(); // guardar new tag
        cy.wait(2000); // Esperar 2 segundos
    });

});


function newTag(){

    TagTest.visit(); // Visitar la página de tags
    TagTest.clickNewTag(); // Hacer clic en el botón "New tag"
}

function createTag(tituloTag, slug, descript){
    TagTest.CreateNewTag(tituloTag, slug, descript); // Crear datos de tags
}
function saveTag(){
    TagTest.SaveNewTag(); // Crear datos de tags
}
function getRandom(min, max) {
    max = max - 1;
    return Math.floor(Math.random() * (max - min)) + min;
}