import React from 'react';
import { Link } from 'react-router-dom';
import { findCompatibility } from '../../util/match_util';

class MatchIndex extends React.Component {

  constructor(props) {
    super(props);
    this.state = {loading: true};
    
    this.handlePageSelect = this.handlePageSelect.bind(this);
  }

  componentDidMount() {
    this.props.getMatches();

    this.state.selectedPage = this.props.selectedPage;
    setTimeout(() => this.setState(Object.assign({}, this.props.matches, {loading: false})), 100);
  }

  componentDidUpdate(prevProps) {
    console.log(this.state);
    if (prevProps !== this.props) {
      this.setState(Object.assign({}, this.props.matches, {selectedPage: this.props.match.params.selectedPage}));
      setTimeout(() => this.setState({ loading: false }), 100);
    }
  }

  handlePageSelect(pageName) {
    this.setState({selectedPage: pageName, loading: true})
  }

  render() {
    let matchList;

    if (this.state.selectedPage === "my-matches" && this.state.matched_users) {
      matchList = Object.values(this.state.matched_users).map((user, i) => {
        return (
          <Link to={user.profile_id ? `/profiles/${user.profile_id}` : ""} className="profile-index-item-link" key={i}>
            <li className="profile-index-item" key={user.id}>
              <div key={`photocontainer-${user.id}`} className="profile-index-user-photo-container">
                <img key={`img-${user.id}`}className="profile-index-user-photo" src={user.photo_url} />
              </div>

              <div key={`fname-${user.id}`} className="profile-index-user-fname">{user.fname}</div>
              <div className="profile-item-match-percentage" key={`compatibility-${user.id}`}>
                { findCompatibility(
                  this.state.matched_users[user.id].current_user_compatibility_answers, 
                  this.state.matched_users[user.id].other_user_compatibility_answers
                ) }% Match
              </div>
            </li>
          </Link>
        )
      })
    } else if (this.state.selectedPage === "who-you-liked" && this.state.who_you_liked) {
      matchList = Object.values(this.state.who_you_liked).map((user, i) => {
        return (
          <Link to={user.profile_id ? `/profiles/${user.profile_id}` : ""} className="profile-index-item-link" key={i}>
            <li className="profile-index-item" key={user.id}>
              <div key={`photocontainer-${user.id}`} className="profile-index-user-photo-container">
                <img key={`img-${user.id}`} className="profile-index-user-photo" src={user.photo_url} />
              </div>

              <div key={`fname-${user.id}`} className="profile-index-user-fname">{user.fname}</div>
              <div className="profile-item-match-percentage" key={`compatibility-${user.id}`}>
                {findCompatibility(
                  this.state.who_you_liked[user.id].current_user_compatibility_answers,
                  this.state.who_you_liked[user.id].other_user_compatibility_answers
                )}% Match
              </div>
            </li>
          </Link>
        )
      })
    } else if (this.state.selectedPage === "who-liked-you" && this.state.who_liked_you) {
      matchList = Object.values(this.state.who_liked_you).map((user, i) => {
        return (
          <Link to={user.profile_id ? `/profiles/${user.profile_id}` : ""} className="profile-index-item-link" key={i}>
            <li className="profile-index-item" key={user.id}>
              <div key={`photocontainer-${user.id}`} className="profile-index-user-photo-container">
                <img key={`img-${user.id}`} className="profile-index-user-photo" src={user.photo_url} />
              </div>

              <div key={`fname-${user.id}`} className="profile-index-user-fname">{user.fname}</div>
              <div className="profile-item-match-percentage" key={`compatibility-${user.id}`}>
                {findCompatibility(
                  this.state.who_liked_you[user.id].current_user_compatibility_answers,
                  this.state.who_liked_you[user.id].other_user_compatibility_answers
                )}% Match
              </div>
            </li>
          </Link>
        )
      })
    } else if (!this.state.loading){
      matchList = (
        <div className="match-index-not-found-page">
          <p>Nothing to see here <i className="far fa-frown"></i></p>
        </div>
      )
    }
    

    return (
      <div className="match-index-main"> 
        <div className="page-header">
          <h1 className="page-title">Matches</h1>
        </div>

        <div className="page-header sub-header">
          <div className="page-title sub-titles">
            <Link to="/matches/my-matches" 
              className={this.state.selectedPage === "my-matches" ? "selected-page-title" : ""} 
              onClick={() => this.handlePageSelect("my-matches")}>
              Your Matches
            </Link>
            <Link to="/matches/who-you-liked" 
              className={this.state.selectedPage === "who-you-liked" ? "selected-page-title" : ""} 
              onClick={() => this.handlePageSelect("who-you-liked")}>
                Who You Liked
            </Link>
            <Link to="/matches/who-liked-you" 
              className={this.state.selectedPage === "who-liked-you" ? "selected-page-title" : ""}
              onClick={() => this.handlePageSelect("who-liked-you")}>
              Who Liked You
            </Link>
          </div>
        </div>



        <div className="match-index-list-container">
          <ul className="profile-index-list">
            {matchList}
          </ul>
        </div>


      </div>
    )
  }
}

export default MatchIndex;