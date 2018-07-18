var url = "https://mesonmexico.000webhostapp.com/"
function registrar() {
	
	
	var nombre = document.getElementById("nombre").value;
	var mail = document.getElementById("mail").value;
	var pass1 = document.getElementById("pass1").value;
	var pass2 = document.getElementById("pass2").value;

	if (nombre != "" && mail != "" && pass1 != "" && pass2 != "" && pass1 == pass2) {
	
	
			registroAjax = new XMLHttpRequest();
			registroAjax.open('GET', url+"registrarUsuarios.php?nombre="+nombre+"&mail="+mail+"&pass="+pass1);
			registroAjax.send();
			alert("¡Registrado exitosamente!");

			registroAjax.onreadystatechange = function(){
				if (registroAjax.readyState == 4 && registroAjax.status == 200) {
					
					if (registroAjax.responseText=="1") {
						//lo que hace cuando sale bien el registro
						window.location.href='index.html';
					}
					else{

						alert("Error inesperado, intente más tarde")
					}
				}
			}
		
	}
}


function getCorreo() {
	var id = localStorage.getItem("idUsuario");
	datosUserAjax = new XMLHttpRequest();
	datosUserAjax.open("GET", url+"getDatosUser.php?idUser="+id);
	datosUserAjax.send();
	datosUserAjax.onreadystatechange = function(){
		if (datosUserAjax.readyState == 4 && datosUserAjax.status == 200) {	
			datos = JSON.parse(datosUserAjax.responseText);
			for (var i = 0; i < datos.length; i++) {
				if(datos[i].nombreUsuario == 0){
					document.getElementById("nombre").value = "";
				}else{
					document.getElementById("nombre").value = datos[i].nombreUsuario;
				}
				if (datos[i].telefono == 0) {
					document.getElementById("tel").value = "";
				}else{
					document.getElementById("tel").value = datos[i].telefono;
				}
				document.getElementById("mail").value = datos[i].correo;
			}
		}
	}
}

function updatePerfil() {
	var id = localStorage.getItem("idUsuario");
	var nombreUser = document.getElementById("nombre").value;
	var tel = document.getElementById("tel").value;
	if(nombreUser != "" && tel != ""){
		updateAjax = new XMLHttpRequest();
		updateAjax.open("GET", url+"updateUsuarios.php?nombreUser="+nombreUser+"&tel="+tel+"&id="+id);
		updateAjax.send();
		updateAjax.onreadystatechange = function(){
			if (updateAjax.readyState == 4 && updateAjax.status == 200) {	
				if (updateAjax.responseText=="1") {
					alert("Datos actualizados");
				}else{
					alert("Error inesperado, intente más tarde");
				}
			}
		}
	}
}

function pedidos() {
	var id = localStorage.getItem('idUsuario');
	if (id != "") {
		ordenAjax = new XMLHttpRequest();
		ordenAjax.open("GET", url+"orden.php?usuario="+id);
		ordenAjax.send();
		ordenAjax.onreadystatechange = function(){
			if (ordenAjax.readyState == 4 && ordenAjax.status == 200) {
				orden = JSON.parse(ordenAjax.responseText);
				for (var i = orden.length -1; i >= 0; i--) {
					var info = 
						"<div class='modulosP'>"+
							"<div class='orden'>"+
								"<div class='numero'><label>#58"+orden[i].idOrden+"</label></div>"+
								"<div class='hora'><label>"+orden[i].hora+"</label></div>"+
							"</div>"+
							"<div class='articulos'>"+
								"<ul>"+
									"<li>"+orden[i].descripcion+"</li>"+
								"</ul>"+
							"</div>"+
							"<div class='total'><label>$"+orden[i].monto+"</label></div>"+
						"</div>";
						document.querySelector('section').innerHTML += info;
				}	
			}
		}
	}
}




function menu(idCafe){

	localStorage.setItem('idCafeteria', idCafe);
	window.location.href='menu.html';



}


