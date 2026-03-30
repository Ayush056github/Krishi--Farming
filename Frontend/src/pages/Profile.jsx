// src/pages/Profile.jsx
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { t, getLanguages, getLanguage, setLanguage } from "../i18n.js";

export default function Profile() {
  const navigate = useNavigate();
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    name: "Krishi Sakhi User",
    phone: "+91-XXXXXXXXXX",
    email: "user@example.com",
    location: "Jaipur (Rajasthan), India ",
  });
  const [lang, setLang] = useState(getLanguage());
  const [landRecords, setLandRecords] = useState([]);
  const [aadhaarFiles, setAadhaarFiles] = useState([]);
  const landInputRef = useRef(null);
  const aadhaarInputRef = useRef(null);

  useEffect(() => {
    const saved = localStorage.getItem("profile");
    if (saved) {
      try {
        setForm(JSON.parse(saved));
      } catch {}
    }
  }, []);

  useEffect(() => {
    return () => {
      [...landRecords, ...aadhaarFiles].forEach((file) =>
        URL.revokeObjectURL(file.preview)
      );
    };
  }, [landRecords, aadhaarFiles]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    localStorage.setItem("profile", JSON.stringify(form));
    setEditing(false);
  };

  const handleCancel = () => {
    const saved = localStorage.getItem("profile");
    if (saved) {
      try {
        setForm(JSON.parse(saved));
      } catch {}
    }
    setEditing(false);
  };

  const handleLangChange = (e) => {
    const code = e.target.value;
    setLang(code);
    setLanguage(code);
  };

  const handleFileChange = (e, type) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      const max = type === "land" ? 5 : 1;
      const stateSetter = type === "land" ? setLandRecords : setAadhaarFiles;
      const currentFiles = type === "land" ? landRecords : aadhaarFiles;
      const remaining = max - currentFiles.length;

      if (remaining <= 0) {
        alert(
          `You can only upload ${max} ${
            type === "land" ? "land records" : "Aadhaar card"
          } file(s).`
        );
        return;
      }

      const filesToAdd = files.slice(0, remaining).map((file) =>
        Object.assign(file, { preview: URL.createObjectURL(file) })
      );

      stateSetter((prev) => [...prev, ...filesToAdd]);
      e.target.value = null;
    }
  };

  const handleRemoveFile = (index, type) => {
    if (type === "land")
      setLandRecords((prev) => prev.filter((_, i) => i !== index));
    else setAadhaarFiles((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <main className="page">
      <div className="container profile">
        
        <section className="profile-header">
          <div className="avatar">KS</div>
          <div className="profile-info">
            <h2>{t("profile")}</h2>
            <p className="muted">{t("manageDetails")}</p>
          </div>
          <div style={{ marginLeft: "auto" }}>
            <select value={lang} onChange={handleLangChange} className="input">
              {getLanguages().map((l) => (
                <option key={l.code} value={l.code}>
                  {l.name}
                </option>
              ))}
            </select>
          </div>
        </section>


        <section className="profile-grid">
          <div className="card">
            <h4>{t("account")}</h4>

            {["name", "phone", "email", "location"].map((field) => (
              <div className="row" key={field}>
                <span>{t(field)}</span>
                {editing ? (
                  <input
                    className="input"
                    name={field}
                    value={form[field]}
                    onChange={handleChange}
                  />
                ) : (
                  <strong>{form[field]}</strong>
                )}
              </div>
            ))}

            <div className="actions">
              {editing ? (
                <>
                  <button className="btn primary" onClick={handleSave}>
                    {t("save")}
                  </button>
                  <button className="btn" onClick={handleCancel}>
                    {t("cancel")}
                  </button>
                </>
              ) : (
                <button className="btn" onClick={() => setEditing(true)}>
                  {t("editProfile")}
                </button>
              )}
            </div>
          </div>

      
          <div className="card">
            <h4>{t("documents")}</h4>
            <p className="muted">{t("linkIdentity")}</p>

            <div className="actions">
              <button
                className="btn"
                onClick={() => landInputRef.current.click()}
                disabled={landRecords.length >= 5}
              >
                {t("uploadLand")} ({landRecords.length}/5)
              </button>

              <button
                className="btn"
                onClick={() => aadhaarInputRef.current.click()}
                disabled={aadhaarFiles.length >= 1}
              >
                {t("Upload Aadhaar")}
              </button>

           
              <input
                type="file"
                accept="image/*,.pdf"
                ref={landInputRef}
                style={{ display: "none" }}
                multiple
                onChange={(e) => handleFileChange(e, "land")}
              />
              <input
                type="file"
                accept="image/*,.pdf"
                ref={aadhaarInputRef}
                style={{ display: "none" }}
                onChange={(e) => handleFileChange(e, "aadhaar")}
              />
            </div>

          
            {(landRecords.length > 0 || aadhaarFiles.length > 0) && (
              <div className="preview-grid" style={{ marginTop: "16px" }}>
                {landRecords.map((file, index) => (
                  <div
                    key={index}
                    className="preview-item"
                    style={{ position: "relative" }}
                  >
                    <img
                      src={file.preview}
                      alt={`Land Record ${index + 1}`}
                      style={{
                        width: "100%",
                        height: "80px",
                        objectFit: "cover",
                        borderRadius: "8px",
                      }}
                    />
                    <button
                      onClick={() => handleRemoveFile(index, "land")}
                      className="btn-remove"
                    >
                      X
                    </button>
                  </div>
                ))}
                {aadhaarFiles.map((file, index) => (
                  <div
                    key={`aadhaar-${index}`}
                    className="preview-item"
                    style={{ position: "relative" }}
                  >
                    <img
                      src={file.preview}
                      alt="Aadhaar Card"
                      style={{
                        width: "100%",
                        height: "80px",
                        objectFit: "cover",
                        borderRadius: "8px",
                      }}
                    />
                    <button
                      onClick={() => handleRemoveFile(index, "aadhaar")}
                      className="btn-remove"
                    >
                      X
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          
          <div className="card">
            <h4>{t("preferences")}</h4>
            <div className="row">
              <span>{t("language")}</span>
              <strong>
                {getLanguages().find((x) => x.code === lang)?.name}
              </strong>
            </div>
            <div className="row">
              <span>{t("notifications")}</span>
              <strong>{t("enabled")}</strong>
            </div>
            <div className="actions">
              
              <button className="btn" onClick={() => navigate("/alerts")}>
                {t("manageAlerts")}
              </button>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
