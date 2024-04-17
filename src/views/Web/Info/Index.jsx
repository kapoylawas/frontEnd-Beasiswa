//import layout
import LayoutWeb from "../../../layouts/Web";

export default function Info() {
  return (
    <LayoutWeb>
      <div className="container mt-4 mb-3">
        <div className="row">
          <div className="col-md-8 offset-md-2">
            <div className="text-center">
              <h4 className="font-weight-bold text-dark">Informasi Helpdesk Beasiswa</h4>
              <div className="divider-custom mx-auto"></div>
            </div>
            <div className="card-body mt-2"></div>
          </div>
          <div className="col-md-12 mt-5 mb-4">
            <div className="card border-0 shadow-sm rounded-3 text-center text-uppercase">
              <div className="card-body mt-2">
                <h4 className="font-weight-bold text-dark">Kontak Person</h4>
                <hr />
                <h6>
                  <div className="list-group my-3">
                    <ul className="list-group">
                      <li className="list-group-item">
                        <span
                          style={{ fontSize: "1.2rem" }}
                          className="text-dark mt-2"
                        >
                          Heldesk Bagian Disporapar: Hp.0896-3032-4926, Hp.0812-3594-9497
                        </span>
                      </li>
                      <li className="list-group-item">
                        <span
                          style={{ fontSize: "1.2rem" }}
                          className="text-dark mt-2"
                        >
                          Heldesk Bagian Kesra: Munib Saiful, Hp.081234278662
                        </span>
                      </li>
                      <li className="list-group-item">
                        <span
                          style={{ fontSize: "1.2rem" }}
                          className="text-dark mt-2"
                        >
                          Helpdesk Dinsos, Hp.0857-1140-4090
                        </span>
                      </li>
                      <li className="list-group-item">
                        <span
                          style={{ fontSize: "1.2rem" }}
                          className="text-dark mt-2"
                        >
                          Mengisi form dan mengunggah file persyaratan melalui :{" "}
                          <a href="https://beasiswa.sidoarjokab.go.id/">
                            https://beasiswa.sidoarjokab.go.id/
                          </a>
                        </span>
                      </li>
                    </ul>
                  </div>
                </h6>
              </div>
            </div>
          </div>
        </div>
      </div>
    </LayoutWeb>
  );
}
