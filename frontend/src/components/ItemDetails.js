const ItemDetails = ({ item }) => {

    return(
        <div className="item-details">
            <h4>{item.name}</h4>
            <p><strong> Load (kg): </strong>{item.count}</p>
            <p><strong> Count (kg): </strong>{item.variation}</p>
            <p>{item.createdAt}</p>

        </div>
    )
}

export default ItemDetails