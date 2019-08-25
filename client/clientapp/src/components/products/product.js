import React, { Component } from "react";
import { connect } from "react-redux";
import { setName, setPrice } from "../../actions/actionProducts";
class Products extends Component {
  changeName = () => {
    console.log("I am work");
    this.props.setName("MacbookPro");
    this.props.setPrice(200);
  };
  render() {
    return (
      <div>
        Here Will create a products....!
        <button onClick={this.changeName}>Change Name</button>
        <p>
          {" "}
          Produc name is : {this.props.product.productName} and price is :
          {this.props.product.price}
        </p>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    math: state.reducerMath,
    product: state.reducerProducts
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setName: name => {
      dispatch(setName(name));
    },
    setPrice: price => {
      dispatch(setPrice(price));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Products);
