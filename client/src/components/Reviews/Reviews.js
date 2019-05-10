import React, { Component } from "react";
import "./Reviews.css";
import API from "../../utils/API";

class Reviews extends React.Component {
  constructor() {
    super();

    this.state = {
      showComments: false,
      comments: []
    };
  }

  componentDidMount() {
    
  }
  
  componentWillReceiveProps(newProps) {
    API.getReviews(newProps.dog_id).then(response => {
      this.setState({ comments: response.data });
    })
  }

  render() {
    return (
      <div className="comment-box">
        <h2>Tell us what you think!</h2>
        <CommentForm addComment={this._addComment.bind(this)} />
        <button id="comment-reveal" onClick={this._handleClick.bind(this)}>
          {this.state.showComments ? "Close Comments" : "Read Comments"}
        </button>
        <h3>Comments</h3>
        <h4 className="comment-count">
          {this.state.comments.length > 0 ? `${this.state.comments.length} comment(s)` : "No comments yet"}
        </h4>
        <div className={ this.state.showComments ? "comment-list" : "hidden" }>
          { this.state.comments.map(c => <Comment reviewer={c.reviewer} review={c.review} key={c.id} />) }
        </div>
      </div>
    );
  } // end render

  _addComment(review) {
    let profile = JSON.parse(localStorage.getItem("profile"))

    const comment = {
      id: this.state.comments.length + 1,
      reviewer: profile ? profile.username : "Anonymous",
      review,
      dog_id: this.props.dog_id
    };

    API.review(comment).then(response => {
      console.log(response);
    });

    this.setState({ comments: this.state.comments.concat([comment]) }); // *new array references help React stay fast, so concat works better than push here.
  }

  _handleClick() {
    this.setState({
      showComments: !this.state.showComments
    });
  }

} // end CommentBox component

class CommentForm extends React.Component {
  render() {
    return (
      <form className="comment-form" onSubmit={this._handleSubmit.bind(this)}>
        <div className="comment-form-fields">
          {/* <input
            className="reviewName"
            placeholder="Users Name"
            required
            ref={input => (this._author = input)}
          /> */}
          {/* <br /> */}
          <textarea
            id="reviewText"
            placeholder="Comment"
            rows="4"
            required
            ref={textarea => (this._review = textarea)}
          />
        </div>
        <div className="comment-form-actions">
          <button className="postReviewBtn" type="submit">
            Post Comment
          </button>
        </div>
      </form>
    );
  } // end render

  _handleSubmit(event) {
    event.preventDefault(); // prevents page from reloading on submit
    // let reviewer = this._author;
    let review = this._review;
    this.props.addComment(review.value);
  }
} // end CommentForm component

class Comment extends React.Component {
  render() {
    return (
      <div className="comment">
        <p className="comment-header">{this.props.reviewer}</p>
        <p className="comment-body">- {this.props.review}</p>
        <div className="comment-footer" />
      </div>
    );
  }
}

export default Reviews;
