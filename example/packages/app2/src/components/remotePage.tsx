export default function RemotePage() {
    return (
        <section>
            <h1>Remote Page (from App2)</h1>
            <p>This component is exposed via Module Federation and rendered inside the host application (app1).</p>
            <p>It lives in <code>app2/src/components/remotePage.tsx</code> and is bundled independently.</p>
        </section>
    );
}
