//import layout
import { useEffect, useState } from "react";
//import react router dom
import LayoutAdmin from "../../../layouts/Admin";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import Api from "../../../services/Api";
//import js cookie
import Cookies from "js-cookie";

export default function AdminNonAkademik() {
  document.title = "Disporapar - Beasiswa Sidoarjo";

  //navigata
  const navigate = useNavigate();

  return (
    <LayoutAdmin>
      <main>
      <div className="container-fluid px-4 mb-4 mt-4">
          <div className="row">
            <div className="col-md-8">
              <div className="row">
                <div className="col-md-9 col-12 mb-2">
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control border-0 shadow-sm"
                      onChange={(e) => searchData(e)}
                      placeholder="search here..."
                    />
                    <span className="input-group-text border-0 shadow-sm">
                      <i className="fa fa-search"></i>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row mt-1">
            <div className="col-md-12">
              <div className="card border-0 rounded shadow-sm border-top-success">
                <div className="card-body">
                  <div className="table-responsive">
                    <table className="table table-bordered table-centered mb-0 rounded">
                      <thead className="thead-dark">
                        <tr className="border-0">
                          <th className="border-0" style={{ width: "5%" }}>
                            No.
                          </th>
                          <th className="border-0">Nama</th>
                          <th className="border-0">NIK</th>
                          <th className="border-0">No KK</th>
                          <th className="border-0">Nohp</th>
                          <th className="border-0">Email</th>
                          <th className="border-0" style={{ width: "15%" }}>
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        
                      </tbody>
                    </table>
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
