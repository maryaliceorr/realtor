import React from 'react';
import PropTypes from 'prop-types';
import {listingShape} from '../../propz/listingProp';

import ListingItem from '../ListingItem/ListingItem';

import './Listings.css';

class Listings extends React.Component {
  static propTypes = {
    listings: PropTypes.arrayOf(listingShape),
  };

  render () {
    // const listings = this.props.listings; the next line is saying the same thing as this
    const {listings} = this.props;
    const listingsItemComponents = listings.map((listing) => {
      return (
        <ListingItem
          listing={listing}
          key={listing.id}
        />
      );
    });
    return (
      <div className="Listings" >
        <h2>Listings</h2>
        <ul>
          {listingsItemComponents}
        </ul>
      </div>
    );
  }
}

export default Listings;
