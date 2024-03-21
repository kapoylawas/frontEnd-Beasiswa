import React from "react";

const KesraB = ({ imagesertifikat }) => {
  return (
    <div className="row mt-1">
      <div className="col-md-12">
        <div className="card border-0 rounded shadow-sm border-top-success">
          <div className="card-header text-dark">Document Terupload</div>
          <div className="card-body">
            <div className="row justify-content-center">
              <div className="col-md-12">
                <div className="card rounded">
                  <div className="text-center">
                    File
                  </div>
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
  );
};

export default KesraB;
