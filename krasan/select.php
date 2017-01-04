<?php
header('Access-Control-Allow-Origin: *');
    // variabel koneksi
        $db_name  = 'krasan';
        $hostname = 'localhost';
        $username = 'root';
        $password = '';
         
    // koneksi ke database
        $dbh = new PDO("mysql:host=$hostname;dbname=$db_name", $username, $password);
     
    // query untuk menampilkan data
        $sql = 'SELECT p.nim, p.pesan,p.id_pesan FROM pesan p, mahasiswa m where p.nim = m.nim';
        $stmt = $dbh->prepare($sql);
    // execute the query
        $stmt->execute();
     
    // pecah hasilnya ke dalam bentuk array
        $result = $stmt->fetchAll( PDO::FETCH_ASSOC );
     
    // konversi ke JSON
        $json = json_encode( $result );
        echo $json;
?>