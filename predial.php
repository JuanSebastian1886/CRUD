<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET,POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// Conecta a la base de datos  con usuario, contraseña y nombre de la BD
$servidor = "localhost"; $usuario = "root"; $contrasenia = ""; $nombreBaseDatos = "predial";
$conexionBD = new mysqli($servidor, $usuario, $contrasenia, $nombreBaseDatos);

if (isset($_GET["consultar"])){
    $sqlRegistro = mysqli_query($conexionBD,"SELECT * FROM predial WHERE nPredial=".$_GET["consultar"]);
    if(mysqli_num_rows($sqlRegistro) > 0){
        $Registro = mysqli_fetch_all($sqlRegistro,MYSQLI_ASSOC);
        echo json_encode($Registro);
        exit();
    }
    else{  echo json_encode(["success"=>0]); }
}
if (isset($_GET["borrar"])){
    $sqlRegistro = mysqli_query($conexionBD,"DELETE FROM predial WHERE nPredial=".$_GET["borrar"]);
    if($sqlRegistro){
        echo json_encode(["success"=>1]);
        exit();
    }
    else{  echo json_encode(["success"=>0]); }
}
if(isset($_GET["insertar"])){
    $data = json_decode(file_get_contents("php://input"));
    $nPredial=$data->nPredial;
    $nPredio=$data->nPredio;
    $departamento=$data->departamento;
    $municipio=$data->municipio;
    $avaluo=$data->avaluo;
    $nPropietario=$data->nPropietario;
    
    if(($nPredial!="")&&($nPredio!="")&&($departamento!="")&&( $municipio!="")&&($avaluo!="")&&($nPropietario!=""))
    {
    $sqlRegistro = mysqli_query($conexionBD,"INSERT INTO predial (nPredial,nPredio,departamento,municipio,avaluo,nPropietario) 
    VALUES('$nPredial','$nPredio','$departamento','$municipio','$avaluo','$nPropietario')");
    echo json_encode(["success"=>1]);
    }
    exit();
}

if(isset($_GET["actualizar"])){
    
    $data = json_decode(file_get_contents("php://input"));

    $nPredial=(isset($data->nPredial))?$data->nPredial:$_GET["actualizar"];
    $nPredio=$data->nPredio;
    $departamento=$data->departamento;
    $municipio=$data->municipio;
    $avaluo=$data->avaluo;
    $nPropietario=$data->nPropietario;
    
    $sqlRegistro = mysqli_query($conexionBD,"UPDATE predial SET 
    nPredial='$nPredial',
    nPredio='$nPredio',
    departamento='$departamento',
    municipio='$municipio',
    avaluo='$avaluo',
    nPropietario='$nPropietario' 
   
    WHERE nPredial='$nPredial'"); 
    echo json_encode(["success"=>1]);
    exit();
}

$sqlRegistro = mysqli_query($conexionBD,"SELECT * FROM predial ");
if(mysqli_num_rows($sqlRegistro) > 0){
    $Registro = mysqli_fetch_all($sqlRegistro,MYSQLI_ASSOC);
    echo json_encode($Registro);
}
else{ echo json_encode([["success"=>0]]); }

?>