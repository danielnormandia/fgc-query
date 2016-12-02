$(document).ready(function() {

var addEventListeners = function() {
  $('.playerSearch').submit(function(event) {
    var $playerName = $('#pSearch').val();
    playerCall($playerName);
    event.preventDefault();
  });
  $('.tournamentSearch').submit(function(event) {
    var $tourneyName = $('#tSearch').val();
    tournamentsCall($tourneyName);
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
    appendPlayer(data);
  });
};

var tournamentsCall = function(tsName) {
  $.ajax({
    url:'/tsData/' + tsName,
    method: 'GET'
  })
  .fail(function(data) {
    console.log('Error');
  })
  .done(function(data) {
      appendTournaments(data);
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
      appendTournament(data);
  });
};

var appendPlayer = function(pObject) {
    $('.playerSearch').hide();
    var $playerDiv = $('<div class="player"></div>');
    for(var prop in pObject) {
      if(prop !== 'results' && prop !== 'rankings') {
      var $playerProp = $('<p>'+ prop + ': ' + pObject[prop] + '</p>');
      $playerDiv.append($playerProp);
    }
    $('body').append($playerDiv);
  };
}
var appendTournaments = function(tObject) {
  $('.tournamentSearch').hide();
  var $tournamentsDiv = $('<div class="tournaments"></div>');
  tObject.forEach(function(obj) {
    var $tournamentName = $('<p>' + obj.value + '</p>');
    $tournamentName.click(function() {
      var $tourney = $(this).text();
      tourneyCall($tourney);
    })
    $tournamentsDiv.append($tournamentName);
  });
  $('body').append($tournamentsDiv);
};

var appendTournament = function(singleTourneyObj) {
  var $tournamentsDiv1 = $('div.tournaments');
  $tournamentsDiv1.hide();
  var obj = singleTourneyObj;
  var $tournamentDiv = $('<div class="tournament"></div>');
  var $tournamentList = $('<ul class="tList"></ul>')
  var $tournamentId = $('<li>' + obj.id + '</li>')
  var $tournamentName = $('<li>' + obj.name + "</li>");
  var $tournamentCountry = $('<li>' + obj.country + '</li>');
  var $tournamentGame = $('<li>' + obj.game + '</li>');
  var $tournamentCoverage = $('<li>' + obj.coverage + '</li>');
  $tournamentList.append($tournamentId)
                 .append($tournamentName)
                 .append($tournamentCountry)
                 .append($tournamentGame)
                 .append($tournamentCoverage);
  $tournamentDiv.append($tournamentList);
  $('body').append($tournamentDiv);
};












})
