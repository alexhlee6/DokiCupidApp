import React from 'react';

class MatchIndex extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getMatches();
  }




  render() {
    return <div className="match-index-main"> 
      <div className="match-index-header">
        <h1 className="match-index-title">Matches</h1>
      </div>

    </div>
  }
}

export default MatchIndex;