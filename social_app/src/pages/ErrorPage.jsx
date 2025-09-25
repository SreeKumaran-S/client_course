export default function ErrorPage() {
    return (
        <div className="ui-flex ui-align-center ui-dir-fcol">
            <h2>Project not found</h2>
            <div className="ui-error-container">
                <h4>The Possible reasons could be</h4>
                <ul>
                    <li>The URL you're trying to access might be invalid</li>
                    <li>This project might have been moved to a different location</li>
                    <li>Your access to this project might have been revoked</li>
                </ul>
            </div>
        </div>
    )
}