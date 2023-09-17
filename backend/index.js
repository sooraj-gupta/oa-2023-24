import express from "express"
import cors from "cors"
import https from "https"

const app = express()

app.use(cors({
    origin: "http://localhost:3000",
}))

app.use(express.static('../frontend'));

app.get("/api", (req, res) => {
  // when the frontend requests the /api endpoint, we make a request to the weather api
  // and send the response back to the frontend, incldue the user-agent header so the
  // weather api knows who is making the request

  https.get({
    hostname: "api.weather.gov",
    mode: "cors",
    path: "/gridpoints/MKX/37,64/forecast/hourly",
    headers: {
      "User-Agent": "weather-app"

    }
  }, weatherRes => {
    let data = ""
    weatherRes.on("data", chunk => {
      data += chunk
    })
    weatherRes.on("end", () => {
      try {
        // Parse the received data into a JavaScript object
        const weatherData = JSON.parse(data);

        //formatted data in the format of {x: [1, 2, 3], y: [4, 5, 4]}
        //don't set the graph color to black, set the color of the background of the graph to black
        const formattedData = {
          x: [],
          y: [],
          type: "scatter",
          mode: "lines",
          line: {
            color: "rgb(0,0,150)"
          },
          marker: {
            color: "rgb(0,0,34)"
          },

          plot_bgcolor:"black",
          paper_bgcolor:"black",
          
        };

        // Loop through the received data and push the data to the formattedData object
        weatherData.properties.periods.forEach(period => {
          formattedData.x.push(new Date(period.startTime).toISOString()),
          formattedData.y.push(period.temperature);
        });
        

        // Send the formatted data as a JSON response to the frontend
        res.json(formattedData);
      } catch (error) {
        // Handle any parsing or formatting errors and send an appropriate response
        res.status(500).json({ error: "An error occurred while processing the data." });
      }
    })
  })
})
  
  // res.send({
  //   x: [1, 2, 3],
  //   y: [4, 5, 4],
  // }).status(200) 

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`server listening on port ${port} 🚀`))

