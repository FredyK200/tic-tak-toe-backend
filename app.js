var express = require("express");
var socket = require("socket.io");

// App Setup
var app = express();
var server = app.listen(process.env.PORT);

// Static Files
app.use(express.static('public'));

// Socket Setup
var io = socket(server);

var turn = "X";
var players= {playerX: false, playerO: false};
var winner = "";

var board = [
    [" ", " ", " "],    // 0, 1, 2
    [" ", " ", " "],    // 3, 4, 5
    [" ", " ", " "]     // 6, 7, 8
];

function playerStuff() {
    if (turn == "X"){
        turn = "O";
    } else {
        turn = "X";
    }
}

function clearBoard() {
    board = [
        [" ", " ", " "],    // 0, 1, 2
        [" ", " ", " "],    // 3, 4, 5
        [" ", " ", " "]     // 6, 7, 8
    ];
    turn = "X";
    players = {playerX: false, playerO: false};
}

function checkForWin(name) {
    winner = ""
    XcountHOR = 0;
    OcountHOR = 0;
    XcountVERT = 0;
    OcountVERT = 0;
    for (i= 0; i<3; i++){
        XcountHOR = 0;
        OcountHOR = 0;
        XcountVERT = 0;
        OcountVERT = 0;
        for (j=0; j<3; j++){
            if (board[i][j] == "X"){
                XcountHOR++;
            }
            if (board[i][j] == "O") {
                OcountHOR++;
            }
            if (board[j][i] == "X"){
                XcountVERT++;
            }
            if (board[j][i] == "O") {
                OcountVERT++;
            }
        }
                if (XcountHOR == 3 || XcountVERT == 3){
                    winner = name;
                    clearBoard();
                }
                if (OcountHOR == 3 || OcountVERT == 3){
                    winner = name;
                    clearBoard();
                }
    }
}

io.on("connection", function(socket){
    socket.emit("board", board);
    socket.emit("turn", turn);
    socket.emit("players", players);

    socket.on("clearBoard", player => {
        clearBoard();
        io.sockets.emit("clearBoard", player);
        io.sockets.emit("board", board);
        io.sockets.emit("turn", turn);
        io.sockets.emit("players", players);
    })
	socket.on("clearChat", player => {
        io.sockets.emit("clearChat", player);
    })

    socket.on("selection", selection => {
        if (selection == "X" && !players['playerX']) {
            players['playerX'] = true;
        } else {
            players['playerO'] = true;
        }
        io.sockets.emit("players", players);
    })
	
    socket.on("message", message => {
        io.sockets.emit('message', `${message[0]}: ${message[1]}`);
    })

    socket.on("move", data => {
        switch(data[0]) {
            case 0:
                if (board[0][0] == " "){
                    board[0][0] = data[1];
                    playerStuff();
                    checkForWin(data[2]);
                    io.sockets.emit("board", board);
                    io.sockets.emit("turn", turn);
                    io.sockets.emit("winner", winner);
                }
                break;
            case 1:
                if (board[0][1] == " "){
                    board[0][1] = data[1];
                    playerStuff();
                    checkForWin(data[2]);
                    io.sockets.emit("board", board);
                    io.sockets.emit("turn", turn);
                    io.sockets.emit("winner", winner);
                }
                break;
            case 2:
                if (board[0][2] == " "){
                    board[0][2] = data[1];
                    playerStuff();
                    checkForWin(data[2]);
                    io.sockets.emit("board", board);
                    io.sockets.emit("turn", turn);
                    io.sockets.emit("winner", winner);
                }
                break;

            case 3:
                if (board[1][0] == " "){
                    board[1][0] = data[1];
                    playerStuff();
                    checkForWin(data[2]);
                    io.sockets.emit("board", board);
                    io.sockets.emit("turn", turn);
                    io.sockets.emit("winner", winner);
                }
                break;
            case 4:
                if (board[1][1] == " "){
                    board[1][1] = data[1];
                    playerStuff();
                    checkForWin(data[2]);
                    io.sockets.emit("board", board);
                    io.sockets.emit("turn", turn);
                    io.sockets.emit("winner", winner);
                }
                break;
            case 5:
                if (board[1][2] == " "){
                    board[1][2] = data[1];
                    playerStuff();
                    checkForWin(data[2]);
                    io.sockets.emit("board", board);
                    io.sockets.emit("turn", turn);
                    io.sockets.emit("winner", winner);
                }
                break;

            case 6:
                if (board[2][0] == " "){
                    board[2][0] = data[1];
                    playerStuff();
                    checkForWin(data[2]);
                    io.sockets.emit("board", board);
                    io.sockets.emit("turn", turn);
                    io.sockets.emit("winner", winner);
                }
                break;
            case 7:
                if (board[2][1] == " "){
                    board[2][1] = data[1];
                    playerStuff();
                    checkForWin(data[2]);
                    io.sockets.emit("board", board);
                    io.sockets.emit("turn", turn);
                    io.sockets.emit("winner", winner);
                }
                break;
            case 8: 
                if (board[2][2] == " "){
                    board[2][2] = data[1];
                    playerStuff();
                    io.sockets.emit("board", board);
                    checkForWin(data[2]);
                    io.sockets.emit("turn", turn);
                    io.sockets.emit("winner", winner);
                }
                break;
        }
    })
})
