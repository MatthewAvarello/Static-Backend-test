import http from 'node:http'
import url from 'node:url'
import fs from 'node:fs'
import path from 'node:path'
import { buffer } from 'node:stream/consumers'

const pages = {
    "/": "index.html",
    "/about": "about.html",
    "/contact-me": "contact-me.html",
    "/index.html": "index.html",
    "/about.html": "about.html",
    "/contact-me.html": "contact-me.html"
}
const server = http.createServer((request,response) => {
    console.log("request recieved broski!")
    let requesturl = request.url
    let filename = pages[requesturl]
    console.log(filename)
    if (!filename){
        filename = "404.html"
    }

    let filepath = path.join(import.meta.dirname,filename)

    fs.readFile(filepath,(error,data)=> {
        if (error){
            console.log(error.code)
            response.writeHead(500,"Unknown Server Error")
            response.end()
            return
        }

        if(filename == "404.html"){
            response.writeHead(404,"Could not find file",{'Content-Type': 'text/html', 'content-length': Buffer.byteLength(data)})
            response.end(data)
            return
        }

        response.writeHead(200,"Sending File!",{'Content-Type': 'text/html', 'content-length': Buffer.byteLength(data)})
        response.end(data)
    })

})

server.listen(8080,'localhost',() => {
    console.log("server running")
})