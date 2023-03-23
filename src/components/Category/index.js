const Category = ({nombre, cantidad, foto}) => {
    return(
        <div className="col-lg-4 col-md-6 pb-1">
            <div className="cat-item d-flex flex-column border mb-4" style={{padding: "30px"}}>
                <div className="row">
                    <h5 className="font-weight-semi-bold m-0 text-left col-md-6">{nombre}</h5>
                    <p className="text-right col-md-6">{cantidad} productos</p>
                </div>
                <a href="" className="cat-img position-relative overflow-hidden mb-3">
                    <img className="img-fluid" src={foto} alt=""></img>
                </a>                
            </div>
        </div>
    )
}

export default Category