const ItemDetails = ({ item }) => {

    return(
        <div className="item-details">
            <h4>{item.title}</h4>
            <p><strong> Load (kg): </strong>{item.load}</p>
            <p><strong> Count (kg): </strong>{item.count}</p>
            <p>{item.createdAt}</p>

        </div>
    )
}

export default ItemDetails