import React from "react";

export default function HowTo() {
  return (
    <div class="game-wiki">
      <h4>4. IGISORO</h4>
      <h6>
        (<i> Content retrieved from https://mancala.fandom.com/wiki/Igisoro</i>)
      </h6>
      <div>
        <table border>
          <thead>
            <tr>
              <th>
                <b>Igisoro</b>
              </th>
            </tr>
            <tr>
              <th>Other Names</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Gisoro</td>
            </tr>
            <tr>
              <td>Ikibuguzo</td>
            </tr>
            <tr>
              <td>Kubuguza</td>
            </tr>
            <tr>
              <td>Ku- suro</td>
            </tr>
            <tr>
              <td>Kuwaguza</td>
            </tr>
            <tr>
              <td>Ikisoro</td>
            </tr>
          </tbody>
        </table>
        <br />
      </div>
      <div>
        <div class="about-mancala">
          Igisoro is a two player game in the mancala family. This variant is
          played primarily by people in Rwanda, Burundi and Uganda. Igisoro,
          like Omweso, is played with an 4×8 board (igisoro) of pits (icúba) and
          64 seeds. A player's territory is the two rows of pits closest to
          them. According to Alexandre Kimenyi, California State University at
          Sacramento, cow vocabulary is metaphorically used in Igisoro: players
          try to capture each other's "cows" (inká) and a board position with
          many singletons are known as "a line of calves" (urunyána). Boards are
          carved (there are even game tables) or holes in the ground are used.
          Igisoro masters do never outwardly count the seeds in a pit in
          plotting a move and a player who counts with his finger would be the
          subject of much ridicule. Some experts play blindfolded and may even
          play multiple opponents simultaneously. The game was promoted by the
          "Ministère de la Jeunesse et des Sports in Rwanda", which held an
          Igisoro competition in 1983. In December 2007, another Igisoro
          tournament was organized by Umurage (a culture center of Rwandian
          migrants) in Montreal, Canada. In 2008, Antoine Nzeyimana from the
          Kigali Institute of Science and Technology (KIST) in Rwanda won US$600
          for his Igisoro gadget submitted to the inaugural Google East Africa
          Gadget Competition. It isn't unusual to cheat the opponent, which is
          known as gukanga ("to betray").
        </div>
        <div>
          <h3>Rules:</h3>
          <h4>Board and Counters</h4>
          <div>
            <div class="about-mancala">
              Each player controls the two rows of eight pits on his side and
              starts with four seeds (ubusoro; literally: "small balls") in each
              pit in the inner row of their territory.
            </div>
            <img src="Igisoro_start.png" />
            <i>Initial Position</i>
          </div>
          <h4>The game consists of three stages:</h4>
          <ol>
            <li>
              Kugereka: Placing the seeds in groups of four as shown above.
            </li>
            <li>
              Guc úmuvúno: The opening, which may consist of 2-4 moves. The
              first move is called kuvuna, the second kwivunura. The moves are
              performed simultaneously, although it is permissible to do them
              alternately in online play (as in Nzeyimana's applet). After the
              second move seeds can be captured. If no games were played before,
              any player can seize the initiative, otherwise this is reserved to
              the winner of the last game, which is known as gutáng inganji
              ("imposing his triumph"). A capture (kurása) immediately starts
              the third stage.
            </li>
            <li>
              Kubúguza: Moves are performed alternately and capturing can occur
              all the time.
            </li>
          </ol>
        </div>
        <h4>General Rules</h4>
        <div class="about-mancala">
          On his turn, a player chooses a pit in their territory containing at
          least two seeds and sows them placing one seed in each pit as he moves
          counter-clockwise (guteba) around his territory.
        </div>
        <div class="about-mancala">
          If the last seed is sown into a non-empty pit of the outer row, the
          player picks up all seeds from this pit and begins to sow again,
          starting from the next pit.
        </div>
        <div class="about-mancala">
          If the last seed is sown into an occupied pit of the inner row and one
          of the opponent's opposite pits or both of them are empty, the turn
          also continues with another sowing as just described.
        </div>
        <div class="about-mancala">
          If the last seed is sown into an occupied pit of the inner row and
          both opponent's opposite pits are not empty, the player may pick up
          all seeds from these two pits and sow them.
          <ul>
            <li>
              When the player chooses to pick up his opponents seeds, the sowing
              begins again from the pit where the player originally began his
              turn.
            </li>
            <li>
              When the player chooses to pick up his opponents seeds, the sowing
              begins again from the pit where the player originally began his
              turn.
            </li>
          </ul>
          Only for a direct pick or catch, a player starting from, or arriving
          at the pits highlighted in grey below may choose to move clockwise
          (kugarama). When he starts from any other pit, he may only move
          counter-clockwise.
        </div>
        <div class="about-mancala">
          <img src="Igisoro_ngarama_nteba.jpeg" />
          <div>
            The reverse pits in the inner rows are called nteba, those in the
            outer rows ugutwi. If the last seed falls into an empty hole, the
            turn ends. The game is over and a player has lost when he cannot sow
            any of his seeds. The winner gets one point (igitégo) for each won
            game. If there are less than 64 seeds at the end, the game is not
            counted (kubúguz inkángane).
            <b>This version has not yet implemented the reverse moves</b>
          </div>
        </div>
        <h5>Reference:</h5>
        <div class="about-mancal">
          <a href="https://mancala.fandom.com/wiki/Igisoro">
            mancala.fandom.com
          </a>
        </div>
      </div>
    </div>
  );
}
