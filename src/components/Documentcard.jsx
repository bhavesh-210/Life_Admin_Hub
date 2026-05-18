export default function DocumentCard({ document }) {
    return (
        <div className="list-item">
            <div>
                <h3>{document.title}</h3>
                <p>
                    {document.type} • Renewal {document.renewalDate}
                </p>
            </div>

            <span className="badge badge-blue">Stored</span>
        </div>
    );
}
