import React, { Component } from "react";
import styled from "styled-components";
import { Droppable } from "react-beautiful-dnd";
import Card from "./Card";

const Container = styled.div`
  border: 1px solid lightgray;
  background-color: white;
  border-radius: 2px;
  position: relative;
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const CardList = styled.div`
  transition: background-color 0.2s ease;
  display: flex;
  width: 100%;
  height: 100%;
  overflow-x: auto;
`;

export default class Pile extends Component {
  render() {
    return (
      <Container
        enabled={false}
        style={{
          width: this.props.deck.id === "hand-1" ? "80%" : "20%"
        }}
      >
        <h3 style={{ textAlign: "center" }}>{this.props.deck.title}</h3>
        <Droppable
          droppableId={this.props.deck.id}
          type={"active"}
          isDropDisabled={this.props.deck.id === "play-1" && !this.props.myTurn}
          direction="horizontal"
        >
          {(provided, snapshot) => (
            <CardList
              ref={provided.innerRef}
              {...provided.droppableProps}
              style={{
                background: snapshot.isDraggingOver
                  ? "skyblue"
                  : !this.props.myTurn && this.props.deck.id === "play-1"
                  ? "lightGrey"
                  : "inherit"
              }}
            >
              {this.props.cards.map((card, index) => (
                <Card
                  key={card.id}
                  card={card}
                  index={index}
                  started={this.props.started}
                />
              ))}
              {provided.placeholder}
            </CardList>
          )}
        </Droppable>
      </Container>
    );
  }
}
