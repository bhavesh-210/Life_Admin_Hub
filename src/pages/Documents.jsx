import { documentsData } from '../data/demoData';

import DocumentCard from '../components/DocumentCard';

export default function Documents() {
    return (
        <div>
            <div className="page-header">
                <div>
                    <h1 className="page-title">Documents</h1>

                    <p className="page-subtitle">
                        Store and organize important files securely.
                    </p>
                </div>

                <button className="btn btn-dark">Upload</button>
            </div>

            <div className="card">
                <div className="list">
                    {documentsData.map((document) => (
                        <DocumentCard key={document.id} document={document} />
                    ))}
                </div>
            </div>
        </div>
    );
}
