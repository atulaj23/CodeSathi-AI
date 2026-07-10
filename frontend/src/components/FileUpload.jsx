import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";

export default function FileUpload() {

  const onDrop = useCallback(async (acceptedFiles) => {

    const formData = new FormData();

    formData.append("file", acceptedFiles[0]);

    try {

      const res = await axios.post(
        "http://127.0.0.1:5000/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      localStorage.setItem("uploadedFile", res.data.path);

alert("Uploaded Successfully");

    } catch (err) {

      alert("Upload Failed");

    }

  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
  });

  return (

    <div
      {...getRootProps()}
      style={{
        border: "2px dashed #4f46e5",
        padding: "30px",
        borderRadius: "15px",
        textAlign: "center",
        cursor: "pointer",
        margin: "20px",
      }}
    >

      <input {...getInputProps()} />

      <h3>📎 Drag & Drop File Here</h3>

      <p>or click to upload</p>

    </div>

  );

}