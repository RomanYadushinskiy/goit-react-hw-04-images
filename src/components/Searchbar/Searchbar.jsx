// import { Component } from 'react';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Searchbar.module.css';
import { BsSearch } from 'react-icons/bs';

export const Searchbar = ({onSubmit}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleInputChange = e => {
    setSearchQuery(e.currentTarget.value.toLowerCase());
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(searchQuery);
    reset();
  };

  const reset = () => {
     setSearchQuery('');
  };

  return (
    <header className="Searchbar">
      <form onSubmit={handleSubmit}>
        <button type="submit">
          <span>
            <BsSearch style={{ fontSize: 20 }} />
          </span>
        </button>

        <input
          value={searchQuery}
          onChange={handleInputChange}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
};



// export class Searchbar extends Component {
//   state = {
//     searchQuery: '',
//   };

//   handleInputChange = e => {
//     this.setState({ searchQuery: e.currentTarget.value.toLowerCase() });
//   };

//   handleSubmit = e => {
//     e.preventDefault();
//     this.props.onSubmit(this.state.searchQuery);
//     this.reset();
//   };

//   reset = () => {
//      this.setState({ searchQuery: '' });
//   };

//   render() {
//     return (
//       <header className="Searchbar">
//         <form onSubmit={this.handleSubmit}>
//           <button type="submit">
//             <span>
//               <BsSearch style={{ fontSize: 20 }} />
//             </span>
//           </button>

//           <input
//             value={this.state.searchQuery}
//             onChange={this.handleInputChange}
//             type="text"
//             autoComplete="off"
//             autoFocus
//             placeholder="Search images and photos"
//           />
//         </form>
//       </header>
//     );
//   }
// };

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
