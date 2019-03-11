$.fn.game = function(nb_x, nb_y, p1, p2, pc_1, pc_2) 
{
    text = " viens de jouer";   
    var switche = 1; joueur = p1; score1 = 0; score2 = 0; couleur = "";
    let a = ""; b = ""; p = "";
    let pointJ1 = 0; pointJ2 = 0; pointVJ1 = 0; pointVJ2 = 0;
    let pointDJ1 = 0; pointDJ2 = 0; pointGJ1 = 0; pointGJ2 = 0;
    let index = 0; egual = 0;

    grid();
    style();
    tab(nb_x, nb_y);

    function style() 
    {
        $("head").append('<link rel="stylesheet" href="style.css">')
    }

    function grid() 
    {
        $("div").css("background-color", pc_1);
        $("body").append("<div class='score'></div>");
        $(".score").html(p1 + " " + score1 + " " + p2 + " " + score2);
        $("body").append("<table></table>");
        $("body").append("<div class='bouton'></div>");
        $(".bouton").append("<button class='replay'>Rejouer</button>");
        $(".bouton").append("<button class='cancel'>Annuler</button>");
        $("body").append("<div class='name'></div>");
        $(".name").html("<button class='tour'>" + joueur + "</button>");
        $(".name").css("background-color", couleur);


        for (var i = 0; i < nb_y; i++) 
        {
            $("table").append("<tr id='" + i + "'></tr>");
            for (var j = 0; j < nb_x; j++) 
            {
                var td = $("<td></td>").addClass(j + "-" + i);
                $("#" + i).append(td);
            }
        }
    }

    function players(p1, p2, pc_1, pc_2)
    {
      if (switche == 1) 
      {
        joueur = p1;
        couleur = pc_1;
        switche++;
      }

      else if(switche == 3)
      {
        joueur = p2;
        couleur = pc_2;
        switche--;
      }
    }

    $('tr').click(function(event)
    {
        egual = 0;
        var colonne = event.currentTarget.id;  
        players(p1, p2, 'orange', 'green');
        checkCol(colonne);
        $(".tour").css("background-color", couleur);
        $(".tour").html(joueur + text);
        pawn(a, b);
        win();
        $(".score").html(p1 + " " + score1 + " " + p2 + " " + score2);
        egal();
    });

    $(".replay").click(function(e)
    {
        $("td").empty();
        tab(nb_x, nb_y);
    })

    function tab(x, y)
    {
        tab_y = [];
        tab_x = [];

        for (var q = 0; q < y; q++)
        {
            tab_y[q] = [];
        }

        for (var i = 0; i < y; i++)
        {
            for (var v = 0; v < x; v++)
            {
                tab_y[i][v] = "";
            }
        }

        for (var j = 0; j < x; j++)
        {
            tab_x[j] = [];
        }

        for (var a = 0; a < x; a++)
        {
            for (var b = 0; b < y; b++)
            {
                tab_x[a][b] = "";
            }
        }
    }

    function checkCol(column)
    {
        var empty = tab_y[column].indexOf("");
        tab_y[column][empty] = joueur;
        tab_x[empty][column] = joueur;
        a = empty;
        b = column;
    }

    function pawn(pos1, pos2)
    {
        var position = $('.'+ pos1 + '-' + pos2);
        position.append("<span></span>");
        position.find("span").css("background-color",couleur);//couleur du pion
    }

    function checkH()
    {
        for (var k = 0; k <= tab_x.length - 1; k++) 
        {
            for (var p = 0; p <= tab_x[k].length - 1; p++) {
                if (tab_x[k][p] === p1) {
                    pointJ1++;
                    pointJ2 = 0;
                }
                else if (tab_x[k][p] === p2) {
                    pointJ2++;
                    pointJ1 = 0;
                }
                else if (tab_x[k][p] == "") {
                    pointJ1 = 0;
                    pointJ2 = 0;
                }
                if (pointJ1 === 4) {

                    return "j1";
                }
                if (pointJ2 === 4) {
                    return "j2";
                }
            }
                    pointJ1 = 0;
                    pointJ2 = 0;
        }
    }

    function checkV()
    {   
        
        for (var h = 0; h <= tab_y.length -1; h++) {
            for (var m = 0; m <= tab_y[h].length -1; m++) {
                if (tab_y[h][m] == p1) {
                    pointVJ1++;
                    pointVJ2 = 0;
                }

                else if (tab_y[h][m] == p2) {
                    pointVJ2++;
                    pointVJ1 = 0;

                }

                else if (tab_y[h][m] == "") {
                    pointVJ1 = 0;
                    pointVJ2 = 0;
                }

                if (pointVJ1 == 4) {
                    return "j1";
                }

                if (pointVJ2 == 4) {
                    return "j2";
                }
            }
                    pointVJ1 = 0;
                    pointVJ2 = 0;    
        }
    }

    function checkDG()
    {        
        for (var c = 0; c < tab_x.length; c++){

            var l = 0;

            for (var d = c; d < tab_x.length; d++){

                if (tab_x[d][l] == p1){
                    pointGJ1++;
                    pointGJ2 = 0;
                }

                else if (tab_x[d][l] == p2) {
                    pointGJ2++;
                    pointGJ1 = 0;
                }

                else if (tab_x[d][l] == "") {
                    pointGJ1 = 0;
                    pointGJ2 = 0;
                }

                if (pointGJ1 == 4) {
                    return "j1";
                }

                if (pointGJ2 == 4) {
                    return "j2";
                }
            l++;
            }
            pointGJ1 = 0;
            pointGJ2 = 0;

        }    
    }

    function checkDD()
    {        
        for (var e = 0; e < tab_y.length; e++)
        {
            var li = 0;

            for (var f = e; f < tab_x.length; f++)
            {

                if (tab_x[li][f] == p1)
                {
                    pointDJ1++;
                    pointDJ2 = 0;
                }

                else if (tab_x[li][f] == p2)
                {
                    pointDJ2++;
                    pointDJ1 = 0;
                }

                else if (tab_x[li][f] == "")
                {
                    pointDJ1 = 0;
                    pointDJ2 = 0;
                }

                if (pointDJ1 == 4)
                {
                    return "j1";
                }

                if (pointDJ2 == 4)
                {
                    return "j2";
                }

            li++;
            }
            pointDJ1 = 0;
            pointDJ2 = 0;
        }    
    }

    function win() 
    {
        var check = checkH();
        var vertical = checkV();
        var diagoG = checkDG();
        var diagoD = checkDD();

        if (check === "j1" || vertical === "j1" || diagoG === "j1" || diagoD == "j1") 
        {
            score1++;
            alert(p1 + " est trop fort ");
        } 
        else if (check === "j2" || vertical === "j2" || diagoG === "j2" || diagoD == "j1") 
        {
            score2++;
            alert(p2 + " est meilleur que " + p1);
        }

    }

    function egal()
    {
        for (var index = 0; index < tab_x.length; index++)
        {
            if (tab_x[index].indexOf("") == -1)
            {
                egual++;
            }

            if(egual == tab_x.length)
            {
                alert("Cest pas gagner cette histoire");
            }
        }

    }
}

$(function() 
{
    $("window").game(10, 10, "Bob", "Billy", "orange", "green");
});