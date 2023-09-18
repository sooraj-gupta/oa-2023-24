const graphDiv = document.getElementById("graph");

const grids = 
{
    "madison": "MKX/37,64",
    "sanfrancisco": "MTR/85,105",
    "chicago": "LOT/76,73",
    "newyork": "OKX/33,34",
    "losangeles": "LOX/155,45"
}
    
fetch(
    "https://oa-7dgb.onrender.com/api?grid="+grids.madison //use "http://localhost:3000" if running sample express backend locally, or replace with your own backend endpoint url
    // "http://localhost:3000/api"
).then(async res => {
    Plotly.newPlot( graphDiv, [ await res.json() ]); 
})

function apiCall(grid)
{
    fetch(
        "https://oa-7dgb.onrender.com/api?grid="+grids[grid] //use "http://localhost:3000" if running sample express backend locally, or replace with your own backend endpoint url
    ).then(async res => {
        Plotly.newPlot( graphDiv, [ await res.json() ]); 
    })
}

window.onload = () => {
  const buttons = document.querySelectorAll(".button");
  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const city = button.id;
      apiCall(city);
      buttons.forEach((button) => button.classList.remove("selected"));
      button.classList.add("selected");
    });
  });
}