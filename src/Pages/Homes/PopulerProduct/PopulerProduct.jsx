import UseCard from "../../../Hook/UseCard/UseCard";
import UseProduct from "../../../Hook/UseProduct/UseProduct";
import UserSectionTitle from "../../../Hook/UserSectionTitle/UserSectionTitle";

const PopulerProduct = () => {
  const [products] = UseProduct();
  const popularProducts = products.filter(
    (item) => item.category === "popular"
  );
  return (
    <>
      <UserSectionTitle
        HeaderTitle={"---product---"}
        SetHeaderTitle={"---populerproduct---"}
      ></UserSectionTitle>
      <div className="grid md:grid-cols-6 grid-cols-2 gap-3 mb-10 m-3 md:mt-10 mt-10 rounded-xl">
        {popularProducts?.map((item) => (
          <UseCard
            key={item._id}
            image={item.image}
            _id={item._id}
            productName={item.productName}
            price={item.price}
          ></UseCard>
        ))}
      </div>
    </>
  );
};

export default PopulerProduct;
