const graphDiv = document.getElementById("graph");

fetch(
    "https://oa-7dgb.onrender.com/api" //use "http://localhost:3000" if running sample express backend locally, or replace with your own backend endpoint url
    // "http://localhost:3000/api"
).then(async res => {
    Plotly.newPlot( graphDiv, [ await res.json() ]); 
})

const grids = 
{
    "madison": "MKX/37,64",
    "sanfrancisco": "MTR/85,105",
    "chicago": "LOT/76,73",
    "newyork": "OKX/33,34",
    "losangeles": "LOX/94,67"
}
    
function apiCall(grid)
{
    fetch(
        "https://oa-7dgb.onrender.com/api?grid="+grid
    ).then(async res => {
        Plotly.newPlot( graphDiv, [ await res.json() ]); 
    })
}