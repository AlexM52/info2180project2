"use strict";
/*VAR DECLARATION*/
var tiles;
var blank_x = "300px";
var blank_y = "300px";

/*ONLOAD - SETS EVERYTHING UP*/
window.onload = function(){
    /*Collect all puzzle tile elements for future reference.*/
    tiles = $$("#puzzlearea div");
    /*Offset variables to set up each tile (position, background, etc)*/
    var x_offset = 0;
    var y_offset = 0;
    /*Iterate through each tile and assign classname 'puzzlepiece', 
    id 'piece_x_y', positioning, background and onclick handler*/
    for(var i=0; i<tiles.length; i++){
        if(x_offset===4){
            x_offset=0;
            y_offset++;
        }
        tiles[i].addClassName("puzzlepiece");
        tiles[i].setAttribute('id', 'piece_'+x_offset+"_"+y_offset);
        
        tiles[i].style.left = x_offset*100 + "px";
        tiles[i].style.top = y_offset*100 + "px";
        tiles[i].style.backgroundPosition = x_offset*-100 + "px " + y_offset*-100 + "px";
        x_offset++;
        
        tiles[i].onclick = tileClick;
    }
    /*Set the current movable pieces. (Could disable to prevent 
    any movement before shuffling the puzzle)*/
    setMovables();
    /*Find the shuffle button and set it's onclick handler.*/
    var btn_shuffle = $$("#shufflebutton")[0];
    btn_shuffle.onclick = shuffleClick;
};

/*ADDITIONAL FUNCTION DEFINITIONS*/

/*shuffleClick() - onclick handler for shuffle button. 
Shuffles tiles, calls findEmpty() and setMovables()*/
var shuffleClick = function(){
    /*Iterate a given number of times(25), finding all movable tiles
    picking one at random and moving it, to shuffle the game*/
    for(var i=0; i<25; i++){
        var m_tiles = $$(".movablepiece");
        var tile = m_tiles[Math.floor(Math.random()*m_tiles.length)];
        moveTile(tile.id);
    }
};

/*tileClick() - onclick handler for each tile element*/
var tileClick = function(){
    /*Only do anything if the clicked tile is movable*/
    if(this.className==="puzzlepiece movablepiece"){
        /*Basically, swap the positions of the clicked tile
        and blank space*/
        var tmp_x = this.style.left;
        var tmp_y = this.style.top;
        this.style.left = blank_x;
        this.style.top = blank_y;
        var bx = parseInt(blank_x, 10)/100;             // And also
        var by = parseInt(blank_y, 10)/100;             // change the
        this.setAttribute('id', 'piece_'+bx+"_"+by);    // id to match..
        blank_x = tmp_x;
        blank_y = tmp_y;
        setMovables();
    }
};

/*setMoveables() - called after moving a tile. Determines 
moveable tiles and sets styling. Resets previous tiles*/
var setMovables = function(){
    /*Clear any previously set movable tiles*/
    for(var i=0; i<tiles.length; i++){
        tiles[i].removeClassName("movablepiece");
    }
    /*Get the grid position of the blank space*/
    var pos_x = parseInt(blank_x, 10)/100;
    var pos_y = parseInt(blank_y, 10)/100;
    var t;      //Variable for the next part
    /*If applicable, set the tiles above, below, left and right
    of the blank to movable.*/
    if(pos_x>=1){
        t = getTileAt(pos_x-1, pos_y);
        t[0].addClassName("movablepiece");
    }
    if(pos_x<=2){
        t = getTileAt(pos_x+1, pos_y);
        t[0].addClassName("movablepiece");
    }
    if(pos_y>=1){
        t = getTileAt(pos_x, pos_y-1);
        t[0].addClassName("movablepiece");
    }
    if(pos_y<=2){
        t = getTileAt(pos_x, pos_y+1);
        t[0].addClassName("movablepiece");
    }
};

/*getTileAt(pos_x, pos_y) - Given x and y coordinates, 
return puzzle tile at that location*/
var getTileAt = function(pos_x, pos_y){
    return $$("#puzzlearea #piece_"+pos_x+"_"+pos_y);
};

/*moveTile() - moves a tile*/
var moveTile = function(id){
    var tile = $$("#"+id)[0];
    var tmp_x = tile.style.left;
    var tmp_y = tile.style.top;
    tile.style.left = blank_x;
    tile.style.top = blank_y;
    var bx = parseInt(blank_x, 10)/100;
    var by = parseInt(blank_y, 10)/100;
    tile.setAttribute('id', 'piece_'+bx+"_"+by);
    blank_x = tmp_x;
    blank_y = tmp_y;
    setMovables();
};