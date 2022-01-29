import React, { Component} from 'react';
import DishDetail from './DishdetailComponent';
import { Card, CardTitle, CardImgOverlay, CardText, CardBody, CardImg} from 'reactstrap';

class Menu extends Component{
    constructor(props){
        super(props);
        this.state = {

        };
    }
    onDishSelect(dish) {
        this.setState({ selectedDish: dish});
    }

    renderDish(dish) {
            return(
                <DishDetail dish={dish}/>
            );
        }

    render(){
        const menu=this.props.dishes.map((dish)=>{
            return (
                <div className="col-12 col-sm-5 m-1">
                    <Card key={dish.id}
                        onClick={() => this.onDishSelect(dish)}>
                        <CardImg width="100%" src={dish.image} alt={dish.name}/>
                        <CardImgOverlay>
                            <CardTitle>{dish.name}</CardTitle>
                        </CardImgOverlay>
                    </Card>
                </div>
            );
        });
        return (
            <div className="container">
                <div className="row">
                    {menu}
                </div>
                {this.renderDish(this.state.selectedDish)} 
            </div>
        );       
    }
}
export default Menu;
