var CellState;
(function (CellState) {
    CellState["X"] = "X";
    CellState["O"] = "O";
    CellState["Blank"] = "&nbsp";
})(CellState || (CellState = {}));
document.addEventListener('DOMContentLoaded', function () {
    new Board('board');
});
var Cell = /** @class */ (function () {
    function Cell(element) {
        this.element = element;
        this.value = CellState.Blank;
        this.element.innerHTML = CellState.Blank;
    }
    Cell.prototype.setValue = function (value) {
        if (this.value !== CellState.Blank) {
            return false;
        }
        this.element.innerHTML = value;
        this.value = value;
        return true;
    };
    Cell.prototype.getValue = function () {
        return this.value;
    };
    return Cell;
}());
var Board = /** @class */ (function () {
    function Board(tableId) {
        this.cells = [];
        this.playerValue = CellState.X;
        this.playerMoves = 0;
        this.endGame = false;
        this.table = document.getElementById(tableId);
        this.movies = document.getElementById('movies');
        this.loadBoard();
    }
    Board.prototype.loadBoard = function () {
        var _this = this;
        this.cells = [];
        var _loop_1 = function (i, row) {
            this_1.cells[i] = [];
            var _loop_2 = function (j, cell) {
                cell.onclick = function () { _this.clickCell(i, j, _this.playerValue); };
                this_1.cells[i][j] = new Cell(cell);
            };
            for (var j = 0, cell = void 0; cell = row.cells[j]; j++) {
                _loop_2(j, cell);
            }
        };
        var this_1 = this;
        for (var i = 0, row = void 0; row = this.table.rows[i]; i++) {
            _loop_1(i, row);
        }
    };
    Board.prototype.clickCell = function (x, y, value) {
        var _this = this;
        if (this.endGame) {
            alert('Gra się już zakończyła');
            this.displayPlayAgainPrompt();
            return;
        }
        var success = this.cells[x][y].setValue(value);
        if (!success) {
            alert('To pole jest już zajęte, spróbuj wybrać inne.');
            return;
        }
        this.movies.innerText = (++this.playerMoves).toString();
        this.playerValue = value === CellState.X ? CellState.O : CellState.X;
        if (this.checkIfWon(x, y)) {
            setTimeout(function () {
                alert('Gratulację, wygrałeś!');
                _this.displayPlayAgainPrompt();
            }, 10);
            return;
        }
        if (this.checkDraw()) {
            alert('Zremisowałeś');
            this.displayPlayAgainPrompt();
            return;
        }
        return;
    };
    Board.prototype.displayPlayAgainPrompt = function () {
        this.endGame = true;
        if (!confirm('Chcesz zagrać ponownie?')) {
            return;
        }
        this.resetGame();
    };
    Board.prototype.resetGame = function () {
        this.endGame = false;
        this.playerMoves = 0;
        this.movies.innerText = '0';
        this.loadBoard();
    };
    Board.prototype.checkColumns = function (x, y) {
        for (var i = 0; this.cells.length; i++) {
            if (this.cells[x][i].getValue() !== this.cells[x][y].getValue()) {
                return false;
            }
            if (i === this.cells.length - 1) {
                return true;
            }
        }
        return false;
    };
    Board.prototype.checkRows = function (x, y) {
        for (var i = 0; this.cells.length; i++) {
            if (this.cells[i][y].getValue() !== this.cells[x][y].getValue()) {
                return false;
            }
            if (i === this.cells.length - 1) {
                return true;
            }
        }
        return false;
    };
    Board.prototype.checkDiagonal = function (x, y) {
        if (x == y) {
            for (var i = 0; i < this.cells.length; i++) {
                if (this.cells[i][i].getValue() != this.cells[x][y].getValue())
                    return false;
                if (i === this.cells.length - 1) {
                    return true;
                }
            }
        }
        return false;
    };
    Board.prototype.checkAntiDiagonal = function (x, y) {
        if (x + y === this.cells.length - 1) {
            for (var i = 0; i < this.cells.length; i++) {
                if (this.cells[i][(this.cells.length - 1) - i].getValue() !== this.cells[x][y].getValue()) {
                    return false;
                }
                if (i === this.cells.length - 1) {
                    return true;
                }
            }
        }
        return false;
    };
    Board.prototype.checkDraw = function () {
        return this.playerMoves === Math.pow(this.cells.length, 2);
    };
    Board.prototype.checkIfWon = function (x, y) {
        if (this.checkColumns(x, y)) {
            return true;
        }
        if (this.checkRows(x, y)) {
            return true;
        }
        if (this.checkDiagonal(x, y)) {
            return true;
        }
        if (this.checkAntiDiagonal(x, y)) {
            return true;
        }
        return false;
    };
    return Board;
}());
