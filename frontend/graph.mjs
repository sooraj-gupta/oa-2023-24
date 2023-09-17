const graphDiv = document.getElementById("graph");

fetch(
    "https://oa-7dgb.onrender.com/api" //use "http://localhost:3000" if running sample express backend locally, or replace with your own backend endpoint url
    // "http://localhost:3000/api"
).then(async res => {
    Plotly.newPlot( graphDiv, [ await res.json() ]); 
})

