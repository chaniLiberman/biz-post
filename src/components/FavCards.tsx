import { FunctionComponent, useContext, useEffect, useState } from "react";
import Card from "../interfaces/Card";
import { getUserById, updateUser } from "../services/usersService";
import { getCardByCardId } from "../services/cardsService";
import User from "../interfaces/User";
import { SiteTheme, UserInfo } from "../App";
import { Link } from "react-router-dom";

interface FavCardsProps {
    userInfo: UserInfo;
}

const FavCards: FunctionComponent<FavCardsProps> = ({ userInfo }) => {
    let theme =useContext(SiteTheme);
    const loadFavCards = (favCardIds: number[]) => {
        return Promise.all(
            favCardIds.map(cardId => getCardByCardId(cardId))
        )
            .then(res => setFavCards(res.map(cardId => cardId.data)))
    }

    let [favCards, setFavCards] = useState<Card[]>([]);

    useEffect(() => {
        if (userInfo.id === undefined) { return; }
        getUserById(userInfo.id)
            .then(res => loadFavCards(res.data[0].favCards as number[]))
            .catch((err) => console.log(err))
    }, [userInfo.id]);

    let removeFromFavorite = (cardId: number | undefined) => {
        let user: User;
        if (userInfo.id === undefined) { return; }
        getUserById(userInfo.id)
            .then(res => {
                user = res.data[0] as User
                if (user.id === undefined) { return; }
                user.favCards = user.favCards?.filter(x => x !== cardId)
                //post user to server
                return updateUser(user, user.id)
            })
            .then(() => loadFavCards(user.favCards || []))
    }
    return (
        <>
            <h5 className="display-1 pt-3 text-center">FAVORITE</h5>
            <h5 className="display-1 pt-3 text-center" style={{ fontSize: "2.3rem" }}>My favorites</h5>
            {favCards.length ?
                (
                    <div className="container">
                        <div className="row">
                            {favCards.map((card: Card) =>
                            (<div key={card.id} className="card col-md-4 mx-2 mt-4" style={{ width: "25rem" }}>
                                <img src={card.imageUrl} className="card-img-top h-75" alt={card.imageAlt} />
                                <div className="card-body text-center" style={{ color: "#947427" }}>
                                    <h5 className="card-title">{card.title}</h5>
                                    <p className="card-text">{card.subTitle}</p>
                                </div>
                                <ul className="list-group list-group-flush text-center" style={{ color: "#947427" }}>
                                    <li className="list-group-item"><i className="fa-solid fa-phone"></i> {card.phone}</li>
                                    <li className="list-group-item"><i className="fa-regular fa-envelope"></i> {card.email}</li>
                                </ul>
                                <div className="card-body">
                                    <i className="fa-solid fa-heart" onClick={() => removeFromFavorite(card.id)}></i>
                                </div>
                            </div>
                            ))}
                        </div>
                    </div>
                )
                :
                (<div className={`pt-3 pb-5 sandBoxStyle ${theme}`}>
               <div className="container backGround mt-5 p-5 col-md-6">
               <h1 className="text-center mb-5" style={{ fontSize: "2rem" }}>
               Still haven't clicked as a favorite? You are welcome to click - for your convenience
               <h5><Link to="/cards" className="text-black">choose favorite <i className="fa-solid fa-heart fa-xs"></i></Link></h5> 
               </h1>
             <h2 className="text-center"><img src="/Images/logo6.PNG" style={{ width: "220px", height: "65px" }} /></h2>
               </div>
               </div>)
               
           
            }
            
        </>
    )
}

export default FavCards;