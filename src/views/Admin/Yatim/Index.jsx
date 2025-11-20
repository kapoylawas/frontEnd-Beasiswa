import { useEffect, useState } from "react";
import LayoutAdmin from "../../../layouts/Admin";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Api from "../../../services/Api";

export default function YatimIndex() {
    document.title = "Yatim - Beasiswa Sidoarjo";

    return (
        <LayoutAdmin>
            <div className="container-fluid mb-5 mt-5">

            </div>
        </LayoutAdmin>
    )
}