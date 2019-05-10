import React, { Component } from "react";
import firebase from "firebase";
import FileUploader from "react-firebase-file-uploader";
import "./ImageUpload.css";

class ImageUpload extends Component {
  state = {
    avatar: "",
    isUploading: false,
    progress: 0,
    avatarURL: ""
  };
  // ==============================< functions >===================================== //
  handleUploadStart = () => this.setState({ isUploading: true, progress: 0 });

  handleProgress = progress => this.setState({ progress });

  handleUploadError = error => {
    this.setState({ isUploading: false });
    console.error(error);
  };

  handleUploadSuccess = filename => {
    this.setState({ avatar: filename, isUploading: false });
    firebase
      .storage()
      .ref("images")
      .child(filename)
      .getDownloadURL()
      .then(url => {
        this.setState({ avatarURL: url });
        this.props.onComplete(url);
      });
  };

  //  handleChange = event => {
  //    event.preventDefault();
  //      if(event.target.files[0]) {
  //        const image = event.target.files[0]
  //        this.setState({ image },
  //          () => console.log(this.state)
  //        );
  //      }
  //  };

  //  handleUpload = () => {
  //    var config = {
  //    apiKey: "AIzaSyD8euegze2x9rm8dICoQDkeFpFUqQKOaWU",
  //    authDomain: "react-firebase-poc.firebaseapp.com",
  //    databaseURL: "https://react-firebase-poc.firebaseio.com",
  //    projectId: "react-firebase-poc",
  //    storageBucket: "react-firebase-poc.appspot.com",
  //    messagingSenderId: "685504463848"
  //  };

  //    firebase.initializeApp(config);
  //    const storage = firebase.storage();
  //    const {image} = this.state;
  //    const uploadTask = storage.ref(`owner_images/${image.name}`).put(image);
  //    uploadTask.on("state_changed",
  //    (snapshot) => {
  //      // progress function ...
  //
  //    },
  //    (error) => {
  //      // error function ...
  //      console.log(error);
  //   },
  //   () => {
  //    // completed function ...
  //    storage.ref('images').child(image.name).getDownloadURL().then(url => {
  //      console.log(url);
  //      })
  // });
  //};

  // ===============================< page rendering area >================================= //
  render() {
    return (
      <div className="App text-center mt-5">
        <div className="App-intro mt-5">
          <div className="mt-5">
            <form>
              <label className="upload-text">Choose your profile picture</label>
              {this.state.isUploading}
              <br />
              <FileUploader
                accept="image/*"
                name="avatar"
                randomizeFilename
                storageRef={firebase.storage().ref("images")}
                onUploadStart={this.handleUploadStart}
                onUploadError={this.handleUploadError}
                onUploadSuccess={this.handleUploadSuccess}
                onProgress={this.handleProgress}
              />
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default ImageUpload;
