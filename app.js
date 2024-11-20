// Establecemos la fecha actual y la variable para controlar la visibilidad de la agenda
let fechaActual = new Date();

// Variable para controlar si el contenedor de agenda está visible
let agendaVisible = true;

// Datos de citas por día, cada día tiene una lista con las horas y detalles de las citas
const citasPorDia = {
  "18-11-2024": [
    { hora: "9:00", texto: "Tenorio<br>Peluquería" },
    { hora: "10:00", texto: "Luis<br>Peinado" },
    { hora: "11:00", texto: "Kevin<br>Corte cabello" },
    { hora: "13:00", texto: "angely<br>Manicura" },
  ],
  "19-11-2024": [
    { hora: "8:00", texto: "Alejandro<br>Corte barba" },
    { hora: "9:00", texto: "Daniel<br>Corte cabello" },
    { hora: "10:00", texto: "Marlon<br>Peinado" },
    { hora: "11:00", texto: "Camilo<br>Peluquería" },
    { hora: "12:00", texto: "Luis<br>Pedicura" },
    { hora: "13:00", texto: "Gian<br>Pedicura" },
    { hora: "14:00", texto: "Marlon<br>Maquillaje" },
    { hora: "15:00", texto: "Karent<br>Peinado" },
    { hora: "16:00", texto: "Karent<br>Peinado" },
  ],
  "20-11-2024": [
    { hora: "9:00", texto: "Daniel<br>Corte cabello" },
    { hora: "10:00", texto: "Marlon<br>Peinado" },
    { hora: "12:00", texto: "Miguel<br>Corte barba" },
    { hora: "11:00", texto: "Robert<br>Manicura" },
  ],
  "21-11-2024": [
    { hora: "8:00", texto: "Gian<br>Maquillaje" },
    { hora: "10:00", texto: "Kevin<br>Corte cabello" },
    { hora: "12:00", texto: "Karent<br>Pedicura" },
    { hora: "14:00", texto: "Luis<br>Manicura" },
  ],
  "22-11-2024": [
    { hora: "9:00", texto: "angely<br>Pedicura" },
    { hora: "11:00", texto: "Camilo<br>Maquillaje" },
    { hora: "12:00", texto: "Alejandro<br>Corte cabello" },
    { hora: "14:00", texto: "Marlon<br>Peluquería" },
  ],
  "23-11-2024": [
    { hora: "9:00", texto: "Daniel<br>Corte barba" },
    { hora: "10:00", texto: "Robert<br>Peinado" },
    { hora: "11:00", texto: "Miguel<br>Manicura" },
    { hora: "14:00", texto: "Gian<br>Pedicura" },
  ],
  "24-11-2024": [
    { hora: "8:00", texto: "Kevin<br>Maquillaje" },
    { hora: "10:00", texto: "Luis<br>Corte cabello" },
    { hora: "11:00", texto: "Mauna<br>Peinado" },
    { hora: "14:00", texto: "Karent<br>Manicura" },
  ],
  "25-11-2024": [
    { hora: "9:00", texto: "Tenorio<br>Maquillaje" },
    { hora: "10:00", texto: "angely<br>Peluquería" },
    { hora: "11:00", texto: "Luis<br>Manicura" },
    { hora: "14:00", texto: "Marlon<br>Pedicura" },
  ],
  "26-11-2024": [
    { hora: "9:00", texto: "Kevin<br>Corte barba" },
    { hora: "10:00", texto: "Robert<br>Peinado" },
    { hora: "12:00", texto: "Camilo<br>Maquillaje" },
    { hora: "14:00", texto: "Daniel<br>Pedicura" },
  ],
  "27-11-2024": [
    { hora: "9:00", texto: "angely<br>Corte cabello" },
    { hora: "10:00", texto: "Miguel<br>Peinado" },
    { hora: "11:00", texto: "Luis<br>Maquillaje" },
    { hora: "14:00", texto: "Gian<br>Pedicura" },
  ],
};

