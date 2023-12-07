//import layout
import Cookies from "js-cookie";
import LayoutAdmin from "../../layouts/Admin";
import { useEffect, useState } from "react";
import Api from "../../services/Api";
import { Link } from "react-router-dom";

export default function Dashboard() {
  document.title = "Dashboard - Beasiswa";

  const [users, setUsers] = useState(0);
  console.log(users);

  //token from cookies
  const token = Cookies.get("token");

  //hook useEffect
  useEffect(() => {
    //fetch api
    Api.get("/api/admin/dashboard", {
      //header
      headers: {
        //header Bearer + Token
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      //set data
      setUsers(response.data.data.users);
    });
  }, []);

  return (
    <LayoutAdmin>
      <main>
        <div class="container-fluid px-4 mt-5">
          <div class="row">
            <div class="col-xl-3 col-md-6">
              <div class="card bg-primary text-white mb-4 border-0 shadow-sm">
                <div class="card-body">
                  <strong>{users}</strong> Users
                </div>
                <div class="card-footer d-flex align-items-center justify-content-between">
                  <Link
                    class="small text-white stretched-link"
                    to="/admin/users"
                  >
                    View Details
                  </Link>
                  <div class="small text-white">
                    <i class="fas fa-angle-right"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </LayoutAdmin>
  );
}
