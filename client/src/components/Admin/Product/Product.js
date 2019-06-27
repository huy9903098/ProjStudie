import React, { Component } from 'react';
import '../Admin.css';
import { connect } from 'react-redux';
import { getproduct, editproduct, buyproduct, addtocart } from '../../../action/products';
import isEmpty from '../../../validation/is-empty';
import PropTypes from 'prop-types';
import classnames from 'classnames';

class AdminItem extends Component {
    constructor(){
        super();
        this.state={
            name:'',
            price:'',
            discount:'',
            brand:'',
            type:'',
            description:'',
            country:'',
            image:'',
            tag:'',
            stocks:'',
            errors:{}
        }
        this.onChange = this.onChange.bind(this);
        
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    componentWillMount() {
        this.props.getproduct(this.props.match.params.id);
    }

    componentWillReceiveProps(nextProps){
        if (nextProps.product.product) {
            const product = nextProps.product.product[0];
            // If product field doesnt exist, make empty string
            product.name = !isEmpty(product.name) ? product.name : '';
            product.brand = !isEmpty(product.brand) ? product.brand : '';
            product.type = !isEmpty(product.type) ? product.type : '';
            product.country = !isEmpty(product.country) ? product.country : '';
            product.description = !isEmpty(product.description) ? product.description : '';
            product.discount = !isEmpty(product.discount) ? product.discount : null;
            product.image = !isEmpty(product.image) ? product.image : null;
            product.price = !isEmpty(product.price)  ? product.price : null;
            product.tag = !isEmpty(product.tag) ? product.tag : '';
            product.stocks = !isEmpty(product.stocks) ? product.stocks : 0;

            this.setState({
                name: product.name,
                brand: product.brand,
                type: product.type,
                country: product.country,
                description: product.description,
                discount: product.discount*100,
                image: product.image,
                price: product.price,
                tag: product.tag,
                stocks: product.stocks
            })


        }
    }

    editproduct(id){
        
        const productdata = {
            name: this.state.name,
            brand:this.state.brand,
            type: this.state.type,
            country: this.state.country,
            description: this.state.description,
            discount: (this.state.discount === 0) ? null : this.state.discount / 100 ,
            image: this.state.image,
            price: this.state.price,
            tag: this.state.tag,
            stocks: this.state.stocks
        }
        this.props.editproduct(productdata,id);

    }
    render() {
        const product = this.props.product.product;
        const {errors} = this.state;
        if(product === null){
            return <h1>Loading</h1>
        }else{
            return <div className="admin-container">
                <div className="edit-item-style">
                    <div className="imgdisplay">
                        <img src={this.state.image} alt=""  style={{width: 300}}/>
                    </div>
                    <div>
                        <span>Name</span>
                        <p><input type="text" className={classnames('form-control form-control-lg', {
                            'is-invalid': errors.name
                        })} placeholder='name' name='name' onChange={this.onChange} value={this.state.name} />
                            {errors.name && (
                                <div className="invalid-feedback">{errors.name}</div>
                            )} </p>
                        <span>Brand</span>
                        <p><input type="text" className={classnames('form-control form-control-lg', {
                            'is-invalid': errors.brand
                        })} name='brand' placeholder='brand' onChange={this.onChange} value={this.state.brand} />
                            {errors.brand && (
                                <div className="invalid-feedback">{errors.brand}</div>
                            )} </p>
                        <span>Type</span>
                        <p><input type="text" className='form-control form-control-lg' name='type' placeholder='type' onChange={this.onChange} value={this.state.type} /> </p>
                        <span>Description</span>
                        <p><textarea style={{ height: '250px' }} className='form-control form-control-lg' type="text" placeholder='description' name='description' onChange={this.onChange} value={this.state.description} /> </p>

                    </div>
                    <div>
                        <span>Country</span>
                        <p><input type="text" className='form-control form-control-lg' placeholder='country' name='country' onChange={this.onChange} value={this.state.country} /> </p>
                        <span>Discount</span>
                        <p><input type="number" min='0' className='form-control form-control-lg' style={{ display: 'inline-block' }} placeholder='discount(%)' name='discount' onChange={this.onChange} value={this.state.discount} />%</p>
                        <span>Price</span>
                        <p><input type="text" min='0' className={classnames('form-control form-control-lg', {
                            'is-invalid': errors.price
                        })} placeholder='price' name='price' onChange={this.onChange} value={this.state.price} />
                            {errors.name && (
                                <div className="invalid-feedback">{errors.name}</div>
                            )} </p>
                        <span>Tag</span>
                        <p>
                            <select id="lang" className={classnames('form-control form-control-lg', {
                                'is-invalid': errors.tag
                            })} name='tag' onChange={this.onChange} value={this.state.tag}>
                                <option value="equipment">equipment</option>
                                <option value="accessories">accessories</option>
                                <option value="clothing">clothing</option>

                            </select>

                            {errors.tag && (
                                <div className="invalid-feedback">{errors.tag}</div>
                            )}  </p>
                        <span>Stocks</span>
                        <p><input type="number" className={classnames('form-control form-control-lg', {
                            'is-invalid': errors.stocks
                        })} placeholder='stocks' name='stocks' onChange={this.onChange} value={this.state.stocks} />
                            {errors.stocks && (
                                <div className="invalid-feedback">{errors.stocks}</div>
                            )} </p>
                        <span>Image url</span>
                        <p><input type="text" className={classnames('form-control form-control-lg', {
                            'is-invalid': errors.image
                        })} placeholder='image' name='image' onChange={this.onChange} value={this.state.image} />
                            {errors.image && (
                                <div className="invalid-feedback">{errors.image}</div>
                            )} </p>
                        <button onClick={() =>this.editproduct(this.props.match.params.id)}>APPLY</button>
                    </div>
                </div>
            </div>
        }
        
        
    }
}

AdminItem.propTypes = {
    product: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    product: state.product,
    cart: state.cart
});

export default connect(
    mapStateToProps,
    { getproduct, buyproduct, addtocart, editproduct }
)(AdminItem);