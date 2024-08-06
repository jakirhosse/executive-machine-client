import Banner from "../Banner/Banner";
import Category from "../Category/Category";
import PopulerProduct from "../PopulerProduct/PopulerProduct";
import Review from "../Review/Review";


const Home = () => {
        return (
                <div>
                   <Banner></Banner>    
                   <Category></Category>
                   <PopulerProduct></PopulerProduct>
                   <Review></Review>
                </div>
        );
};
export default Home;