/* Global Variables */

const baseURL  = 'http://api.openweathermap.org/data/2.5/weather?zip=';
const key = 'b3f6cbb1402a1376fd3761a0d9933e3c';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();
// let newDate = d.toLocaleString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
let generate = document.getElementById('generate').addEventListener('click', performAction);

function performAction(e){
    const zipCode = document.getElementById('zip').value;
    const feelings = document.getElementById('feelings').value;
    console.log(newDate);
    getTemp(baseURL, zipCode, key)
    .then(function (data){
        // Add data to POST request
        postData('http://localhost:3000/WeatherData', {temperature: data.main.temp, date: newDate, user_response: feelings } )
        // Function which updates UI
        .then(function() {
            updateUI();
        })
    })
};

// Async GET
const getTemp = async (baseURL, code, key)=>{
// const getTemperatureDemo = async (url)=>{
    const res = await fetch(baseURL + code + ',us' + '&APPID=' + key)
    console.log(res);
    try {
        const data = await res.json();
        console.log(data);
        return data;
    }
    catch(error) {
        console.log('Error', error);
    }
};

// Async POST
const postData = async (url = '', data = {}) => {
    const postRequest = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    try {
        const newData = await postRequest.json();
        return newData;
    }
    catch (error) {
        console.log('Error', error);
    }
};

// Update user interface
const updateUI = async () => {
    const req = await fetch('http://localhost:3000/all');
    try {
        const allData = await req.json();
        document.getElementById('date').innerHTML = allData.date;
        document.getElementById('temp').innerHTML = allData.temperature;
        document.getElementById('content').innerHTML = allData.user_response;
    }
    catch (error) {
        console.log('Error', error);
    }
};
