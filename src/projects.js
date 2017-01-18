$(function(){
    $('#term').keyup(e => {
      if(e.keyCode === 13) {
        App.getPosterData();
      }
    })

    const App = {
      counter: 1,
      movieData: {},
      init(e) {
        $('#similar').on('click', this.getNext.bind(this))
      },
      clearInput() {
        $('#term').val(" ");
      },
      renderDisplay(i) {
        $('#poster').html(`<img id='thePoster' src=https://image.tmdb.org/t/p/original${this.movieData['results'][i]['poster_path']}>`).hide().fadeIn('slow');
        $('#plot').html(`<h2 class="loading">${this.movieData['results'][i]["overview"]}</h2>`).hide().fadeIn('slow');
        $('#year').html(`<h3>${this.movieData['results'][i]["release_date"].substring(0,4)}</h3>`).hide().fadeIn('slow');
        $('#similar').html('<h6> Find others like this</h6>').hide().fadeIn('slow')
        $('#term').click(function(){$('#term').val('')})
      },
      getNext() {
        let index = this.counter;
        this.renderDisplay(index);
        this.counter++;
      },
      getPosterData() {
        let film = $('#term').val();
        if(!film) {$('#poster'.html("<h2 class='loading'>you forgot something</h2>"))}
        else {
          $.getJSON(`http://api.themoviedb.org/3/search/movie?api_key=b214b2f6cd4cb56d9c0a986a2215d33f&query=${film}`, (json) => {
            if(json.total_results != 0) {
              this.movieData = json;
              App.renderDisplay(0)
            } else {
              $('#poster').html('<h2>Nothing found</h2>').addClass('fade-in');
              this.reset();
            }
          })
       }
      },
      reset() {
        $('#term').val(" ");
        $('#plot').html(" ");
        $('#similar').html(" ");
        $('#year').html(" ");
      }
    }
    App.init()
});
