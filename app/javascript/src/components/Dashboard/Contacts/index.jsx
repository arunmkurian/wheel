import React, { useState, useEffect, useCallback } from "react";
import { PageLoader, Button, Alert, Toastr } from "neetoui";
import { Header, SubHeader } from "neetoui/layouts";
import EmptyState from "components/Common/EmptyState";
import EmptyNotesListImage from "images/EmptyNotesList";
import { contacts as mockContacts } from "common/mock-data";

import ContactTable from "./ContactTable";
import NewContactPane from "./NewContactPane";

const Contacts = () => {
  const [contacts, setContacts] = useState([{}]);
  const [selectedContactIds, setSelectedContactIds] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [showNewContactPane, setShowNewContactPane] = useState(false);

  const fetchContacts = useCallback(() => {
    try {
      setLoading(true);
      setContacts(mockContacts);
    } catch (error) {
      logger.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchContacts();
  }, []);

  if (loading) {
    return <PageLoader />;
  }
  return (
    <>
      <Header
        title="Contacts"
        actionBlock={
          <Button
            onClick={() => {
              setShowNewContactPane(true);
            }}
            label="New Contact"
            icon="ri-add-line"
          />
        }
      />

      {contacts.length ? (
        <>
          <SubHeader
            searchProps={{
              value: searchTerm,
              onChange: e => setSearchTerm(e.target.value),
              clear: () => setSearchTerm(""),
            }}
            deleteButtonProps={{
              onClick: () => setShowDeleteAlert(true),
            }}
            sortProps={{
              options: [
                {
                  value: "title",
                  label: "Title",
                },
                {
                  value: "tags",
                  label: "Tags",
                },
              ],
              onClick: () => {},
            }}
            paginationProps={{
              count: 241,
              pageNo: 1,
              pageSize: 50,
              navigate: () => {},
            }}
            toggleFilter={() => {}}
          />
          <ContactTable
            selectedContactIds={selectedContactIds}
            setSelectedContactIds={setSelectedContactIds}
            contacts={contacts}
          />
        </>
      ) : (
        <EmptyState
          image={EmptyNotesListImage}
          title="Looks like you don't have any contacts!"
          subtitle="Add your notes to send customized emails to them."
          primaryAction={() => setShowNewContactPane(true)}
          primaryActionLabel="Add New Note"
        />
      )}
      <NewContactPane
        showPane={showNewContactPane}
        setShowPane={setShowNewContactPane}
        fetchContacts={fetchContacts}
      />
      <Alert
        isOpen={showDeleteAlert}
        title="Delete Contact"
        message="All of your data will be permanently removed from our database forever. This action cannot be undone."
        confirmationText="Are you sure you want to delete these contacts?"
        submitButtonProps={{
          label: "Proceed",
          onClick: () => {
            setShowDeleteAlert(false);
            Toastr.success("Contacts deleted successfully");
          },
        }}
        cancelButtonProps={{
          onClick: () => {
            setShowDeleteAlert(false);
          },
        }}
      />
    </>
  );
};

export default Contacts;
