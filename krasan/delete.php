<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE, OPTIONS");
header('Access-Control-Allow-Headers: Content-Type, x-xsrf-token');

$con=mysqli_connect("localhost","root","","krasan");

if (mysqli_connect_errno()) {
  echo "Failed to connect to MySQL: " . mysqli_connect_error();
}

$ip = $_GET['id_pesan'];
 
$sql = "DELETE FROM pesan p, balasan b WHERE p.id_pesan = b.id_pesan AND p.id_pesan= '$ip'";

if (!mysqli_query($con, $sql)) {
  die('Error: ' . mysqli_error($con));
}
echo "1 record deleted";

mysqli_close($conn);
 
?>