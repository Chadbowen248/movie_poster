$(document).ready(function() {
  //This is to remove validation message if no poster image is present//
  $('#term').focus(function() {
    var full = $('#poster').has('img').length ? true : false;
    if(full === false) {
      $('#poster').empty();
    }
  });

  // b214b2f6cd4cb56d9c0a986a2215d33f API KEY!!!!!
// 'http://api.themoviedb.org/3/search/movie?api_key=' + api_key + '&query=fight+club

// http://api.themoviedb.org/3/search/movie?api_key=b214b2f6cd4cb56d9c0a986a2215d33f&query=batman+returns
var film = $('#term').val();

  var getPoster = function() {
    //Grab movie title and store it in variable//
    var film = $('#term').val();
    //check for error if user has entered anything//
    if(film == '') {
      $('#poster').html("<h2 class='loading'> Hey silly billy, enter a movie</h2>");
    } else {
      //User didn't screw it up, call the API!!!//
      $('#poster').html("<h2 class='loading'> Your poster is on the way!!</h2>");
      $.getJSON("http://api.themoviedb.org/3/search/movie?api_key=b214b2f6cd4cb56d9c0a986a2215d33f&query=" + film, function(json){
          if(json != 'Nothing found.'){
            $('#poster').html('<img id="thePoster" src=https://image.tmdb.org/t/p/original' + json.results[0]["poster_path"] + ' />');
          } else {
            $('#poster').html('<h2>Nothing found</h2>');
          }
      });

    }
  }


  $('#search').click(getPoster);


});