function registrar() {
	
	
	var nombre = document.getElementById("nombre").value;
	var mail = document.getElementById("mail").value;
	var pass1 = document.getElementById("pass1").value;
	var pass2 = document.getElementById("pass2").value;

	if (nombre != "" && mail != "" && pass1 != "" && pass2 != "" && pass1 == pass2) {
	
	
			registroAjax = new XMLHttpRequest();
			registroAjax.open('GET', url+"registrarUsuarios.php?nombre="+nombre+"&mail="+mail+"&pass="+pass1);
			registroAjax.send();
			alert("¡Registrado exitosamente!");

			registroAjax.onreadystatechange = function(){
				if (registroAjax.readyState == 4 && registroAjax.status == 200) {
					
					if (registroAjax.responseText=="1") {
						//lo que hace cuando sale bien el registro
						window.location.href='index.html';
					}
					else{

						alert("Error inesperado, intente más tarde")
					}
				}
			}
		
	}
}

function inicioSesion() {

	
	var mail = document.getElementById('mail').value;
	var pass = document.getElementById('pass').value;
	if(mail != "" && pass != ""){
		inicioAjax = new XMLHttpRequest();
		inicioAjax.open('GET', url+'selectUsuarios.php?mail='+mail+'&pass='+pass);
		inicioAjax.send();
		alert("Iniciando Sesion");
		
		inicioAjax.onreadystatechange = function(){
			if (inicioAjax.readyState == 4 && inicioAjax.status == 200) {
				inicio = JSON.parse(inicioAjax.responseText);

						localStorage.setItem('idUsuario', inicio[0].idUsuario);
						localStorage.setItem('tipoUsuario', inicio[0].tipoUsuario);

				if (inicio[0].tipoUsuario=="0") {
							window.location.assign('inicio.html');
						}

					if (inicio[0].tipoUsuario == "1") {
								window.location.assign('dashboard.html');
							}
				
			}
		}
	}
} 


function orden() {
	var id = localStorage.getItem('idUsuario');
	if (id != "") {
		ordenAjax = new XMLHttpRequest();
		ordenAjax.open("GET", url+"ordenCafe.php?usuario="+id);
		ordenAjax.send();
		ordenAjax.onreadystatechange = function(){
			if (ordenAjax.readyState == 4 && ordenAjax.status == 200) {
				orden = JSON.parse(ordenAjax.responseText);
				for (var i = 0; i < orden.length; i++) {
					var info = 
						"<div class='modulos'>"+
							"<div class='orden'>"+
								"<div class='numero'><label>#58"+orden[i].idOrden+"</label></div>"+
								"<div class='hora'><label>"+orden[i].hora+"</label></div>"+
							"</div>"+
							"<div class='articulos'>"+
								"<ul>"+
									"<li>"+orden[i].descripcion+"</li>"+
								"</ul>"+
							"</div>"+
							"<div class='total'><label>$"+orden[i].monto+"</label></div>"+
						"</div>";
						document.querySelector('article').innerHTML += info;
				}	
			}
		}
	}
}

function agregarProducto() {
	var id = localStorage.getItem('idUsuario');
	var nombre = document.getElementById('nombreP').value;
	var precio = document.getElementById('precio').value;
	var descripcion = document.getElementById('descripcion').value;
	if(nombre != "" && precio != "" && descripcion != ""){
		productoAjax = new XMLHttpRequest();
		productoAjax.open("GET", url+"agregarProducto.php?nombre="+nombre+"&precio="+precio+"&descripcion="+descripcion+"&id="+id);
		productoAjax.send();
		alert("Producto agregado con éxito")
		productoAjax.onreadystatechange = function(){
			if (productoAjax.readyState == 4 && productoAjax.status == 200) {	
				if (productoAjax.responseText=="1") {
					window.location='dashboard.html';
				}else{
					window.location='productos.html'
				}
			}
		}
	}
	
}

function getCorreo() {
	var id = localStorage.getItem("idUsuario");
	datosUserAjax = new XMLHttpRequest();
	datosUserAjax.open("GET", url+"getDatosUser.php?idUser="+id);
	datosUserAjax.send();
	datosUserAjax.onreadystatechange = function(){
		if (datosUserAjax.readyState == 4 && datosUserAjax.status == 200) {	
			datos = JSON.parse(datosUserAjax.responseText);
			for (var i = 0; i < datos.length; i++) {
				if(datos[i].nombreUsuario == 0){
					document.getElementById("nombre").value = "";
				}else{
					document.getElementById("nombre").value = datos[i].nombreUsuario;
				}
				if (datos[i].telefono == 0) {
					document.getElementById("tel").value = "";
				}else{
					document.getElementById("tel").value = datos[i].telefono;
				}
				document.getElementById("mail").value = datos[i].correo;
			}
		}
	}
}

