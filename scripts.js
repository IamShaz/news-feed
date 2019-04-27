var url = 'https://newsapi.org/v2/top-headlines?' +
'country=us&' +
'apiKey=c951460373084c91bdf4fa34f4b4c44c';

fetch(new Request(url))
.then(function(response) {
response.json().then(function(data) {

    document.getElementById('article-image').src = data.articles[1].urlToImage;
    document.getElementById('title').innerHTML = data.articles[1].title;
    document.getElementById('description').innerText = data.articles[1].description;
    document.getElementById('author').innerText = data.articles[1].author;
    document.getElementById('source').innerText = data.articles[1].source.name;
    document.getElementById('date').innerText = new Date(Date.parse(data.articles[1].publishedAt)).toDateString();

});
})
