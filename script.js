let movieItem = document.getElementsByClassName('movie-list')[0]
let firstLink= "https://image.tmdb.org/t/p/original/"


const showMovies = (data) => {  
    data.forEach(item =>{
        if(item.poster_path == null){
            return console.log(`${item.original_title} has no img`)
        }

        movieItem.innerHTML +=
            `
            <div class="card" style="width: 18rem;">
                <img src="${firstLink}${item.poster_path}" class="card-img-top" alt="" width="100%">
                <div class="card-body">
                    <p class="card-text">
                        <span class="title">${item.original_title}</span>
                        <span class="rating">${item.vote_average}</span>
                        <span class="date">${item.release_date}</span>
                    </p>            
                </div>
            </div>
            `
        console.log(item.release_date.par);
        })
}

const getMovieDB = async () => {
    let url = "https://api.themoviedb.org/3/discover/movie?api_key=5e29d351e036bb92a0111dcaef651f81&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate"
    let response = await fetch(url)
    let movies = await response.json()
    let moviesArray = movies.results;
    showMovies(moviesArray)  
} 
getMovieDB()

const searching = (search) => {
    fetch(`https://api.themoviedb.org/3/search/movie?api_key=5e29d351e036bb92a0111dcaef651f81&query=${search}&languange=en-US&page=1`)
    .then(result => result.json())
    .then(result => {
        let data = result.results
        showMovies(data)
    })  
}

let button = document.getElementById("btn-search")
button.addEventListener("click", (event =>{
    event.preventDefault()
    movieItem.innerHTML = ""
    let searchKey = document.getElementById('search').value
    searching(searchKey)

}))