const cotizador = new API('8c26111f95f7c677a8b9f2e322108f44879824d601c7724e4a48892d012c03d3');
const ui = new Interfaz();

//leer el formulario

const formulario = document.querySelector('#formulario');
//eventListener
formulario.addEventListener('submit', e =>{
    e.preventDefault();
    
    //leer la moneda seleccionada
    const monedaSelect = document.querySelector('#moneda');
    const monedaSeleccionada = monedaSelect.options[monedaSelect.selectedIndex].value;
    
    //leer la criptomoneda seleccionada
    const criptoMonedaSelect = document.querySelector('#criptomoneda');
    const criptoMonedaSeleccionada = criptoMonedaSelect.options[criptoMonedaSelect.selectedIndex].value;
    
    //comprobar que ambos campos tengan algo seleccionado
    if (monedaSeleccionada === '' || criptoMonedaSeleccionada == '') {
        //arrojar una alerta de error
        ui.mostrarMensaje('Ambos campos son obligatorios', 'alert bg-danger text-center');
    } else{
        cotizador.obtenerValores(monedaSeleccionada, criptoMonedaSeleccionada)
            .then(data =>{
                ui.mostrarResultado(data.resultado.RAW, monedaSeleccionada, criptoMonedaSeleccionada);
            })
    }
    
})