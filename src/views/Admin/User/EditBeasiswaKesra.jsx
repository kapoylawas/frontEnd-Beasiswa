import { useEffect, useState } from "react";
import LayoutAdmin from "../../../layouts/Admin";
import { Link } from "react-router-dom";

export default function EditBeasiswaKesra() {
  return (
    <LayoutAdmin>
      <main>
        <div className="container-fluid mb-5 mt-5">
          <div className="row">
            <div className="col-md-12">
              <Link
                to="/admin/riwayat"
                className="btn btn-md btn-primary border-0 shadow-sm mb-3"
                type="button"
              >
                <i className="fa fa-long-arrow-alt-left me-2"></i> Back
              </Link>
            </div>
          </div>
        </div>
      </main>
    </LayoutAdmin>
  );
}
