(function () {

  angular
    .module('lyricsShareApp')
    .controller('deleteModalCtrl', deleteModalCtrl);

  deleteModalCtrl.$inject = ['$modalInstance', 'lyricsShareData', 'commentData2'];
  function deleteModalCtrl ($modalInstance, lyricsShareData, commentData2) {
    var vm = this;
    vm.commentData2 = commentData2;
    console.log(commentData2);


    vm.onDSubmit = function () {

        vm.doDeleteComment(vm.commentData2.publishid, vm.commentData2.comm._id);
    };

    vm.doDeleteComment = function (publishid, commentid) {
        lyricsShareData.deleteComment(publishid, commentid)
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