// Función para renderizar el calendario del mes
function renderizarCalendario() {
  const mesAño = document.getElementById("mesAño");
  const diasCalendario = document.getElementById("diasCalendario");

  const mes = fechaActual.getMonth(); // Obtener el mes actual
  const año = fechaActual.getFullYear(); // Obtener el año actual

  // Mostramos el mes y el año en la cabecera
  mesAño.textContent = `${fechaActual.toLocaleString("default", {
    month: "long",
  })} ${año}`;

  const primerDia = new Date(año, mes, 1).getDay(); // Primer día del mes
  const ultimoDia = new Date(año, mes + 1, 0).getDate(); // Último día del mes

  diasCalendario.innerHTML = ""; // Limpiamos el contenido previo del calendario

  // Creamos celdas vacías antes del primer día del mes
  for (let i = 0; i < primerDia; i++) {
    const divVacio = document.createElement("div");
    diasCalendario.appendChild(divVacio);
  }

  // Creamos las celdas de los mnombres de los días del mes
  for (let dia = 1; dia <= ultimoDia; dia++) {
    const diaDiv = document.createElement("div");
    diaDiv.textContent = dia;
    diaDiv.onclick = () => abrirCalendario(dia, mes + 1, año); // Se pasa el día, mes y año

    // Resaltamos el día actual
    if (
      dia === new Date().getDate() &&
      mes === new Date().getMonth() &&
      año === new Date().getFullYear()
    ) {
      diaDiv.id = "hoy"; // Le asignamos un ID especial para destacar el día
    }

    diasCalendario.appendChild(diaDiv); // Añadimos el día al calendario
  }

  // Añadimos celdas vacías para completar la cuadrícula del calendario
  const totalCeldas = primerDia + ultimoDia;
  const celdasRestantes = 42 - totalCeldas;

  for (let i = 0; i < celdasRestantes; i++) {
    const divVacio = document.createElement("div");
    diasCalendario.appendChild(divVacio);
  }
}

// Función para cambiar el mes mostrado
function cambiarMes(desplazamiento) {
  fechaActual.setMonth(fechaActual.getMonth() + desplazamiento); // Aumentamos o disminuimos el mes
  renderizarCalendario(); // Vuelvo a renderizar el calendario con el nuevo mes
}

// Función para abrir el calendario cuando se hace clic en un día
function abrirCalendario(dia, mes, año) {
  const fechaClave = formatDate(dia, mes, año);
  const citas = citasPorDia[fechaClave] || []; // Buscamos las citas de ese día
  renderizarAgenda(citas, dia, mes, año); // Renderizamos la agenda con las citas

  // Controlamos la visibilidad de la agenda
  const agenda = document.getElementById("agenda");
  const agendaGrid = document.getElementById("agendaGrid");

  // Ocultar el mensaje inicial y mostrar la agenda
  agendaGrid.style.display = "grid"; // Mostramos la agenda
  agenda.style.display = "block"; // Mostramos el contenedor de la agenda
  agendaVisible = true; // Marcamos que la agenda está visible
}

// Función para formatear las fechas en formato 'dd-mm-aaaa'
function formatDate(dia, mes, año) {
  return `${String(dia).padStart(2, "0")}-${String(mes).padStart(
    2,
    "0"
  )}-${año}`;
}
// Función para determinar cuántos días mostrar en el calendario según el tamaño de la pantalla
function getDiasAMostrar() {
  if (window.innerWidth <= 995) return 3;
  if (window.innerWidth <= 1059) return 4;
  if (window.innerWidth <= 1221) return 5;
  if (window.innerWidth <= 1258) return 6;
  return 6; // si no esta enre esos rangos se pone por defecto mostramos 6 días
}

