'use strict';
var vcanvas, ctx;
var r_left, r_right, r_up, r_down, sp;
var s;
var scl = 20;
var food = {x: null, y: null};

function Snake() {
    this.x = 0;
    this.y = 0;
    this.xspeed = 0;
    this.yspeed = 0;
    this.tail = [];     // new

    this.update = function () {
        // new -----------------
        var i;

        for (i = this.tail.length - 1; i > 0; i -= 1) {
            this.tail[i] = this.tail[i - 1];
        }
        this.tail[0] = {x: this.x, y: this.y};

        this.x += this.xspeed * scl;
        this.y += this.yspeed * scl;
        // -----------------------

        if (this.x < 0) { this.x = 0; }
        if (this.x + scl > vcanvas.width) { this.x = vcanvas.width - scl; }
        if (this.y < 0) { this.y = 0; }
        if (this.y + scl > vcanvas.height) { this.y = vcanvas.height - scl; }
    };

    this.eat = function (pos) {
        var dx = this.x - pos.x, dy = this.y - pos.y, d;

        d = Math.sqrt(dx * dx + dy * dy);
        if (d < 1) {
            this.tail.push({x: null, y: null});     // new
            return true;
        } else {
            return false;
        }
    };

    this.dir = function (x, y) {
        this.xspeed = x;
        this.yspeed = y;
    };

    this.draw = function () {
        // new -----------------
        var i;

        ctx.fillStyle = 'gray';
        for (i = 0; i < this.tail.length - 1; i += 1) {
            ctx.fillRect(this.tail[i].x, this.tail[i].y, scl, scl);
        }
        // --------------------

        ctx.fillStyle = 'black';
        ctx.fillRect(this.x, this.y, scl, scl);
    };
}

function clearCanvas() {
    ctx.clearRect(0, 0, vcanvas.width, vcanvas.height);
}

function pickLocation() {
    var cols, rows;

    cols = Math.floor(vcanvas.width / scl);
    rows = Math.floor(vcanvas.height / scl);

    food.x = Math.floor(Math.random() * cols) * scl;
    food.y = Math.floor(Math.random() * rows) * scl;
}

function drawFood() {
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x, food.y, scl, scl);
}

function update() {
    if (r_left) { s.dir(-1, 0); }
    if (r_right) { s.dir(1, 0); }
    if (r_up) { s.dir(0, -1); }
    if (r_down) { s.dir(0, 1); }
}

function gameLoop() {
    clearCanvas();
    update();
    s.update();
    if (s.eat(food)) { pickLocation(); }
    drawFood();
    s.draw();
}

function init() {
    vcanvas = document.getElementById("myCanvas");
    document.ontouchstart = set_key;
    ctx = vcanvas.getContext("2d");

    s = new Snake();
    pickLocation();

    setInterval(gameLoop, 80);
}

// key control

function set_key(evt) {
    r_left = r_right = r_up = r_down = 0;

    var clientX = evt.touches[0].clientX;
    var clientY = evt.touches[0].clientY;

    if(clientX < 100){key.l = 1;}
    if(clientX > 500){key.r = 1;}
    if(clientX > 100 && clientX < 500 && clientY < 300){key.u = 1;}
    if(clientX > 100 && clientX < 500 && clientY > 300){key.d = 1;}
}
