import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Lead {
  date: string;
  guests: string;
  type: string;
  email?: string;
}

interface ContactContextType {
  leads: Lead[];
  addLead: (lead: Lead) => void;
}

const ContactContext = createContext<ContactContextType | undefined>(undefined);

export const ContactProvider = ({ children }: { children: ReactNode }) => {
  const [leads, setLeads] = useState<Lead[]>([]);

  const addLead = (lead: Lead) => {
    setLeads(prev => [...prev, lead]);
    console.log('New lead captured:', lead);
  };

  return (
    <ContactContext.Provider value={{ leads, addLead }}>
      {children}
    </ContactContext.Provider>
  );
};

export const useContact = () => {
  const context = useContext(ContactContext);
  if (context === undefined) {
    throw new Error('useContact must be used within a ContactProvider');
  }
  return context;
};
