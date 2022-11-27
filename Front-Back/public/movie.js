const url=new URL(location.href);
const movieId=url.searchParams.get("id");
const movieTitle=url.searchParams.get("title")


const APILINK='http://localhost:8000/api/v1/reviews';

const main=document.getElementById("section");
const title=document.getElementById("title");

returnMovies(APILINK);