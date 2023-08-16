import { Dispatch, FunctionComponent, SetStateAction, useContext, useEffect, useState } from "react";
import Card from "../interfaces/Card";
import { getCards } from "../services/cardsService";
import { Link, useNavigate } from "react-router-dom";
import { addToArrayFav, getUserById } from "../services/usersService";
import { AxiosResponse } from "axios";
import User from "../interfaces/User";
import CardComponent from "./CardComponent";
import { number } from "yup";
import { successMsg } from "../services/feedbacksService";
import { SiteTheme, UserInfo } from "../App";


interface HomeProps {
    userInfo: UserInfo;
    setUserInfo: Dispatch<SetStateAction<UserInfo>>;
    cards: Card[];
    setCards: Dispatch<SetStateAction<Card[]>>;
}

const Home: FunctionComponent<HomeProps> = ({ userInfo, setUserInfo, cards, setCards }) => {
    let theme =useContext(SiteTheme)
    let navigate = useNavigate();
    let [favoriteIds, setFavoriteIds] = useState<number[]>([])

    useEffect(() => {
        const promises = [
            getCards() as Promise<AxiosResponse<Card[], any>>,
            userInfo.id !== undefined ?
                getUserById(userInfo.id) as Promise<AxiosResponse<User[], any>> :
                undefined
        ] as const;
        Promise.all(promises).then(([cardsResponse, userResponse]) => {
            setFavoriteIds(() => userResponse?.data[0]?.favCards || [])
            setCards(cardsResponse.data)
        })
            .catch(err => console.log(err))
    }, [userInfo.id]);

    let addToFavorite = (card: Card) => {
        let id = JSON.parse(sessionStorage.getItem("userInfo") as string).id;
        if (card.id === undefined) { return }
        const cardId = card.id;
        if (favoriteIds.includes(cardId)) {
            successMsg("The card is already in favorites")
            return}
        addToArrayFav(id, cardId)
            .then((res) => {
                successMsg("card added favorite");
                setFavoriteIds(prev => [...prev, cardId])
            })
            .catch((err) => console.log(err))
    }
    return (
        <div className={`mt-3 bCard ${theme}`}>
            <div className="container col-md-6">
            <h1 className="text-center mt-5 mainText" style={{ fontSize: "4rem" }}>Find your favorite business</h1>
            <h3 className="text-center" style={{ fontSize: "1.5rem" }}>Here you are welcome to get all the information about businesses you are looking for and love,
                                         You can mark them as favorites by clicking on the heart,
                      and remove them in the fav-cards tab
                       </h3> 
            <h5 className=" text-center"><Link to="/login" className="text-black">Welcome to connect or register with us</Link></h5> 
            </div>         
            <div className="container">
                 {userInfo.role == "Admin" || userInfo.role == "Business" ?
                (
                     <Link to="new" className="position-relative btn btn-sm btn-secondary rounded-pill shadow pt-3" style={{ width: "5rem", height: "5rem" }}>
                            <i className="fa-solid fa-plus"></i>  Add Business
                        </Link>
                )
                :
                (null)
            }
            {cards.length
                ?
                (                  
                        <div className="row">
                            {cards.map((card: Card) =>
                            (<div key={card.id} className="card col-md-4 mx-2 mt-5"
                                style={{ width: "25rem" }}>
                                <img src={card.imageUrl} className="card-img-top h-75" onClick={() => navigate(`card-details/${card.id}`)} alt={card.imageAlt} />
                                <div className="card-body text-center" style={{ color: "#947427" }}>
                                    <h5 className="card-title">{card.title}</h5>
                                    <p className="card-text">{card.subTitle}</p>
                                </div>
                                <ul className="list-group list-group-flush text-center" style={{ color: "#947427" }}>
                                    <li className="list-group-item"><i className="fa-solid fa-phone"></i> {card.phone}</li>
                                    <li className="list-group-item"><i className="fa-regular fa-envelope"></i> {card.email}</li>
                                </ul>
                                <div className="card-body">
                                    {userInfo.email && (<>
                                        <div onClick={() => addToFavorite(card)}>
                                            {!favoriteIds.includes(card.id ?? -1) ?
                                                (<i className="fa-solid fa-heart"></i>)
                                                :
                                                (<i className="fa-solid fa-heart" style={{ color: "#ff0000" }}></i>)
                                            }
                                        </div>
                                    </>)}
                                </div>
                            </div>)
                            )}
                        </div>
                )
                :
                (<p>No Cards Yet</p>)
            }
             </div>
        </div>
    )
}

export default Home;