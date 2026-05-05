import http from 'node:http'
import url from 'node:url'
import fs from 'node:fs'

const pages = {
    "/": "eeeeeee"
}
const server = http.createServer((request,response) => {
    console.log("request recieved broski!")
    let url = request.url
    console.log(pages[url])
    response.writeHead(200,"Request Recieved!",{"Content-Type": 'text/plain'})
    response.end("Hello and Goodbye!")
})

server.listen(8080,'localhost',() => {
    console.log("server running")
})