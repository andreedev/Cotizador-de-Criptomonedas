class Interfaz{
    constructor(){
        this.init();
    }
    
    init(){
        this.construirSelect();
    }
    
    construirSelect(){
        cotizador.obtenerMonedasAPI()
            .then(monedas =>{
                //crear un select de ociones
                const select = document.querySelector('#criptomoneda');
                
                //cada una de las monedas que nos envia esta API son objetos, pero la llave del objeto es el nombre de la criptomoneda
                //Object.entries convierte los valores key-value de un objeto en un array
                
                //iterar por los resultados de la api
                for(const [key,value] of Object.entries(monedas.monedas.Data)){
                    //añadir el Symbol y el Nombre como opciones del select
                    const opcion=document.createElement('option');
                    opcion.value = value.Symbol;
                    opcion.appendChild(document.createTextNode(value.CoinName));
                    select.appendChild(opcion);
                }
                
            })
    }
    
    mostrarMensaje(mensaje, clases){
        const div = document.createElement('div');
        div.className = clases;
        div.appendChild(document.createTextNode(mensaje));
        
        //seleccionar mensajes
        const divMensaje = document.querySelector('.mensajes');
        divMensaje.appendChild(div);
        //mostrar contenido
        setTimeout(() => {
            document.querySelector('.mensajes div').remove();
        }, 2500);
    }
    
    //Imprime el resultado de la cotización
    mostrarResultado(resultado, moneda, crypto){
        
        //En caso de un resultado anterior, ocultarlo
        const resultadoAnterior = document.querySelector('#resultado > div');
        
        if (resultadoAnterior) {
            resultadoAnterior.remove();
        }
        
        const datosMoneda = resultado[crypto][moneda];
        console.log(datosMoneda);
        
        //recortar digitos de precio
        let precio = datosMoneda.PRICE.toFixed(2),
            porcentaje = datosMoneda.CHANGEPCTDAY.toFixed(2),
            //toLocaleDateString: toma una fecha y convertirla al español o donde vivas
            actualizado = new Date(datosMoneda.LASTUPDATE * 1000).toLocaleDateString('es-PE');
        
        //construir el template
        let templateHTML = `
            <div class="card bg-warning">
                <div class="card-body text-light">
                    <h2 class="card-title">Resultado</h2>
                    <p>El precio de ${datosMoneda.FROMSYMBOL} a moneda ${datosMoneda.TOSYMBOL} es de $ ${precio}</p> 
                    <p>Variación último día: ${porcentaje}%</p>
                    <p>Última Actualización: ${actualizado}</p>
                </div>
            </div>
        `;
        
        this.mostrarOcultarSpinner('block');
        
        setTimeout(() => {
            //insertar el resultado
            document.querySelector('#resultado').innerHTML = templateHTML;
            //ocultar el spinner
            this.mostrarOcultarSpinner('none');
        }, 3000);
        
        
    }
    
    //mostrar un spinner de carga al enviar la cotización
    mostrarOcultarSpinner(vista){
        const spinner = document.querySelector('.contenido-spinner');
        spinner.style.display = vista;
    }
}