import React from 'react';
import PropTypes from 'prop-types';

export default function Rank({ param }) {
    switch (param) {
        case '1':
            return <img src="assets/Stats/Group 42194@2x.png" alt="" />
        case '2':
            return <img src="assets/Stats/Group 42195@2x.png" alt="" />
        case '3':
            return <img src="assets/Stats/Group 42196@2x.png" alt="" />
        default:
            return null; // Add a default case to handle unexpected values
    }
}
Rank.propTypes = {
    param: PropTypes.string
};