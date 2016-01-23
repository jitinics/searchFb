angular.module('myPoint', [])
  .controller('pointController', ['$rootScope', '$scope', '$http', function ($rootScope, $scope, $http) {
    $scope.people = []
    $scope.keyword = 'n'
    checkFB()

    $scope.selectPeople = function (data) {
      data.point = 0
      $scope.people.push(data)
      console.log($scope.people)
    }

    $scope.changePoint = function (index, operator) {
      if (operator === '-' && $scope.people[index].point > 0) {
        $scope.people[index].point--
        console.log('-' + operator)
      } else if (operator === '+') {
        $scope.people[index].point++
        console.log('+' + operator)
      }
    }

    $scope.searchFB = function (keyword) {
      $scope.keyword = keyword
      if (keyword === '') {
        $scope.searchData = ''
        console.log($scope.searchData, 'a')
      } else {
        $http.get('https://graph.facebook.com/v2.5/search?q=' + keyword + '&type=user&access_token=' + $scope.token)
          .success(function (res) {
            // console.log(res)
            var regex = /&q=(\w+)&/
            var output = regex.exec(res.paging.next)
            if (output[1] && $scope.keyword === output[1]) {
              $scope.searchData = res.data
            }
          })
      }
    }

    function checkFB () {
      ;(function (d, s, id) {
        var js
        var fjs = d.getElementsByTagName(s)[0]
        if (d.getElementById(id)) { return }
        js = d.createElement(s); js.id = id
        js.src = '//connect.facebook.net/en_US/sdk.js'
        fjs.parentNode.insertBefore(js, fjs)
      }(document, 'script', 'facebook-jssdk'))

      ;(function (d, s, id) {
        var js
        var fjs = d.getElementsByTagName(s)[0]
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
        })
        FB.getLoginStatus(function (response) {
          console.log(response)
          if (response.status === 'connected') {
            $scope.token = response.authResponse.accessToken
            $scope.login = true
            $scope.$apply()
            console.log($scope.login)
          } else {
            $scope.login = false
            $scope.$apply()

            console.log($scope.login)
          }
        })
      }
    }
  }])
