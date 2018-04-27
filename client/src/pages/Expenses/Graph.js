import React, {Component} from 'react';
import API from "../../utils/API";
import Chartist from "chartist";


export default class extends Component {
  state = {}
  

  displayGraph = function() {

      // let individualExpense = [14.5, 34, 9, 5.72, 4.12, 47, 3.47,12 ,15]
      let individualExpense =  this.props.expenses.map(expense => expense.expAmount);
      // console.log("Individual Expenses:" + individualExpense);

      let cumulativeExpense = []
      for (let i = 0; i < individualExpense.length; i++){
        cumulativeExpense[i] = individualExpense[i] + (i > 0 ? cumulativeExpense[i-1]: 0);
        // console.log(cumulativeExpense);
      }

      console.log("EEEEEEEEEEEEEEEEEEEEEE", individualExpense);

      let labels = Array.apply(null, {length: (individualExpense.length) + 1}).map((val, i) => i +1);


      var chart = new Chartist.Line('.ct-chart', {
      // labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      
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
  };

  componentDidMount() {
    API.getCurrentUser().then(response=> {
      console.log("response: ", response);
      let currentUser = response.data.user
      console.log("currentUser is: " , currentUser);
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
