//import Link
import { Link, useLocation } from "react-router-dom";

//import js cookie
import Cookies from "js-cookie";

//import permissions
import hasAnyPermission from "../../utils/Permissions";

export default function sidebar() {
  //assigning location variable
  const location = useLocation();

  //destructuring pathname from location
  const { pathname } = location;

  //Javascript split method to get the name of the path in array
  const activeRoute = pathname.split("/");

  //get data user from cookies
  const user = JSON.parse(Cookies.get("user"));

  return (
    <nav className="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
      <div className="sb-sidenav-menu">
        <div className="nav">
          <div className="sb-sidenav-menu-heading"></div>

          <Link
            className={
              activeRoute[2] === "dashboard"
                ? "nav-link active-sidebar"
                : "nav-link"
            }
            to="/admin/dashboard"
          >
            <div className="sb-nav-link-icon">
              <i className="fas fa-tachometer-alt"></i>
            </div>
            Dashboard
          </Link>

          {(hasAnyPermission(["photos.index"]) ||
            hasAnyPermission(["sliders.index"])) && (
            <>
              <div className="sb-sidenav-menu-heading">MEDIA MANAGEMENT</div>
              <a
                className={
                  "nav-link collapsed " +
                  (activeRoute[2] === "photos"
                    ? " active-sidebar"
                    : activeRoute[2] === "sliders"
                      ? " active-sidebar"
                      : "")
                }
                href="#"
                data-bs-toggle="collapse"
                data-bs-target="#collapseMedias"
                aria-expanded="false"
                aria-controls="collapseMedias"
              >
                <div className="sb-nav-link-icon">
                  <i className="fas fa-images"></i>
                </div>
                Media
                <div className="sb-sidenav-collapse-arrow">
                  <i
                    className="fas fa-angle-down"
                    style={{ color: "color: rgb(65 60 60)" }}
                  ></i>
                </div>
              </a>
            </>
          )}
          <div
            className={
              "collapse " +
              (activeRoute[2] === "photos"
                ? " show"
                : activeRoute[2] === "sliders"
                  ? " show"
                  : "")
            }
            id="collapseMedias"
            aria-labelledby="headingOne"
            data-bs-parent="#sidenavAccordion"
          >
            <nav className="sb-sidenav-menu-nested nav">
              {hasAnyPermission(["sliders.index"]) && (
                <Link
                  className={
                    activeRoute[2] === "sliders"
                      ? "nav-link active-sidebar"
                      : "nav-link"
                  }
                  to="/admin/sliders"
                >
                  Sliders
                </Link>
              )}
            </nav>
          </div>

          {(hasAnyPermission(["roles.index"]) ||
            hasAnyPermission(["permissions.index"]) ||
            hasAnyPermission(["users.index"])) && (
            <>
              <div className="sb-sidenav-menu-heading">USERS MANAGEMENT</div>
              <a
                className={
                  "nav-link collapsed " +
                  (activeRoute[2] === "roles"
                    ? " active-sidebar"
                    : activeRoute[2] === "permissions"
                      ? " active-sidebar"
                      : activeRoute[2] === "users"
                        ? " active-sidebar"
                        : "")
                }
                href="#"
                data-bs-toggle="collapse"
                data-bs-target="#collapseUsers"
                aria-expanded="false"
                aria-controls="collapseUsers"
              >
                <div className="sb-nav-link-icon">
                  <i className="fas fa-user-circle"></i>
                </div>
                Users
                <div className="sb-sidenav-collapse-arrow">
                  <i
                    className="fas fa-angle-down"
                    style={{ color: "color: rgb(65 60 60)" }}
                  ></i>
                </div>
              </a>
            </>
          )}
          <div
            className={
              "collapse " +
              (activeRoute[2] === "roles"
                ? " show"
                : activeRoute[2] === "permissions"
                  ? " show"
                  : activeRoute[2] === "users"
                    ? " show"
                    : "")
            }
            id="collapseUsers"
            aria-labelledby="headingOne"
            data-bs-parent="#sidenavAccordion"
          >
            <nav className="sb-sidenav-menu-nested nav">
              {hasAnyPermission(["roles.index"]) && (
                <Link
                  className={
                    activeRoute[2] === "roles"
                      ? "nav-link active-sidebar"
                      : "nav-link"
                  }
                  to="/admin/roles"
                >
                  Roles
                </Link>
              )}

              {hasAnyPermission(["permissions.index"]) && (
                <Link
                  className={
                    activeRoute[2] === "permissions"
                      ? "nav-link active-sidebar"
                      : "nav-link"
                  }
                  to="/admin/permissions"
                >
                  Permissions
                </Link>
              )}

              {hasAnyPermission(["users.index"]) && (
                <Link
                  className={
                    activeRoute[2] === "users"
                      ? "nav-link active-sidebar"
                      : "nav-link"
                  }
                  to="/admin/users"
                >
                  Users
                </Link>
              )}
            </nav>
          </div>

          {hasAnyPermission(["mahasiswa.index"]) && (
            <>
              <div className="sb-sidenav-menu-heading">Dashboard Mahasiswa</div>
              <Link
                className={
                  activeRoute[2] === "mahasiswa"
                    ? "nav-link active-sidebar"
                    : "nav-link"
                }
                to="/admin/mahasiswa"
              >
                <div className="sb-nav-link-icon">
                  <i className="fas fa-user"></i>
                </div>
                Kategori Beasiswa
              </Link>
              <Link
                className={
                  activeRoute[2] === "riwayat"
                    ? "nav-link active-sidebar"
                    : "nav-link"
                }
                to="/admin/riwayat"
              >
                <div className="sb-nav-link-icon">
                  <i className="fas fa-user"></i>
                </div>
                Riwayat Pendaftar
              </Link>
            </>
          )}

          {/* admin verifikasi */}
          {hasAnyPermission(["dispora.index"]) && (
            <>
              <div className="sb-sidenav-menu-heading">Admin Dispora</div>
              <Link
                className={
                  activeRoute[2] === "adminAkademik"
                    ? "nav-link active-sidebar"
                    : "nav-link"
                }
                to="/admin/adminAkademik"
              >
                <div className="sb-nav-link-icon">
                  <i className="fas fa-user"></i>
                </div>
                Beasiswa Akademik
              </Link>
              <Link
                className={
                  activeRoute[2] === "adminNonAkademik"
                    ? "nav-link active-sidebar"
                    : "nav-link"
                }
                to="/admin/adminNonAkademik"
              >
                <div className="sb-nav-link-icon">
                  <i className="fas fa-user"></i>
                </div>
                 Non Akademik
              </Link>
              <Link
                className={
                  activeRoute[2] === "adminLuarNegeri"
                    ? "nav-link active-sidebar"
                    : "nav-link"
                }
                to="/admin/adminLuarNegeri"
              >
                <div className="sb-nav-link-icon">
                  <i className="fas fa-user"></i>
                </div>
                Beasiswa Luar Negeri
              </Link>
            </>
          )}
        </div>
      </div>
      <div className="sb-sidenav-footer">
        <div className="small">Logged in as:</div>
        {user.email}
      </div>
    </nav>
  );
}
