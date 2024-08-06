import {Carousel} from "@material-tailwind/react";
import img1 from '../../../assets/assets/Banner/Headphone-website-1.jpg';
import img2 from '../../../assets/assets/Banner/headphone.jpg'
import img3 from '../../../assets/assets/Banner/phone-banner-2.webp'
import img4 from '../../../assets/assets/Banner/phone-banner.jpg'
import img5 from '../../../assets/assets/Banner/watch-banner-4.jpg'
import img6 from '../../../assets/assets/Banner/watch.gif'
const Banner = () => {
        return (
                <Carousel className="w-full mb-8">
                <img
                src={img6}
                alt="image 1"
                className="md:h-96 h-full w-full object-cover"
                />
                <img
                src={img5}
                alt="image 3"
                className="md:h-96 h-full w-full object-cover"
                />
              <img
                src={img1}
                alt="image 2"
                className="md:h-96 h-full w-full object-cover"
              />
              <img
                src={img2}
                alt="image 3"
                className="md:h-96 h-full w-full object-cover"
              />
              <img
                src={img3}
                alt="image 4"
                className="md:h-96 h-full w-full object-cover"
                />
                 <img
                src={img4}
                alt="image 5"
                className="md:h-96 h-full w-full object-cover"
                />
            </Carousel>
        );
};

export default Banner;