function postHighScores(){
    var retrieveScores = localStorage.getItem("player");
    var players  = JSON.parse(retrieveScores);
    if (players !== null){
        players.sort(function(a, b) { 
            return b.score - a.score;
        })
        
        var scoresList = document.getElementById("scores")
        for (player of players) {
            var scoreBox = document.createElement("p");
            scoreBox.appendChild(document.createTextNode(player.initials + " " + player.score));
            scoresList.appendChild(scoreBox);
        }
    }
}

postHighScores()
