
import headphoneCover from '../../../assets/assets/cover/headphoneCover.webp'
import UseCard from '../../../Hook/UseCard/UseCard';
import UseCover from '../../../Hook/UseCover/UseCover';
import UseProduct from '../../../Hook/UseProduct/UseProduct';
import UserSectionTitle from '../../../Hook/UserSectionTitle/UserSectionTitle';
const HeadPhone = () => {
        const [products] = UseProduct()
        const WatchCategory = products.filter(item => item.category === 'Headphone')
        return (
                <div>
                 <UseCover img={headphoneCover}></UseCover> 
                 <UserSectionTitle HeaderTitle={'--- headphone ---- '} SetHeaderTitle={'---headphone product---'}></UserSectionTitle>  
                 <div className='grid md:grid-cols-6 grid-cols-2 gap-3 mb-10 m-3 md:mt-10 mt-10 rounded-xl'>
           {
                WatchCategory?.map(item => <UseCard key={item._id} image={item.image} productName={item.productName} price={item.price} _id={item._id}></UseCard>)
           }
                </div>  
                </div>
        );
};

export default HeadPhone;