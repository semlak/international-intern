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
    // console.log('PROPS: ', props, 'MORE PROPS', this.props);
    if (props.currentUser) {
      this.setState({
        cityName: props.currentUser.internLocationCity,
        countryName: props.currentUser.internLocationCountry
      });
      this.searchAPI(props);
    }
  }

  componentDidMount() {
    if (this.props.currentUser) {
      this.setState({
        cityName: this.props.currentUser.internLocationCity,
        countryName: this.props.currentUser.internLocationCountry
      });
      this.searchAPI(this.props);
    }
  }

  searchAPI = (props) => {
    if (!props.currentUser.internLocationCity || !props.currentUser.internLocationCountry) {
      return console.error('User data appears to be missing fields \'internLocationCity\' and \'internLocationCountry\'');
    }
    // console.log('this.state: ', this.state);
    const query =
      ('https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key='
        + this.state.NYTAPIKey
        + '&q=' + props.currentUser.internLocationCity
        + ' '
        + props.currentUser.internLocationCountry
        + '&sort=newest');
    console.log('query: ' + query);

    API.search(query)
      .then(res => this.setState({ results: res.data.response.docs || [] }, () => {}))
      .catch(err => console.log(err));
  };

  render() {
    return (
      <div>
        <h2>Current News For {this.state.cityName}, {this.state.countryName}</h2>
        {this.state.results.map((oneitem, index) => (
          <ListItem
            key={oneitem._id}
            nytid={oneitem._id}
            title={oneitem.headline.main}
            url={oneitem.web_url}
            snippet={oneitem.snippet}
            nytimage={
              (oneitem.multimedia.length !== 0) ?
                `https://www.nytimes.com/${oneitem.multimedia[2].url}` :
                'https://static01.nyt.com/images/2016/09/20/insider/events/t-logo/t-logo-thumbStandard.png'
            }
          />
        )) || [] }
      </div>
    );
  }
}

export default News;
