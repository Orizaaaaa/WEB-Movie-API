$('.search-button').on('click', function () {
    $.ajax({
        url: 'http://www.omdbapi.com/?apikey=cb7eb65c&s=' + $('.input-kyword').val(),
        success: result => {
            const movies = result.Search
            let cards = ''
            movies.forEach(m => {
                cards += showCards(m)
                // merupakan sebuah function yang di panggil, function nya berada di bawah 
            });

            $('.movie-container').html(cards)



            $('.modal-detail-button').on('click', function () {
                $.ajax({
                    url: 'http://www.omdbapi.com/?apikey=cb7eb65c&i=' + $(this).data('imdbid'),
                    success: m => {
                        const movieDetail = showMovieDetail(m)

                        $('.modal-body').html(movieDetail);
                    }
                });
            });


        },
        error: (e) => {
            console.log(e.responseText);
        }
    })

})



function showCards(m) {
    return `<div class="col-md-3 my-3">
            <div class="card">
                <img src="${m.Poster}" class="card-img-top">
                <div class="card-body">
                    <h5 class="card-title">${m.Title}</h5>
                    <h6 class="card-subtitle mb-2 text-body-secondary">${m.Year}</h6>
                    <a href="#" class="btn btn-primary modal-detail-button" data-bs-toggle="modal" data-bs-target="#exampleModal"
                    data-imdbid="${m.imdbID}">Show Details</a>
                </div>
            </div>
            </div> `
}

function showMovieDetail(m) {
    return ` <div class="container-fluid">
                <div class="row">
                    <div class="col-md-3">
                        <img src="${m.Poster}" class="img-fluid rounded-2">
                    </div>
                    <div class="col-md">
                        <ul class="list-group">
                            <li class="list-group-item">
                                <h4>${m.Title} ${m.Year}</h4>
                            </li>
                            <li class="list-group-item"><strong>Director:</strong> ${m.Director}</li>
                            <li class="list-group-item"><strong>Actors:</strong> ${m.Actors}</li>
                            <li class="list-group-item"><strong>Writer:</strong> ${m.Writer}</li>
                            <li class="list-group-item"><strong>Plot:</strong><br>${m.Plot}</li>
                        </ul>
                    </div>
                </div>
            </div>`
}