function updatePerfil() {
	var id = localStorage.getItem("idUsuario");
	var nombreUser = document.getElementById("nombre").value;
	var tel = document.getElementById("tel").value;
	if(nombreUser != "" && tel != ""){
		updateAjax = new XMLHttpRequest();
		updateAjax.open("GET", url+"updateUsuarios.php?nombreUser="+nombreUser+"&tel="+tel+"&id="+id);
		updateAjax.send();
		updateAjax.onreadystatechange = function(){
			if (updateAjax.readyState == 4 && updateAjax.status == 200) {	
				if (updateAjax.responseText=="1") {
					alert("Datos actualizados");
				}else{
					alert("Error inesperado, intente más tarde");
				}
			}
		}
	}
}


function cargarCafeterias(){

	cafeAjax = new XMLHttpRequest();
	cafeAjax.open('GET', url+"selectCafeterias.php");
	cafeAjax.send();
	cafeAjax.onreadystatechange = function(){
		if (cafeAjax.readyState == 4 && cafeAjax.status == 200) {
			cafeteria = JSON.parse(cafeAjax.responseText);
			for (var i = 0; i < cafeteria.length; i++) {
					var info = 
						"<a onclick='menu("+cafeteria[i].idUsuario+")'>"+
							"<div class='cafe'>"+
								"<div class='fotoCafe'>"+
									"<i class='fas fa-coffee fa-3x'></i>"+
								"</div>"+
								"<div class='desc' style= 'display:table; vertical-align: middle;'>"+
									"<h3 style = 'height: inherit; display: table-cell; vertical-align: middle;'>"+cafeteria[i].Nombre+"</h3>"+"<br>"+
								"</div>"+
						"</a>";
				document.querySelector('section').innerHTML += info;
			}
			
			
		}
	}


}


function menu(idCafe){

	localStorage.setItem('idCafeteria', idCafe);
	window.location.href='menu.html';



}
function cargarMenu(){
	var idCafe = localStorage.getItem('idCafeteria');
	menuAjax = new XMLHttpRequest();
	menuAjax.open('GET', url+"selectMenu.php?id="+idCafe);
	menuAjax.send();
	

	menuAjax.onreadystatechange = function(){
		if (menuAjax.readyState == 4 && menuAjax.status == 200) {
			menu = JSON.parse(menuAjax.responseText);
			for (var i = 0; i < menu.length; i++) {
					var info = 
					"<div class='item'>"+
						"<div class='fotoItem'>"+
							"<img src='"+menu[i].foto+"'>"+
						"</div>"+
						"<div class='desc'>"+
							"<h3>"+menu[i].Nombre+"</h3>"+
							"<div style='font-size: 14px; text-align: left; margin-left: 10px;'>"+menu[i].Descripcion+"</div>"+
						"</div>"+
						"<div class='precio'>"+
							"<div class='dinero'><h3>$"+menu[i].Precio+"</h3></div>"+
							"<div class='agregar'><button onclick='choose("+'"'+menu[i].Descripcion+'"'+","+'"'+menu[i].Nombre+'"'+","+menu[i].Precio+","+menu[i].idProducto+");'"+">Agregar</button></div>"+
						"</div>"+
					"</div>";
				document.querySelector('section').innerHTML += info;
			}
			
			
		}
	}
}
function choose(Descripcion, Nombre, Precio, idProducto){
	var info = '<div id="modal2">'+
            '<div id="modal1">'+
                '<div class="ingr">'+
                    '<h3 style="margin: 5px;">¿Desea planificar su compra?</h3>';

        info += '</div>'+
                '<div class="aceptar">'+
                    '<button id="aceptar" onclick="sem('+"'"+Descripcion+"'"+','+"'"+Nombre+"'"+','+Precio+','+idProducto+');"'+'>Planificar</button>'+
                    '<button id="aceptar2" onclick="ingr('+"'"+Descripcion+"'"+','+"'"+Nombre+"'"+','+Precio+','+idProducto+');">Comprar para hoy</button>'+
                '</div>'+
            '</div>'+
        '</div>'
        document.getElementById('modal').innerHTML = info;
}
function sem(Descripcion, Nombre, Precio, idProducto){
			var info = '<div id="modal2">'+
            '<div id="modal1">'+
                '<div class="ingr">'+
                    '<h3 style="margin: 5px;">Seleccióna los días deseados</h3>';
    	info +=  '<input id="lunes" type="checkbox"><label for="lunes">Lunes</label><br>';
    	info +=  '<input id="martes" type="checkbox"><label for="martes">Martes</label><br>';
    	info +=  '<input id="miercoles" type="checkbox"><label for="miercoles">Miercoles</label><br>';
    	info +=  '<input id="jueves" type="checkbox"><label for="jueves">Jueves</label><br>';
    	info +=  '<input id="viernes" type="checkbox"><label for="viernes">Viernes</label><br>';
    	info +=  '<input id="sabado" type="checkbox"><label for="sabado">Sabado</label><br>';
    	info +=  '<input id="domingo" type="checkbox"><label for="domingo">Domingo</label><br>';

        info += '</div>'+
                '<div class="aceptar">'+
                    '<button id="aceptar" onclick="ingr('+"'"+Descripcion+"'"+','+"'"+Nombre+"'"+','+Precio+','+idProducto+');"'+'>Aceptar</button>'+
                    '<button id="cancelar" onclick="cancel();">Cancelar</button>'+
                '</div>'+
            '</div>'+
        '</div>'
        document.getElementById('modal').innerHTML = info;
}

