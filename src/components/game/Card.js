import React, { Component } from "react";
import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";

const Container = styled.div`
  width: auto;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;

  &:focus {
    outline: none;
    border-color: red;
  }
`;

const CardImage = styled.img`
  width: 90%;
  height: 90%;
  transition: 0.25s;
  object-fit: scale-down;
  opacity: ${props => (props.isDragDisabled ? 0.5 : 1)};

  &:hover {
    transform: scale(${props => (props.isDragDisabled ? 1 : 1.1)});
  }
`;

// const Handle = styled.div`
//   width: 20px;
//   height: 20px;
//   border-radius: 4px;
//   background-color: orange;
//   margin-right: 8px;
// `;

export default class Card extends Component {
  render() {
    // When game is started cards are enabled otherwise they are greyed out
    const isDragDisabled = !this.props.started;
    return (
      <Draggable
        draggableId={this.props.card.id}
        index={this.props.index}
        isDragDisabled={isDragDisabled}
      >
        {(provided, snapshot) => (
          <Container
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            image={this.props.card.img}
            isDragging={snapshot.isDragging}
            isDragDisabled={isDragDisabled}
          >
            <CardImage
              src={this.props.card.img}
              isDragging={snapshot.isDragging}
              isDragDisabled={isDragDisabled}
            />
            {/* <Handle {...provided.dragHandleProps} /> */}
            {/* {this.props.task.content[0]} */}
            {/* Only shows the first character of the content */}
          </Container>
        )}
      </Draggable>
    );
  }
}
