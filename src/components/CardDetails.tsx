import { FunctionComponent } from "react";
import { useParams } from "react-router-dom";
import Card from "../interfaces/Card";

interface CardDetailsProps {
    cards: Card[];
    setCards: Function;
}

const CardDetails: FunctionComponent<CardDetailsProps> = ({ cards, setCards }) => {
    let { id } = useParams();
    let findId: Card | undefined = cards.find(
        (c) => c.id == Number(id)
    )
    return (
        <>
        <div className="container col-md-6 mt-5">
        <div className="card mb-3 p-3" style={{width: "650px"}}>
            <div className="row g-0">
              <div className="col-md-4">
                <img src={findId?.imageUrl} className="img-fluid rounded-start w-100" alt={findId?.imageAlt}/>
              </div>
         <div className="col-md-8">
           <div className="card-body">
           <h5 className="text-center">{findId?.title}</h5>
           <h3 className="card-text text-center"><small className="text-muted">{findId?.subTitle}</small></h3>
           <h6 className="card-text text-center">{findId?.description}</h6>
           <p className="text-center" ><a href={findId?.web} target="_blank" rel="noopener noreferrer">
            {findId?.web}
           </a></p>  
         </div>
    </div>
  </div>
  <h5 className="text-center"> Details of the business owner</h5>
<div className="d-flex flex-column flex-sm-row justify-content-between py-2 my-2 border-top p-5">
                           <div>
                        <p><i className="fa-solid fa-phone"></i> Phone: {findId?.phone}</p>
                        <p><i className="fa-regular fa-envelope"></i> Email: {findId?.email}</p>
                        <p><i className="fa-solid fa-earth-americas"></i> Country: {findId?.country}</p>
                        </div>

                        <div>
                        <p><i className="fa-solid fa-tree-city"></i> City: {findId?.city}</p>
                        <p><i className="fa-regular fa-building"></i> Street: {findId?.street}</p>
                        <p><i className="fa-solid fa-house-chimney-crack"></i> House number: {findId?.houseNumber}</p>
                        </div>
                    </div>
                    
        </div>
        </div>
        </>
    )
}

export default CardDetails;