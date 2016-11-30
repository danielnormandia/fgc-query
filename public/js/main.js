$(document).ready(function() {


var makeCall = function(){
    $.ajax({
      url: '/data',
      method: 'GET'
    })
    .fail(function(data) {
      console.log('Error');
    })
    .done(function(data) {
      console.log(data);
    })
  }
makeCall();














})
