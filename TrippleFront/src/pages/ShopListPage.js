import React, {useState, useEffect} from 'react'


const ShopListPage = () => {

    let [products, setProducts] = useState([])

    useEffect(()=>{
        getProducts()
    }, [])

    let getProducts = async () => {
        let response = await fetch('http://127.0.0.1:8000/api/shop/')
        let data = await response.json()
        console.log(data)
        setProducts(data)
    }

    return(
        <div>
            <div className="products-list">
                {products.map((product, index) => (
                    <h3 key={index}>{product.title}</h3>
                ))}
            </div>
        </div>
    )
}

export default ShopListPage