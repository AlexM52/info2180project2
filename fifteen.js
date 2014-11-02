"use strict";
/*VAR DECLARATION*/
var tiles;
var blank_x = "300px";
var blank_y = "300px";

/*ONLOAD - SETS EVERYTHING UP*/
window.onload = function(){
    tiles = $$("#puzzlearea div");
    var x_offset = 0;
    var y_offset = 0;
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
    
    setMovables();
    
    var btn_shuffle = $$("#shufflebutton")[0];
    btn_shuffle.onclick = shuffleClick;
};

/*ADDITIONAL FUNCTION DEFINITIONS*/

/*shuffleClick() - onclick handler for shuffle button. 
Shuffles tiles, calls findEmpty() and setMovables()*/
var shuffleClick = function(){
    //shuffle code here;
    for(var i=0; i<25; i++){
        var m_tiles = $$(".movablepiece");
        var tile = m_tiles[Math.floor(Math.random()*m_tiles.length)];
        moveTile(tile.id);
    }
};

/*tileClick() - onclick handler for each tile element*/
var tileClick = function(){
    if(this.className==="puzzlepiece movablepiece"){
        var tmp_x = this.style.left;
        var tmp_y = this.style.top;
        this.style.left = blank_x;
        this.style.top = blank_y;
        var bx = parseInt(blank_x, 10)/100;
        var by = parseInt(blank_y, 10)/100;
        this.setAttribute('id', 'piece_'+bx+"_"+by);
        blank_x = tmp_x;
        blank_y = tmp_y;
        setMovables();
    }
};

/*setMoveables() - called after moving a tile. Determines 
moveable tiles and sets styling. Resets previous tiles*/
var setMovables = function(){
    for(var i=0; i<tiles.length; i++){
        tiles[i].removeClassName("movablepiece");
    }
    var pos_x = parseInt(blank_x, 10)/100;
    var pos_y = parseInt(blank_y, 10)/100;
    var t;
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