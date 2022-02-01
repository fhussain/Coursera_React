import React, { Component} from 'react';
import { Card, CardTitle, CardText, CardBody, CardImg} from 'reactstrap';

class DishDetail extends Component{
    constructor(props){
        super(props);
    }
    renderComment(comments){
        if(comments!=null){
            const renderComm=comments.map((comments)=>{
                return (
                    <div>
                        <ul className="list-unstyled">
                            <li>{comments.comment}</li>
                            <li>-- {comments.author} , {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comments.date)))}</li>
                        </ul>
                    </div>
                );
            });
            return renderComm;
        }
        else{
            return (
                <div></div>
            )
        }
    }
    renderDishDetail(dish){
        if(dish!=null){
            return(
                <div className="container">
                    <div className="row">
                        <div className="col-12 col-md-5 m-1">
                            <Card>
                                <CardImg top src={this.props.dish.image} alt={this.props.dish.name} />
                                <CardBody>
                                    <CardTitle>{this.props.dish.name}</CardTitle>
                                    <CardText>{this.props.dish.description}</CardText>
                                </CardBody>
                            </Card>
                        </div>
                        <div className="col-12 col-md-5 m-1">
                            <h4>Comments</h4>
                            {this.renderComment(this.props.dish.comments)};
                        </div>
                    </div>
                </div>
                )
        }
        else{
            return(
                <div></div>
            )
        }
    }
    render(){
        return(
            this.renderDishDetail(this.props.dish)
        );
    }
}
export default DishDetail;