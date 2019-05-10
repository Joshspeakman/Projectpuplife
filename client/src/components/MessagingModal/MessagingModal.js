import React from "react";
import {
  Container,
  Button,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter
} from "mdbreact";
import Chatkit from "@pusher/chatkit";
import MessageList from "./MessageList";
import SendMessageForm from "./SendMessageForm";
import RoomList from "./RoomList";
// import NewRoomForm from "./NewRoomForm";
import "./style.css";

const tokenUrl =
  "https://us1.pusherplatform.io/services/chatkit_token_provider/v1/03173364-ac86-471f-bc8e-679c55499502/token";
const instanceLocator = "v1:us1:03173364-ac86-471f-bc8e-679c55499502";

class ModalPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      roomId: "11293353",
      messages: [],
      joinableRooms: [],
      joinedRooms: [],
      modal: false
    };
    this.sendMessage = this.sendMessage.bind(this);
    this.subscribeToRoom = this.subscribeToRoom.bind(this);
    this.getRooms = this.getRooms.bind(this);
    this.createRoom = this.createRoom.bind(this);
    this.toggle = this.toggle.bind(this);
  }

  componentDidMount() {
    // const loggedInUser = this.state.User.username;
    const chatManager = new Chatkit.ChatManager({
      instanceLocator,
      userId: "KileyA",
      tokenProvider: new Chatkit.TokenProvider({
        url: tokenUrl
      })
    });

    chatManager
      .connect()
      .then(currentUser => {
        this.currentUser = currentUser;
        this.getRooms();
      })
      .catch(err => console.log("error on connecting: ", err));
  }

  getRooms() {
    this.currentUser
      .getJoinableRooms()
      .then(joinableRooms => {
        this.setState({
          joinableRooms,
          joinedRooms: this.currentUser.rooms
        });
      })
      .catch(err => console.log("error on joinableRooms: ", err));
  }

  subscribeToRoom(roomId) {
    this.setState({ messages: [] });
    this.currentUser
      .subscribeToRoom({
        roomId: roomId,
        hooks: {
          onNewMessage: message => {
            this.setState({
              messages: [...this.state.messages, message]
            });
          }
        }
      })
      .then(room => {
        this.setState({
          roomId: room.id
        });
        this.getRooms();
      })
      .catch(err => console.log("error on subscribing to room: ", err));
  }

  sendMessage(text) {
    this.currentUser.sendMessage({
      text,
      roomId: this.state.roomId
    });
  }

  createRoom(name) {
    this.currentUser
      .createRoom({
        name
      })
      .then(room => this.subscribeToRoom(room.id))
      .catch(err => console.log("error with createRoom: ", err));
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  render() {
    return (
      <Container>
        <Button color="#f7882f" className="messageBtn" onClick={this.toggle}>
          Send Message
        </Button>
        <Modal
          fullHeight
          position="right"
          className="messagingModal"
          isOpen={this.state.modal}
          toggle={this.toggle}
        >
          <ModalHeader toggle={this.toggle}>
            {" "}
            <RoomList
              subscribeToRoom={this.subscribeToRoom}
              rooms={[...this.state.joinableRooms, ...this.state.joinedRooms]}
              roomId={this.state.roomId}
            />
          </ModalHeader>
          <ModalBody>
            <MessageList
              roomId={this.state.roomId}
              messages={this.state.messages}
            />
          </ModalBody>
          <ModalFooter>
            <SendMessageForm
              disabled={!this.state.roomId}
              sendMessage={this.sendMessage}
            />
            {/* <NewRoomForm createRoom={this.createRoom} /> */}
          </ModalFooter>
        </Modal>
      </Container>
    );
  }
}

export default ModalPage;
