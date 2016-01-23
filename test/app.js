angular.module('myApp', [])
  .controller('appController', function () {
    var app = this

    ;(function (d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0]
      if (d.getElementById(id)) {return;}
      js = d.createElement(s); js.id = id
      js.src = '//connect.facebook.net/en_US/sdk.js'
      fjs.parentNode.insertBefore(js, fjs)
    }(document, 'script', 'facebook-jssdk'))

    ;(function (d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0]
      if (d.getElementById(id)) return
      js = d.createElement(s); js.id = id
      js.src = '//connect.facebook.net/th_TH/sdk.js#xfbml=1&version=v2.5&appId=470295596509889'
      fjs.parentNode.insertBefore(js, fjs)
    }(document, 'script', 'facebook-jssdk'))
    window.fbAsyncInit = function () {
      FB.init({
        appId: '470295596509889',
        xfbml: true,
        version: 'v2.5'
      });FB.getLoginStatus(function (response) {
        if (response.status === 'connected') {
          app.token = response.authResponse.accessToken
          console.log(response.authResponse.accessToken)
        }
      })
    }

  // myApp.config(function (localStorageServiceProvider) {
  // localStorageServiceProvider
  //   .setPrefix('cofen')
  })
