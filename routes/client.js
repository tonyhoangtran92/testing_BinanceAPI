module.exports = function (app, obj, binance) {
    binance.futuresMiniTickerStream('NEARUSDT', (data) => {
        //console.log(data.close);
        app.io.sockets.emit("server-send-price", data.close);
    });

    app.get("/", function (req, res) {
        //res.send("Hello " + obj.apiKey);
        res.render("master");
    });

    app.get("/buy:amount", function (req, res) {
        var quantity = parseFloat(req.params.amount);
        binance.marketBuy("NEARUSDT", quantity)
            .then((data) => {
                console.log(data);
                res.json(data);
            })
            .catch((err) => {
                console.log(err);
                res.json(err);
            });
    });

    app.get("/sell:amount", function (req, res) {
        var quantity = parseFloat(req.params.amount);
        binance.marketSell("NEARUSDT", quantity)
            .then((data) => {
                console.log(data);
                res.json(data);
            })
            .catch((err) => {
                console.log(err);
                res.json(err);
            });
    });

}
