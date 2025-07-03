import React, { useState, useRef } from "react";
import "./contactUsForm.css";

const ContactUsForm = () => {
  const [fileCount, setFileCount] = useState(0);
  const [dragActive, setDragActive] = useState(false);
  const [selectOpen, setSelectOpen] = useState(false);
  const fileInputRef = useRef(null);
  const maxFiles = 10;

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(e.target.files);
    }
  };

  const handleFiles = (files) => {
    const newCount = Math.min(fileCount + files.length, maxFiles);
    setFileCount(newCount);
    
    console.log("Files to process:", files);
  };
  const onBrowseClick = () => {
    fileInputRef.current.click();
  };
  const handleSelectFocus = () => {
    setSelectOpen(true);
  };

  const handleSelectBlur = () => {
    
    setTimeout(() => {
      setSelectOpen(false);
    }, 100);
  };

  const handleSelectChange = () => {
    
    setTimeout(() => {
      setSelectOpen(false);
    }, 150);
  };

  return (
    <div className="contactUsForm">
      <div className="contactUsFormContainer">
        <div className="contactUsFormContainerDiv">
          <div className="contactUsFormContainerDivOne">
            <div className="contactUsFormContainerDivOneContainer">
              <div className="contactUsFormContainerDivOneContainerOne">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="contactUsFormContainerDivOneContainerOneInput"
                />
              </div>

              <div className="contactUsFormContainerDivOneContainerTwo">
                <input
                  type="text"
                  placeholder="Email"
                  className="contactUsFormContainerDivOneContainerTwoInput"
                />
              </div>
            </div>
          </div>{" "}
          <div className="contactUsFormContainerDivTwo">
            <div
              className={`contactUsFormContainerDivTwoContainer ${selectOpen ? "select-open" : ""}`}
            >
              {" "}
              <select
                name="enquiryType"
                id="enquiryType"
                defaultValue=""
                onFocus={handleSelectFocus}
                onBlur={handleSelectBlur}
                onChange={handleSelectChange}
              >
                <option value="" disabled>
                  Enquiry Type
                </option>
                <option value="collaboration">Creative Collaboration</option>
                <option value="wholesale">Wholesale Inquiry</option>
                <option value="press">Press & Media</option>
                <option value="partnership">Brand Partnership</option>
                <option value="general">General Inquiry</option>
              </select>
            </div>
          </div>
          <div className="contactUsFormContainerDivThree">
            <div className="contactUsFormContainerDivThreeContainer">
              <input
                type="text"
                placeholder="Your Subject"
                className="contactUsFormContainerDivThreeContainerInput"
              />
            </div>
          </div>
          <div className="contactUsFormContainerDivFour">
            <div className="contactUsFormContainerDivFourContainer">
              <textarea
                placeholder="Your Message"
                className="contactUsFormContainerDivFourContainerTextArea"
              ></textarea>
            </div>
          </div>{" "}
          <div
            className={`contactUsFormContainerDivFive ${dragActive ? "drag-active" : ""}`}
            onDragEnter={handleDrag}
            onDragOver={handleDrag}
            onDragLeave={handleDrag}
            onDrop={handleDrop}
          >
            <div className="contactUsFormContainerDivFiveElements">
              <p className="contactUsFormContainerDivFiveElementsTextOne nunito-sans-regular">
                DRAG &amp; DROP FILES HERE
              </p>
              <p className="contactUsFormContainerDivFiveElementsTextTwo nunito-sans-regular">
                or
              </p>
              <p
                className="contactUsFormContainerDivFiveElementsTextThree nunito-sans-regular"
                onClick={onBrowseClick}
              >
                Browse Files
              </p>
            </div>

            <span className="file-counter">
              {fileCount} of {maxFiles}
            </span>
            <input
              type="file"
              multiple
              ref={fileInputRef}
              onChange={handleChange}
              style={{ display: "none" }}
            />
          </div>
          <div className="contactUsFormContainerDivSix">
            <div className="contactUsFormContainerDivSixContainer">
              <div className="contactUsFormContainerDivSixContainerButton">
                <div className="contactUsFormContainerDivSixContainerButtonContainer">
                  <p className="contactUsFormContainerDivSixContainerButtonContainerText">
                    Submit
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUsForm;
