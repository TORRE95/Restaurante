<?php 
	header('Access-Control-Allow-Origin: *');
	require_once 'conexion.php';
	$funciones = new Funciones();
	$conexion = $funciones->conectar();
	$conexion->set_charset("utf8");
	


	$query = "SELECT * FROM categorias";
	$resultado = $conexion->query($query);
	$arreglo = array();
	while ($r = $resultado->fetch_object()) {
		array_push($arreglo, array(
			"Nombre"=>$r->nombre,
			"idUsuario"=>$r->idUsuario
		));
	}
	
	
	//IMPRIMIR LA RESPUESTA EN JSON
	echo json_encode($arreglo);

 ?>