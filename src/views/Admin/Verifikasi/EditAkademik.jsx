//import layout
import { Link } from "react-router-dom";
import LayoutAdmin from "../../../layouts/Admin";

export default function EditAkademik() {
  return (
    <LayoutAdmin>
      <main>
        <div className="container-fluid mb-5 mt-5">
          <div className="row">
            <div className="col-md-12">
              <Link
                to="/admin/adminAkademik"
                className="btn btn-md btn-primary border-0 shadow-sm mb-3"
                type="button"
              >
                <i className="fa fa-long-arrow-alt-left me-2"></i> Back
              </Link>
              <h1>Halaman Edit Akademik</h1>
            </div>
          </div>
        </div>
      </main>
    </LayoutAdmin>
  );
}
