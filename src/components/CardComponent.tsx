import { FunctionComponent, SetStateAction } from "react";
import Card from "../interfaces/Card";
import { addToArrayFav } from "../services/usersService";
import { useNavigate } from "react-router-dom";

interface CardProps {
    card: Card,
    favoriteIds: number[],
    setFavoriteIds: (value: SetStateAction<number[]>) => void,
    userInfo: any
}

const CardComponent: FunctionComponent<CardProps> = ({ card, favoriteIds, setFavoriteIds, userInfo }) => {
    let navigate = useNavigate();

    const toggleFavorite = (card: Card) => {
        if (card.id === undefined) { return; }
        let id = JSON.parse(sessionStorage.getItem("userInfo") as string).id;
        const cardId = card.id;
        if (favoriteIds.includes(card.id)) {
            // remove card from favorites on server
            // update state
        } else {
            addToArrayFav(id, cardId)
                .then((res) => {
                    alert("card added favorite");
                    setFavoriteIds(prev => [...prev, cardId])
                })
                .catch((err) => console.log(err))
        }
    }

    let addToFavorite = (card: Card) => {
        let id = JSON.parse(sessionStorage.getItem("userInfo") as string).id;
        if (card.id === undefined) { return }
        const cardId = card.id;
        addToArrayFav(id, cardId)
            .then((res) => {
                alert("card added favorite");
                setFavoriteIds(prev => [...prev, cardId])
                // setHeartColor(!heartColor);
            })
            .catch((err) => console.log(err))
    }

    return (
        <div key={card.id} className="card col-md-4 mx-2 mt-5"
            style={{ width: "25rem" }}>
            <img src={card.imageUrl} className="card-img-top h-75" onClick={() => navigate(`card-details/${card.id}`)} alt={card.imageAlt} />
            <div className="card-body">
                <h5 className="card-title">{card.title}</h5>
                <p className="card-text">{card.subTitle}</p>
            </div>
            <ul className="list-group list-group-flush">
                <li className="list-group-item">{card.phone}</li>
                <li className="list-group-item">{card.email}</li>
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
        </div>
    )

}

export default CardComponent;