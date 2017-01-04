angular.module('starter.services', [])

.factory('pesanService', function($http) {
    var baseUrl = 'http://192.168.0.4/krasan/';
    return {
        login: function (login) {
            return $http.get(baseUrl+'login.php?username=' + login.nim + '&&pass=' + login.password);
        },
        loginAdmin: function (login) {
            return $http.get(baseUrl+'loginAdmin.php?username=' + login.nim + '&&pass=' + login.password);
        },
        getAll: function() {
            return $http.get(baseUrl+'select.php');
        },
        getBalasan: function(pesanId) {
            return $http.get(baseUrl+'select_balasan.php?id_pesan='+pesanId);
        },
        getAkun: function(nimnya) {
            return $http.get(baseUrl+'select_akun.php?nim='+nimnya);
        },
        getId: function (pesanId){
            return $http.get(baseUrl+'select_id.php?id_pesan='+pesanId); 
        },
        getMhs: function (mahasiswaId){
            return $http.get(baseUrl+'select_nim.php?nim='+mahasiswaId); 
        },
        create: function (pesan){
            return $http.post(baseUrl+'insert.php',pesan,{
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8;'
                }
            });
        },
        balasan: function (pesan){
            return $http.post(baseUrl+'balasan.php',pesan,{
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8;'
                }
            });
        },
        update: function (pesan){
            return $http.post(baseUrl+'update.php',pesan,{
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8;'
                }
            });
        },
        delete: function  (id){
            return $http.get(baseUrl+'delete.php?id_pesan='+id);
        }
    };
    
});
