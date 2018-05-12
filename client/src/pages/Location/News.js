import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import Card, { CardContent, CardMedia } from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import Grid from 'material-ui/Grid';
import API from '../../utils/API';

const styles = theme => ({
  card: {
    display: 'flex',
    marginTop: 16,
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    textOverflow: 'ellipsis',
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    width: 100,
    height: 100,
  },
});


class News extends Component {

  state = {
    cityName: '',
    countryName: '',
    results: [],
    NYTAPIKey: process.env.REACT_APP_NYT_API_KEY
  };

  componentDidMount() {
    if (this.props.currentUser) {
      this.setState({
        cityName: this.props.currentUser.internLocationCity,
        countryName: this.props.currentUser.internLocationCountry
      });
      this.searchAPI(this.props);
    }
  }

  componentWillReceiveProps(props) {
    if (props.currentUser) {
      this.setState({
        cityName: props.currentUser.internLocationCity,
        countryName: props.currentUser.internLocationCountry
      });
      this.searchAPI(props);
    }
  }

  searchAPI = (props) => {
    if (!props.currentUser.internLocationCity || !props.currentUser.internLocationCountry) {
      return console.error('User data appears to be missing fields \'internLocationCity\' and \'internLocationCountry\'');
    }
    // console.log('this.state: ', this.state);
    const query = (
      'https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key='
        + this.state.NYTAPIKey
        + '&q=' + props.currentUser.internLocationCity
        + ' '
        + props.currentUser.internLocationCountry
        + '&sort=newest'
      );
    console.log('query: ' + query);

    API.search(query)
      .then(res => this.setState({ results: res.data.response.docs || [] }, () => {}))
      .catch(err => console.log(err));
  };

  render() {
    return (
      <div>
        <Grid item xs={12}>
        <Typography variant="headline">Current News For {this.state.cityName}, {this.state.countryName}</Typography>
          {this.state.results.map((oneitem, i) => (
            <Card key={i} className={this.props.classes.card}>
              <CardMedia
                className={this.props.classes.cover}
                image={
                  (oneitem.multimedia.length !== 0) ?
                    `https://www.nytimes.com/${oneitem.multimedia[2].url}` :
                    'https://static01.nyt.com/images/2016/09/20/insider/events/t-logo/t-logo-thumbStandard.png'
                }
                title={oneitem.headline.main}
              />
              <div className={this.props.classes.details}>
                <CardContent className={this.props.classes.content}>
                  <Typography variant="headline">{oneitem.headline.main}</Typography>
                  <Typography variant="subheading" color="textSecondary">{oneitem.snippet}</Typography>
                </CardContent>
              </div>
            </Card>
          )) || [] }
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(News);
