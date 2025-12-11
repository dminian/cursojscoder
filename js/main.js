// ******************************************************
// DECLARACIÓN DE CONSTANTE NUMERICA Y ARRAY DE OBJETOS.
// ******************************************************

const tasaprima = 0.005;

const arrayMarcasModelos = [
    {
        itemMenu: "1",
        nombre: "Alfa Romeo",
        modelos: [
          { id: "1111", itemMenu: "1", nombre: "147 1.9 JTD 5 PTAS", valorVehiculo: 12550000 },
          { id: "2222", itemMenu: "2", nombre: "147 2.0 TS 5 PTAS", valorVehiculo: 19210000 },
          { id: "3333", itemMenu: "3", nombre: "MITO 1.4 TBI QUADRIFOGLIO", valorVehiculo: 32200000 }
        ]
      },
      {
        itemMenu: "2",
        nombre: "AUDI",
        modelos: [
          { id: "4444", itemMenu: "1", nombre: "A1 1.4T AMBITION", valorVehiculo: 28550000 },
          { id: "5555", itemMenu: "2", nombre: "A4 2.0 T L/12 ATTRACTION", valorVehiculo: 37250000 },
          { id: "6666", itemMenu: "3", nombre: "A5 2.0 T QUATTRO S TRONIC", valorVehiculo: 41250000 }
        ]
      },
      {
        itemMenu: "3",
        nombre: "BMW",
        modelos: [
          { id: "7777", itemMenu: "1", nombre: "220I COUPE SPORT LINE", valorVehiculo: 28550000 }
        ]
      },
      {
        itemMenu: "4",
        nombre: "Ferrari",
        modelos: []
      }
]

// ******************************************************
// FUNCIONES DECLARATIVAS, ANÓNIMAS, Y FLECHA
// ******************************************************

// ARMA EL MENU DE MODELOS SEGÚN LA MARCA.
function getOpcionesModelosPorMarca(itemMarcaMenu)
{

    let marcaSeleccionada = arrayMarcasModelos.find(marca => marca.itemMenu == itemMarcaMenu )

    if (!marcaSeleccionada)
        return undefined;

    let opcionesModelos = "";
    
    for (modelo of marcaSeleccionada.modelos)
        opcionesModelos += modelo.itemMenu + "-" + modelo.nombre + "\n";

    return opcionesModelos;
}

// COTIZA UN SEGURO SEGÚN EL VALOR DEL VEHICULO Y LA TASA DE LA PRIMA.
CotizarSeguro = function (valor) { return formatDecimales(valor * tasaprima)};

function formatDecimales(valor, cantDecimales)
{
    // FORMATEA DECIMALES PARA MOSTRAR POR PANTALLA. ...XXX.XXX.XXX,XX
    return valor.toFixed(cantDecimales).replace(".",",").replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

// ******************************************************
// LÓGICA PRINCIPAL
// USO DE LET, FOR OF, PROMPT, CONFIRM, ALERT, SWITCH CASE, FUNCIÓN ToUpperCase, Arrays, función find, IF ELSE, DO WHILE.
// ******************************************************

const opcionesMarcas = arrayMarcasModelos
  .map(m => `${m.itemMenu} - ${m.nombre}`)
  .join("\n");

let recotizar="S";

do
{

    // CONSULTA MARCA DEL VEHICULO.   
    let opcionMarcaSeleccionada = prompt(
        "BIENVENIDA/O AL COTIZADOR DE SEGUROS DE AUTOS:\n\nSeleccione la marca:\n" + opcionesMarcas + "\n\nS=SALIR");

    if(!opcionMarcaSeleccionada)
    {
        // SI HACE CLICK EN EL BOTÓN DE CANCELAR.
        alert("Si desea salir del cotizador ingrese la opción S=SALIR");
        continue;
    }

    if (opcionMarcaSeleccionada.toUpperCase() == "S")
    {
        // SALIR.
        recotizar="N";
        continue;
    }

    let marcaSeleccionada = arrayMarcasModelos.find(marca => marca.itemMenu == opcionMarcaSeleccionada);

    if (!marcaSeleccionada)
    {
        // MARCA NO EXISTE.
        alert("El item del menú no existe!");
        continue;
    }

    let opcionesModelos = getOpcionesModelosPorMarca(opcionMarcaSeleccionada)
    
    if (!opcionesModelos)
    {
        // MARCA SIN MODELOS PARA COTIZAR.
        alert("Actualmente no se pueden cotizar modelos para la marca seleccionada.");
        continue;
    }


    // ARMA EL MENÚ DE MODELOS. USO DE FUNCIONES COMUNES.
    let opcionModeloSeleccionado = prompt("Seleccione el modelo:\n" + getOpcionesModelosPorMarca(opcionMarcaSeleccionada) + "\nV=VOLVER \nS=SALIR");

    if (!opcionModeloSeleccionado)
        continue;

    opcionModeloSeleccionado = opcionModeloSeleccionado.toUpperCase();

    switch (opcionModeloSeleccionado)
    {
        case "S": recotizar="N"; break;
        case "V": break;
        default:

            if (opcionModeloSeleccionado == "S")
            {
                // SALIR
                recotizar="N";
                continue;     
            }       

            let modeloSeleccionado = marcaSeleccionada.modelos.find(modelo => modelo.itemMenu == opcionModeloSeleccionado);
            if (!modeloSeleccionado)
            {
                // SI INGRESA UN ITEM NO EXISTENTE
                alert("El item del menú no existe!");
                continue;
            }

            // LLAMADA A FUNCIÓN DE COTIZACION
            let prima = CotizarSeguro(modeloSeleccionado.valorVehiculo);

            // USO DEL CONFIRM

            if (!confirm(
                "LA COTIZACIÓN DEL SEGURO PARA EL VEHÍCULO " +
                marcaSeleccionada.nombre +
                " " +
                modeloSeleccionado.nombre +
                " ES DE: $" + prima + 
                " + IVA.\n\n¿Desea cotizar otro vehículo?"))
                    recotizar="N";

            break;
    }
} while(recotizar.toUpperCase()=="S")

alert("GRACIAS POR USAR NUESTRO COTIZADOR. HASTA LA PRÓXIMA!!")