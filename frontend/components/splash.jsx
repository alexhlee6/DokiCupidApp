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
          On DokiCupid, you’re more than just a photo. You have stories to tell, and passions to share, and things to talk about that are more interesting than the weather. Get noticed for who you are, not what you look like. Because you deserve what dating deserves: better.
        </p>
      </div>
    )
  }
}

export default Splash;