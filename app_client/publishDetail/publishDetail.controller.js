(function () {

    angular
        .module('lyricsShareApp')
        .controller('publishDetailCtrl', publishDetailCtrl);

    publishDetailCtrl.$inject = ['$routeParams','$location','$modal','lyricsShareData'];
    function publishDetailCtrl ($routeParams,$location,$modal,lyricsShareData) {
        var vm = this;
        vm.publishid = $routeParams.publishid;
        ///vm.commentid = $routeParams.publishid.comment.commentid;

        //vm.isLoggedIn = authentication.isLoggedIn();

        //vm.currentPath = $location.path();
            lyricsShareData.publishById(vm.publishid)
                .success(function(data) {
                    vm.data = { publish: data };
                    vm.pageHeader = {
                        title: vm.data.publish.song.titulo
                    };
                })
                .error(function (e) {
                    console.log(e);
                });

//Create comentario
          vm.onCommentSubmit = function (nombreUser) {
            vm.formError = "";
            if (!vm.formCommentData.post) {
              vm.formError = "All fields required, please try again";
              return false;
            } else {
              vm.doAddComment(vm.publishid, vm.formCommentData,nombreUser);
            }
            vm.formCommentData.post ="";
          };

          vm.doAddComment = function (publishid, formCommentData,nombreUser) {
            lyricsShareData.createComment(publishid, {
              post : formCommentData.post,
              user_name: nombreUser
            })
              .success(function (data) {
                  vm.data.publish.comments.push(data);
                  //$location.path('/');
                  console.log(data);
              })
              .error(function (data) {
                vm.formError = "Your review has not been saved, please try again";
              });
            return false;
          };

          vm.editComment = function (comment){
            console.log(comment);
            comment=vm.data.publish.comments.length-comment-1;
            var comm =vm.data.publish.comments[comment];
            console.log(comm);


          }

          vm.popupEditForm = function (comment) {
                comment=vm.data.publish.comments.length-comment-1;
                var comm =vm.data.publish.comments[comment];
                var modalInstance = $modal.open({
                    templateUrl: '/editModal/editModal.view.html',
                    controller: 'editModalCtrl as vm',
                    resolve : {
                      commentData : function () {
                            return {
                                publishid: vm.publishid,
                                comm : comm

                            };
                        }
                    }
                });

                modalInstance.result.then(function (data) {
                    vm.data.publish.comments[comment]=data;
                });
        };

        vm.popupDeleteForm = function (comment) {
            comment=vm.data.publish.comments.length-comment-1;
            var comm =vm.data.publish.comments[comment];
            var modalInstance = $modal.open({
                templateUrl: '/deleteModal/deleteModal.view.html',
                controller: 'deleteModalCtrl as vm',
                resolve : {
                    commentData2 : function () {
                        return {
                            publishid: vm.publishid,
                            comm : comm
                        };
                    }
                }
            });

            modalInstance.result.then(function (data) {
                $route.reload();
            });
       };

    }

})();
