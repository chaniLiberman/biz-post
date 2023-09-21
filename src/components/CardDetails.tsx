import { FunctionComponent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Card from "../interfaces/Card";
import { getCardDetails } from "../services/cardsService";
import { number, string } from "yup";

interface CardDetailsProps {
    cards: Card[];
    setCards: Function;
}

const CardDetails: FunctionComponent<CardDetailsProps> = ({ cards, setCards }) => {
    let { id } = useParams();
   
    let [cardDetails, setCardDetails] = useState<Card>();
    useEffect(() => {
        if (id === undefined) {return;} 
        getCardDetails(id)
            .then((res) => {
                    setCardDetails(res.data)
                }
            )
            .catch((err) => console.log(err))
    }, []);
    return (
        <>
        <div className="container col-md-6 mt-5">
        <div className="card mb-3 p-3" style={{width: "650px"}}>
            <div className="row g-0">
              <div className="col-md-4">
                <img src={cardDetails?.imageUrl} className="img-fluid rounded-start w-100" alt={cardDetails?.imageAlt}/>
              </div>
         <div className="col-md-8">
           <div className="card-body">
           <h5 className="text-center">{cardDetails?.title}</h5>
           <h3 className="card-text text-center"><small className="text-muted">{cardDetails?.subTitle}</small></h3>
           <h6 className="card-text text-center">{cardDetails?.description}</h6>
           <p className="text-center" ><a href={cardDetails?.web} target="_blank" rel="noopener noreferrer">
            {cardDetails?.web}
           </a></p>  
         </div>
    </div>
  </div>
  <h5 className="text-center"> Details of the business owner</h5>
<div className="d-flex flex-column flex-sm-row justify-content-between py-2 my-2 border-top p-5">
                           <div>
                        <p><i className="fa-solid fa-phone"></i> Phone: {cardDetails?.phone}</p>
                        <p><i className="fa-regular fa-envelope"></i> Email: {cardDetails?.email}</p>
                        <p><i className="fa-solid fa-earth-americas"></i> Country: {cardDetails?.country}</p>
                        </div>

                        <div>
                        <p><i className="fa-solid fa-tree-city"></i> City: {cardDetails?.city}</p>
                        <p><i className="fa-regular fa-building"></i> Street: {cardDetails?.street}</p>
                        <p><i className="fa-solid fa-house-chimney-crack"></i> House number: {cardDetails?.houseNumber}</p>
                        </div>
                    </div>
                    
        </div>
        </div>
        </>
    )
}

export default CardDetails;