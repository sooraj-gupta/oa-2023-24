const graphDiv = document.getElementById("graph");

const grids = 
{
    "madison": "MKX/37,64",
    "sanfrancisco": "MTR/85,105",
    "chicago": "LOT/76,73",
    "newyork": "OKX/33,34",
    "losangeles": "LOX/155,45"
}

function apiCall(grid)
{
    fetch(
        "https://oa-7dgb.onrender.com/api?grid="+grids[grid] //use "http://localhost:3000" if running sample express backend locally, or replace with your own backend endpoint url
    ).then(async res => {
        let data = await res.json();
        Plotly.newPlot( graphDiv, [ data ]); 
        let avgTemp = data.y.reduce((a, b) => a + b, 0) / data.y.length;
        document.getElementById("temp").innerHTML = avgTemp.toFixed(0) + "°F";
        document.getElementsByClassName("loadingio-spinner-rolling-sijxdcq7t9l")[0].style.display = data.y.length > 0 ? "none" : "none";

    })
}



window.onload = () => {
  apiCall("madison");
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