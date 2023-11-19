import {useState} from "react"

const ItemForm = () => {
    const[title, setTitle] = useState('')
    const[stock, setStock] = useState('')
    const[description, setDescription] = useState('')
    const[error, setError] = useState('null')

    const handleSubmit = async (e) => {
        e.preventDefault()

        const item = {title, stock, description}

        const response = await fetch('/api/items', {
            method: 'POST',
            body: JSON.stringify(item),
            headers:{
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json()

        if (!response.ok) {
            setError(json.error)
        }
        if (response.ok) {
            setTitle('')
            setStock('')
            setDescription('')
            setError(null)
            console.log('new item added', json)
        }
    }
    return(
        <form className="create" onSubmit={handleSubmit}>
            <h3> Add a New Item </h3>

            <label>Item Name:</label>
            <input
                type="text"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
            />

            <label>Stock:</label>
            <input
                type="number"
                onChange={(e) => setStock(e.target.value)}
                value={stock}
            />
            <label>Description:</label>
            <input
                type="text"
                onChange={(e) => setDescription(e.target.value)}
                value={description}
            />
            <button> Add Item </button>
            {error && <div className="error">{error}</div>}

            


        </form>

    )
}

export default ItemForm