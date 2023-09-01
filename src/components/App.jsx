import { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Modal } from './Modal/Modal';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { searchImages } from 'api';

export class App extends Component {
  state = {
    searchTerm: '',
    isShowModal: false,
    modalImage: '',
    images: [],
    isLoading: false,
    error: null,
    page: 1,
    totalImages: 0,
  };

  onSubmit = e => {
    e.preventDefault();
    const query = e.target.elements.searchWord.value.trim().toLowerCase();
    if (!query.length) {
      alert('Please, write a search word');
      return;
    }
    this.setState({
      searchTerm: query,
      images: [],
      page: 1,
    });
    e.target.reset();
  };

  showModal = url => {
    this.setState({ isShowModal: true });
    this.setState({ modalImage: url });
  };

  closeModal = () => {
    this.setState({ isShowModal: false });
  };

  handleLoadMoreButton = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  componentDidUpdate(_, prevState) {
    if (
      prevState.searchTerm !== this.state.searchTerm ||
      prevState.page !== this.state.page
    ) {
      this.setState({ isLoading: true });
      searchImages(this.state.searchTerm, this.state.page)
        .then(response => {
          if (response.ok) {
            return response.json();
          }
          return Promise.reject(
            new Error(`Nothing found for ${this.state.searchTerm}`)
          );
        })
        .then(images => {
          if (!images.hits.length) {
            alert('Nothing found');
          } else {
            this.setState(prevState => ({
              images: [...prevState.images, ...images.hits],
              totalImages: images.totalHits,
            }));
          }
        })
        .catch(error => {
          console.log(error);
          this.setState({ error });
        })
        .finally(() => {
          this.setState({ isLoading: false });
        });
    }
  }

  render() {
    return (
      <>
        <Searchbar onSubmit={this.onSubmit} />
        {this.state.images.length > 0 && (
          <ImageGallery images={this.state.images} showModal={this.showModal} />
        )}
        {this.state.isLoading && <Loader />}
        {this.state.isShowModal && (
          <Modal image={this.state.modalImage} closeModal={this.closeModal} />
        )}
        {this.state.totalImages > this.state.images.length &&
          !this.state.isLoading && (
            <Button onClick={this.handleLoadMoreButton} />
          )}
      </>
    );
  }
}
