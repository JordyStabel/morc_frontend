import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { sendMessage, receiveMessage } from "../../actions/chatActions";
import styled from "styled-components";

const MessageContainer = styled.div`
  display: flex;
  width: 100%;
  /* margin-top: 4%; */
  letter-spacing: 0.5px;
  /* background: #55efc4; */
  border-bottom: 2px solid #aaa;
`;

const ImageContainer = styled.div`
  width: 20%;
  /* background: #ff7675; */
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
  width: 80%;
  /* background: #0984e3; */
`;

class Chat extends Component {
  constructor(props) {
    super(props);

    let ip;

    localStorage.getItem("morc_ip")
      ? (ip = localStorage.getItem("morc_ip"))
      : (ip = "localhost");

    const webSocket = new WebSocket(
      `ws://${ip}:8096/socialchatserver/websocket/`
      //"wss://echo.websocket.org"
    );

    webSocket.onopen = () => {
      console.log("Connection opened");
    };

    webSocket.onmessage = event => {
      // Do nothing with the on connect message
      if (event.data === `{"connected":"Connecting succesfull"}`) {
        return;
      }

      this.setState({
        messages: [...this.state.messages, event.data]
      });
      console.log(`Message received: ${event.data}`);
      this.props.receiveMessage(JSON.parse(event.data).messageData);
    };

    webSocket.onclose = () => {
      console.log("Connection closed");
    };

    this.state = {
      ws: webSocket,
      messages: []
    };

    this.handleMessageSubmit = this.handleMessageSubmit.bind(this);
  }

  handleMessageSubmit(event) {
    event.preventDefault();

    let input = {
      username: this.props.auth.user.username,
      message: this.refs.messageText.value
    };

    // Clear input field
    this.refs.messageText.value = "";

    let message = {
      messageType: "MessageGlobalChat",
      messageData: JSON.stringify(input)
    };

    console.log(this.state.ws.readyState === this.state.ws.OPEN);

    this.state.ws.send(JSON.stringify(message));
    //console.log(JSON.stringify(message));

    this.props.sendMessage(this.refs.messageText.value);
  }

  render() {
    const { messages } = this.props.chat;

    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "100%"
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column-reverse",
            width: "100%",
            height: "90%",
            overflowX: "auto"
          }}
        >
          {messages.map((message, index) => (
            <MessageContainer key={index}>
              <ImageContainer>
                <img
                  src="https://image.flaticon.com/icons/svg/149/149071.svg"
                  alt="avatar"
                  style={{
                    position: "relative",
                    borderRadius: "50%",
                    width: "100%",
                    padding: "5px"
                  }}
                />
              </ImageContainer>
              <ContentContainer>
                <div>
                  <p>{`${message.player} - ${message.time}`}</p>
                </div>
                <div
                  style={{
                    wordBreak: "break-word",
                    paddingRight: "10px"
                  }}
                >
                  {message.content}
                </div>
              </ContentContainer>
            </MessageContainer>
          ))}
        </div>

        <div className="container" style={{ height: "10%" }}>
          <form onSubmit={this.handleMessageSubmit}>
            <div className="form-group">
              <div className="input-group">
                <input type="text" ref="messageText" className="form-content" />
                <span className="input-group-btn">
                  <button className="btn btn-primary">Send</button>
                </span>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

Chat.propTypes = {
  auth: PropTypes.object.isRequired,
  chat: PropTypes.object.isRequired,
  sendMessage: PropTypes.func.isRequired,
  receiveMessage: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  chat: state.chat
});

export default connect(
  mapStateToProps,
  { sendMessage, receiveMessage }
)(Chat);
