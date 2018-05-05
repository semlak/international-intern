import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import Card, { CardContent, CardMedia } from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import API from '../../utils/API';
import ListItem from './ListItem';
import Grid from 'material-ui/Grid';

const styles = theme => ({
  card: {
    display: 'flex',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    width: 151,
    height: 151,
  },
  // controls: {
  //   display: 'flex',
  //   alignItems: 'center',
  //   paddingLeft: theme.spacing.unit,
  //   paddingBottom: theme.spacing.unit,
  // },
  // playIcon: {
  //   height: 38,
  //   width: 38,
  // },
});


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
        <Typography variant="headline">Current News For {this.state.cityName}, {this.state.countryName}</Typography>
      {/* <Grid item xs={6}>
      <h2>Current News For {this.state.cityName}, {this.state.countryName}</h2></Grid> */}
        <Grid item xs={12}>
          {this.state.results.map((oneitem, index) => (
            <Card className={this.props.classes.card}>
              {/* <Card className={this.props.classes.card}> */}
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
              {/* </Card> */}
            </Card>
          )) || [] }

        </ Grid>
      </div>



    );
  }
}

export default withStyles(styles)(News);


          /* <h2>Current News For {this.state.cityName}, {this.state.countryName}</h2>
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
          )) || [] } */