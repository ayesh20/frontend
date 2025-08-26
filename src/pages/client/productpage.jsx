import axios from "axios"
import { useEffect, useState } from "react"
import Loader from "../../components/loader"
import ProductCard from "../../components/productCard"
import Paginator from "../../components/paginator"

export default function ProductsPage(){

    const [products,setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [limit, setLimit] = useState(10);

    useEffect(
        ()=>{
            if(loading){
                axios.get(import.meta.env.VITE_BACKEND_URL + "/api/products" + "/" + page + "/" + limit)
                .then(
                    (res)=>{
                        
                        setProducts(res.data.products)
                        setLoading(false)
                        setTotalPages(res.data.totalPages);
					   
                    }
                )
            }
        },
        [loading,page, limit]
    )
    return(
        <div className="w-full h-full ">
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