// Documents page: shows list of stored documents
import { documentsData } from '../data/demoData';

// Component to render each document item
import DocumentCard from '../components/DocumentCard';

export default function Documents() {
    return (
        <div>
            <div className="page-header">
                <div>
                    <h1 className="page-title">Documents</h1>

                    {/* Short description */}
                    <p className="page-subtitle">
                        Store and organize important files securely.
                    </p>
                </div>

                {/* Upload button (UI) */}
                <button className="btn btn-dark">Upload</button>
            </div>

            <div className="card">
                <div className="list">
                    {/* Map through demo documents and render DocumentCard */}
                    {documentsData.map((document) => (
                        <DocumentCard key={document.id} document={document} />
                    ))}
                </div>
            </div>
        </div>
    );
}
