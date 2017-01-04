<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, x-xsrf-token");

$con=mysqli_connect("localhost","root","","krasan");

if (mysqli_connect_errno()) {
  echo "Failed to connect to MySQL: " . mysqli_connect_error();
}

$data = json_decode(file_get_contents("php://input"));
$nama = mysqli_real_escape_string($con, $data->nama);
$alamat = mysqli_real_escape_string($con, $data->alamat);
$spesialis = mysqli_real_escape_string($con, $data->spesialis);
$fb = mysqli_real_escape_string($con, $data->fb);
$icon = mysqli_real_escape_string($con, $data->icon);
$id = mysqli_real_escape_string($con, $data->id);
 
$sql = "update datateman set nama='$nama',alamat='$alamat',spesialis='$spesialis',fb='$fb',icon='$icon' where id ='$id'";

if (!mysqli_query($con, $sql)) {
  die('Error: ' . mysqli_error($con));
}
echo "1 record update";

mysqli_close($conn);
 
?>