//import react
import { useState, useEffect } from "react";

//import react router dom
import { Link, useNavigate, useParams } from "react-router-dom";

//import layout
import LayoutAdmin from "../../../layouts/Admin";

//import api
import Api from "../../../services/Api";

//import js cookie
import Cookies from "js-cookie";

//import toast
import toast from "react-hot-toast";
import Loading from "../../../components/general/Loading";
import Akademik from "../../../components/admin/Akademik";

export default function EditAkademik() {
  //title page
  document.title = "Detail Akademik - Beasiswa";

  //navigata
  const navigate = useNavigate();

  //get ID from parameter URL
  const { id } = useParams();

  //token from cookies
  const token = Cookies.get("token");

  const [dataAkademik, setDataAkademik] = useState({
    name: "",
    nik: "",
    kartuKeluarga: "",
    noHp: "",
    email: "",
    alamat: "",
    rt: "",
    rw: "",
    imageKtp: "",
    imageKartuKeluarga: "",
    imageAktifkampus: "",
    imageSuratpernyataan: "",
    imageAkrekampus: "",
    imageSuratBeasiswa: "",
  });

  const [isLoading, setLoading] = useState(false);

  const fetchDataAkademiks = async () => {
    setLoading(true);
    await Api.get(`/api/admin/akademiks/${id}`, {
      headers: {
        //header Bearer + Token
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      //set response data to state
      setDataAkademik(response.data.data.user);
      console.log(response.data.data.user);
      setTimeout(() => {
        setLoading(false);
      }, 500);
    });
  };

  //useEffect
  useEffect(() => {
    //call function "fetchDataPost"
    fetchDataAkademiks();
  }, []);

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
              {isLoading ? (
                <div className="mt-5">
                  <Loading />
                </div>
              ) : (
                <>
                  <Akademik
                    name={dataAkademik.name}
                    nik={dataAkademik.nik}
                    kartuKeluarga={dataAkademik.nokk}
                    noHp={dataAkademik.nohp}
                    email={dataAkademik.email}
                    alamat={dataAkademik.alamat}
                    rt={dataAkademik.rt}
                    rw={dataAkademik.rw}
                  />
                </>
              )}
            </div>
          </div>
        </div>
      </main>
    </LayoutAdmin>
  );
}
