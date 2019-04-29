(function(){

    // Controller Navigation
    var left = document.getElementById('left');
    var right = document.getElementById('right');
    var navCount = 0;    

    (fetchNewsData = () => {

        var url = 'https://newsapi.org/v2/top-headlines?' +
        'country=us&' +
        'apiKey=c951460373084c91bdf4fa34f4b4c44c';

        fetch(new Request(url))
            .then(function(response) {
            response.json().then(function(data) {
                createArticles(data);
            });
        });
    })();

    createArticles = (data) => {

        controlStyling = (dir,trans) => {
            dir.style.opacity = trans;
        }

        if(navCount <= 0) {
            controlStyling(left, 0.5);
            navCount = 0;
        } else {
            controlStyling(left, 1);
        }
        if(navCount >= data.articles.length - 1) {
            controlStyling(right, 0.5);
            navCount = data.articles.length - 1;
        } else {
            controlStyling(right, 1);
        }

        document.getElementById('article-image').src = data.articles[navCount].urlToImage;
        document.getElementById('title').innerHTML = data.articles[navCount].title;
        document.getElementById('description').innerText = data.articles[navCount].description;
        document.getElementById('author').innerText = data.articles[navCount].author;
        document.getElementById('source').innerText = data.articles[navCount].source.name;
        document.getElementById('date').innerText = new Date(Date.parse(data.articles[navCount].publishedAt)).toDateString();        

    }

    left.onclick = () => {
        navCount--;
        fetchNewsData();
    }
    right.onclick = () => {
        navCount++;
        fetchNewsData();
    }


    // Typing Text Title
    var titleCount = 0;
    var title = 'The Latest Headlines';

    (typingTitle = () => {
        if(titleCount < title.length) {
            document.getElementsByTagName('h1')[0].innerHTML += title.charAt(titleCount);
            titleCount++;
            setTimeout(typingTitle, 200);
        }
    })();    
    
})();