import axios from "axios"
import { useEffect, useState } from "react"
import Loader from "../../components/loader"
import ProductCard from "../../components/productCard"
import Paginator from "../../components/paginator"

export default function ProductsPage(){

    const [products,setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [query, setQuery] = useState("");
    
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [limit, setLimit] = useState(10);

    useEffect(
        ()=>{
            if(loading){
              if (query == "") { 
                axios.get(import.meta.env.VITE_BACKEND_URL + "/api/products" + "/" + page + "/" + limit)
                .then(
                    (res)=>{
                        
                        setProducts(res.data.products)
                        setLoading(false)
                        setTotalPages(res.data.totalPages);
					   
                    }
                )
            }else{
                axios.get(import.meta.env.VITE_BACKEND_URL + "/api/products/search/" + query)
                .then(
                    (res)=>{
                        setProducts(res.data.products)
                        setLoading(false)
                        setTotalPages(1);
                    }
                )
            }
            }},
        [loading,page, limit]
    )


    return(
        <div className="w-full h-full ">

<div className="w-full h-[100px] flex justify-center items-center">
                <input
                    type="text"
                    placeholder="Search products..."
                    value={query}
                    onChange={(e) => {
                        setQuery(e.target.value);
                        setLoading(true);
                    }}
                    className="w-[400px] h-[40px] border border-gray-300 rounded-lg p-2"
                />
            </div>


            {
                loading? <Loader/> :
                <div className="w-full  flex flex-wrap gap-[40px] justify-center items-center p-[20px]">
                    {
                        products.map(
                            (product)=>{
                                return(
                                    <ProductCard key={product.productId} product={product}/>
                                )
                            }
                        )
                    }
                </div>
            }

              {/* //{ currentPage , totalPages, setCurrentPage , limit , setLimit} */}
                    <Paginator
                        currentPage={page}
                        totalPages={totalPages}
                        setCurrentPage={setPage}
                        limit={limit}
                        setLimit={setLimit}
                        setLoading={setLoading}
                    />
        </div>
      
    )
}