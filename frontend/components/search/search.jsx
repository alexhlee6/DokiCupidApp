import React from 'react';
import SearchResults from './search_results';

class Search extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      profiles: this.props.profiles || [],
      identify_as: "",
      looking_for: "",
      match_percentage: "",
      specific_tag: ""
    }
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.props.getProfiles();
  }

  componentDidUpdate (prevProps) {
    if (this.props !== prevProps) {
      this.setState({profiles: this.props.profiles})
    }
  }

  handleChange(property) {
    return (e) => this.setState({ [property]: e.currentTarget.value })
  }

  render() {
    let conditions;
    if (this.state.profiles.length > 0) {
      conditions = Object.assign({}, this.state);
    }
    
    let results = (
      <SearchResults conditions={conditions} currentUserId={this.props.currentUserId} />
    )

    return (
      <div className="search-page-main">

        {/* <div className="search-page-title-container"> */}
        <div className="page-header">
          {/* <h3 className="search-page-title">Search</h3> */}
          <h3 className="page-title">Search</h3>
        </div>
        <div className="page-header sub-header">
          <div className="page-title sub-titles">
            <h1 className="search-page-description">Add some filters to find that special someone <i className="fas fa-heart"></i></h1>
          </div>
        </div>
      
        <div className="search-page-select-boxes">
          <div className="search-page-option-div">
            <label className="search-page-select-label">Gender Identification: </label>
            <select className="search-page-select" 
              value={this.state.identify_as} onChange={this.handleChange("identify_as")}>
              <option value="" defaultValue={this.state.identify_as === "" ? "true" : "false"}>--</option>
                <option value="Female">Female</option>
                <option value="Male">Male</option>
            </select>
          </div>


          <div className="search-page-option-div">
            <label className="search-page-select-label">Looking For: </label>
            <select className="search-page-select"
              value={this.state.looking_for} onChange={this.handleChange("looking_for")}>

              <option value="" defaultValue={this.state.looking_for === "" ? "true" : "false"}> --</option>
              <option value="Friends">Friends</option>
              <option value="Nothing Serious">Casual Fling / Nothing Serious</option>
              <option value="Relationship">Relationship</option>
              <option value="True Love">True Love / Long Term Relationship</option>
            </select>
          </div>


          <div className="search-page-option-div">
            <label className="search-page-select-label">Match Percentage: </label>
            <select className="search-page-select"
              value={this.state.match_percentage} onChange={this.handleChange("match_percentage")}>

              <option value="" defaultValue={this.state.match_percentage === "" ? "true" : "false"}> --</option>
              <option value="Decreasing">High to Low</option>
              <option value="Increasing">Low to High</option>
            </select>
          </div>
          

          <div className="search-page-option-div">
            <label className="search-page-select-label">Personality Tag: </label>

            <select className="search-page-select"
              value={this.state.specific_tag} onChange={this.handleChange("specific_tag")}>
              
              <option value="" defaultValue={this.state.specific_tag === "" ? "true" : "false"}>--</option>

              <option value="Introverted">Introverted</option>
              <option value="Extroverted">Extroverted</option>

              <option value="Dog Person">Dog Person</option>
              <option value="Cat Person">Cat Person</option>

              <option value="Creative">Creative</option>
              <option value="Methodical">Methodical</option>

              <option value="Organized">Organized</option>
              <option value="Carefree">Carefree</option>

              <option value="Adventurous">Adventurous</option>
              <option value="Reserved">Reserved</option>

              <option value="Independent">Independent</option>
              <option value="Cooperative">Cooperative</option>

              <option value="Sensitive">Sensitive</option>
              <option value="Head-strong">Headstrong</option>

              <option value="Task-oriented">Task-Oriented</option>
              <option value="Laid-back">Laid-back</option>

            </select>
          </div>

        </div>


        <div className="search-page-results-container">
          {results}
        </div>

      </div>
    )
  }

}

export default Search;