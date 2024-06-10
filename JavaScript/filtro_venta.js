$(document).ready(function() {
    $('#filter-form').submit(function(event) {
        event.preventDefault(); // Evita que el formulario se envíe

        // Captura los valores de los filtros
        const minPrecio = parseFloat($('#min-precio').val().replace(/[^\d]/g, ''));
        const maxPrecio = parseFloat($('#max-precio').val().replace(/[^\d]/g, ''));
        const barrio = $('#barrio').val().toLowerCase();
        const ambientes = $('input[name="ambiente"]:checked').map(function() {
            return $(this).val();
        }).get();

        // Selecciona todos los departamentos
        const deptos = $('.depto');

        // Itera sobre los departamentos y muestra/oculta según los filtros
        deptos.each(function() {
            const precio = parseFloat($(this).find('p[id="txt_2"]').text().replace(/[^\d]/g, ''));
            const deptoBarrio = $(this).find('p[id="txt_1"]').text().toLowerCase();
            const deptoAmbientes = $(this).find('p[id="txt_3"]').text().toLowerCase();

            let show = true;

            // Filtrar por precio
            if (!isNaN(minPrecio) && precio < minPrecio) show = false;
            if (!isNaN(maxPrecio) && precio > maxPrecio) show = false;

            // Filtrar por barrio
            if (barrio && !deptoBarrio.includes(barrio)) show = false;

            // Filtrar por ambientes
            if (ambientes.length > 0) {
                let ambienteMatch = false;
                ambientes.forEach(function(ambiente) {
                    if (ambiente === "1" && deptoAmbientes.includes("monoambiente")) ambienteMatch = true;
                    if (ambiente === "2" && deptoAmbientes.includes("2 ambientes")) ambienteMatch = true;
                    if (ambiente === "3" && deptoAmbientes.includes("3 ambientes")) ambienteMatch = true;
                    if (ambiente === "4" && (deptoAmbientes.includes("4 ambientes") || deptoAmbientes.includes("4 ó más ambientes"))) ambienteMatch = true;
                });
                if (!ambienteMatch) show = false;
            }

            // Animar la aparición o desaparición del departamento
            if (show && $(this).css('display') === 'none') {
                $(this).fadeIn('slow');
            } else if (!show && $(this).css('display') !== 'none') {
                $(this).fadeOut('slow');
            }
        });

        // Guardar la opción de filtrado
        localStorage.setItem('filtros', JSON.stringify({
            minPrecio,
            maxPrecio,
            barrio,
            ambientes
        }));
    });

    // Cargar los filtros guardados al cargar la página
    const savedFilters = JSON.parse(localStorage.getItem('filtros'));

    if (savedFilters) {
        if (savedFilters.minPrecio) $('#min-precio').val(savedFilters.minPrecio);
        if (savedFilters.maxPrecio) $('#max-precio').val(savedFilters.maxPrecio);
        if (savedFilters.barrio) $('#barrio').val(savedFilters.barrio);
        if (savedFilters.ambientes) {
            savedFilters.ambientes.forEach(function(value) {
                const checkbox = $(`input[name="ambiente"][value="${value}"]`);
                if (checkbox) checkbox.prop('checked', true);
            });
        }

        // Simular el envío del formulario para aplicar los filtros
        $('#filter-form').submit();
    }
});
