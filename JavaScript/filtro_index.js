document.addEventListener('DOMContentLoaded', function() {
    // Captura los parámetros de la URL
    const urlParams = new URLSearchParams(window.location.search);

    // Rellena automáticamente el formulario si hay parámetros en la URL
    document.getElementById('accion').value = urlParams.get('opcion_accion') || 'venta';
    document.getElementById('barrio').value = urlParams.get('barrio') || '';

    document.querySelector('form').addEventListener('submit', function(event) {
        event.preventDefault(); // Evita que el formulario se envíe

        // Captura la opción seleccionada en el formulario
        const accion = document.getElementById('accion').value;

        // Captura los valores de los filtros
        const barrio = document.getElementById('barrio').value;

        // Guarda los valores de los filtros en el almacenamiento local del navegador
        localStorage.setItem('filtros', JSON.stringify({
            accion,
            barrio
        }));

        // Construye la URL con la página de destino
        let url = '';
        if (accion === 'venta') {
            url = './HTML/venta.html';
        } else if (accion === 'renta') {
            url = './HTML/renta.html';
        }

        // Redirige a la página de destino
        window.location.href = url;
    });

    // Carga los filtros guardados cuando se carga la página
    const savedFilters = JSON.parse(localStorage.getItem('filtros'));
    if (savedFilters) {
        document.getElementById('accion').value = savedFilters.accion || 'venta';
        document.getElementById('barrio').value = savedFilters.barrio || '';
    }
});
