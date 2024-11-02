// Cargar cálculos guardados al iniciar
document.addEventListener('DOMContentLoaded', cargarCalculosGuardados);

// Escucha de eventos para los formularios de cálculo
document.getElementById('reintegroForm').addEventListener('submit', function (event) {
    event.preventDefault();
    const empresa = document.getElementById('empresa').value;
    const porcentaje = parseFloat(document.getElementById('porcentaje').value);
    const tope = parseFloat(document.getElementById('tope').value);
    const periodo = document.getElementById('periodo').value;
    const ahorro = calcularReintegro(porcentaje, tope);
    agregarCalculo(`Reintegro de ${empresa} (${periodo}): Debes Pagar $${ahorro}`);
});

document.getElementById('combustibleForm').addEventListener('submit', function (event) {
    event.preventDefault();
    const valorLitro = parseFloat(document.getElementById('valorLitro').value);
    const kilometros = parseFloat(document.getElementById('kilometros').value);
    const consumo = parseFloat(document.getElementById('consumo').value);
    const costo = calcularCombustible(valorLitro, kilometros, consumo);
    agregarCalculo(`Combustible: Costo total $${costo}`);
});

function calcularReintegro(porcentaje, tope) {
    // Calcular el gasto necesario para aprovechar el reintegro máximo
    const gastoNecesario = (tope * 100) / porcentaje;
    return gastoNecesario.toFixed(2); // Retorna el gasto necesario para alcanzar el tope de reintegro
}

function calcularCombustible(valorLitro, kilometros, consumo) {
    const litrosNecesarios = (kilometros / 100) * consumo;
    return (litrosNecesarios * valorLitro).toFixed(2);
}

// Agregar cálculo a la lista con opciones de edición y eliminación
function agregarCalculo(texto) {
    const lista = document.getElementById('calculoList');
    const item = document.createElement('li');
    item.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
    
    // Crear el contenedor del texto y los botones
    const contenidoTexto = document.createElement('span');
    contenidoTexto.textContent = texto;
    item.appendChild(contenidoTexto);

    // Crear botones de edición y eliminación
    const btnGroup = document.createElement('div');
    
    const btnEditar = document.createElement('button');
    btnEditar.textContent = 'Editar';
    btnEditar.classList.add('btn', 'btn-warning', 'btn-sm', 'me-2');
    btnEditar.onclick = function () {
        editarCalculo(item, contenidoTexto);
    };
    
    const btnEliminar = document.createElement('button');
    btnEliminar.textContent = 'Eliminar';
    btnEliminar.classList.add('btn', 'btn-danger', 'btn-sm');
    btnEliminar.onclick = function () {
        eliminarCalculo(item, texto);
    };

    btnGroup.appendChild(btnEditar);
    btnGroup.appendChild(btnEliminar);
    item.appendChild(btnGroup);
    lista.appendChild(item);

    guardarCalculo(texto);  // Guardar en almacenamiento local
}

// Función para editar un cálculo
function editarCalculo(item, contenidoTexto) {
    const nuevoTexto = prompt("Editar cálculo:", contenidoTexto.textContent);
    if (nuevoTexto) {
        eliminarCalculo(item, contenidoTexto.textContent);  // Remover el cálculo original del almacenamiento
        contenidoTexto.textContent = nuevoTexto;
        guardarCalculo(nuevoTexto);  // Guardar el cálculo editado
    }
}

// Función para eliminar un cálculo
function eliminarCalculo(item, texto) {
    item.remove();  // Eliminar de la interfaz
    let calculos = JSON.parse(localStorage.getItem('calculos')) || [];
    calculos = calculos.filter(calculo => calculo !== texto);
    localStorage.setItem('calculos', JSON.stringify(calculos));
}

// Función para guardar un cálculo en el almacenamiento local
function guardarCalculo(texto) {
    let calculos = JSON.parse(localStorage.getItem('calculos')) || [];
    calculos.push(texto);
    localStorage.setItem('calculos', JSON.stringify(calculos));
}

// Función para cargar cálculos desde el almacenamiento local al iniciar
function cargarCalculosGuardados() {
    const calculos = JSON.parse(localStorage.getItem('calculos')) || [];
    calculos.forEach(calculo => agregarCalculo(calculo));
}

document.getElementById('toggleCalculator').addEventListener('click', function () {
    const calculator = document.querySelector('.simple-calculator');
    if (calculator.classList.contains('d-none')) {
        calculator.classList.remove('d-none');
        this.textContent = 'Cerrar Calculadora'; // Cambiar el texto del botón
    } else {
        calculator.classList.add('d-none');
        this.textContent = 'Abrir Calculadora'; // Cambiar el texto del botón
    }
});


// Calculadora simple
function appendCalc(value) {
    const calcInput = document.getElementById('calcInput');
    if (calcInput.value === "0") {
        calcInput.value = value;
    } else {
        calcInput.value += value;
    }
}

function clearCalc() {
    document.getElementById('calcInput').value = "0";
}

function calculate() {
    const calcInput = document.getElementById('calcInput');
    try {
        calcInput.value = eval(calcInput.value) || "0";
    } catch (error) {
        calcInput.value = "Error";
    }
}

// Función para limpiar los datos de un formulario específico
function clearForm(formId) {
    document.getElementById(formId).reset();
}

// Limpiar todos los datos de la lista y el almacenamiento local
function limpiarDatos() {
    document.getElementById('calculoList').innerHTML = '';
    localStorage.removeItem('calculos');
}


