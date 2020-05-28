$(document).ready(() => {
    $('#searchForm').on('submit' , (e) => {
        let searchText = $('#searchText').val();
        getMovies(searchText);
        e.preventDefault();
    });
});

function getMovies(searchText) {
    axios.get('http://www.omdbapi.com?s='+searchText+'&apikey=9be27fce')
        .then ((response) => {
            console.log(response);
            let movies = response.data.Search;
            let output = '';
            $.each(movies,(index,movie) => {
                output += `
                    <div class="col-md-3">
                        <div class="well text-center">
                            <img src="${movie.Poster}">
                            <h5>${movie.Title}</h5>
                            <a onclick="movieSelected('${movie.imdbID}')" class="btn btn-primary" href="#">Movie Details</a>;
                        </div>
                    </div>
                `;
            });
            $('#movies').html(output); 
        })
        .catch ((err) => {
            console.log(err);
        });
}

function movieSelected(id) {
    sessionStorage.setItem('movieId',id);
    window.location = 'movie.html';
    return false;
}

function getMovie(id) {
    let movieId = sessionStorage.getItem('movieId');

    axios.get('http://www.omdbapi.com?i='+movieId+'&apikey=9be27fce')
        .then ((response) => {
            console.log(response);
            let movie = response.data;

            let output = `
                <div class="row">
                    <div class="col-md-4">
                        <img src="${movie.Poster}" class="thumbnail">
                    </div>
                    <div class="col-md-8">
                        <h2>${movie.Title}</h2>
                        <ul class="list-group">
                            <li class="list-group-item"><b>Genre: </b>${movie.Genre}</li>
                            <li class="list-group-item"><b>Released: </b>${movie.Released}</li>
                            <li class="list-group-item"><b>Rated: </b>${movie.Rated}</li>
                            <li class="list-group-item"><b>IMD Rating: </b>${movie.imdbRating}</li>
                            <li class="list-group-item"><b>Director: </b>${movie.Director}</li>
                            <li class="list-group-item"><b>Writer: </b>${movie.Writer}</li>
                        </ul>    
                    </div>
                </div>
                <hr>
                <div class="row">
                    <div class="well">
                        <h3>Plot:</h3>
                        ${movie.Plot}
                        <hr>
                        <a href="http://www.imdb.com/title/${movie.imdbID}" target="_blank" class="btn btn-info">IMDB Rating</a>
                        <a href="index.html" class="btn btn-primary"> Go Back</a>
                    </div>
                </div>
            `;

            $('#movie').html(output);
        })
        .catch ((err) => {
            console.log(err);
        });
}