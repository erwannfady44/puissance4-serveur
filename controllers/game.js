const User = require('../models/user');
const Game = require('../models/game');
const Pawn = require('../models/pawn');
const jwt = require('jsonwebtoken');

const keyToken = 'P7H}9C7ccv^Sk7Yia0C1Te1o3g2gqTt6EmuyIi.g8(}iQLM+sGX5577&0SF)e50)kjDomBt6Ns^MAHZ7#3Tq{87~2m=UInz7L05@XwC2dJHS5FAX:P?3@*:2ALII4G@Hf!Uc1akX?:xMm6bt<(b27VW80lcVf&;d99CVfNS+0Ni28Q{q8!7Y5}(C48zO@x5C8-PHn/j=Bc00998C{VK:cE09GS5_B10R8YR3?077r~v89hQI6p{Kydu65|0$py&c{Pdl[70FL|B%);uib4*dQ5@6!^%6^$j1vhn2%5H=E02!6224[nFiF5,&ctI-~s(7@L&:,~0e281ki>1A7FS7:7$2KTfe3u787a^8-qH4Yu6R96a@)p*25811~|RG,9UpsA$;1hW7[(/OZb5)6rN~:swMTam7/h!{^PjWE0<2WK$+$i?}p:%e;3g~A%:q)zZs$lL9$A>Z>qF}[4wUYf#0&*Mq8csI$?5F2mG@o^ZhsMa]wRDSqY#m0[j@lt/$zoW7';

exports.createGame = (req, res) => {
    User.findOne({_id: req.body.idUser})
        .then(user => {
            if (user) {
                Game.findOne({status: 0, $or: [{player1: user._id}, {player2: user._id}]})
                    .then(gameFind => {
                        if (!gameFind) {
                            const game = new Game({
                                player1: user._id,
                                currentPlayer: Math.floor(Math.random())
                            });
                            game.save().then(() => res.status(201).json(game))
                                .catch(() => 'cannot create game');
                        } else {
                            res.status(409).json({error: 'you are already in game'});
                        }
                    })
            } else {
                res.status(404).json({error: 'cannot find user'})
            }
        })
}

exports.joinGame = (req, res) => {
    User.findOne({_id: req.body.idUser})
        .then(user => {
            if (user) {
                Game.findOne({_id: req.params.idGame})
                    .then(game => {
                        if (game) {
                            if (!game.player2) {
                                game.updateOne({
                                    player2: user._id
                                }).then((g) => res.status(200).json())
                                    .catch((err) => res.status(500).json({error: 'cannot join Game', err: err.message}))
                            } else {
                                res.status(409).json({error: 'game is full'})
                            }
                        } else {
                            res.status(404).json({error: 'cannot find game'})
                        }
                    })
            } else {
                res.status(404).json({error: 'cannot find user'});
            }
        })
}

exports.getAllGames = (req, res) => {
    Game.find()
        .then(data => res.status(200).json(data))
        .catch(err => res.status(500).json(err))
}

exports.play = (ws, req) => {
    let params = {};
    let connected;
    req.url.split('?')[1].split(('&')).forEach(p => {
        let d = p.split('=');
        params[d[0]] = d[1];
    });

    connect();

    ws.on('message', (data) => {
        console.log(msg);
    });

    ws.on('close', (data) => {
        Game.findOne({_id: params.idGame})
            .then(game => {
                if (game.player1.toString() === params.idUser) {
                    game.updateOne({
                        player1Connected: false
                    }).then(() => console.log("close"))
                } else if (game.player2.toString() === params.idUser) {
                    game.updateOne({
                        player2Connected: false
                    }).then(() => console.log("close"))
                }
            })
    });

    function connect() {
        //Vérification de l'authentification
        const decodedToken = jwt.verify(params.token, keyToken);
        const idUser = decodedToken.idUser;
        //Si le joueur est authentifié
        if (params.idUser && params.idUser === idUser) {
            //Recherche de la game
            Game.findOne({_id: params.idGame})
                .then(async game => {
                    //Si le joueur est j1
                    if (game.player1.toString() === params.idUser) {
                        connected = true;
                        //Changement de l'état de la connexion du joueur
                        game.updateOne({player1Connected: true}).then(() => checkSecondPlayer(game))
                        //Si on est j2
                    } else if (game.player2.toString() === params.idUser) {
                        connected = true;
                        //Changement de l'état de la connexion du joueur
                        game.updateOne({player2Connected: true}).then(() => checkSecondPlayer(game))
                    } else {
                        ws.send("wrong game");
                    }


                })
        } else {
            ws.send('not ok');
        }


    }

    function checkSecondPlayer(game) {
        if (connected) {
            if (game.player1Connected && game.player2Connected) {
                ws.send("start");
            } else {
                ws.send("waiting player2");
            }
        }
    }
}