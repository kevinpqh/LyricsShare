//facebbok lgin
window.fbAsyncInit = function() {
    FB.init({
      appId      : '571865449691023',
      xfbml      : true,
      version    : 'v2.8',
      status : true
    });
    
    FB.getLoginStatus(function(response){
       if(response.status ==='connected'){
           //
       } else if (response.status === 'not_authorized'){
           //
       }else {
           //
       }
        
    });
  };

  (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "//connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));