function cancel(){
	document.getElementById('modal1').style.visibility = "hidden";
				 document.getElementById('modal2').style.visibility = "hidden";
				 document.getElementById('modal').style.visibility = "hidden";
}
function ingr(ingredientes, nombre, precio, id){
	var ing = ingredientes.split(",");

	var info = '<div id="modal2">'+
            '<div id="modal1">'+
                '<div class="ingr">'+
                    '<h3 style="margin: 5px;">Ingredientes</h3>';
    for (var i = 0; i < ing.length; i++) {
    	info +=  '<input id="'+i+'" type="checkbox"><label for="'+i+'">'+ing[i]+'</label><br>'
    }
        info += '</div>'+
                '<div class="aceptar">'+
                    '<button id="aceptar" onclick="add('+id+','+precio+','+"'"+nombre+"'"+');"'+'>Agregar</button>'+
                    '<button id="cancelar" onclick="cancel();">Cancelar</button>'+
                '</div>'+
            '</div>'+
        '</div>'
        document.getElementById('modal').innerHTML = info;
}
function add(idProducto, precio, nombre){
	var idUsuario = localStorage.getItem("idUsuario");
	console.log(url)
	precioAjax = new XMLHttpRequest();
	precioAjax.open('GET', url+"insertCarrito.php?idProducto="+idProducto+"&precio="+precio+"&idUsuario="+idUsuario+"&nombreProducto="+nombre);
	precioAjax.send();
	precioAjax.onreadystatechange = function(){
		if (precioAjax.readyState == 4 && precioAjax.status == 200) {
			if (precioAjax.responseText=="1") {
				alert("Producto agregado al carrito");
				 document.getElementById('modal1').style.visibility = "hidden";
				 document.getElementById('modal2').style.visibility = "hidden";
				 document.getElementById('modal').style.visibility = "hidden";
			}else{
				alert("Error inesperado, intente más tarde");
				document.getElementById('modal1').style.visibility = "hidden";
				 document.getElementById('modal2').style.visibility = "hidden";
				 document.getElementById('modal').style.visibility = "hidden";
			}
		}
	}
}

