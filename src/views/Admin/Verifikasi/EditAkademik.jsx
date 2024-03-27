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

export default function EditAkademik() {
  //title page
  document.title = "Detail Akademik - Beasiswa";

  //navigata
  const navigate = useNavigate();

  //get ID from parameter URL
  const { id } = useParams();

  //token from cookies
  const token = Cookies.get("token");

  const [name, setName] = useState("");
  const [nik, setNik] = useState("");
  const [kartuKeluarga, setKartuKeluarga] = useState("");
  const [noHp, setNoHp] = useState("");
  const [email, setEmail] = useState("");
  const [alamat, setAlamat] = useState("");
  const [rt, setRt] = useState("");
  const [rw, setRw] = useState("");
  const [imageKtp, setImageKtp] = useState("");
  const [imageKartuKeluarga, setImageKartuKeluarga] = useState("");
  const [imageAktifkampus, setImageAktifkampus] = useState("");
  const [imageSuratpernyataan, setImageSuratpernyataan] = useState("");
  const [imageAkrekampus, setImageAkrekampus] = useState("");
  const [imageSuratBeasiswa, setImageSuratBeasiswa] = useState("");

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
      setName(response.data.data.user.name);
      setNik(response.data.data.user.nik);
      setKartuKeluarga(response.data.data.user.nokk);
      setNoHp(response.data.data.user.nohp);
      setEmail(response.data.data.user.email);
      setAlamat(response.data.data.user.alamat);
      setRt(response.data.data.user.rt);
      setRw(response.data.data.user.rw);
      setImageKtp(response.data.data.user.imagektp);
      setImageKartuKeluarga(response.data.data.user.imagekk);
      setImageAktifkampus(response.data.data.user.imageaktifkampus);
      setImageSuratpernyataan(response.data.data.user.imagesuratpernyataan);
      setImageAkrekampus(response.data.data.user.imageakrekampus);
      setImageSuratBeasiswa(response.data.data.user.imagesuratbeasiswa);
      console.log(response.data.data);
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
                  <h1>Halaman Edit Akademik</h1>
                </>
              )}
            </div>
          </div>
        </div>
      </main>
    </LayoutAdmin>
  );
}
