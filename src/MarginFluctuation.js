import React from 'react';
import Cards from "./Components/Cards"

const url = "https://beta.eagleowl.in/api/v1/mock/organization/18/outlet/18/recipe/"
class MarginFluctuation extends React.Component {
    state = {
        margin_top:[],
        margin_bottom:[],
        fluctuation:[]
      };
    componentDidMount() {
      fetch(`${url}margin-group/?order=top&limit=1`)
        .then(response => response.json())
        .then(data => this.setState({margin_top:data.results}))
      fetch(`${url}margin-group/?order=bottom&limit=1`)
        .then(response => response.json())
        .then(data => this.setState({margin_bottom:data.results}))
      fetch(`${url}fluctuation-group/?order=top`)
        .then(response => response.json())
        .then(data => this.setState({fluctuation:data.results}))
      }
    render() {
      const {margin_bottom,margin_top,fluctuation} = this.state
      return (
        <div className="margin-fluc-container">
          <Cards items={margin_top} color={"red"} title={"High Margin Recipes"}/>
          <Cards items={margin_bottom} color={"green"} title={"Low Margin Recipes"}/>
          <Cards items = {fluctuation} title={"Top Fluctuating Recipes"}/>
        </div>
      )
    }
  }
export default MarginFluctuation;
 
