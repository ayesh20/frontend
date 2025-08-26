import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { BiEdit, BiPlus, BiTrash } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../../components/loader";
import Paginator from "../../components/paginator";

export default function UserPageAdmin() {
	const [Users, setUsers] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [loading, setLoading] = useState(true);
	const [page, setPage] = useState(1);
	const [totalPages, setTotalPages] = useState(0);
	const [limit, setLimit] = useState(10);

	// const [a,setA] = useState(0);
	useEffect(() => {
  if (isLoading) {
    axios
      .get(import.meta.env.VITE_BACKEND_URL + "/api/users/" + page + "/" + limit, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setUsers(res.data.users);
        setTotalPages(res.data.totalPages);
        setLoading(false);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching users:", err);
      });
  }
}, [isLoading, loading, page, limit]);


	const navigate = useNavigate();

	return (
		<div className="w-full h-full border-[3px]">
			{isLoading ? (
				<Loader/>
			) : (
				<table>
					<thead>
						<tr>
							<th className="p-[10px]">First Name</th>
							<th className="p-[10px]">Last name</th>
							<th className="p-[10px]">Email</th>
							<th className="p-[10px]">Phone</th>
							<th className="p-[10px]">Role</th>
							<th className="p-[10px]">Actions</th>
						</tr>
					</thead>

					<tbody>
						{Users.map((user, index) => {
							return (
								<tr key={index}>
									
									<td className="p-[10px]">{user.firstName}</td>
									<td className="p-[10px]">{user.lastNname}</td>
									<td className="p-[10px]">{user.email}</td>
									<td className="p-[10px]">{user.phone}</td>
									<td className="p-[10px]">{user.role}</td>
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
															"/api/users/" +
															user.email,
														{
															headers: {
																Authorization: `Bearer ${token}`,
															},
														}
													)
													.then((res) => {
														
														toast.success("user deleted successfully");
														setIsLoading(!isLoading);
													})
													.catch((error) => {
														console.error("Error deleting product:", error);
														toast.error("Failed to delete product");
													});
											}}
										/>

									</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			)}
			
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