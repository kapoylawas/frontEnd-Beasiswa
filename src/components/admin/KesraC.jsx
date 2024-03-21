import React from "react";

const KesraC = ({ imagesertifikat, nama_organisasi, alamat_organisasi }) => {
  return (
    <>
      <div className="row mt-1 mb-2">
        <div className="col-md-12">
          <div className="card border-0 rounded shadow-sm border-top-success">
            <div className="card-header text-dark">
              Kesra Form C
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-bordered table-striped text-dark">
                  <tbody>
                    <tr>
                      <td
                        style={{ width: "15%" }}
                        className="fw-bold text-center"
                      >
                        Nama Organisasi
                      </td>
                      <td className="fw-bold text-center">{nama_organisasi}</td>
                    </tr>
                    <tr>
                      <td
                        style={{ width: "15%" }}
                        className="fw-bold text-center"
                      >
                        Alamat Organisasi
                      </td>
                      <td className="fw-bold text-center">{alamat_organisasi}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row mt-1">
        <div className="col-md-12">
          <div className="card border-0 rounded shadow-sm border-top-success">
            <div className="card-header text-dark">Document Terupload</div>
            <div className="card-body">
              <div className="row justify-content-center">
                <div className="col-md-12">
                  <div className="card rounded">
                    <div className="text-center">File</div>
                    <iframe
                      src={imagesertifikat}
                      title="Embedded Content"
                      className="embed-responsive-item"
                      height="500"
                      allowFullScreen
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default KesraC;
