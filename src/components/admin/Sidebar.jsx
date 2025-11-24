//import Link
import { Link, useLocation } from "react-router-dom";

//import js cookie
import Cookies from "js-cookie";

//import permissions
import hasAnyPermission from "../../utils/Permissions";

// Import icons (pastikan Anda memiliki library icons yang sesuai)
import {
  FaTachometerAlt,
  FaImages,
  FaUserCircle,
  FaUser,
  FaAngleDown,
  FaGraduationCap,
  FaUniversity,
  FaHandsHelping,
  FaUsers,
  FaHistory,
  FaGlobeAmericas,
  FaIdCard,
  FaShieldAlt,
  FaCog
} from "react-icons/fa";

export default function Sidebar() {
  //assigning location variable
  const location = useLocation();

  //destructuring pathname from location
  const { pathname } = location;

  //Javascript split method to get the name of the path in array
  const activeRoute = pathname.split("/");

  //get data user from cookies
  const user = JSON.parse(Cookies.get("user"));

  // Menu configuration untuk modularitas
  const menuSections = [
    {
      id: "dashboard",
      heading: "",
      items: [
        {
          name: "Dashboard",
          path: "/admin/dashboard",
          icon: <FaTachometerAlt className="sb-nav-link-icon" />,
          permission: null
        }
      ]
    },
    {
      id: "media",
      heading: "MEDIA MANAGEMENT",
      items: [
        {
          name: "Media",
          path: "#",
          icon: <FaImages className="sb-nav-link-icon" />,
          permission: ["photos.index", "sliders.index"],
          children: [
            {
              name: "Sliders",
              path: "/admin/sliders",
              permission: ["sliders.index"]
            }
          ]
        }
      ]
    },
    {
      id: "users",
      heading: "USERS MANAGEMENT",
      items: [
        {
          name: "Users Management",
          path: "#",
          icon: <FaUserCircle className="sb-nav-link-icon" />,
          permission: ["roles.index", "permissions.index", "users.create"],
          children: [
            {
              name: "Roles",
              path: "/admin/roles",
              permission: ["roles.index"],
              icon: <FaShieldAlt className="me-2" size={14} />
            },
            {
              name: "Permissions",
              path: "/admin/permissions",
              permission: ["permissions.index"],
              icon: <FaCog className="me-2" size={14} />
            },
            {
              name: "Users",
              path: "/admin/users",
              permission: ["users.index"],
              icon: <FaUsers className="me-2" size={14} />
            }
          ]
        }
      ]
    },
    {
      id: "mahasiswa",
      heading: "DASHBOARD MAHASISWA",
      items: [
        {
          name: "Kategori Beasiswa",
          path: "/admin/mahasiswa",
          icon: <FaGraduationCap className="sb-nav-link-icon" />,
          permission: ["mahasiswa.index"]
        },
        {
          name: "Riwayat Pendaftar",
          path: "/admin/riwayat",
          icon: <FaHistory className="sb-nav-link-icon" />,
          permission: ["mahasiswa.index"]
        }
      ]
    },
    {
      id: "dispora",
      heading: "ADMIN DISPORA",
      items: [
        {
          name: "Beasiswa Akademik",
          path: "/admin/adminAkademik",
          icon: <FaUniversity className="sb-nav-link-icon" />,
          permission: ["dispora.index"]
        },
        {
          name: "Non Akademik",
          path: "/admin/adminNonAkademik",
          icon: <FaUser className="sb-nav-link-icon" />,
          permission: ["dispora.index"]
        },
        {
          name: "Beasiswa Luar Negeri",
          path: "/admin/adminLuarNegeri",
          icon: <FaGlobeAmericas className="sb-nav-link-icon" />,
          permission: ["dispora.index"]
        }
      ]
    },
    {
      id: "kesra",
      heading: "ADMIN KESRA",
      items: [
        {
          name: "Kesra A",
          path: "/admin/adminKesra",
          icon: <FaHandsHelping className="sb-nav-link-icon" />,
          permission: ["adminkesra.index"]
        },
        {
          name: "Kesra B",
          path: "/admin/adminKesraB",
          icon: <FaHandsHelping className="sb-nav-link-icon" />,
          permission: ["adminkesra.index"]
        },
        {
          name: "Kesra C",
          path: "/admin/adminKesraC",
          icon: <FaHandsHelping className="sb-nav-link-icon" />,
          permission: ["adminkesra.index"]
        },
        {
          name: "Kesra D",
          path: "/admin/adminKesraD",
          icon: <FaHandsHelping className="sb-nav-link-icon" />,
          permission: ["adminkesra.index"]
        }
      ]
    },
    {
      id: "dispenduk",
      heading: "ADMIN DISPENDUK",
      items: [
        {
          name: "Data Pendaftar",
          path: "/admin/adminDispenduk",
          icon: <FaIdCard className="sb-nav-link-icon" />,
          permission: ["dispenduk.index"]
        },
        {
          name: "Akademik",
          path: "/admin/adminDispendukAkademik",
          icon: <FaUniversity className="sb-nav-link-icon" />,
          permission: ["dispenduk.index"]
        },
        {
          name: "Non Akademik",
          path: "/admin/adminDispendukNonAkademik",
          icon: <FaUser className="sb-nav-link-icon" />,
          permission: ["dispenduk.index"]
        },
        {
          name: "Luar Negeri",
          path: "/admin/adminDispendukLuarNegeri",
          icon: <FaGlobeAmericas className="sb-nav-link-icon" />,
          permission: ["dispenduk.index"]
        },
        {
          name: "Beasiswa Kesra",
          path: "/admin/adminDispendukKesra",
          icon: <FaHandsHelping className="sb-nav-link-icon" />,
          permission: ["dispenduk.index"]
        },
        {
          name: "Beasiswa Dinsos",
          path: "/admin/adminDispendukDinsos",
          icon: <FaUsers className="sb-nav-link-icon" />,
          permission: ["dispenduk.index"]
        }
      ]
    },
    {
      id: "dinsos",
      heading: "ADMIN DINSOS",
      items: [
        {
          name: "Beasiswa Dinsos",
          path: "/admin/adminDinsos",
          icon: <FaUsers className="sb-nav-link-icon" />,
          permission: ["admindinsos.index"]
        },
        {
          name: "Beasiswa Yatim Piatu",
          path: "/admin/adminYatim",
          icon: <FaUsers className="sb-nav-link-icon" />,
          permission: ["yatim.index"]
        },
        {
          name: "Beasiswa Verifikasi Yatim Piatu",
          path: "/admin/verifYatim",
          icon: <FaUsers className="sb-nav-link-icon" />,
          permission: ["verifyatim.index"]
        }
      ]
    },
  ];

  const isActive = (path) => {
    return activeRoute[2] === path.split("/")[2] ? "nav-link active-sidebar" : "nav-link";
  };

  const shouldShowSection = (section) => {
    return section.items.some(item =>
      item.permission === null ||
      (Array.isArray(item.permission) && hasAnyPermission(item.permission))
    );
  };

  const renderMenuItem = (item, index) => {
    if (item.permission && !hasAnyPermission(item.permission)) {
      return null;
    }

    if (item.children) {
      const isCollapsedActive = item.children.some(child =>
        activeRoute[2] === child.path.split("/")[2]
      );

      return (
        <div key={index}>
          <a
            className={`nav-link collapsed ${isCollapsedActive ? "active-sidebar" : ""}`}
            href="#"
            data-bs-toggle="collapse"
            data-bs-target={`#collapse${item.name.replace(/\s+/g, '')}`}
            aria-expanded={isCollapsedActive}
            aria-controls={`collapse${item.name.replace(/\s+/g, '')}`}
          >
            {item.icon}
            {item.name}
            <div className="sb-sidenav-collapse-arrow">
              <FaAngleDown className="text-muted" />
            </div>
          </a>
          <div
            className={`collapse ${isCollapsedActive ? "show" : ""}`}
            id={`collapse${item.name.replace(/\s+/g, '')}`}
            aria-labelledby="headingOne"
            data-bs-parent="#sidenavAccordion"
          >
            <nav className="sb-sidenav-menu-nested nav">
              {item.children.map((child, childIndex) =>
                child.permission && hasAnyPermission(child.permission) && (
                  <Link
                    key={childIndex}
                    className={isActive(child.path)}
                    to={child.path}
                  >
                    {child.icon}
                    {child.name}
                  </Link>
                )
              )}
            </nav>
          </div>
        </div>
      );
    }

    return (
      <Link
        key={index}
        className={isActive(item.path)}
        to={item.path}
      >
        {item.icon}
        {item.name}
      </Link>
    );
  };

  return (
    <nav className="sb-sidenav accordion sb-sidenav-dark sb-sidenav-custom" id="sidenavAccordion">
      {/* Container dengan scroll */}
      <div className="sb-sidenav-container">
        <div className="sb-sidenav-menu">
          <div className="nav">
            <div className="sb-sidenav-menu-heading"></div>

            {menuSections.map((section, index) =>
              shouldShowSection(section) && (
                <div key={index}>
                  {section.heading && (
                    <div className="sb-sidenav-menu-heading">
                      <span className="heading-text">{section.heading}</span>
                    </div>
                  )}
                  {section.items.map((item, itemIndex) => renderMenuItem(item, itemIndex))}
                </div>
              )
            )}
          </div>
        </div>
      </div>

      <style>
        {`
          /* Container untuk scroll */
          .sb-sidenav-container {
            height: 100vh;
            display: flex;
            flex-direction: column;
          }

          .sb-sidenav-menu {
            flex: 1;
            overflow-y: auto;
            overflow-x: hidden;
          }

          /* Custom scrollbar untuk sidebar */
          .sb-sidenav-menu::-webkit-scrollbar {
            width: 6px;
          }

          .sb-sidenav-menu::-webkit-scrollbar-track {
            background: rgba(255, 255, 255, 0.1);
            border-radius: 3px;
          }

          .sb-sidenav-menu::-webkit-scrollbar-thumb {
            background: rgba(255, 255, 255, 0.3);
            border-radius: 3px;
          }

          .sb-sidenav-menu::-webkit-scrollbar-thumb:hover {
            background: rgba(255, 255, 255, 0.5);
          }

          /* Untuk Firefox */
          .sb-sidenav-menu {
            scrollbar-width: thin;
            scrollbar-color: rgba(255, 255, 255, 0.3) rgba(255, 255, 255, 0.1);
          }

          /* Smooth scrolling */
          .sb-sidenav-menu {
            scroll-behavior: smooth;
          }

          /* Pastikan konten tidak terpotong */
          .sb-sidenav-menu .nav {
            min-height: min-content;
          }

          @keyframes dropdownSlideDown {
            from {
              opacity: 0;
              transform: translateY(-5px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          .dropdown-menu {
            animation: dropdownSlideDown 0.3s ease;
          }

          .arrow-wrapper i {
            transition: all 0.3s ease;
          }

          .nav-link:hover .arrow-wrapper i {
            opacity: 1;
          }

          /* Smooth transitions for all interactive elements */
          .nav-link, .dropdown-item, .btn {
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          }

          /* Hover effect for dropdown items */
          .dropdown-item:hover {
            transform: translateX(5px);
          }

          /* Arrow animation */
          .fa-caret-down {
            transform-origin: center;
          }

          /* Bouncing effect for sidebar toggle */
          @keyframes bounce {
            0%, 20%, 60%, 100% {
              transform: translateY(0);
            }
            40% {
              transform: translateY(-3px);
            }
            80% {
              transform: translateY(-1px);
            }
          }

          .btn:active {
            animation: bounce 0.5s;
          }

          /* Ensure dropdown appears below navbar */
          .nav-item.dropdown {
            position: relative;
          }

          .dropdown-menu {
            position: absolute;
            top: 100%;
            right: 0;
          }
        `}
      </style>
    </nav>
  );
}