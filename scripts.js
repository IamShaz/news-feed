<<<<<<< HEAD
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
    document.getElementById('article-image').src = dataArticles[navCount].urlToImage;
    document.getElementById('title').innerHTML = dataArticles[navCount].title;
    document.getElementById('description').innerText = dataArticles[navCount].description;
    document.getElementById('author').innerText = dataArticles[navCount].author;
    document.getElementById('source').innerText = dataArticles[navCount].source.name;
    document.getElementById('date').innerText = new Date(Date.parse(dataArticles[navCount].publishedAt)).toDateString();
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

// Typing text header
let titleCount = 0;
let title = 'The Latest Headlines';
typingTitle = () => {
    if(titleCount < title.length) {
        document.getElementsByTagName('h1')[0].innerHTML += title.charAt(titleCount);
        titleCount++;
        setTimeout(typingTitle, 200);
    }
};  

// Gets Filtered data and runs api
getData = () => {
    let countVal = country.value;
    let catVal = category.value;
    fetchNewsData(countVal, catVal);
}

let btn = document.getElementById('search-filters').querySelector('button');
let newsFeed = document.getElementById('news-feed');
btn.addEventListener('click', function() {
    newsFeed.style.display = 'block';
    getData();
    typingTitle();
});

// Controller Navigation
var controller = document.getElementById('controller');

var left = document.createElement('div');
left.id = "left"
left.innerHTML = '&lBarr;';
controller.appendChild(left);

var right = document.createElement('div');
right.id = "right"
right.innerHTML = '&rBarr;';
controller.appendChild(right);   

left.onclick = () => {
    navCount--;
    getData();
}
right.onclick = () => {
    navCount++;
    getData();
}
=======
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
    document.getElementById('article-image').src = dataArticles[navCount].urlToImage;
    document.getElementById('title').innerHTML = dataArticles[navCount].title;
    document.getElementById('description').innerText = dataArticles[navCount].description;
    document.getElementById('author').innerText = dataArticles[navCount].author;
    document.getElementById('source').innerText = dataArticles[navCount].source.name;
    document.getElementById('date').innerText = new Date(Date.parse(dataArticles[navCount].publishedAt)).toDateString();
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

// Typing text header
let titleCount = 0;
let title = 'The Latest Headlines';
typingTitle = () => {
    if(titleCount < title.length) {
        document.getElementsByTagName('h1')[0].innerHTML += title.charAt(titleCount);
        titleCount++;
        setTimeout(typingTitle, 200);
    }
};  

// Gets Filtered data and runs api
getData = () => {
    let countVal = country.value;
    let catVal = category.value;
    fetchNewsData(countVal, catVal);
}

let btn = document.getElementById('search-filters').querySelector('button');
let newsFeed = document.getElementById('news-feed');
btn.addEventListener('click', function() {
    newsFeed.style.display = 'block';
    getData();
    typingTitle();
});

// Controller Navigation
var controller = document.getElementById('controller');

var left = document.createElement('div');
left.id = "left"
left.innerHTML = '&lBarr;';
controller.appendChild(left);

var right = document.createElement('div');
right.id = "right"
right.innerHTML = '&rBarr;';
controller.appendChild(right);   

left.onclick = () => {
    navCount--;
    getData();
}
right.onclick = () => {
    navCount++;
    getData();
}
>>>>>>> 4fa4b1e3f507c8e39782187a740a017b4319831a
