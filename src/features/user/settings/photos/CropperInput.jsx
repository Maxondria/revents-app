import React, { useRef } from "react";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";

const CropperInput = ({ setImage, imagePreview }) => {
  const cropper = useRef(null);

  const cropImage = () => {
    if (typeof cropper.current.getCroppedCanvas() === "undefined") {
      return;
    }

    cropper.current
      .getCroppedCanvas()
      .toBlob(blob => setImage(blob), "image/jpeg");
  };

  return (
    <Cropper
      ref={cropper}
      src={imagePreview}
      style={{ height: 200, width: "100%" }}
      preview='.img-preview'
      dragMode='move'
      scalable={true}
      cropBoxMovable={true}
      cropBoxResizable={true}
      aspectRatio={1}
      viewMode={1}
      guides={false}
      crop={cropImage}
    />
  );
};

export default CropperInput;
