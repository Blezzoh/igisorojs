import Grid from "./Grid";
import {getRandomFloatArbitrary}from './util';
import {players} from './data'

export default class Learner {
  constructor(
    numberOfEpisodes = 10,
    numberOfSteps = 30,
    lr = 0.1,
    discount = 0.99,
    exploration_decay_rate = 0.001,
    exploration_rate = 1
  ) {
    this.reward = 0;
    this.previousState = null;
    this.currrentState = new Grid();
    // <grid in string mode>: <position to get the most reward>
    this.qState = {};
    this.numberOfEpisodes = numberOfEpisodes;
    this.learningRate = lr
    this.numberOfSteps = numberOfSteps;
    this.explorationDecayRate = exploration_decay_rate;
    this.explorationRate = exploration_rate;
    this.maxExplorationRate = 1;
    this.minExplorationRate = 0.01;
    this.discountRate= discount;
  }
  learn(){
    let explorationRate = this.explorationRate;
    let episode = 0;
    let reward_cumm = 0;
    while (episode < this.numberOfEpisodes){
     reward_cumm += this.learnOneEpisode(explorationRate, reward_cumm);
    explorationRate = this.minExplorationRate + ((this.maxExplorationRate - this.minExplorationRate )* Math.exp(-this.explorationDecayRate* episode))
     this.currrentState = new Grid()
     console.log(JSON.stringify(this.qState))
    }
  }
  learnOneEpisode(explorationRate, cummulative_r){
    const exploration_rate_threshold = getRandomFloatArbitrary(0,1);
    let state = this.currrentState.getGrid();
    let stateKey = JSON.stringify(state);
    let reward_cumm = cummulative_r;
    let moves = {
      [players.computer]: 0,
      [players.one]: 0
    }
    for(let i = 0; i<this.numberOfSteps; i++){
      let action = null;
      /*
      exploration vs exploitation, we exploit is the exploration rate is less than exploration_rate_threshold
      */
      if(explorationRate < exploration_rate_threshold &&  this.qState[stateKey]){
        let localQ = -Infinity;
        for(let a in this.qState[stateKey]){
          const f = parseFloat(this.qState[stateKey][a])
          if(f>=localQ){
            action = JSON.parse(a);;
          }
        }
        action = this.qState[stateKey][localReward];
      }
      else{
        action = this.currrentState.getRandomActionFromComputer()
      }
      
      let {newState,reward, isOver, nMoves} = Grid.moveForwardLearner(action,players.computer,state,moves);
      let arr_q = this.getAllPreviousQueues(JSON.stringify(newState));
      let previousQ = this.qState[stateKey] && this.qState[stateKey][action] ? this.qState[stateKey][action] : 0;
      let lr = this.learningRate;
      let r = reward;
      reward_cumm += reward
      let discount_r = this.discountRate
      if(this.qState[stateKey] ){
        this.qState[stateKey][JSON.stringify(action)] = this.calculateQ(previousQ, r, lr, discount_r, arr_q)
      }
      else{
        this.qState[stateKey] = {}
        this.qState[stateKey][JSON.stringify(action)] = this.calculateQ(previousQ, r, lr, discount_r, arr_q)
      }
      
      /** player one makes a random move*/
      let temp_grid = new Grid(newState)
      let action_one = temp_grid.getRandomActionFromOne()
      let one_results = Grid.moveForwardLearner(action_one,players.one,state,nMoves);
      newState = one_results.newState;
      reward = one_results.reward;
      isOver = one_results.isOver;
      nMoves = one_results.nMoves;
      reward_cumm -= reward
      /** end of player one makes a random move */
      state = newState;
      stateKey = JSON.stringify(newState);
      moves = nMoves;
      if(isOver){
        break
      }
    }
    return reward_cumm;
  }
  getAllPreviousQueues(state ){
    let qs = [];
    if(this.qState[state]){
      for(let action in this.qState[state]){
        qs.push(qState[state][action]);
      }
    }
    return qs;
  }
  calculateQ(previousQ, r, lr, discount_r, arr_q){
    return previousQ * (1-lr) + (lr * (r+(discount_r * Math.max(arr_q)))) 
  }
}


const learner = new Learner();
learner.learnOneEpisode(1, 0);
console.log(learner.qState)