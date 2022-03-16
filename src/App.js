import React from "react";
import ModeledGame from "./items/ModeledGame";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import HowTo from "./HowTo";
import Installation from "./Installation";
import MLPerspective from "./MachineLearningPers";
// let response = ;
function App() {
  return (
    <div className="app">
      <h2>Final Project: IGISORO GAME</h2>
      <h2>
        <i>Blaise I., March 2022</i>
      </h2>
      <Tabs>
        <TabList>
          <Tab>Game</Tab>
          <Tab>Wiki</Tab>
          <Tab>Machine Learning Perspective</Tab>
          <Tab>Installation</Tab>
        </TabList>

        <TabPanel>
          <ModeledGame />
        </TabPanel>
        <TabPanel>
          <HowTo />
        </TabPanel>
        <TabPanel>
          <MLPerspective />
        </TabPanel>
        <TabPanel>
          <Installation />
        </TabPanel>
      </Tabs>
    </div>
  );
}

export default App;
