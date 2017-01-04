angular.module('starter.controllers', [])

.controller('homeCtrl', function($scope,$stateParams,$state, pesanService){

    $scope.showData = function() {
      pesanService.getAll().success(function(data) {
            $scope.pesans = data;
        }).finally(function() {
            $scope.$broadcast('scroll.refreshComplete');
        });
    };
    $scope.showData();
    
    $scope.reload = function (){
        $state.go('tab.home');
    };
    $scope.delete = function (pesan){
        if(confirm("Apakah Anda yakin ingin menghapus?")){
            pesanService.delete(pesan.id_pesan);
            $scope.pesans.splice($scope.pesans.indexOf(pesan),1);
        }
    };
})

.controller('pesanDetailCtrl', function($scope,$stateParams,$ionicPopup,$ionicModal,$state,pesanService){

    $scope.showDataId = function() {
      pesanService.getId($stateParams.pesanId).success(function(pesan) {
            $scope.pesan = pesan;
        });
    };
    $scope.showDataId();

    $scope.showBalasan = function() {
      pesanService.getBalasan($stateParams.pesanId).success(function(data) {
            $scope.balasans = data;
        }).finally(function() {
            $scope.$broadcast('scroll.refreshComplete');
        });
    };
    $scope.showBalasan();

    $scope.back = function (){
        $state.go('tab.home');
    };
    
    $ionicModal.fromTemplateUrl('edit.html', function(modal){
        $scope.taskModal = modal;
	}, {
            scope : $scope,
            animation : 'slide-in-up'	
	});
        
        $scope.showAlert = function(msg) {
            $ionicPopup.alert({
                title: msg.title,
                template: msg.message,
                okText: 'Ok',
                okType: 'button-positive'
            });
          };
	
	$scope.editModal = function(){
            $scope.taskModal.show();
	};
	
	$scope.batal = function(){
            $scope.taskModal.hide();
            $scope.showDataId();
	};
    
    $scope.balasan={};
	$scope.balasan = function(){
            if (!$scope.balasan.nim){
                $scope.showAlert({
                    title: "Information",
                    message: "Nim Mohon Diisi"
                });
            }else if(!$scope.balasan.pesan){
                $scope.showAlert({
                    title: "Information",
                    message: "Pesan Mohon Diisi"
                });
            }else if(!$scope.balasan.balasan){
                $scope.showAlert({
                    title: "Information",
                    message: "Pesan balasan masih kosong"
                });
            }else{
                pesanService.balasan({
                    id_pesan: $scope.balasan.id_pesan,
                    nim: $scope.balasan.nim,
                    pesan: $scope.balasan.pesan,
                    balasan: $scope.balasan.balasan    
                }).then(function(resp) {
                  console.log('Success', resp);
                  $scope.showAlert({
                        title: "Information",
                        message: "Berhasil membalas"
                    });
                    $scope.batal();
                    $scope.showBalasan();       
                },function(err) {
                  console.error('Error', err);
                }); 
            }
	};
	
})

.controller('tabCtrl', function($scope){
    $scope.sess_nim = sessionStorage.getItem('nim');
    $scope.tampil = function(){        
        return window.localStorage.getItem("nim"),window.localStorage.getItem("pass");
    };

    $scope.tabPesan = function(){
        $state.go('tab.pesan');
    };
})

.controller('akunCtrl', function($scope,$stateParams,$state,$ionicHistory, pesanService){

    $scope.keluar=function(){
        if(confirm("Apakah Anda yakin akan Logout?")){
            delete sessionStorage.sess_nim;
            delete sessionStorage.sess_pass;
            sessionStorage.clear();
            $ionicHistory.clearCache();
            $ionicHistory.clearHistory();
            $state.go('login');
        }
    };

    $scope.showAkun = function() {
      pesanService.getAkun($stateParams.nimnya).success(function(data) {
            $scope.akuns = data;
        }).finally(function() {
            $scope.$broadcast('scroll.refreshComplete');
        });
    };
    $scope.showAkun();

    $scope.delete = function (pesan){
        pesanService.delete(pesan.id_pesan);
        $scope.pesans.splice($scope.pesans.indexOf(pesan),1);
    };
})

.controller('loginCtrl', function ($scope, $state, pesanService, $ionicPopup) {
    $scope.login = function () {
        pesanService.login($scope.login).then(function (data) {
            if (Object.keys(data.data).length === 1) {
                sessionStorage.setItem('nim', $scope.login.nim);
                sessionStorage.setItem('pass', $scope.login.password);
                $state.go('tab.home');
            } else {
                $ionicPopup.alert({
                    title: "Pesan Error",
                    template: "Check Nim dan Pass",
                    okText: 'Ok',
                    okType: 'button-positive'
                });
            }
        });
    };
})

.controller('tambahPesanCtrl', function($scope,$stateParams,$state,$ionicPopup,pesanService){
    $scope.sess_nim = sessionStorage.getItem('nim');

    $scope.showAlert = function(msg) {
      $ionicPopup.alert({
          title: msg.title,
          template: msg.message,
          okText: 'Ok',
          okType: 'button-positive'
      });
    };
    
    $scope.mahasiswa={};
    $scope.simpan = function (){
        if (!$scope.mahasiswa.pesan){
            $scope.showAlert({
                title: "Information",
                message: "pesan mohon diisi"
            });
        }else if (!$scope.mahasiswa.nim){
            $scope.showAlert({
                title: "Information",
                message: "nim mohon diisi"
            });
        }else{
            pesanService.create({
                nim: $scope.mahasiswa.nim,
                pesan: $scope.mahasiswa.pesan
            }).success(function(data){
                $scope.showAlert({
                    title: "Information",
                    message: "Berhasil posting"
                });
                $state.go('tab.home');
            });
        }
        
    };
       
});