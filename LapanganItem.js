import React from 'react';

export default class LapanganItem extends React.Component {

    constructor() {
        
        let auth = localStorage.getItem("Token")
        if (!auth)
        window.location = "/login"
    }

    bind = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    addToCart = (lapangan) => {
        let oldItems = JSON.parse(localStorage.getItem('cart')) || []
        let newid = lapangan.id
        let match = oldItems.find(({ id }) => id === newid);
        if (match)
        {
                match['qty'] += parseInt(this.state.quantity);
                match['total'] = match['total'] + (lapangan.harga * parseInt(this.state.quantity));
        }
        else
        {
            let newItem = {
                'id': lapangan.id,
                'nama': lapangan.name,
                'harga': lapangan.price,
            };
            oldItems.push(newItem);
        }
        localStorage.setItem('cart', JSON.stringify(oldItems));
        alert("Barang dimasukkan ke keranjang");
      }

      render(){
        const { lapangan } = this.props;
        return (
            <div className="col-lg-4 col-md-6 mb-4">
            <div className="card h-100" style={{ marginBottom: "10px"}}>
                <a href="#"><img className="card-img-top" src={'http://localhost/lapangan/public/images/' + lapangan.image} alt="" /></a>
                    <div className="card-body">
                        <h4 className="card-title">
                            <a href="#">{lapangan.name}</a>
                        </h4>
                        <h5>Rp. {lapangan.price}</h5>
                        {/* <p className="card-text">{item.description}</p> */}
                        <span className="card-text">
                            <small>Stock: </small>{lapangan.stock}
                        </span>
                        { lapangan.stock > 0 ?
                        <div>
                        <button className="btn btn-sm btn-warning" 
                            onClick={() =>this.addToCart(lapangan)}>Add to cart</button>
                        <input type="number" value={this.state.quantity} name="quantity" 
                            onChange={this.bind} className="float-right" 
                            style={{ width: "60px", marginRight: "10px", borderRadius: "3px"}}/>
                        </div> : 
                            <p className="text-danger"> lapangan is full </p>
                        }
                </div>
            </div>
            </div>
       )
    }

}

