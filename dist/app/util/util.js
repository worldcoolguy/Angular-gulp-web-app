function getFecha(numeroFecha) {
    var d = new Date(numeroFecha);
    var dia = d.getDate();
    var anio = d.getFullYear();
    var mes = parseInt(d.getMonth()) + 1;

    if (dia < 10) {
        dia = "0" + dia;
    }
    if (mes < 10) {
        mes = "0" + mes;
    }

    return anio + "/" + mes + '/' + dia;
}

function getHora(numeroFecha) {
    var date = new Date(numeroFecha);

    var h = date.getHours();
    var m = date.getMinutes();
    var s = date.getSeconds();

    if (h < 10) { h = "0" + h;}
    if (m < 10) {m = "0" + m;}
    if (s < 10) {s = "0" + s;}
    
    return h + ':' + m;
}

function getFechayHora(Fecha) {
    var d = Fecha.split('T');
    var f = d[0];
    var h = d[1].split('.')[0];
    return f.replace(/-/g, '/') + " " + h;
}
