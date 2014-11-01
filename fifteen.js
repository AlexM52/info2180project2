window.onload = function(){
    var tiles = $$("#puzzlearea div");
    var col_offset = 0;
    var row_offset = 0;
    for(var i=0; i<tiles.length; i++){
        tiles[i].addClassName("puzzlepiece");
        tiles[i].setAttribute('id', 'piece'+(i+1));
        if(col_offset===4){
            col_offset=0;
            row_offset++;
        }
        tiles[i].style.left = col_offset*100 + "px";
        tiles[i].style.top = row_offset*100 + "px";
        tiles[i].style.backgroundPosition = col_offset*-100 + "px " + row_offset*-100 + "px";
        col_offset++;
    }
}