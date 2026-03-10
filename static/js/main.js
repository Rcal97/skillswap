//Inizializzazione della mappa di Napoli utilizzando leaflet
var mappa = L.map('mappa').setView([40.8518,14.2681], 13);

//Aggiunge il layer delle tile OpenStreetMap
L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	attribution: 'OpenStreetMap contributors'}).addTo(mappa);

//Variabile per il marker di posizione scelta dall'utente
var markerUtente = null;

//Click sulla mappa: imposta la posizione dell'offerte
mappa.on('click', function(e) {
	var lat = e.latlng.lat;
	var lng = e.latlng.lng;

	//Salva le coordinate nei campi hidden del form
	$('#lat').val(lat);
	$('#lng').val(lng);

	//Rimuove il marker precedente se esiste
	if(markerUtente)
	{
		mappa.removeLayer(markerUtente);
	}

	//Aggiunge un nuovo marker nella posizione cliccata
	markerUtente = L.marker([lat, lng]).addTo(mappa).bindPopup('La tua posizione').openPopup();
});

//Funzione per caricare le offerte dal database e mostra sulla mappa
function caricaOfferte()
{
	$.ajax({
		url: '/api/offerte', method: 'GET',
		success: function(offerte) {
			offerte.forEach(function(offerta) {
				if(offerta.latitudine && offerta.longitudine) {
					L.marker([offerta.latitudine, offerta.longitudine])
						.addTo(mappa)
						.bindPopup(
							'<b>' + offerta.nome + '</b><br>' +
							 'Offro: ' + offerta.offro + '<br>' +
							 'Cerco: ' + offerta.cerco + '<br>' +
							 'Quartiere: ' + offerta.quartiere );
				}
			});
		}
	});
}

//Gestione invio del form
$('#form-offerta').on('submit', function(e) {
    e.preventDefault();

    var dati = {
        nome: $('#nome').val(),
        offro: $('#offro').val(),
        cerco: $('#cerco').val(),
        quartiere: $('#quartiere').val(),
        lat: parseFloat($('#lat').val()),
        lng: parseFloat($('#lng').val())
    };

    $.ajax({
        url: '/api/offerte',
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(dati),
        success: function(risposta) {
            alert(risposta.messaggio);
            $('#form-offerta')[0].reset();
            caricaOfferte();
        }
    });
});

// Carica le offerte quando la pagina è pronta
$(document).ready(function() {
    caricaOfferte();
});