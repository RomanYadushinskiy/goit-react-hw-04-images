// import React, { Component } from 'react';
import React, { useState, useEffect } from 'react';
import { fetchImages } from './services/api';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';

export const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [loadMore, setLoadMore] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState('');
  
  useEffect(() => {
    getImages(searchQuery, page);
  }, [searchQuery, page]);

  const getImages = async (searchQuery, page) => {
    if (searchQuery === '') {
      return;
    }
    setIsLoading(true);
    try {
      const { hits, totalHits } = await fetchImages(searchQuery, page);
      setImages(prevImages  => [...prevImages , ...hits]);
      setLoadMore(Math.ceil(totalHits / 12));
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false);
    }
  };

  const hendleSubmit = searchQuery => {
    setSearchQuery(searchQuery);
    setImages([]);
    setPage(1); 
  };

  const hendleLoadMore = () => {
    setPage(prevPage => (prevPage + 1));
  };

  const openModal = largeImageURL => {
    setShowModal(true);
    setLargeImageURL(largeImageURL);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
      <>
        <Searchbar onSubmit={hendleSubmit} />
        <ImageGallery images={images} openModal={openModal} />
        {isLoading && <Loader isLoading={isLoading} />}
        {loadMore && <Button onLoadMore={hendleLoadMore} />}
        {showModal && (<Modal largeImageURL={largeImageURL} onClose={closeModal} />)}
      </>
    );
}

// export class App extends Component {
//   state = {
//     searchQuery: '',
//     images: [],
//     page: 1,
//     per_page: 12,
//     isLoading: false,
//     loadMore: false,
//     showModal: false,
//     largeImageURL: '',
//   };

//   componentDidUpdate(_, prevState) {
//     const { searchQuery, page } = this.state;
//     if (prevState.searchQuery !== searchQuery || prevState.page !== page) {
//       this.getImages(searchQuery, page);
//     }
//   }

//   getImages = async (query, page) => {
//     this.setState({ isLoading: true });
//     try {
//       const { hits, totalHits } = await fetchImages(searchQuery, page);
//       this.setState(prevState => ({
//         images: [...prevState.images, ...hits],
//         loadMore: Math.ceil(totalHits / this.state.per_page),
//       }));
//     } catch (error) {
//       this.setState({ error });
//     } finally {
//       this.setState({ isLoading: false });
//     }
//   };

//   hendleSubmit = searchQuery => {
//     this.setState({
//       searchQuery,
//       images: [],
//       page: 1, 
//     });
//   };

//   hendleLoadMore = () => {
//     this.setState(prevState => ({ page: prevState.page + 1 }));
//   };

//   openModal = largeImageURL => {
//     this.setState({
//       showModal: true,
//       largeImageURL: largeImageURL,
//     });
//   };

//   closeModal = () => {
//     this.setState({
//       showModal: false,
//     });
//   };

//   render() {
//     const { images, isLoading, loadMore, showModal, largeImageURL } =
//       this.state;
    
//     return (
//       <>
//         <Searchbar onSubmit={this.hendleSubmit} />
//         <ImageGallery images={images} openModal={this.openModal} />
//         {isLoading && <Loader isLoading={isLoading} />}
//         {loadMore && <Button onLoadMore={this.hendleLoadMore} />}
//         {showModal && (<Modal largeImageURL={largeImageURL} onClose={this.closeModal} />)}
//       </>
//     );
//   }
// }