// Función para renderizar la agenda del día
function renderizarAgenda(citas, dia, mes, año) {
  const agendaGrid = document.getElementById("agendaGrid");
  agendaGrid.innerHTML = "";

  const dias = [
    "Domingo",
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado",
  ];
  const horas = [
    "8:00",
    "9:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
  ];

  // Creamos la celda de 'HORARIO' en la primera fila
  agendaGrid.appendChild(createCell("HORARIO", "headerCelda"));

  // Determinamos el primer día de la semana del día seleccionado
  const primerDiaSemana = new Date(año, mes - 1, dia).getDay(); // Día de la semana del primer día seleccionado (0 = Domingo)

  // Mostramos los días de la semana
  const diasAMostrar = getDiasAMostrar(); // Determinamos cuántos días mostrar

  for (let i = 0; i < diasAMostrar; i++) {
    const cell = createCell("", "headerCelda");
    const diaSemana = (primerDiaSemana + i) % 7; // Calculamos el día de la semana

    // Calculamos la fecha para cada día y lo mostramos si está dentro del mes
    const fechaFormateada = new Date(año, mes - 1, dia + i);
    const diaDelMes = fechaFormateada.getDate(); // Ahora obtenemos el día como número directamente del objeto Date

    // Si la fecha calculada es del siguiente mes, no la mostramos
    if (fechaFormateada.getMonth() !== mes - 1) {
      cell.innerHTML = ""; // Si la fecha es del mes siguiente, la dejamos vacía
    } else {
      // Hacemos clickeable cada día de la semana
      cell.innerHTML = `<div class="diaHeader">${dias[diaSemana]}</div><div class="diaNumero" onclick="actualizarAgenda(${diaDelMes}, ${mes}, ${año})">${diaDelMes}</div>`;
    }

    agendaGrid.appendChild(cell);
  }

  // Recorremos las horas y mostramos las citas
  horas.forEach((hour) => {
    agendaGrid.appendChild(createCell(hour, "celdaTiempo")); // Añadimos la columna de horas
    for (let i = 0; i < diasAMostrar; i++) {
      const fechaClave = formatDate(dia + i, mes, año); // Fecha del día seleccionado
      const cita = citasPorDia[fechaClave]
        ? citasPorDia[fechaClave].find((a) => a.hora === hour)
        : null; // Buscamos si hay una cita a esa hora

      if (cita) {
        // Si hay una cita, la mostramos en la celda correspondiente
        const cell = createCell(cita.texto, "diaCelda cita");
        cell.innerHTML = cita.texto;
        cell.style.backgroundColor = "#A88B73"; // Le damos un color a la celda con cita
        agendaGrid.appendChild(cell); // Insertar la cita solo en la celda correspondiente
      } else {
        agendaGrid.appendChild(createCell("", "diaCelda")); // Si no hay cita, dejamos la celda vacía
      }
    }
  });
}

// Función para actualizar la agenda al hacer clic en un día
function actualizarAgenda(dia, mes, año) {
  const fechaClave = formatDate(dia, mes, año);
  const citas = citasPorDia[fechaClave] || [];
  renderizarAgenda(citas, dia, mes, año); //  // Actualizamos la agenda con las citas de ese día
}

// Función para crear una celda de la agenda
function createCell(text, className) {
  const cell = document.createElement("div");
  cell.className = `celda ${className}`;
  cell.textContent = text;
  return cell;
}

// Evento que cierra la agenda si se hace clic fuera de ella
document.addEventListener("click", function (event) {
  const agenda = document.getElementById("agenda");
  const calendarioDiv = document.getElementById("diasCalendario");
  const mensajeInicial = document.getElementById("mensajeInicial");
  const agendaGrid = document.getElementById("agendaGrid");

  // Verifica si el clic es fuera del calendario y de la agenda
  if (
    agendaVisible &&
    !agenda.contains(event.target) &&
    !calendarioDiv.contains(event.target)
  ) {
    agendaGrid.style.display = "none"; // Ocultamos la agenda
    mensajeInicial.style.display = "block"; // Mostramos el mensaje inicial
    agendaVisible = false; // Marcamos que la agenda no está visible
  }
});

// Prevenir que el clic en los días de la agenda cierre el modal
document
  .getElementById("agendaGrid")
  .addEventListener("click", function (event) {
    event.stopPropagation(); // Esto evita que el clic en la agenda se propague al evento de cierre del modal
  });

window.addEventListener("resize", function () {
  if (agendaVisible) {
    const diaSeleccionado = fechaActual.getDate(); // Obtiene el día seleccionado
    const mesSeleccionado = fechaActual.getMonth() + 1; // Obtiene el mes seleccionado (sumando 1 porque los meses en JavaScript comienzan desde 0)
    const añoSeleccionado = fechaActual.getFullYear(); // Obtiene el año seleccionado

    // Vuelve a renderizar la agenda con la fecha actual seleccionada
    renderizarAgenda([], diaSeleccionado, mesSeleccionado, añoSeleccionado);
  }
});

// Evento que se ejecuta cuando el DOM se ha cargado completamente
document.addEventListener("DOMContentLoaded", function () {
  renderizarCalendario(); // Inicializa el calendario al cargar la página

  const agenda = document.getElementById("agenda"); // Obtiene el contenedor de la agenda
  const mensajeInicial = document.getElementById("mensajeInicial"); // Obtiene el mensaje inicial
  const agendaGrid = document.getElementById("agendaGrid"); // Obtiene la cuadrícula de la agenda

  // Muestra el mensaje inicial y oculta la agenda al cargar la página
  agenda.style.display = "block"; // Muestra el contenedor de la agenda
  mensajeInicial.style.display = "block"; // Muestra el mensaje inicial
  agendaGrid.style.display = "none"; // Oculta la cuadrícula de la agenda
});
