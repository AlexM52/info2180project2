/*VAR DECLARATION*/
var tiles;
var btn_shuffle;
//var x_offset;
//var y_offset;
var blank_x = "300px";
var blank_y = "300px";

/*ONLOAD - SETS EVERYTHING UP*/
window.onload = function(){
    tiles = $$("#puzzlearea div");
    var x_offset = 0;
    var y_offset = 0;
    for(var i=0; i<tiles.length; i++){
        tiles[i].addClassName("puzzlepiece");
        tiles[i].setAttribute('id', 'piece'+(i+1));
        if(x_offset===4){
            x_offset=0;
            y_offset++;
        }
        tiles[i].style.left = x_offset*100 + "px";
        tiles[i].style.top = y_offset*100 + "px";
        tiles[i].style.backgroundPosition = x_offset*-100 + "px " + y_offset*-100 + "px";
        x_offset++;
        
        tiles[i].onclick = tileClick;
    }
    
    btn_shuffle = $$("#shufflebutton")[0];
    //console.log("logloglog");
    btn_shuffle.onclick = function(){
        //shuffle code here;
        console.log("button click");
        findEmpty();
        
    }
}

/*ADDITIONAL FUNCTION DEFINITIONS*/

/*findEmpty() - sets blank_x and blank_y to x and y coordinates 
of the missing square based on the positions of the 'puzzlepiece' 
elements*/
var findEmpty = function(){
    console.log("find empty");
    var x_cnt = 0;
    var y_cnt = 0;
    for(var i=0; i<tiles.length; i++){
        //console.log("position: " + tiles[i].style.left + ", " + tiles[i].style.top);
        x_cnt += ((parseInt(tiles[i].style.left)/100)+1);
        y_cnt += ((parseInt(tiles[i].style.top)/100)+1);
    }
    //console.log(x_cnt + " " + y_cnt);
    blank_x = ((40-x_cnt)-1)*100 + "px";
    blank_y = ((40-y_cnt)-1)*100 + "px";
    //console.log("blank_x: " + blank_x + ", blank_y: " + blank_y);
};

var tileClick = function(){
    //console.log("tile click");
    //console.log("left: " + this.style.left + " top: " + this.style.top);
    //console.log(blank_x + " " + blank_y);
    var tmp_x = this.style.left;
    var tmp_y = this.style.top;
    this.style.left = blank_x;
    this.style.top = blank_y;
    blank_x = tmp_x;
    blank_y = tmp_y;
    //console.log("left: " + this.style.left + " top: " + this.style.top);
};