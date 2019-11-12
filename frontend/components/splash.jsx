import React from 'react';

class Splash extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      slides: {
        slide0: "/images/hirotwo.jpg",
        slide1: "/images/kaguya.png",
        slide2: "/images/your_name.jpg",
        slide3: "/images/toradora.jpg",
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
    }, 4000);
  }

  transitionSlide() {
    console.log(this.state);
    
    this.setState({currentSlideId: ((this.state.currentSlideId + 1) % 5)})
  }

  componentWillUnmount() {
    clearInterval(this.carouselInterval);
  }

  render() {
    let currentSlideNumber = "slide" + this.state.currentSlideId.toString();
    let currentSlide = this.state.slides[currentSlideNumber];
    console.log(currentSlideNumber);

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
      </div>
    )
  }

}

export default Splash;