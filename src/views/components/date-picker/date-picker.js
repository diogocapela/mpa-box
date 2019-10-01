/* bootstrap datepicker
============================================================================================= */

/* customize the datepicker */
$(document).ready(() => {
    $.fn.datepicker.dates.pt = {
        days: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
        daysShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
        daysMin: ['Do', 'Se', 'Te', 'Qa', 'Qu', 'Se', 'Sa'],
        months: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
        monthsShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
        today: 'Hoje',
        clear: 'Apagar',
        format: 'dd/mm/yyyy',
        titleFormat: 'MM yyyy' /* leverages same syntax as 'format' */,
        weekStart: 1,
    };

    /* initialize the datepicker */
    $('#__datepicker').datepicker({
        weekStart: 1,
        language: 'pt',
        format: 'dd/mm/yyyy',
        minDate: 'now',
        todayHighlight: true,
        orientation: 'bottom left',
        clearBtn: false,
        multidate: false,
        autoclose: true,
        startDate: '+0d',
    });
});
