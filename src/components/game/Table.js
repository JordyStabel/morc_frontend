import React, { Component } from "react";
import styled from "styled-components";
import data from "../game/data";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  getTopCard,
  setTopCard,
  getGameState
} from "../../actions/gameActions";

const PlayerIcon = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 90px;
  height: 90px;
  position: absolute;
  border-radius: 50%;
  left: 50%;
  top: 50%;
  margin: -45px;
  transition: 0.25s;
  border: 0.5px solid grey;
  cursor: default;

  transform: rotate(${props => props.angle + 90}deg) translate(12.5vw)
    rotate(${props => props.angle * -1 - 90}deg);

  &:hover {
    background-color: purple;
    transform: rotate(${props => props.angle + 90}deg) translate(12.5vw)
      rotate(${props => props.angle * -1 - 90}deg) scale(1.1);
  }
`;

const Deck = styled.div`
  width: 70%;
  height: 70%;
  background-color: pink;
  position: absolute;
  border-radius: 50%;
  left: 50%;
  top: 50%;
  margin: -35%;
  transition: 0.25s;
  cursor: default;
  display: flex;
  justify-content: center;
`;

class Table extends Component {
  state = data;

  componentDidMount() {
    this.props.getGameState();
  }

  onClick = () => {
    const suits = {
      0: "H",
      1: "S",
      2: "C",
      3: "D"
    };

    let suit = suits[Math.floor(Math.random() * 3)];
    let value = Math.floor(Math.random() * 9 + 2);

    const card = {
      id: `${value}${suit}`,
      img: `/images/${value}${suit}.svg`
    };
    this.props.setTopCard(card);
  };

  render() {
    const { topcard, players, playerOnTurn, started } = this.props.game;

    if (!topcard) {
      console.log("No topcard");
      return <p>Loading...</p>;
    }

    return (
      <div
        style={{
          position: "relative",
          background: "lightGrey",
          border: "5px solid #ddd",
          borderRadius: "50%",
          height: "25vw",
          width: "25vw",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)"
        }}
      >
        <Deck>
          <img
            src={topcard.img}
            style={{ height: "100%" }}
            onClick={this.onClick.bind(this)}
            alt={`${topcard.value}${topcard.suit}`}
          />
        </Deck>
        {players.map((player, index) => {
          return (
            <PlayerIcon
              key={index}
              angle={index * (360 / players.length)}
              style={{
                background:
                  started &&
                  playerOnTurn !== null &&
                  playerOnTurn.name === player.name
                    ? "lightGreen"
                    : "#dfe6e9"
              }}
            >
              {player.name}
              <br />
              <p>
                Cards:{" "}
                <span className="text-primary font-weight-bold">
                  {player.cards.length}
                </span>
              </p>
            </PlayerIcon>
          );
        })}
      </div>
    );
  }
}

Table.propTypes = {
  game: PropTypes.object.isRequired,
  getTopCard: PropTypes.func.isRequired,
  setTopCard: PropTypes.func.isRequired,
  getGameState: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  game: state.game
});

export default connect(
  mapStateToProps,
  { getTopCard, setTopCard, getGameState }
)(Table);
