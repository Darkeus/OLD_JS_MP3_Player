console.log("wczytano plik fav.js")

class Fav {
    constructor(wys) {
        this.wys = wys
        this.zapisz()
    }

    zapisz() {
        var klasa = this


        console.log("lecim")
        console.log(this.wys)
        $.ajax({
            url: "/db",
            data: this.wys,
            type: "POST",
            success: function (data) {
                //console.log("Odebrane:")
                console.log(data)
                //czytamy odesłane z serwera dane
                obj = JSON.parse(data)



                //tu wypisz sumę w div-ie na stronie



                // var temp = JSON.parse(obj[0].substr(1))
                console.log(obj)
                console.log(this.wys)
                if (klasa.wys == undefined) {
                    $(".wiersz").remove()
                    for (let m = 0; m < obj.length; m++) {
                        $("#t").append("<tr class='wiersz'></tr>")
                        // console.log(fav[m])
                        $(".wiersz").eq(m).append("<td>" + obj[m]["a"] + "</td><td>" + obj[m]["b"] + "</td><td></td>")
                        $(".wiersz").eq(m).children().eq(2).empty()
                    }

                    ui.clicks()
                    ui.hover()
                }

            },
            error: function (xhr, status, error) {
                console.log(xhr);
            },

        })
    }
}