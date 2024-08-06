
const UserSectionTitle = ({HeaderTitle,SetHeaderTitle}) => {
        return (
                <div className="mt-5 md:mt-5 mb-10 w-1/2 md:w-96 text-center mx-auto">
                <p className="text-orange-400">{HeaderTitle}</p>
               
                <p className="uppercase p-2 text-lg" style={{ borderTop: '3px solid #bbb',borderBottom: '3px solid #bbb'}}>{SetHeaderTitle}</p>
            </div>
        );
};

export default UserSectionTitle;