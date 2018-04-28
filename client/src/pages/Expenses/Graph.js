import React, {Component} from 'react';
import API from "../../utils/API";
import Chartist from "chartist";


export default class extends Component {
  state = {}
  

  displayGraph = function() {

      let individualExpense =  this.props.expenses.map(expense => expense.expAmount);
      // console.log("Individual Expenses:" + individualExpense);

      let cumulativeExpense = []
      for (let i = 0; i < individualExpense.length; i++){
        cumulativeExpense[i] = individualExpense[i] + (i > 0 ? cumulativeExpense[i-1]: 0);
        // console.log(cumulativeExpense);
      }

      let labels = Array.apply(null, {length: (individualExpense.length) + 1}).map((val, i) => i +1);


      let chart = new Chartist.Line('.ct-chart', {
      
        labels: labels,
      // Naming the series with the series object array notation
        series: [{
          name: 'series-1',
          data: individualExpense
        }, {
          name: 'series-2',
          data: cumulativeExpense
        }], 
        },{
          fullWidth: true,
          chartPadding: {
          right: 50
          },
          series: {
            'series-1': {
              showLine: false
              // lineSmooth: Chartist.Interpolation.simple()
            },
            'series-2': {
              lineSmooth: Chartist.Interpolation.step(),
              showArea: true,
              showPoint: false
            }
          }
        });

  };

  componentWillReceiveProps() {
    this.displayGraph();
    // this.forceUpdate();
  };

  componentDidMount() {
    API.getCurrentUser().then(response=> {
      // console.log("response: ", response);
      let currentUser = response.data.user
      // console.log("currentUser is: " , currentUser);
      this.setState({currentUser: currentUser});
    });
    // this.displayGraph();
  };

  render() {
    return (
      <div style={{marginLeft: 100 + 'px'}}>
        <h1>Chart</h1>
        <div className="ct-chart">
        </div>

      </div>
    )
  }
}
