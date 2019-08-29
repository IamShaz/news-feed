(function(){
    var powerBtn = document.getElementById('power').querySelector('img');
    var power = document.getElementById('power');
    powerBtn.addEventListener('click', function() {
        power.classList.add('hidden');
        document.getElementById('remote-screen').style.display = 'block';  
        document.getElementById('tv-remote').classList.add('slide-up');
        typingTitle(showRemoteTitle);
    })

    // Search Filters
    let country = document.getElementById('country-filters');
    let category = document.getElementById('category-filters');
    let countryArr = [
        { 'countryName': 'Argentina', 'code': 'ar' },
        { 'countryName': 'Australia', 'code': 'au' },
        { 'countryName': 'Austria', 'code': 'at' },
        { 'countryName': 'Belgium', 'code': 'be' },
        { 'countryName': 'Brazil', 'code': 'br' },
        { 'countryName': 'Bulgaria', 'code': 'bg' },
        { 'countryName': 'Canada', 'code': 'ca' },
        { 'countryName': 'China', 'code': 'cn' },
        { 'countryName': 'Colombia', 'code': 'co' },
        { 'countryName': 'Cuba', 'code': 'cu' },
        { 'countryName': 'Czech Republic', 'code': 'cz' },
        { 'countryName': 'Egypt', 'code': 'eg' },
        { 'countryName': 'France', 'code': 'fr' },
        { 'countryName': 'Germany', 'code': 'de' },
        { 'countryName': 'Hong Kong', 'code': 'hk' },
        { 'countryName': 'Hungary', 'code': 'hu' },
        { 'countryName': 'India', 'code': 'in' },
        { 'countryName': 'Indonesia', 'code': 'id' },
        { 'countryName': 'Ireland', 'code': 'ie' },
        { 'countryName': 'Israel', 'code': 'il' },
        { 'countryName': 'Italy', 'code': 'it' },
        { 'countryName': 'Japan', 'code': 'jp' },
        { 'countryName': 'Korea, Republic of', 'code': 'kr' },
        { 'countryName': 'Lithuania', 'code': 'lt' },
        { 'countryName': 'Latvia', 'code': 'lv' },
        { 'countryName': 'Malaysia', 'code': 'my' }, 
        { 'countryName': 'Mexico', 'code': 'mx' },
        { 'countryName': 'Morocco', 'code': 'ma' },
        { 'countryName': 'Netherlands', 'code': 'nl' },
        { 'countryName': 'Nigeria', 'code': 'ng' },
        { 'countryName': 'New Zealand', 'code': 'nz' },
        { 'countryName': 'Norway', 'code': 'no' },
        { 'countryName': 'Philippines', 'code': 'ph' },
        { 'countryName': 'Poland', 'code': 'pl' },
        { 'countryName': 'Portugal', 'code': 'pt' },
        { 'countryName': 'Romania', 'code': 'ro' },
        { 'countryName': 'Russian Federation', 'code': 'ru' },
        { 'countryName': 'Saudi Arabia', 'code': 'sa' },
        { 'countryName': 'Serbia', 'code': 'rs' },
        { 'countryName': 'Singapore', 'code': 'sg' },
        { 'countryName': 'Slovakia', 'code': 'sk' },
        { 'countryName': 'South Africa', 'code': 'za' },
        { 'countryName': 'Sweden', 'code': 'se' },
        { 'countryName': 'Switzerland', 'code': 'ch' },
        { 'countryName': 'Taiwan, Province of China', 'code': 'tw' },
        { 'countryName': 'Thailand', 'code': 'th' },
        { 'countryName': 'Turkey', 'code': 'tr' },
        { 'countryName': 'Ukraine', 'code': 'ua' },    
        { 'countryName': 'United Arab Emirates', 'code': 'ae' }, 
        { 'countryName': 'United Kingdom', 'code': 'gb' },                           
        { 'countryName': 'US', 'code': 'us' },
        { 'countryName': 'Venezuela', 'code': 've' }
    ];
    let categoryArr = ['Business', 'Entertainment', 'General', 'Health', 'Science', 'Sports', 'Technology'];

    // Creates filter dropdown menus
    countryArr.map(countryItem => {
        var countOpt = document.createElement('option');
        countOpt.innerHTML = countryItem.countryName;
        countOpt.value = countryItem.code;
        country.appendChild(countOpt);
    });
    categoryArr.map(categoryItem => {
        var catOpt = document.createElement('option');
        catOpt.innerHTML = categoryItem;
        catOpt.value = categoryItem;
        category.appendChild(catOpt);
    });

    let navCount = 0;    

    controllerFunc = (dataArticles) => {
        controlStyling = (dir,trans) => {
            dir.style.opacity = trans;
        }

        if(navCount <= 0) {
            controlStyling(left, 0.5);
            navCount = 0;
        } else {
            controlStyling(left, 1);
        }
        if(navCount >= dataArticles.length - 1) {
            controlStyling(right, 0.5);
            navCount = dataArticles.length - 1;
        } else {
            controlStyling(right, 1);
        }    
    }

    createArticles = (dataArticles) => {
        controllerFunc(dataArticles);
        document.getElementById('article').querySelector('img').src = dataArticles[navCount].urlToImage;
        var titlStr = dataArticles[navCount].title.substring(0, 50);
        document.getElementById('title').innerHTML = titlStr.substring(0, Math.min(titlStr.length, titlStr.lastIndexOf(" "))) + ' ...';
        var descStr = dataArticles[navCount].description.substring(0, 80);
        document.getElementById('description').innerText = descStr.substring(0, Math.min(descStr.length, descStr.lastIndexOf(" "))) + ' ...';
        document.getElementById('author').innerText = dataArticles[navCount].author;
        if(document.getElementById('author').innerText == '') {
            document.querySelector('.dash').style.display = 'none';
        } else {
            document.querySelector('.dash').style.display = 'inline-block';
        }
        
        document.getElementById('source').innerText = dataArticles[navCount].source.name;
        document.getElementById('date').innerText = new Date(Date.parse(dataArticles[navCount].publishedAt)).toDateString();
        document.getElementById('article').querySelector('.link').href = dataArticles[navCount].url;
        document.getElementById('play-newsfeed').querySelector('.link').href = dataArticles[navCount].url;
        document.getElementById('center-content').querySelector('.link').href = dataArticles[navCount].url;        
        document.getElementById('bottom-content').querySelector('.link').href = dataArticles[navCount].url;
    }

    fetchNewsData = (countVal, catVal) => {
        let url = 'https://newsapi.org/v2/top-headlines?' +
        'country=' + countVal + '&' +
        'category=' + catVal + '&' +
        'apiKey=c951460373084c91bdf4fa34f4b4c44c';

        fetch(new Request(url))
            .then(function(response) {
            response.json().then(function(data) {
                let dataArticles = data.articles;
                createArticles(dataArticles);
            });
        });
    };


    showRemoteTitle = function() {
        document.getElementById('remote-screen').querySelector('p').style.opacity = 1;
    }     

    // Typing text header
    let titleCount = 0;
    let title = 'Read the Latest Headlines';
    typingTitle = (showRemoteTitle) => {
        if(titleCount < title.length) {                        
            document.getElementById('remote-screen').querySelector('h2').innerHTML += title.charAt(titleCount);
            titleCount++;
            setTimeout(typingTitle, 70);
        }
        setTimeout(showRemoteTitle, 1750);
    };

    // Gets Filtered data and runs api
    getData = () => {
        let countVal = country.value;
        let catVal = category.value;    

        // Sets default country value to Canada
        if(countVal == '') countVal = country.value = 'ca';
        // Sets default category value to General
        if(catVal == '') catVal = category.value = 'General';

        fetchNewsData(countVal, catVal);
    }

    var controller = document.getElementById('controller');
    let btn = document.getElementById('search-filters').querySelector('button');
    btn.addEventListener('click', function() {    
        document.getElementById('play-newsfeed').style.display = 'block';
        controller.style.display = 'flex';
        document.getElementById('remote-screen').style.display = 'none';
        getData();        
    });
    btn.onmousedown = function() {
        btn.classList.add('inset-shadow');
    }
    btn.onmouseup = function() {
        btn.classList.remove('inset-shadow');
    }  


    // Controller Navigation

    var left = document.createElement('div');
    left.id = "left"
    left.innerHTML = '<';
    controller.appendChild(left);

    var right = document.createElement('div');
    right.id = "right"
    right.innerHTML = '>';
    controller.appendChild(right);   

    left.onclick = () => {        
        navCount--;
        getData();
    }
    right.onclick = () => {
        navCount++;
        getData();
    }
    left.onmousedown = function() {
        left.classList.add('inset-shadow');
    }
    right.onmousedown = function() {
        right.classList.add('inset-shadow');
    }    
    left.onmouseup = function() {
        left.classList.remove('inset-shadow');
    }
    right.onmouseup = function() {
        right.classList.remove('inset-shadow');
    }        


}());