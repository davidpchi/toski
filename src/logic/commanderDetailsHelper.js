function commanderWinRate (matchArray, commanderName)
{
    // Assumes matchArray is the array of Match objects that contains match history
    // Assumes commanderName is a string that would match commander string in MatchPlayer object
    // Assumes we are ok returning 0 win rate if commander has not been played

    // Create win counter
    let gamesWon = 0;

    // Create array of gameIDs for games the commander is in
    let gamesIn = [];

    // Loop through all matches
    for (let i = 0; i < matchArray.length; i++)
    {
        // Loop through matchplayers
        for (let j = 0; j < matchArray[i].players.length; j++)

        // Check for matching commander
        if (commanderName === matchArray[i].players[j].commander)
        {
            // Add game to commander games tracker
            gamesIn.push(matchArray[i].id);

            // Check if game is won by this commander
            if (matchArray[i].players[j].rank == 1)
            {
                gamesWon++;
            }
        }
    }

    // Calculate games played, win and loss rate
    let gamesPlayed = gamesIn.length;
    let winRate = (gamesPlayed > 0) ? (gamesWon / gamesPlayed) : 0;
    let lossRate = 1 - winRate;

    return [winRate, lossRate, gamesIn];
}