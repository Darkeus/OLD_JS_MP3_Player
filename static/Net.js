console.log("wczytano plik Net.js")

class Net {

    constructor(a, b, f, p) {
        this.a = a // użycie zmiennych
        this.b = b
        this.f = f
        this.p = p


        console.log("konstruktor klasy Net")
        this.sendData()
        // this.doSth() // wywołanie funkcji z tej samej klasy
    }

    doSth(f, p, a) {
        console.log("A:" + a)
        $("#d1").empty()
        $(".wiersz").remove()
        console.log("Przesłąne: " + f + " - " + p)
        for (var i = 0; i < f.length; i++) {

            $("#d1").append('<img class="img"  src="/' + f[i] + '/img.jpg" alt="Picture"  width="60%" height:"' + (60 / f.length) + '%">')

        }
        if (p.length != 0) {
            for (var i = 0; i < p.length; i++) {
                var list = p[i].split(".")
                if (list[1] == "mp3")
                    $("#t").append('<tr class="wiersz"><td>' + f[a] + '</td><td>' + p[i] + '</td><td class="prz">+</td></tr>')
            }
        }
        var dzieci = $("#d1").children()
        for (var j = 0; j < dzieci.length; j++) {
            dzieci[j].num = j
        }
        var dzieci = $(".wiersz")
        for (var j = 0; j < dzieci.length; j++) {
            $(dzieci[j]).attr("num", j)
        }
        console.log("funcja doSth " + this.b + " - " + this.a)
        var gra = $("#audio_src").attr("src")
        for (let v = 0; v < $(".wiersz").length; v++) {
            console.log($(".wiersz").eq(v).children().eq(0).html() + "/" + $(".wiersz").eq(v).children().eq(1).html() + "-" + $("#audio_src").attr("src"))
            if ($(".wiersz").eq(v).children().eq(0).html() + "/" + $(".wiersz").eq(v).children().eq(1).html() == $("#audio_src").attr("src")) {
                $(".wiersz").eq(v).css("background-color", "#E6C3FF")
            }
        }

        ui.clicks()
        ui.hover()
    }

    sendData() {
        $.ajax({
            url: "/upload",
            data: { a: this.a },
            type: "POST",
            success: function (data) {

                console.log(data)
                //czytamy odesłane z serwera dane
                var obj = JSON.parse(data)



                //tu wypisz sumę w div-ie na stronie


                //console.log()
                net.doSth(obj.f, obj.p, obj.a)



            },
            error: function (xhr, status, error) {
                console.log(xhr);
            },

        })

        // tutaj wysłanie danych ajaxem na serwer
    }
}