import React from "react";

export default props => {
  return (
    <div className="container mt-5" style={{ textAlign: "left" }}>
      <h1 className="display-4">
        {props.match.params.id} About <span className="text-primary">Morc</span>{" "}
      </h1>
      <p className="lead">
        Morc <span className="text-primary">(Modular Card App)</span> is a game
        in which players can implement their own rules and play together with
        other players. The game is a unique mix between traditional casino-style
        games and a modular formula that adds a new and unique element to the
        game. Because players can make their own game rules, there are many ways
        to play a card game.
      </p>
      <p className="text-secondary">Version 1.0.1</p>
    </div>
  );
};
