var http = require("http");
var fs = require("fs");
var qs = require("querystring")
var bp
var Datastore = require('nedb')

var coll1 = new Datastore({
    filename: 'kolekcja.db',
    autoload: true
});
function servres(req, res) {
    var allData = "";

    //kiedy przychodzą dane POSTEM, w postaci pakietów,
    //łącza się po kolei do jednej zmiennej "allData"
    // w poniższej funkcji nic nie modyfikujemy

    req.on("data", function (data) {
        // console.log("data: " + data)
        allData += data;
    })


    //kiedy przyjdą już wszystkie dane
    //parsujemy je do obiektu "finish"
    //i odsyłamy do przeglądarki

    req.on("end", function (data) {
        finish = qs.parse(allData)
        var folders = []
        var pliki = []
        // console.log("Pliki" + folders)
        // console.log(finish.a)
        //////////////////////////////////////
        fs.readdir(__dirname + "/mp3", function (err, files) {
            if (err) {
                return console.log(err);
            }
            //
            files.forEach(function (fileName) {
                //console.log(fileName);
                if (fileName != "ukryty")
                    folders.push(fileName)
                //tu dodaj foldery do wcześniej utworzonej tablicy
            });
            // console.log(folders)
            // tu można od razu wywołać taką samą funkcję, która przeczyta pliki z pierwszego katalogu w tablicy


            fs.readdir(__dirname + "/mp3/" + folders[finish.a], function (err, files) {
                if (err) {
                    return console.log(err);
                }
                //
                files.forEach(function (fileName) {
                    //console.log(fileName);
                    pliki.push(fileName)
                    //tu dodaj foldery do wcześniej utworzonej tablicy
                });
                //  console.log(pliki)
                finish.f = folders
                finish.p = pliki
                bp = folders
                // console.log(finish)
                res.end(JSON.stringify(finish));
            });

        });

        ///////////////////////////////////////




    })
}
function baza(req, res) {
    var allData = "";

    //kiedy przychodzą dane POSTEM, w postaci pakietów,
    //łącza się po kolei do jednej zmiennej "allData"
    // w poniższej funkcji nic nie modyfikujemy

    req.on("data", function (data) {
        // console.log("data: " + data)
        allData += data;
    })


    //kiedy przyjdą już wszystkie dane
    //parsujemy je do obiektu "finish"
    //i odsyłamy do przeglądarki

    req.on("end", function (data) {
        finish = qs.parse(allData)
        console.log("finish:")
        console.log(finish)
        if (finish.a) {
            coll1.insert(finish, function (err, newDoc) {
                console.log("dodano dokument (obiekt):")
                console.log(newDoc)
            });
        }
        coll1.find({}, function (err, docs) {
            //zwracam dane w postaci JSON
            // console.log("----- tablica obiektów pobrana z bazy: \n")
            // console.log(docs)
            // console.log("----- sformatowany z wcięciami obiekt JSON: \n")
            //finish = JSON.stringify({ "docsy": docs }, null, 5)
            finish = docs
            // console.log("finish:")
            // console.log(finish)

            res.end(JSON.stringify(finish))
        });




        ////////////////////////////////////

        /////////////////////////////////////




    })
}
var server = http.createServer(function (req, res) {


    // console.log(req.method) // zauważ ze przesyłane po kliknięciu butona dane, będą typu POST

    switch (req.method) {
        case "GET":
            // tu wykonaj załadowanie statycznej strony z formularzem
            fs.readFile("static/index.html", function (error, data) {
                if (error) {
                    res.writeHead(404, { 'Content-Type': 'text/html' });
                    res.write("<h1>błąd 404 - nie ma pliku!<h1>");
                    res.end();
                } else if (req.url === "/style.css") {
                    fs.readFile("static/style.css", function (error, data) {
                        res.writeHead(200, { 'Content-Type': 'text/css' });
                        res.write(data);
                        res.end();
                    })
                }
                else if (req.url === "/Main.js") {
                    fs.readFile("static/Main.js", function (error, data) {
                        res.writeHead(200, { 'Content-Type': 'application/javascript' });
                        res.write(data);
                        res.end();
                    })
                }
                else if (req.url === "/fav.js") {
                    fs.readFile("static/fav.js", function (error, data) {
                        res.writeHead(200, { 'Content-Type': 'application/javascript' });
                        res.write(data);
                        res.end();
                    })
                }
                else if (req.url === "/Ui.js") {
                    fs.readFile("static/Ui.js", function (error, data) {
                        res.writeHead(200, { 'Content-Type': 'application/javascript' });
                        res.write(data);
                        res.end();
                    })
                }
                else if (req.url === "/Net.js") {
                    fs.readFile("static/Net.js", function (error, data) {
                        res.writeHead(200, { 'Content-Type': 'application/javascript' });
                        res.write(data);
                        res.end();
                    })
                }
                else if (req.url.endsWith(".jpg")) {
                    // console.log(req.url)
                    fs.readFile(__dirname + "/mp3/" + decodeURI(req.url), function (error, data) {
                        console.log(error)
                        res.writeHead(200, { 'Content-Type': 'application/javascript' });
                        res.write(data);
                        res.end();
                    })
                }
                else if (req.url.indexOf(".mp3") != -1) {
                    // console.log("Muzyka:" + decodeURI(req.url))
                    fs.readFile(__dirname + "/mp3/" + decodeURI(req.url), function (error, data) {
                        console.log("BŁĄD: " + error)
                        res.writeHead(200, { "Content-type": "audio/mpeg" });
                        res.write(data);
                        res.end();
                    })
                }

                else {
                    res.writeHead(200, { 'Content-Type': 'text/html' });
                    res.write(data);
                    res.end();
                }
            });
            break;
        case "POST":
            // wywołanie funkcji "servres", która pobierze dane przesłane 
            // w formularzu i odpowie do przeglądarki 
            // (uwaga - adres żądania się nie zmienia)
            if (req.url === "/upload")
                servres(req, res)
            else if (req.url === "/db")
                baza(req, res)



            break;

    }

})

server.listen(3000, function () {
    console.log("serwer startuje na porcie 3000")
});
