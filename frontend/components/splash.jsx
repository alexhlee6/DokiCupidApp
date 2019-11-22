import React from 'react';

class Splash extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      slides: {
        slide0: "/images/hirotwo.jpg",
        slide1: "/images/your_name-2.png",
        slide2: "/images/umbrella.jpg",
        slide3: "/images/chitanda.jpg",
        slide4: "/images/sao.jpg"
      },
      currentSlideId: 0
    }
  }

  componentDidMount() {
    this.startCarousel();
  }

  startCarousel() {
    this.carouselInterval = setInterval(() => {
      this.transitionSlide();
    }, 7000);
  }

  transitionSlide() {
    this.setState({currentSlideId: ((this.state.currentSlideId + 1) % 5)})
  }

  componentWillUnmount() {
    clearInterval(this.carouselInterval);
  }

  render() {
    let currentSlideNumber = "slide" + this.state.currentSlideId.toString();

    let stateSlides = Object.keys(this.state.slides);
    let slides = stateSlides.map((slideNum, i) => {
      if (slideNum === currentSlideNumber) {
        return (
          <li key={i} className="slide showing">
            <img className="slideshow-image" src={this.state.slides[slideNum]} />
          </li>
        )
      } else {
        return (
          <li className="slide" key={i}>
            <img className="slideshow-image" src={this.state.slides[slideNum]} />
          </li>
        )
      }
    })

    return (
      <div className="splash-main">
        <ul>
          {slides}
        </ul>
        <p className="splash-description-title">
          LOVE TRANSCENDS DIMENSIONS
        </p>
        <div className="splash-description-module"></div>
        <p className="splash-description-body">
          On Dokicupid, love is love. Whether you hold three dimensions or fewer, there's someone out there waiting to connect with you. Finding your perfect match has never been easier! Join us today to meet person of your dreams <i className="fas fa-heart"></i>
        </p>
      </div>
    )
  }
}

export default Splash;