console.log("wczytano plik Ui.js")

class Ui {

    constructor() {
        console.log("konstruktor klasy Ui")
        // net.doSth() // wywołanie funkcji z innej klasy
        //this.clicks()

    }

    //obsługa kliknięć w Ui

    clicks() {
        var fav = []
        $(".img").on("click", function () {
            console.log(this.num)
            //if (grane != undefined)

            new Net(this.num).sendData()
        })
        var przelacznik = true
        var grane
        $(".wiersz").on("click", function () {
            if (grane == undefined)
                $(".wiersz").eq(0).css("background-color", "#75FFC1")
            $(".wiersz").eq(grane).css("background-color", "#75FFC1")
            // $("#audio").trigger('stop'); // stopuj granie
            $("#audio_src").attr("src", $(this).children().eq(0).html() + "/" + $(this).children().eq(1).html())

            if (grane != $(this).attr("num")) {
                przelacznik = true
            }
            grane = $(this).attr("num")

            $("#play").attr("src", "ukryty/stop.jpg")

            $(this).css("background-color", "#E6C3FF")

            $("#audio").trigger('load'); // załaduj plik mp3

            if (przelacznik) {
                $("#audio").trigger("play"); // graj plik mp3
                przelacznik = false
                $("#play").attr("src", "ukryty/stop.jpg")
            }
            else {
                $("#audio").trigger('pause'); // stopuj granie
                przelacznik = true
                $("#play").attr("src", "ukryty/play.jpg")

            }
            $("#czas").empty()

            console.log("Grane: " + grane)
        })
        $("#play").click(function () {

            if (przelacznik) {
                $("#audio").trigger("play"); // graj plik mp3
                $(this).attr("src", "ukryty/stop.jpg")
                przelacznik = false
            }
            else {
                $("#audio").trigger('pause'); // stopuj granie
                $(this).attr("src", "ukryty/play.jpg")
                przelacznik = true
            }
        })
        $("#for").click(function () {


            if ((grane || grane == 0) && grane != ($(".wiersz").length - 1)) {
                $("#play").attr("src", "ukryty/stop.jpg")
                przelacznik = false
                $("#audio").trigger('stop'); // stopuj granie
                console.log("Grane: " + grane)
                $("#audio_src").attr("src", $(".wiersz").eq(grane + 1).children().eq(0).html() + "/" + $(".wiersz").eq(grane + 1).children().eq(1).html())

                $("#audio").trigger('load'); // załaduj plik mp3
                $("#audio").trigger("play"); // graj plik mp3

                console.log($("#audio_src").attr("src"))
                $(".wiersz").eq(grane).css("background-color", "#75FFC1")
                grane++
                $(".wiersz").eq(grane).css("background-color", "#E6C3FF")
                document.cookie = grane
            }
        })
        $("#back").click(function () {

            if (grane != 0 && grane) {
                $("#play").attr("src", "ukryty/stop.jpg")
                przelacznik = false
                $("#audio").trigger('stop'); // stopuj granie
                $("#audio_src").attr("src", $(".wiersz").eq(grane - 1).children().eq(0).html() + "/" + $(".wiersz").eq(grane - 1).children().eq(1).html())

                $("#audio").trigger('load'); // załaduj plik mp3
                $("#audio").trigger("play"); // graj plik mp3
                console.log($("#audio_src").attr("src"))
                $(".wiersz").eq(grane).css("background-color", "#75FFC1")
                grane--
                $(".wiersz").eq(grane).css("background-color", "#E6C3FF")
                document.cookie = grane
            }

        })
        $(".prz").click(function (event) {
            event.stopPropagation()
            fav = { a: $(this).parent().children().eq(0).html(), b: $(this).parent().children().eq(1).html() }
            console.log(fav)
            ulubione = new Fav(fav)
            console.log("wypisano")
        })

        $("#audio").on("load", function () {
            $("#ran")
                .attr("min", 0)
                .attr("value", 0)
                .attr("max", $("#audio").prop("duration"))
        })
        $("#audio").on("timeupdate", function timer() {
            $("#czas").html(($("#audio").prop("currentTime") / 60).toString().substr(0, 2).replace(".", "") + ":" + ($("#audio").prop("currentTime") % 60).toString().substr(0, 2).replace(".", "") + "/" + ($("#audio").prop("duration") / 60).toString().substr(0, 2).replace(".", "") + ":" + ($("#audio").prop("duration") % 60).toString().substr(0, 2).replace(".", ""))
            $("#ran").val($("#audio").prop("currentTime"))
        })
        $("#audio").on("ended", function () { $("#for").click() })
        $("#ran").on("input", function () {

            $("#audio").prop("currentTime", $("#ran").val())
        })
        $("#fa").click(function () {
            new Fav().zapisz()



        })

    }

    hover() {
        $(".wiersz").hover(function () {
            $(this).css("background-color", "#E6C3FF")
        }, function () {

            if ($(this).children().eq(0).html() + "/" + $(this).children().eq(1).html() != $("#audio_src").attr("src")) {
                $(this).css("background-color", "#75FFC1")
            }
            // else{

            // }

        })
    }

}

