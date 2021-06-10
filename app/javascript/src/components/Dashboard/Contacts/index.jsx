import React, { useState, useEffect, useCallback } from "react";
import { PageLoader } from "neetoui";
import { Header, SubHeader } from "neetoui/layouts";
import EmptyState from "components/Common/EmptyState";
import EmptyNotesListImage from "images/EmptyNotesList";

import ContactTable from "./ContactTable";
import { contacts as mockContacts } from "common/mock-data";
import DeleteAlert from "./DeleteAlert";

const Contacts = () => {
  const [contacts, setContacts] = useState([{}]);
  const [selectedContactIds, setSelectedContactIds] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);

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
      <Header title="Contacts" />
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
              disabled: !selectedContactIds.length,
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
          primaryActionLabel="Add New Note"
        />
      )}
      {showDeleteAlert && (
        <DeleteAlert
          selectedContactIds={selectedContactIds}
          onClose={() => setShowDeleteAlert(false)}
          refetch={fetchContacts}
        />
      )}
    </>
  );
};

export default Contacts;
