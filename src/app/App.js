import React, { Component } from 'react';

import connection from '../firebaseRequests/connection';
import listingRequests from '../firebaseRequests/listings';

import Listings from '../components/Listings/Listings';
import Building from '../components/Building/Building';
import ListingForm from '../components/ListingForm/ListingForm';

import './App.css';

class App extends Component {
  state = {
    listings: [],
    selectedListingId: -1,
  }

  listingsSelectEvent = (id) => {
    this.setState({
      selectedListingId: id,
    });
  }

  formSubmitEvent = (newListing) => {
    listingRequests.postRequest(newListing)
      .then(() => {
        listingRequests.getRequest()
        .then((listings) => {
          this.setState({ listings });
        })
      })
      .catch((error) => {
        console.error('error with listings post', error);
      });
  }

  componentDidMount() {
    connection()
    listingRequests.getRequest()
    .then((listings) => {
      this.setState({ listings });
    })
    .catch((error) => {
      console.error('error with listings post', error);
    });
  }
  render () {
    // const {selectedListingId} = this.state;
    // const selectedListing = this.state.listings;
    // those two lines are the same as the two below
    const {selectedListingId, listings} = this.state;
    // const selectedListing = listings.find((listing) => {listing.id === selectedListingId });
    // same as line below
    const selectedListing = listings.find(listing => listing.id === selectedListingId) || {nope: 'nope'};
    return (
      <div className="App">
        <div className="col-sm-6">
          <Listings
            listings={this.state.listings}
            onListingSelection={this.listingsSelectEvent}
          />
        </div>
        <div className="col-sm-6">
          <Building listing={selectedListing} />
        </div>
        <div className="col-sm-12">
          <ListingForm
          onSubmit={this.formSubmitEvent}
          />
        </div>
      </div>
    );
  }
}

export default App;
