import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { BiEdit, BiPlus, BiTrash } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../../components/loader";
import Paginator from "../../components/paginator";

export default function ProductsAdminPage() {
	const [products, setProducts] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [loading, setLoading] = useState(true);
	const [page, setPage] = useState(1);
	const [totalPages, setTotalPages] = useState(0);
	const [limit, setLimit] = useState(10);

	// const [a,setA] = useState(0);
	useEffect(() => {
		if (isLoading) {
			axios
				.get(import.meta.env.VITE_BACKEND_URL + "/api/products" + "/" + page + "/" + limit)
				.then((res) => {
					setProducts(res.data.products);
					setTotalPages(res.data.totalPages);
					setLoading(false);
					setIsLoading(false);
				});
		}
	}, [isLoading,loading, page, limit]);

	const navigate = useNavigate();

	return (
		<div className="w-full h-full border-[3px]">
			{isLoading ? (
				<Loader/>
			) : (
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
						{products.map((product, index) => {
							return (
								<tr key={index}>
									<td>
										<img
											src={product.images[0]}
											alt={product.name}
											className="w-[50px] h-[50px]"
										/>
									</td>
									<td className="p-[10px]">{product.productId}</td>
									<td className="p-[10px]">{product.name}</td>
									<td className="p-[10px]">{product.price}</td>
									<td className="p-[10px]">{product.labelledPrice}</td>
									<td className="p-[10px]">{product.category}</td>
									<td className="p-[10px]">{product.stock}</td>
									<td className="p-[10px] flex flex-row justify-center items-center">
										<BiTrash
											className="bg-red-500 p-[7px] text-3xl rounded-full text-white shadow-2xl shadow-black cursor-pointer"
											onClick={() => {
												const token = localStorage.getItem("token");
												if (token == null) {
													navigate("/login");
													return;
												}
												axios
													.delete(
														import.meta.env.VITE_BACKEND_URL +
															"/api/products/" +
															product.productId,
														{
															headers: {
																Authorization: `Bearer ${token}`,
															},
														}
													)
													.then((res) => {
														console.log("Product deleted successfully");
														console.log(res.data);
														toast.success("Product deleted successfully");
														setIsLoading(!isLoading);
													})
													.catch((error) => {
														console.error("Error deleting product:", error);
														toast.error("Failed to delete product");
													});
											}}
										/>

										<BiEdit
											onClick={() => {
												navigate("/admin/updateproduct", {
													state: product,
												});
											}}
											className="bg-blue-500 p-[7px] text-3xl rounded-full text-white shadow-2xl shadow-black cursor-pointer ml-[10px] "
										/>
									</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			)}
			<Link
				to={"/admin/newProduct"}
				className="fixed right-[60px] bottom-[60px] p-[20px] text-white bg-black rounded-full shadow-2xl"
			>
				<BiPlus className="text-3xl" />
			</Link>
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
	);
}