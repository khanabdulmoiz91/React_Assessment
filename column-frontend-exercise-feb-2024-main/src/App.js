import React, { useEffect, useState } from "react";
import "./App.css";
import { db } from "./db"; // Import this line to use the Firestore database connection
import { collection, getDocs, query, where, addDoc } from "firebase/firestore";
import { Timestamp } from "firebase/firestore";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { Calendar } from "primereact/calendar";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import 'primeicons/primeicons.css';

function App() {
  const [notices, setNotices] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchDate, setSearchDate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [displayDialog, setDisplayDialog] = useState(false);
  const [displayNoticeDialog, setDisplayNoticeDialog] = useState(false);
  const [selectedNotice, setSelectedNotice] = useState(null); // Track selected notice for view

  const [newNotice, setNewNotice] = useState({
    title: "",
    publicationDate: "",
    content: "",
  });

  useEffect(() => {
    fetchNotices();
  }, [searchTerm, searchDate]);

  const fetchNotices = async () => {
    setLoading(true);
    setError(null);
    try {
      let queryNotices = collection(db, "notices");

      if (searchTerm || searchDate) {
        queryNotices = query(
          collection(db, "notices"),
          where("title", ">=", searchTerm),
          where("title", "<=", searchTerm + "\uf8ff")
        );

        if (searchDate) {
          const startOfDate = new Date(searchDate);
          startOfDate.setHours(0, 0, 0, 0);
  
          const endOfDate = new Date(searchDate);
          endOfDate.setHours(23, 59, 59, 999);
  
          queryNotices = query(
            queryNotices,
            where("publicationDate", ">=", startOfDate),
            where("publicationDate", "<=", endOfDate)
          );
        }
      }

      const noticesSnapshot = await getDocs(queryNotices);

      const noticesData = noticesSnapshot.docs.map((doc) => {
        const data = doc.data();
        // Convert timestamp fields to JavaScript Date objects
        const publicationDate =
          data.publicationDate instanceof Timestamp
            ? data.publicationDate.toDate()
            : data.publicationDate;
        return { id: doc.id, ...data, publicationDate };
      });
      noticesData.sort(
        (a, b) => new Date(b.publicationDate) - new Date(a.publicationDate)
      );
      setNotices(noticesData);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleDateChange = (event) => {
    setSearchDate(event.value);
  };

  const handleNoticeAdd = async () => {
    try {
      const docRef = await addDoc(collection(db, "notices"), newNotice);
      console.log("Notice added with ID: ", docRef.id);

      setNewNotice({ title: "", publicationDate: "", content: "" });

      setDisplayDialog(false);

      fetchNotices();
    } catch (error) {
      console.error("Error adding notice: ", error);
    }
  };

  const renderHeader = () => {
    return (
      <div className="flex justify-content-between">
        <div className="p-input-icon-left">
          <i className="pi pi-search" />
          <InputText
            value={searchTerm}
            onChange={handleSearchChange}
            style={{ marginRight: "10px" }}
            placeholder="Search by title..."
          />
          <Calendar
            value={searchDate}
            onChange={handleDateChange}
            placeholder="Search by publication..."
            dateFormat="yy-mm-dd"
          />
        </div>
        <div className="p-input-icon-right">
          <Button
            label="Add Notice"
            icon="pi pi-plus"
            className="p-button-primary"
            onClick={() => setDisplayDialog(true)}
          />
        </div>
      </div>
    );
  };

  const header = renderHeader();

  // Function to handle view button click
  const handleView = (notice) => {
    setSelectedNotice(notice);
    setDisplayNoticeDialog(true);
  };

  return (
    <div style={{ padding: "25px" }}>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <div className="datatable-responsive">
          <DataTable
            value={notices}
            paginator
            rows={10}
            rowsPerPageOptions={[5, 10, 20]}
            header={header}
          >
            <Column field="title" header="Title" />
            <Column
              field="publicationDate"
              header="Publication Date"
              style={{ width: "165px" }}
              body={(rowData) =>
                new Date(rowData.publicationDate).toLocaleDateString()
              }
            />
            <Column field="content" header="Content" />
            <Column style={{ color: "white" }}
                    body={(rowData) => (
                      <Button icon="pi pi-eye" onClick={() => handleView(rowData)} />
                    )}
                  />
          </DataTable>
        </div>
      )}
      
      <Dialog
        header="Notice Details"
        visible={displayNoticeDialog}
        className="notice-dialog"
        style={{ width: "50vw" }}
        onHide={() => setDisplayNoticeDialog(false)}
        closeIconClassName="custom-close-icon"
      >
        {selectedNotice && (
          <div className="p-grid p-fluid">
            <div className="p-col-12">
              <h3>{selectedNotice.title}</h3>
            </div>
            <div className="p-col-12">
              <p><strong>Publication Date:</strong> {new Date(selectedNotice.publicationDate).toLocaleDateString()}</p>
            </div>
            <div className="p-col-12">
              <p><strong>Content:</strong> {selectedNotice.content}</p>
            </div>
          </div>
        )}
      </Dialog>
      <Dialog
        header="Add Notice"
        visible={displayDialog}
        className="notice-dialog"
        style={{ width: "50vw" }}
        onHide={() => setDisplayDialog(false)}
        closeIconClassName="custom-close-icon"
      >
        <div className="p-grid p-fluid">
          <div className="p-col-12">
            <span className="p-float-label">
              <InputText
                id="title"
                value={newNotice.title}
                onChange={(e) =>
                  setNewNotice({ ...newNotice, title: e.target.value })
                }
              />
              <label htmlFor="title">Title</label>
            </span>
          </div>
          <div className="p-col-12">
            <span className="p-float-label">
              <Calendar
                id="publicationDate"
                value={newNotice.publicationDate}
                onChange={(e) =>
                  setNewNotice({ ...newNotice, publicationDate: e.value })
                }
                dateFormat="yy-mm-dd"
              />
              <label htmlFor="publicationDate">Publication Date</label>
            </span>
          </div>
          <div className="p-col-12">
            <span className="p-float-label">
              <InputText
                id="content"
                value={newNotice.content}
                onChange={(e) =>
                  setNewNotice({ ...newNotice, content: e.target.value })
                }
              />
              <label htmlFor="content">Content</label>
            </span>
          </div>
        </div>
        <div className="p-dialog-footer">
          <Button
            label="Cancel"
            className="p-button-text"
            onClick={() => setDisplayDialog(false)}
          />
          <Button
            label="Add"
            icon="pi pi-check"
            className="p-button-primary"
            onClick={handleNoticeAdd}
          />
        </div>
      </Dialog>
    </div>
  );
}

export default App;
