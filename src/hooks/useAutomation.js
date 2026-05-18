import { mockEmails } from '../data/mockEmails';

export default function useAutomation() {
    const paidBills = mockEmails
        .filter((email) => email.type === 'transaction')
        .map((email) => ({
            id: email.id,
            name: email.subject,
            category: email.category,
            amount: email.amount,
            dueDate: email.date,
            status: 'Paid',
        }));

    const autoDocuments = mockEmails
        .filter((email) => email.type === 'document')
        .map((email) => ({
            id: email.id,
            title: email.documentName,
            type: 'Auto Imported',
            renewalDate: email.renewalDate,
        }));

    const autoRenewals = autoDocuments.map((document) => ({
        id: document.id,
        title: document.title,
        renewalDate: document.renewalDate,
    }));

    const autoAppointments = mockEmails
        .filter((email) => email.type === 'appointment')
        .map((email) => ({
            id: email.id,
            title: email.title,
            date: email.date,
            category: email.category,
        }));

    const totalSpending = paidBills.reduce(
        (total, bill) => total + bill.amount,
        0,
    );

    return {
        paidBills,
        autoDocuments,
        autoRenewals,
        autoAppointments,
        totalSpending,
    };
}