function cargarCarrito(){
	
	var idUsuario = localStorage.getItem("idUsuario");
	var suma = 0;
	var descripcion = "";
	carritoAjax = new XMLHttpRequest();
	carritoAjax.open('GET', url+"cargarCarrito.php?id="+idUsuario);
	carritoAjax.send();
	carritoAjax.onreadystatechange = function(){
		if (carritoAjax.readyState == 4 && carritoAjax.status == 200) {
			carrito = JSON.parse(carritoAjax.responseText);
			if (carrito.length != 0){
				document.querySelector('section').innerHTML = "";
				document.querySelector('article').innerHTML = "";
				for (var i = 0; i < carrito.length; i++) {
				descripcion +=carrito[i].nombre + ",";
				suma += parseFloat(carrito[i].precio);
					var info = 
					"<div class='carrito'>"+
						"<div class='producto'>"+
							"<div class='nombre'>"+
								carrito[i].nombre+
							"</div>"+
							"<div class='cantidad'>"+
								"<div class='precio'>"+
									"$"+carrito[i].precio+
								"</div>"+
								"<input type='hidden' value='"+carrito[i].idCarrito+"/"+i+"'>"+
							"</div>"+
							"<div class='borrar' onclick=borrar("+carrito[i].idCarrito+")><i class='fas fa-times-circle'></i></div>"+
						"</div>"+
					"</div>";
				document.querySelector('section').innerHTML += info;
				document.querySelector('article').innerHTML = "<div class='total'> TOTAL<br>$"+suma.toFixed(2)+"</div>";
				document.querySelector('article').innerHTML += "<a href='pago.html'>"+
        															"<div class='pago'>"+
            															"PAGAR"+
        															"</div>"+
    															"</a>";
				localStorage.setItem("suma", suma);
				localStorage.setItem("descripcion", descripcion);
			}
			}
			else{
				document.querySelector('section').innerHTML = '<h2 style="width: 100%; text-align: center; margin-top: 80px">Tu carrito está vacío</h2>';
				document.querySelector('article').innerHTML = "";
			}
			
			
			
		}
	}

}

function borrar(idCarrito){
	carritoAjax = new XMLHttpRequest();
	carritoAjax.open('GET', url+"borrarCarrito.php?id="+idCarrito);
	carritoAjax.send();
	carritoAjax.onreadystatechange = function(){
		if (carritoAjax.readyState == 4 && carritoAjax.status == 200) {
			cargarCarrito();
		}
	}
}

function insertarOrden(){
	var suma = localStorage.getItem("suma");
	var descripcion = localStorage.getItem("descripcion");
	var idCafeteria = localStorage.getItem("idCafeteria");
	var idUsuario = localStorage.getItem("idUsuario");
	ordenAjax = new XMLHttpRequest();
	ordenAjax.open('GET', url+"insertarOrden.php?idUsuario="+idUsuario+"&idCafeteria="+idCafeteria+"&suma="+suma+"&descripcion="+descripcion);
	ordenAjax.send();
	ordenAjax.onreadystatechange = function(){
		if (ordenAjax.readyState == 4 && ordenAjax.status == 200) {
			if (ordenAjax.responseText=="1") {
				window.location.href = 'Exito.html';
			}else{
				alert("Error inesperado, intente más tarde"+ordenAjax.responseText);
			}
		}
	}

}

function exito(){
	var num = "#58";
	var id = localStorage.getItem('idUsuario');
	var a = new Date();
	var h = a.getHours();
	var m = a.getMinutes();
	if((m+40) >= 60){
		h++;
		m = (40-(60-m)); 
	}
	else{
		m= m+40;
	}

	if(m==0){
		var hora = h+':'+m+'0';
	}
	else{
		if(m<10){
			var hora = h+':0'+(m);
		}
		else{
			var hora = h+':'+(m);
		}
		
	}
	
	if (id != "") {
		ordenAjax = new XMLHttpRequest();
		ordenAjax.open("GET", url+"orden.php?usuario="+id);
		ordenAjax.send();
		ordenAjax.onreadystatechange = function(){
			if (ordenAjax.readyState == 4 && ordenAjax.status == 200) {
				orden = JSON.parse(ordenAjax.responseText);
				for (var i = 0; i < orden.length; i++) {
					var info = 	"<label><b>#58"+orden[i].idOrden+"</b></label><br><br><br>"+
								"<label style='text-align: center;'><b>Tu pedido estará listo a las: "+hora+"</b></label><br><br><br>";
						document.querySelector('section').innerHTML = info;
				}	
			}
		}
	}
}

function factura(){
	window.location.href = "https://mesonmexico.000webhostapp.com/factura.jpg";
}
function download(fileURL, fileName) {
    // for non-IE
    if (!window.ActiveXObject) {
        var save = document.createElement('a');
        save.href = fileURL;
        save.target = '_blank';
        save.download = fileName || 'unknown';

        var evt = new MouseEvent('click', {
            'view': window,
            'bubbles': true,
            'cancelable': false
        });
        save.dispatchEvent(evt);

        (window.URL || window.webkitURL).revokeObjectURL(save.href);
    }

    // for IE < 11
    else if ( !! window.ActiveXObject && document.execCommand)     {
        var _window = window.open(fileURL, '_blank');
        _window.document.close();
        _window.document.execCommand('SaveAs', true, fileName || fileURL)
        _window.close();
    }
}