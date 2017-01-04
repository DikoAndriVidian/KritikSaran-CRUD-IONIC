<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, x-xsrf-token");

$con=mysqli_connect("localhost","root","","krasan");

if (mysqli_connect_errno()) {
  echo "Failed to connect to MySQL: " . mysqli_connect_error();
}

$data = json_decode(file_get_contents("php://input"));
$id_pesan = mysqli_real_escape_string($con, $data->id_pesan);
$balasan = mysqli_real_escape_string($con, $data->balasan);
 
$sql = "INSERT INTO balasan(id_pesan,balas) values ('$id_pesan','$balasan')";

if (!mysqli_query($con, $sql)) {
  die('Error: ' . mysqli_error($con));
}
echo "1 record update";

mysqli_close($conn);
 
?>