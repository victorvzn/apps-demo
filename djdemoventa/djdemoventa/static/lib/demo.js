$(document).on("ready", inicio);

function inicio()
{
	var $rows = $("#detalleventa_set-group .tabular.inline-related tbody tr.dynamic-detalleventa_set");
	// console.log();
	$rows.find("select[id^='id_detalleventa_set-']").on("change", obtenerprecio);
	$rows.find("input[id^='id_detalleventa_set-']").on("keyup", actualizarsubtotal);
}

function obtenerprecio(obj)
{
	var $rows = $("#detalleventa_set-group .tabular.inline-related tbody tr.dynamic-detalleventa_set");
	var $select = $("#"+obj.target.id); // id del select
	var producto_id = $select.val();
	var indice_fila = obj.target.id.toString().split("-")[1];
	var celda_pventa = $($rows[indice_fila]).find(".field-precio_venta p");

	var pventa_json = $.ajax({
		url : '/obtenerprecioventa/' + producto_id,
		type : 'GET',
		dataType : 'json',
		success : function(data) {
			celda_pventa[0].textContent = data.precio;
			$(celda_pventa[0].textContent).focus();
       },
	});
	
}

function actualizarsubtotal(obj)
{
	var $rows = $("#detalleventa_set-group .tabular.inline-related tbody tr.dynamic-detalleventa_set");
	var $input = $("#"+obj.target.id); // id del input
	var cantidad_input_value = $input.val();
	var indice_fila = obj.target.id.toString().split("-")[1];
	var celdas_pventa = $rows.find(".field-precio_venta p");
	var celdas_cantidad = $rows.find(".field-cantidad input");
	var $celdas_subtotal = $rows.find(".field-subtotal span");

	var acu = 0.00;
	
	$celdas_subtotal.each(function(idx, el) {
		var prc = celdas_pventa[idx].textContent;
		var cnt = celdas_cantidad[idx].value;
		var sbt = parseFloat(prc) * parseInt(cnt);

		if (!isNaN(sbt)) {
        	$(el).html(sbt);
        	console.log("* " + sbt);
        	acu = acu + sbt;
        } else { 
        	$(el).html("0.00");
		}
    });

    $("#field_total").html(parseFloat(acu));
}