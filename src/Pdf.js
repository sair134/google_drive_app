import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import { useNavigate } from "react-router-dom";
import Spinner from './Spinner';

const Pdf = () => {
  const { id } = useParams();
  const [pdfUrl, setPdfUrl] = useState(null);
  const [error, setError] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    if(pdfUrl) return;
    const fetchPdf = async () => {
      try {
        const response = await fetch(`http://localhost:5000/download/${id}`, {credentials: "include"});
        if (!response.ok) throw new Error("Failed to fetch PDF");
        const blob = await response.blob();
        setPdfUrl(URL.createObjectURL(blob));
      } catch (error) {
        setError('Something went wrong. Please try again')
      }
    };
    if (id) fetchPdf();
  }, [id]);

  return (
    <div style={{ height: "100vh", width: "100%", position: "relative", overflow: "hidden",paddingTop:'40px' }}>
      <button
        onClick={() => navigate(-1)}
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          padding: "8px 12px",
          backgroundColor: "#f44336",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        Close
      </button>
      <h2 style={{ textAlign: "center" }}>PDF Viewer</h2>
      {pdfUrl ? (
        <Worker workerUrl={`https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`}>
          <Viewer fileUrl={pdfUrl} />
        </Worker>
      ) : 
    
         error ? (<p style={{position:'absolute', top:"50%", left:"50%", transform: "translate(-50%, -50%)"}}>{error}</p>) : (<Spinner bg="white" />) 
      }
    </div>
  );
};

export default Pdf;