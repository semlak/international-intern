import React, {Component} from 'react';
import API from "../../utils/API";
import Chartist from "chartist";

export default class extends Component {
  state = {}
  

  // handleInputChange = event => this.setState({[event.target.name]: event.target.value})

  displayGraph = function() {
      var chart = new Chartist.Line('.ct-chart', {
      labels: ['wk 1', 'wk 2', 'wk 3', 'wk 4', 'wk 5', 'wk 6'],
      // Naming the series with the series object array notation
      series: [{
        name: 'series-1',
        data: [5, 2, 4, 2, 0,]//change this to dataArray which will pull from db.expense
      }]
    }, {
      fullWidth: true,
      series: {
        'series-1': {
          lineSmooth: Chartist.Interpolation.step()
        }
      }
    });
  };



  componentDidMount() {
    API.getCurrentUser().then(response=> {
      console.log("response: ", response);
      let currentUser = response.data.user
      console.log("currentUser is: " , currentUser);
      this.setState({currentUser: currentUser});
    });
    this.displayGraph();
  }

  render() {
    return (
      <div style={{marginLeft: 100 + 'px'}}>
        <h1>Chart</h1>
        <div className="ct-chart pr-5 mr-5">
        </div>

      </div>
    )
  }
}
