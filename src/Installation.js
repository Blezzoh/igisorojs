import React from "react";

export default function Installation() {
  return (
    <ol class="custom-counter">
      <li>
        <a href="https://docs.npmjs.com/downloading-and-installing-node-js-and-npm">
          Install node js and npm
        </a>
      </li>
      <li>
        download this project from <a>codesandbox</a> or <a>github</a>
      </li>
      <li>
        Run this command inside igisoro_js: <i>npm install</i>
      </li>
      <li>
        Run this command to lunch the project: <i>npm start</i>
      </li>
      <li>
        <b>
          Run this command to lunch train the model: <i>npm run train</i>
        </b>
      </li>
    </ol>
  );
}
