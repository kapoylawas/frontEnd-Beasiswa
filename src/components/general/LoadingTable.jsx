import React from "react";

export default function LoadingTable() {
  return (
    <>
      <div className="text-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
      <div className="text-center mt-2"></div>
    </>
  );
}