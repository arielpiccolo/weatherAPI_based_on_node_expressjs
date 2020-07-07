//imports
const hbs = require('hbs');
const express =  require('express');
const path = require('path');
const request = require('request');
// const { response } = require('express');
// const { post } = require('request');
//hiding  api key
const credentials = require('./credentials')


// init
const app = express();
const publicFolder = path.join(__dirname, './views/inc')
// create viewPath variable
const viewsPath = path.join(__dirname, './views');
//  declare the path to partialPath
const partialPath = path.join(__dirname, './views/inc');
// init partial path
hbs.registerPartials(partialPath);

//setting sets and use
app.set('view engine', 'hbs');
app.set('views', viewsPath);
app.use(express.urlencoded());
app.use(express.json());
// fixed path to public folder
app.use(express.static(publicFolder));

// openWeather data


// const key = '975d1427e374c67ecd3127415304faa0';


// let country = 'usa';
// let city = 'dallas';
// let baseURL =  'http://api.openweathermap.org/data/2.5/weather?q=';

app.get('/error', (req, res) => {
    res.render('404')
});



app.get("/", (req, res) => {
    res.render("index");
});


app.post("/weather", (req, res) => {
    let URL =  `http://api.openweathermap.org/data/2.5/weather?q=${req.body.theCity},${req.body.theCountry}&units=metric&appid=${credentials.key}`

//setting the request, setting json = true and error handling
    request( { url: URL, json: true }, (error, response) => {
        const goodRES = 'response.body.main.temp';
        const validCountry = `${req.body.theCountry}`;
        const validCity = `${req.body.theCity}`
        if (goodRES || validCountry || validCity) {
            res.render('result',  {
                target: `The current temperature in  ${validCity},${validCountry} is ${response.body.main.temp} celsius `,
            })
            } else {  
                res.render('/error', {
                    noData: "no data"
            
                })
       }
    });   
    
});









// app.post("/weather", (req, res) => {
//     console.log(req.body);
//     res.render('result', {
//         City: req.body.theCity,
//         Country: req.body.theCountry
//     });
// });







//server port
app.listen(5000, () => {
    console.log("server running @port 5000")
});
    
    


// // set a search by category page app
// app.get("/search", (req, res) => {
//     res.render("search");
// });    


// //  set a display category page app doing a query to the 'theCategory' input
// app.get("/displayCategory", (req, res) => {
//     // next we use query instead of body because we are graving values from the URL
//     const category = req.query.theCategory;


//     // set a new variable 'jokeURL' path to the api URL for categories and pass our category variable
//     const jokeURL = `https://api.chucknorris.io/jokes/random?category=${category}`

//     request( { url: jokeURL, json: true }, (error, response) => {
//         if (response.body.error) {
//             res.render('index',  {
//                 target: "Sorry that category does not exist"
//             })
//         } else {  
//             res.render('index', {
//                 target: response.body.value
//             })
//        }
//     });   
    
// });




// working bellow 


// // imports
// const express = require('express');
// const hbs = require('hbs');
// const path = require('path');
// const request = require('request');
// const { response } = require('express');

// // init
// const app = express();
// // create viewPath variable
// const viewsPath = path.join(__dirname, './views');
// //  declare the path to partialPath
// const partialPath = path.join(__dirname, './views/inc');
// // init partial path
// hbs.registerPartials(partialPath);

// //setting sets and use
// app.set('view engine', 'hbs');
// app.set('views', viewsPath);
// app.use(express.urlencoded());
// app.use(express.json());

// // openWeather data
// const apiKey = '975d1427e374c67ecd3127415304faa0';
// let country = 'usa';
// let city = 'dallas';

// // routes
// // getting input from user
// // targeting the api url 
// app.get("/", (req, res) => {
//     let URL =  `http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&units=metric&appid=${apiKey}`

// //setting the request, setting json = true and error handling
//     request( { url: URL, json: true }, (error, response) => {
//         if (response.body.error) {
//             res.render('index',  {
//                 target: "Sorry that category does not exist"
//             })
//         } else {  
//             res.render('index', {
//                 target: `The current temperature in  ${city},${country} is ${response.body.main.temp} celsius `
//             })
//        }
//     });   
    
// });



// // server port
// app.listen(5000, () => {
//     console.log("server running @port 5000")
// });



