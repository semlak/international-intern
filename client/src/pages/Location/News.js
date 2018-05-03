import React, { Component } from 'react';
import API from '../../utils/API';
import ListItem from './ListItem';


class News extends Component {
  state = {
    cityName: '',
    countryName: '',
    results: [],
    NYTAPIKey: process.env.REACT_APP_NYT_API_KEY
  };

  componentWillReceiveProps(props) {
    if (props.currentUser) {
      this.setState({
        cityName: props.currentUser.internLocationCity,
        countryName: props.currentUser.internLocationCountry
      });
      this.searchAPI();
    }
  }

  componentDidMouunt() {
    if (this.props.currentUser) {
      this.setState({
        cityName: this.props.currentUser.internLocationCity,
        countryName: this.props.currentUser.internLocationCountry
      });
      this.searchAPI();
    }
  }

  searchAPI = () => {
    // console.log('this.state: ', this.state);
    const query =
      ('https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key='
        + this.state.NYTAPIKey
        + '&q=' + this.state.cityName
        + ' '
        + this.state.countryName
        + '&sort=newest');
    // console.log('query: ' + query);

    API.search(query)
      .then(res => this.setState({ results: res.data.response.docs }, () => {}))
      .catch(err => console.log(err));
  };

  render() {
    return (
      <div>
        <h2>Current News For {this.state.cityName}, {this.state.countryName}</h2>
        {this.state.results.map((oneitem, index) => (
          <ListItem
            key={this.state.results[index]._id}
            nytid={this.state.results[index]._id}
            title={this.state.results[index].headline.main}
            url={this.state.results[index].web_url}
            snippet={this.state.results[index].snippet}
            nytimage={
              (this.state.results[index].multimedia.length !== 0) ?
                `https://www.nytimes.com/${this.state.results[index].multimedia[2].url}` :
                'https://static01.nyt.com/images/2016/09/20/insider/events/t-logo/t-logo-thumbStandard.png'
            }
          />
        ))}
      </div>
    );
  }
}

export default News;
