import React from 'react';
import { Card, CardTitle, CardText, CardBody, CardImg} from 'reactstrap';


    function RenderComment({comments}){
        if(comments!=null){
            const renderComm=comments.map((comments)=>{
            return (
                <ul className="list-unstyled">
                    <li>{comments.comment}</li>
                    <li>-- {comments.author} , {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comments.date)))}</li>
                </ul>
            );
            })
            return(
                <div className="col-12 col-md-5 m-1">
                    <h4>Comments:</h4>
                    {renderComm}
                </div>
            )
        }
        else{
            return (
                <div></div>
            )
        }
    }
    function RenderDishDetail({dish}){
            return(
                <div className="col-12 col-md-5 m-1">
                    <Card>
                        <CardImg top src={dish.image} alt={dish.name} />
                        <CardBody>
                            <CardTitle>{dish.name}</CardTitle>
                            <CardText>{dish.description}</CardText>
                        </CardBody>
                    </Card>
                </div>
            );
    }
    const DishDetail=(props)=> {
        if(props.dish!=null){ 
            return(
                <div className="container">
                    <div className="row">
                        <RenderDishDetail dish={props.dish}/>
                        <RenderComment comments={props.dish.comments}/>
                    </div>
                </div>
            );
        }
        else{
            return(
                <div></div>
            );
        }
        
        return(
            {DishDetail}
        );
    }
export default DishDetail;