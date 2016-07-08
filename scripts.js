
// b214b2f6cd4cb56d9c0a986a2215d33f API KEY!!!!!
// 'http://api.themoviedb.org/3/search/movie?api_key=' + api_key + '&query=fight+club
// http://api.themoviedb.org/3/search/movie?api_key=b214b2f6cd4cb56d9c0a986a2215d33f&query=batman+returns



$(document).ready(function() {
  //This is to remove validation message if no poster image is present//
      $('#term').focus(function() {
        var full = $('#poster').has('img').length ? true : false;
        if(full === false) {
          $('#poster').empty();
        }
      });


      var reset = function() {
        $('#term').val(" ");
        $('#plot').html(" ");
        $('#similar').html(" ");
      }


      var noPoster = function() {
        $('#poster').html('<h3 id="noPoster"> Ooops, not cool enough for a poster </h3>');
      }

      var getPoster = function() {
        //Grab movie title and store it in variable//
        var film = $('#term').val();
        var i = 0;
        //check for error if user has entered anything//
        if(film == '') {
          $('#poster').html("<h2 class='loading'>you forgot something</h2>");
        } else {
          //User didn't screw it up, call the API!!!//
          $('#poster').html("<h2 class='loading'> Your poster is on the way!!</h2>");
          $.getJSON("http://api.themoviedb.org/3/search/movie?api_key=b214b2f6cd4cb56d9c0a986a2215d33f&query=" + film, function(json){
              if(json.total_results != 0){
                $('#poster').html('<img id="thePoster" src=https://image.tmdb.org/t/p/original' + json.results[i]["poster_path"] + ' />');
                $('#plot').html('<h2 class="loading">' + json.results[i]["overview"] + ' </h2>');
                $('#term').click(function(){
                    $('#term').val(" ");
                })
                $('#similar').html('<h3> Find others like this</h3>');
              } else {
                $('#poster').html('<h2>Nothing found</h2>');
                reset();
              }
          });

        }
      }


      var j = 1;
      var findSimilar = function(){
        var film = $('#term').val();
        $.getJSON("http://api.themoviedb.org/3/search/movie?api_key=b214b2f6cd4cb56d9c0a986a2215d33f&query=" + film, function(json){
            if(json.results[j]["poster_path"] !== null) {
              $('#poster').html('<img id="thePoster" src=https://image.tmdb.org/t/p/original' + json.results[j]["poster_path"] + ' />');
              $('#plot').html('<h2 class="loading">' + json.results[j]["overview"] + ' </h2>');
              $('#term').click(function(){
                  $('#term').val(" ");
              })
              $('#similar').html('<h3> Find others like this</h3>');
              j += 1;
                if(j >= json.results.length){
                  $('#similar').html('<h3> Thats all folks!</h3>');
                }
            } else {
              j+=1;
              noPoster();
              $('#plot').html(" ");
            }


              });
      };




// click GET POSTER text to run
  $('#search').click(getPoster);
  // hit ENTER to run
  $('#term').keyup(function(event){
    if(event.keyCode == 13){
      getPoster()
    }
  })
// click find similar to search for next index
  $('#similar').click(function(){
    findSimilar();
  });


});
