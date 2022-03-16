## Machine Learning Prospective on this project

This project uses reinforcement learning to generate effective moves for the computer. It uses Q Learning in the prospective of exploration vs exploitation to generate a model.

Before explaining everything this is the installation process:

1.  [Install node js and npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
2.  download this project from codesandbox or github
3.  Run this command inside igisoro_js folder for installation: _npm install_
4.  Run this command to lunch the project: _npm start_
5.  **Run this command to lunch train the model: _npm run train_**

## How the Model trains

### 1. Files dedicate to training a model

In the code base there is file _src/items/classes/qLearningTraining.js_ that contains class Grid used in the game. It is a replica of _Grid.js_ with additional logging for feedback purposes. The learner class is called _Learner_. At the end of this file _qLearningTraining.js_, a model is created and saved to the disc in the _src/items/model/model.js_ so that it can be used for the live game with these lines.

```
const  fs = require('fs')
// 100 epochs
const  learner = new  Learner(100);
learner.learn()
//feeback
console.log(learner.qState)
fs.writeFile('src/items/model/model.json', ...
```

### 2. Command to train the model

The training can be replicated to generate a new model with an automated command _npm run train_. For the class purpose, I submitted the code with a model trained already pre-made.

### 3. Language: Javascript instead of Python

This choice is completely personal. I needed to make the game playable. I could have run the model in python, however, the graphics libraries in python takes a minute to learn and I was already familiar with Javascript.

### 4. Logic:

#### Q Learning Revisited

![{\displaystyle Q^{new}(s_{t},a_{t})\leftarrow \underbrace {Q(s_{t},a_{t})} _{\text{old value}}+\underbrace {\alpha } _{\text{learning rate}}\cdot \overbrace {{\bigg (}\underbrace {\underbrace {r_{t}} _{\text{reward}}+\underbrace {\gamma } _{\text{discount factor}}\cdot \underbrace {\max _{a}Q(s_{t+1},a)} _{\text{estimate of optimal future value}}} _{\text{new value (temporal difference target)}}-\underbrace {Q(s_{t},a_{t})} _{\text{old value}}{\bigg )}} ^{\text{temporal difference}}}](https://wikimedia.org/api/rest_v1/media/math/render/svg/678cb558a9d59c33ef4810c9618baf34a9577686)

**States:** the game has 32 holes(4x8) and 64 balls that stays at all time on the board (this is a zero sum game). In this project, we considered each placement of the balls of the board as a distinct state.

**actions**: The rules of the game allows a player to move from a hole as long as they have at least two balls in the a hole. So we consider the position **(x,y)** as an action. _Note:_ There are reverse moves that are not implemented in the game (future improvements). If they were implemented, an action will have to become **(x,y,direction)**.

**learning rate and discount factor:** All are tunable in the class Learner.

**Rewards:** The model rewards the computer for making a move that captures the opponents balls by the amount of balls they get and subtracts the amount of balls captured by the opposition randomly. Example: if either by exploring the environment or exploiting the model, it captures 5 balls and randomly loses 2 by the random opponent counter-move , the overall reward is 3.
If the computer wins it gets an additional reward of 50 or a penalty of 50 in cases losing.

**exploration vs exploitation in learning:** At the beginning of learning if the model is empty the computer is completely exploring. At the end of every epoch the exploration rate is exponentially decreased to reduce the number of times it is exploring.

**How the exploration rate works:**

```
// random threshold at the beginnig of every step

const  exploration_rate_threshold = getRandomFloatArbitrary(0,1);

if(exploration_rate_threshold  > explorationRate ){
//exploit
}
else{
// explore
}
```

At the beginning of every step, an exploration rate threshold is calculated. If the exploration rate threshold is greater than the rate, we exploit, otherwise explore the model.

```
// exploration rate decreasing after every epoch
explorationRate = this.minExplorationRate + ((this.maxExplorationRate - this.minExplorationRate )* Math.exp(-this.explorationDecayRate* episode))
```

At the end of an epoch the exploration rate is decreased.

The goal of these the threshold and reducing the exploration rate is to get a balanced model that does both exploration and exploitation.

**How The Model is Generated:** Our model bases itself on the calculated _Q(state,action)_ by picking the action with the greatest q value. The goal is get a **Policy Model** that the live mode is going to use to pick an action for the computer. Each entry in the model has this format:

```
{
<state>: { <action1>: <qvalue`>, <action2>:<qvalue2>, ...},
...
}
```

**How the Model is Used:** During the live game if the state the game is in exists in the model, the computer picks the action with the greatest reward, otherwise the computer picks a random action.

### 5. Logic Limitation (Future Improvements):

**a. Actions should contain x, y, and direction:** By the definition of the game, there are instances where the user can move in the reverse direction. The model generated ignored this fact.
**b. The computer moves first:** This doesn't have an impact on the game written for this project, but in real life, we should have 2 models. The first one works when the opposition moves first, and the second one when the computer moves first.
**c. The model learns based on random moves:** There is no compilation of the greatest moves in _Igisoro_ and the one that exists in other zero sum games such as chess or checkers. As a result, the model learned could be improved.

### 6. Improvements suggestions:

**a. Online Learning:** I could not come up with a ways I can improve the model by learning online until late to include this is the game. For example, one of the approaches can be calculating the q-value of all possible moves in a situation where the computer doesn't have an effective action to take online.
**b. Introducing Reverse Moves:** To complete this model, I can include the reverse moves which will change the action to take.

### 7. Learn More about the game.

In order to learn more about this game please visit the page https://mancala.fandom.com/wiki/Igisoro. This page and wikipedia are the only pages, I found online that talks about this game.
