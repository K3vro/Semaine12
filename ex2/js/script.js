(function (){

    var $table = document.getElementById('game');
    var $tiles = document.getElementsByTagName('td');
    var $reset = document.getElementById('reset');
    var turn;
    var tile;
    var grille;
    var somme;

    var $sp1 = document.getElementById('sp1');
    var $sp2 = document.getElementById('sp2');
    var sp1 = 0;
    var sp2 = 0;

    $table.style.height = (getComputedStyle($table).width);

    var init = function () {

        $sp1.innerHTML = sp1;
        $sp2.innerHTML = sp2;

        grille = [0,0,0,0,0,0,0,0,0];
        turn = 1;
        tile = 0;
        somme = 0;

        for (i=0, j=$tiles.length; i<j; i++) {
            $tiles[i].className = "tileReset";
        }

    };

    var test = function () {
        somme = 0;
        for (k=0; k<9; k++){
            somme += grille[k];
        }

        if (somme==25){
            alert('Draw');
            init();
        }

        for (i=0; i<3; i++) {
            if (grille[i]+grille[i+3]+grille[i+6]==3){
                alert('GG win P1 !!');
                sp1++;
                init();
            }
            if (grille[i]+grille[i+3]+grille[i+6]==15){
                alert('GG win P2 !!');
                sp2++;
                init();
            }
        }
        for (j=0; j<7; j+=3) {
            if (grille[j]+grille[j+1]+grille[j+2]==3){
                alert('GG win P1 !!');
                sp1++;
                init();
            }
            if (grille[j]+grille[j+1]+grille[j+2]==15){
                alert('GG win P2 !!');
                sp2++;
                init();
            }
        }

        if ((grille[0]+grille[4]+grille[8]==3) || (grille[2]+grille[4]+grille[6]==3)){
            alert('GG win P1 !!');
            sp1++;
            init();
        }

        if ((grille[0]+grille[4]+grille[8]==15) || (grille[2]+grille[4]+grille[6]==15)){
            alert('GG win P2 !!');
            sp2++;
            init();
        }
    };

    init();
    test();

    $reset.addEventListener('click', function () {
        init();
    }, false);

    $table.addEventListener('click', function (e) {
        tile = parseInt(e.target.id);
        if (grille[tile]==0) {
            if (turn==1) {
                grille[tile] = 1;
                $tiles[e.target.id].className = "tilePlayer1";
                turn = 2;
                test();
            }
            else {
                grille[tile] = 5;
                $tiles[e.target.id].className = "tilePlayer2";
                turn = 1;
                test();
            }
        }
    }, false);

})();