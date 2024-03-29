import React from 'react';
import { Card, CardTitle, CardText, CardBody, CardImg,  Breadcrumb, BreadcrumbItem, Button, Modal, ModalHeader, ModalBody, Label, Row} from 'reactstrap';
import { Link } from 'react-router-dom';
import { Component} from 'react';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import {FadeTransform, Fade, Stagger} from 'react-animation-components';
const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

    class CommentForm extends Component{
        constructor(props){
            super(props);
            this.state={
                isModalOpen:false
            }
            this.handleSubmit = this.handleSubmit.bind(this);
            this.toggleModal=this.toggleModal.bind(this);
        }
        toggleModal(){
            this.setState({
                isModalOpen: !this.state.isModalOpen
            });
        }
        handleSubmit(values) {
            this.toggleModal();
            this.props.postComment(this.props.dishId, values.rating, values.author, values.message);
        }
        render(){
            return (
                <div className="mt-5">
                    <Button outline onClick={this.toggleModal}><span className="fa fa-pencil fa-lg"></span> Submit Comment</Button>
                    <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                        <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                        <ModalBody>
                            <LocalForm onSubmit={(values)=>this.handleSubmit(values)}>
                                <div className="container">
                                    <Row className="form-group">
                                        <Label htmlFor="rating" >Rating</Label>
                                        <Control.select model=".rating" name="rating"
                                            className="form-control" defaultValue="1">
                                            <option></option>
                                            <option id="1">1</option>
                                            <option>2</option>
                                            <option>3</option>
                                            <option>4</option>
                                            <option>5</option>
                                        </Control.select>
                                </Row>
                                <Row className="form-group">
                                    <Label htmlFor="author" >Your Name</Label>
                                        <Control.text model=".author" id="author" name="author"
                                            placeholder="Your name"
                                            className="form-control"
                                            validators={{
                                                required, minLength: minLength(3), maxLength: maxLength(15)
                                            }}
                                        />
                                        <Errors
                                            className="text-danger"
                                            model=".author"
                                            show="touched"
                                            messages={{
                                                required: 'Required',
                                                minLength: 'Must be greater than 2 characters',
                                                maxLength: 'Must be 15 characters or less'
                                            }}
                                        />
                                    </Row>
                                    <Row className="form-group">
                                        <Label htmlFor="message" >Comment</Label>
                                        <Control.textarea model=".message" id="message" name="message"
                                            rows="10"
                                            className="form-control"
                                        />
                                    </Row>
                                <Row className="form-group">
                                    <Button type="submit"value="submit" color="primary">
                                        Submit
                                    </Button>
                                </Row>
                            </div>
                            </LocalForm>
                                
                        </ModalBody>
                    </Modal>
                </div>
                
            )
        }
    }
    function RenderComment({comments, postComment, dishId}){
        if(comments!=null){
            return(
                <div className="col-12 col-md-5 m-1">
                    <h4>Comments:</h4>
                        <Stagger in>
                            {comments.map((comments)=>{
                                return (
                                    <Fade in>
                                        <ul className="list-unstyled">
                                            <li>{comments.comment}</li>
                                            <li>-- {comments.author} , {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comments.date)))}</li>
                                        </ul>
                                    </Fade>
                                );
                            })}
                        </Stagger>
                    <CommentForm dishId={dishId} postComment={postComment}/>
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
                    <FadeTransform
                        in
                        transformProps={{
                            exitTransform: 'scale(0.5) translateY(-50%)'
                        }}>
                            <Card>
                                <CardImg top src={baseUrl+dish.image} alt={dish.name} />
                                <CardBody>
                                    <CardTitle>{dish.name}</CardTitle>
                                    <CardText>{dish.description}</CardText>
                                </CardBody>
                            </Card>
                    </FadeTransform>
                </div>
            );
    }
    const DishDetail=(props)=> {
        if (props.isLoading) {
            return(
                <div className="container">
                    <div className="row">            
                        <Loading />
                    </div>
                </div>
            );
        }
        else if (props.errMess) {
            return(
                <div className="container">
                    <div className="row">            
                        <h4>{props.errMess}</h4>
                    </div>
                </div>
            );
        }
        else if(props.dish!=null){ 
            return(
                <div className="container">
                    <div className="row">
                        <Breadcrumb>
                            <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                            <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                        </Breadcrumb>
                    </div>
                    <div className="row">
                        <RenderDishDetail dish={props.dish}/>
                        <RenderComment comments={props.comments}
                            postComment={props.postComment}
                            dishId={props.dish.id}/>
                    </div>
                </div>
            );
        }
        else{
            return(
                <div></div>
            );
        }
    }
export default DishDetail;
