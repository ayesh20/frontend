export default function ProductCard(props){

    return(
        <div className="bg-blue-800 align-middle" >

            <h1>{props.name}</h1>
            <p>{props.price}</p>
            <button>view moreo   </button>
        </div>
    )
}