// Simple automation hook: mockEmails ko parse karke useful arrays return karta hai
import { mockEmails } from '../data/mockEmails';

export default function useAutomation() {
    // Transactions ko paidBills format me convert kar rahe hain
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

    // Document type emails ko documents format me map karte hain
    const autoDocuments = mockEmails
        .filter((email) => email.type === 'document')
        .map((email) => ({
            id: email.id,
            title: email.documentName,
            type: 'Auto Imported',
            renewalDate: email.renewalDate,
        }));

    // Documents se renewals array nikal rahe hain (simple transform)
    const autoRenewals = autoDocuments.map((document) => ({
        id: document.id,
        title: document.title,
        renewalDate: document.renewalDate,
    }));

    // Appointment type emails ko appointments array me convert karte hain
    const autoAppointments = mockEmails
        .filter((email) => email.type === 'appointment')
        .map((email) => ({
            id: email.id,
            title: email.title,
            date: email.date,
            category: email.category,
        }));

    // Total spending calculate kar rahe hain
    const totalSpending = paidBills.reduce(
        (total, bill) => total + bill.amount,
        0,
    );

    // Return the prepared data
    return {
        paidBills,
        autoDocuments,
        autoRenewals,
        autoAppointments,
        totalSpending,
    };
}
