import { FunctionComponent, useContext, useEffect, useState } from "react";
import Card from "../interfaces/Card";
import { deleteCard, getCardByUserId } from "../services/cardsService";
import { successMsg } from "../services/feedbacksService";
import { Link, useNavigate } from "react-router-dom";
import { SiteTheme } from "../App";

interface MyCardsProps {
    userInfo: any;
}

const MyCards: FunctionComponent<MyCardsProps> = ({ userInfo }) => {
    let theme = useContext(SiteTheme);
    let navigate = useNavigate();
    let [addCard, setAddCard] = useState<Card[]>([]);
    let [cardChange, setCardChange] = useState<boolean>(false);
    useEffect(() => {
        let userId: string = JSON.parse(sessionStorage.getItem("userInfo") as string).id;
        getCardByUserId(userId)
            .then((res) => setAddCard(res.data))
            .catch((err) => console.log(err))
    }, [cardChange]);

    let render = () => { setCardChange(!cardChange) }

    let handleDlete = (id: string) => {
        if (window.confirm("Are you sure?")) {
            deleteCard(id)
                .then((res) => {
                    successMsg("Card deleted successfully");
                    render();
                })
                .catch((err) => console.log(err))
        }
    }
return (
        <>
            <h5 className="display-1 pt-3 text-center">MY CARD</h5>
            <h5 className="display-1 pt-3 text-center" style={{ fontSize: "2.3rem" }}>Here you can view / edit / delete your business</h5>
            {addCard.length ?
                (
                    <div className="container">
                        <div className="row">
                            {addCard.map((card: Card) => (<div key={card._id} className="card col-md-4 mx-2 mt-4"
                                style={{ width: "25rem" }}>
                                <img src={card.imageUrl} className="card-img-top h-75" onClick={() => navigate(`/cards/card-details/${card._id}`)} alt={card.imageAlt} />
                                <div className="card-body text-center" style={{ color: "#947427" }}>
                                    <h5 className="card-title">{card.title}</h5>
                                    <p className="card-text">{card.subTitle}</p>
                                </div>
                                <ul className="list-group list-group-flush text-center" style={{ color: "#947427" }}>
                                    <li className="list-group-item"><i className="fa-solid fa-phone"></i> {card.phone}</li>
                                    <li className="list-group-item"><i className="fa-regular fa-envelope"></i> {card.email}</li>
                                </ul>
                                {userInfo.role == "Admin" || userInfo.role == "Business"
                                    ?
                                    (
                                        <>
                                        <ul className="text-center mt-3 d-flex p-2">
                                            <Link to={`update/${card._id}`}><i className="fa-solid fa-pen mx-3" style={{ color: "#947427" }}></i></Link>
                                            <Link to=""><i className="fa-solid fa-trash" style={{ color: "#947427" }} onClick={() => handleDlete(card._id as string)}></i></Link>
                                        </ul>
                                        </>
                                    )
                                    :
                                    (null)
                                }
                            </div>
                            ))}
                        </div >
                    </div >
                )
                :
                (<div className={`pt-3 pb-5 sandBoxStyle ${theme}`}>
                <div className="container backGround mt-5 p-5 col-md-6">
                <h1 className="text-center mb-5" style={{ fontSize: "2rem" }}>
                You haven't published your business yet? You are welcome to post on our popular site
                <h5><Link to="/cards" className="text-black">for advertising the business <i className="fa-solid fa-plus fa-xs"></i></Link></h5> 
                </h1>
              <h2 className="text-center"><img src="/Images/logo.PNG" style={{ width: "220px", height: "65px" }} /></h2>
                </div>
                </div>)
           
            }
        </>
    )
}

export default MyCards;