(function () {

  angular
    .module('lyricsShareApp')
    .controller('editModalCtrl', editModalCtrl);

  editModalCtrl.$inject = ['$modalInstance', 'lyricsShareData', 'commentData'];
  function editModalCtrl ($modalInstance, lyricsShareData, commentData) {
    var vm = this;
    vm.commentData = commentData;
    console.log(commentData);
  //  vm.formData.post=vm.commentData.comm.post;

    vm.onSubmit = function () {
      vm.formError = "";
      if (!vm.formData.post) {
        vm.formError = "Espacio en blanco, no aceptado";
        return false;
      } else {
        vm.doUpdateComment(vm.commentData.publishid, vm.commentData.comm._id, vm.formData);
      }
    };

    vm.doUpdateComment = function (publishid, commentid, formData) {
      lyricsShareData.updateComment(publishid, commentid, {
        post : formData.post,
        user_name : vm.commentData.comm.user_name
      })
        .success(function (data) {
          vm.modal.close(data);
        })
        .error(function (data) {
          vm.formError = "Error, no saved";
        });
      return false;
    };

    vm.modal = {
      close : function (result) {
        $modalInstance.close(result);
      },
      cancel : function () {
        $modalInstance.dismiss('cancel');
      }
    };

  }

})();
