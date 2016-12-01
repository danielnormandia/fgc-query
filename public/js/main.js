$(document).ready(function() {

var addEventListeners = function() {
  $('.playerSearch').submit(function(event) {
    var $playerName = $('#pSearch').val();
    playerCall($playerName);
    event.preventDefault();
  });
  $('.tournamentSearch').submit(function(event) {
    var $tourneyName = $('#tSearch').val();
    tourneyCall($tourneyName);
    event.preventDefault();
  });
};
addEventListeners();

var playerCall = function(pName)  {
  $.ajax({
    url: '/pData/' + pName,
    method: 'GET'
  })
  .fail(function(data) {
    console.log('Error');
  })
  .done(function(data) {

  });
};

var tourneyCall = function(tName) {
  $.ajax({
    url:'/tData/' + tName,
    method: 'GET'
  })
  .fail(function(data) {
    console.log('Error');
  })
  .done(function(data) {

  });
};















})
