export default function About() {
    return (
        <section>
            <h1>App1 — About</h1>
            <p>This is a Module Federation example using <code>@front-utils/builder</code> and <code>@module-federation/enhanced</code>.</p>
            <ul>
                <li><strong>app1</strong> — host (port 3000)</li>
                <li><strong>app2</strong> — remote (port 3001)</li>
                <li><strong>configs</strong> — shared build configuration</li>
            </ul>
        </section>
    );
}
