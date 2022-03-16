import React from "react";

export default function MLPerspective() {
  return (
    <div class="stackedit">
      <div class="stackedit__html">
        <h2 id="machine-learning-prospective-on-this-project">
          Machine Learning Prospective on this project
        </h2>
        <p>
          This project uses reinforcement learning to generate effective moves
          for the computer. It uses Q Learning in the prospective of exploration
          vs exploitation to generate a model.
        </p>
        <h2 id="how-the-model-trains">How the Model trains</h2>
        <h3 id="files-dedicate-to-training-a-model">
          1. Files dedicate to training a model
        </h3>
        <p>
          In the code base there is file
          <em>src/items/classes/qLearningTraining.js</em> that contains class
          Grid used in the game. It is a replica of <em>Grid.js</em> with
          additional logging for feedback purposes. The learner class is called
          <em>Learner</em>. At the end of this file{" "}
          <em>qLearningTraining.js</em>, a model is created and saved to the
          disc in the
          <em>src/items/model/model.js</em> so that it can be used for the live
          game with these lines.
        </p>
        <pre>
          <code>
            const fs = require('fs') <br />
            // 100 epochs <br />
            const learner = new Learner(100);
            <br /> learner.learn() <br />
            //feeback <br />
            console.log(learner.qState)
            <br />
            fs.writeFile('src/items/model/model.json', ...
          </code>
        </pre>
        <h3 id="command-to-train-the-model">2. Command to train the model</h3>
        <p>
          The training can be replicated to generate a new model with an
          automated command <em>npm run train</em>. For the class purpose, I
          submitted the code with a model trained already pre-made.
        </p>
        <h3 id="language-javascript-instead-of-python">
          3. Language: Javascript instead of Python
        </h3>
        <p>
          This choice is completely personal. I needed to make the game
          playable. I could have run the model in python, however, the graphics
          libraries in python takes a minute to learn and I was already familiar
          with Javascript.
        </p>
        <h3 id="logic">4. Logic:</h3>
        <h4 id="q-learning-revisited">Q Learning Revisited</h4>
        <p>
          <img
            src="https://wikimedia.org/api/rest_v1/media/math/render/svg/678cb558a9d59c33ef4810c9618baf34a9577686"
            alt="{\displaystyle Q^{new}(s_{t},a_{t})\leftarrow \underbrace {Q(s_{t},a_{t})} _{\text{old value}}+\underbrace {\alpha } _{\text{learning rate}}\cdot \overbrace {{\bigg (}\underbrace {\underbrace {r_{t}} _{\text{reward}}+\underbrace {\gamma } _{\text{discount factor}}\cdot \underbrace {\max _{a}Q(s_{t+1},a)} _{\text{estimate of optimal future value}}} _{\text{new value (temporal difference target)}}-\underbrace {Q(s_{t},a_{t})} _{\text{old value}}{\bigg )}} ^{\text{temporal difference}}}"
          />
        </p>
        <p>
          <strong>States:</strong> the game has 32 holes(4x8) and 64 balls that
          stays at all time on the board (this is a zero sum game). In this
          project, we considered each placement of the balls of the board as a
          distinct state.
        </p>
        <p>
          <strong>actions</strong>: The rules of the game allows a player to
          move from a hole as long as they have at least two balls in the a
          hole. So we consider the position <strong>(x,y)</strong> as an action.
          <em>Note:</em> There are reverse moves that are not implemented in the
          game (future improvements). If they were implemented, an action will
          have to become <strong>(x,y,direction)</strong>.
        </p>
        <p>
          <strong>learning rate and discount factor:</strong> All are tunable in
          the class Learner.
        </p>
        <p>
          <strong>Rewards:</strong> The model rewards the computer for making a
          move that captures the opponents balls by the amount of balls they get
          and subtracts the amount of balls captured by the opposition randomly.
          Example: if either by exploring the environment or exploiting the
          model, it captures 5 balls and randomly loses 2 by the random opponent
          counter-move , the overall reward is 3.
          <br />
          If the computer wins it gets an additional reward of 50 or a penalty
          of 50 in cases losing.
        </p>
        <p>
          <strong>exploration vs exploitation in learning:</strong> At the
          beginning of learning if the model is empty the computer is completely
          exploring. At the end of every epoch the exploration rate is
          exponentially decreased to reduce the number of times it is exploring.
        </p>
        <p>
          <strong>How the exploration rate works:</strong>
        </p>
        <pre>
          <code>
            // random threshold at the beginnig of every step <br />
            const exploration_rate_threshold = getRandomFloatArbitrary(0,1);
            <br />
            if(exploration_rate_threshold &gt; explorationRate )<br />
            //exploit <br />
            else <br />
            //explore
          </code>
        </pre>
        <p>
          At the beginning of every step, an exploration rate threshold is
          calculated. If the exploration rate threshold is greater than the
          rate, we exploit, otherwise explore the model.
        </p>
        <pre>
          <code>
            // exploration rate decreasing after every epoch <br />
            explorationRate = this.minExplorationRate +<br />
            ((this.maxExplorationRate - this.minExplorationRate )*
            <br />
            Math.exp(-this.explorationDecayRate* episode))
          </code>
        </pre>
        <p>At the end of an epoch the exploration rate is decreased.</p>
        <p>
          The goal of these the threshold and reducing the exploration rate is
          to get a balanced model that does both exploration and exploitation.
        </p>
        <p>
          <strong>How The Model is Generated:</strong> Our model bases itself on
          the calculated <em>Q(state,action)</em> by picking the action with the
          greatest q value. The goal is get a <strong>Policy Model</strong> that
          the live mode is going to use to pick an action for the computer. Each
          entry in the model has this format:
        </p>
        <pre>
          <code>
            // the model is a dictionary
            {`{
<state1>: { <action1>: <qvalue1>, <action2>:<qvalue2>, ...},
...
}`}
          </code>
        </pre>
        <p>
          <strong>How the Model is Used:</strong> During the live game if the
          state the game is in exists in the model, the computer picks the
          action with the greatest reward, otherwise the computer picks a random
          action.
        </p>
        <h3 id="logic-limitation-future-improvements">
          5. Logic Limitation (Future Improvements):
        </h3>
        <p>
          <strong>a. Actions should contain x, y, and direction:</strong> By the
          definition of the game, there are instances where the user can move in
          the reverse direction. The model generated ignored this fact.
          <br />
          <strong>b. The computer moves first:</strong> This doesn’t have an
          impact on the game written for this project, but in real life, we
          should have 2 models. The first one works when the opposition moves
          first, and the second one when the computer moves first.
          <br />
          <strong>c. The model learns based on random moves:</strong> There is
          no compilation of the greatest moves in <em>Igisoro</em> and the one
          that exists in other zero sum games such as chess or checkers. As a
          result, the model learned could be improved.
        </p>
        <h3 id="improvements-suggestions">6. Improvements suggestions:</h3>
        <p>
          <strong>a. Online Learning:</strong> I could not come up with a ways I
          can improve the model by learning online until late to include this is
          the game. For example, one of the approaches can be calculating the
          q-value of all possible moves in a situation where the computer
          doesn’t have an effective action to take online.
          <br />
          <strong>b. Introducing Reverse Moves:</strong> To complete this model,
          I can include the reverse moves which will change the action to take.
        </p>
        <h3 id="learn-more-about-the-game.">7. Learn More about the game.</h3>
        <p>
          In order to learn more about this game please visit the page
          <a href="https://mancala.fandom.com/wiki/Igisoro">
            https://mancala.fandom.com/wiki/Igisoro
          </a>
          . This page and wikipedia are the only pages, I found online that
          talks about this game.
        </p>
      </div>
    </div>
  );
}
