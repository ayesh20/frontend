import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { BiPlus, BiTrash } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";

const sampleProducts = [
	{
		productId: "COSM001",
		name: "Hydrating Face Cream",
		altNames: ["Moisturizer", "Face Lotion"],
		labelledPrice: 2999,
		price: 2499,
		images: ["/images/face-cream.jpg"],
		description:
			"A rich hydrating cream that provides all-day moisture and a healthy glow.",
		stock: 120,
		isAvailable: true,
		category: "cosmatics",
	},
	{
		productId: "COSM002",
		name: "Matte Lipstick - Crimson Red",
		altNames: ["Red Lipstick", "Matte Lip"],
		labelledPrice: 1799,
		price: 1499,
		images: ["/images/lipstick-red.jpg"],
		description: "Long-lasting matte lipstick in a bold crimson red shade.",
		stock: 75,
		isAvailable: true,
		category: "cosmatics",
	},
	{
		productId: "COSM003",
		name: "Volumizing Mascara",
		altNames: ["Lash Booster", "Black Mascara"],
		labelledPrice: 2299,
		price: 1999,
		images: ["/images/mascara.jpg"],
		description: "Enhance your lashes with our waterproof volumizing mascara.",
		stock: 90,
		isAvailable: true,
		category: "cosmatics",
	},
	{
		productId: "COSM004",
		name: "Nude Eyeshadow Palette",
		altNames: ["Eyeshadow", "Eye Palette"],
		labelledPrice: 3999,
		price: 3599,
		images: ["/images/eyeshadow-nude.jpg"],
		description:
			"A 12-shade palette with blendable nude tones for any occasion.",
		stock: 60,
		isAvailable: true,
		category: "cosmatics",
	},
	{
		productId: "COSM005",
		name: "Refreshing Facial Toner",
		altNames: ["Toner", "Face Mist"],
		labelledPrice: 1599,
		price: 1399,
		images: ["/images/facial-toner.jpg"],
		description: "Alcohol-free toner to refresh and balance your skin's pH.",
		stock: 100,
		isAvailable: true,
		category: "cosmatics",
	},
];

export default function ProductsAdminPage() {
    const [products,setProducts] = useState(sampleProducts)
    const [a,setA] = useState(0);
    useEffect(
        ()=>{
            axios.get(import.meta.env.VITE_BACKEND_URL+"/api/products").then(
                (res)=>{
                    setProducts(res.data)
                }
            )
        },
        [a]
    )
    const navigate = useNavigate()

	return (
		<div className="w-full h-full border-[3px]">
			<table>
                <thead>

                    <tr>
                        <th className="p-[10px]">Image</th>
                        <th className="p-[10px]">Product ID</th>
                        <th className="p-[10px]">Name</th>
                        <th className="p-[10px]">Price</th>
                        <th className="p-[10px]">Labelled Price</th>
                        <th className="p-[10px]">Category</th>
                        <th className="p-[10px]">Stock</th>
                        <th className="p-[10px]">Actions</th>
                    </tr>

                </thead>

                <tbody>
                    {
                        products.map(
                            (product,index)=>{
                                return(
                                    <tr key={index}>
                                        <td>
                                            <img src={product.images[0]} alt={product.name} className="w-[50px] h-[50px]" />
                                        </td>
                                        <td className="p-[10px]">{product.productId}</td>
                                        <td className="p-[10px]">{product.name}</td>
                                        <td className="p-[10px]">{product.price}</td>
                                        <td className="p-[10px]">{product.labelledPrice}</td>
                                        <td className="p-[10px]">{product.category}</td>
                                        <td className="p-[10px]">{product.stock}</td>
                                        <td className="p-[10px]">
                                            <BiTrash className="bg-red-500 p-[7px] text-3xl rounded-full text-white shadow-2xl shadow-black cursor-pointer" onClick={
                                                ()=>{
                                                    const token = localStorage.getItem("token");
                                                    if(token == null){
                                                        navigate("/login");
                                                        return;
                                                    }
                                                    axios.delete(import.meta.env.VITE_BACKEND_URL + "/api/products/" + product.productId, 
                                                        {
                                                            headers:{
                                                                Authorization: `Bearer ${token}`
                                                            }
                                                        }
                                                    ).then(
                                                        (res)=>{
                                                            console.log("Product deleted successfully");
                                                            console.log(res.data);
                                                            toast.success("Product deleted successfully");
                                                            setA(a+1);
                                                        }
                                                    ).catch(
                                                        (error)=>{
                                                            console.error("Error deleting product:", error);
                                                            toast.error("Failed to delete product");
                                                        }
                                                    )
                                                }
                                            }/>
                                        </td>
                                    </tr>
                                )
                            }
                        )
                    }
                </tbody>
            </table>
			<Link
				to={"/admin/newProduct"}
				className="fixed right-[60px] bottom-[60px] p-[20px] text-white bg-black rounded-full shadow-2xl"
			>
				<BiPlus className="text-3xl" />
			</Link>
		</div>
	);
}