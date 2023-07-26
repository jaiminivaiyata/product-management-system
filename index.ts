import http from "http";
import app from "./src/app";

const server = http.createServer(app)

server.listen(3000)
    .on("error", () => {
        console.log("Error in starting the server")
    })
    .on("listening", () => {
        console.log("Server is started and running on 3000 PORT")
    })