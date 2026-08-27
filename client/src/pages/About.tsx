function About() {
    return (
        <div className="space-y-2">
            <p className="text-2xl">About this page</p>
            <p>The page is just a simple todo app. It was created using TypeScript, React, Tailwind and Node.js.</p>
            <p>On the <a href="/" className="underline text-blue-600">homepage</a> you can find the three most urgent todos and then todos due for the current day and week.
                On <a href="/todos" className="underline text-blue-600">/todos</a> you can view all todos and do filtering and sorting on them.</p>
            <p>Then on the header you can search for todos which's name or description contains the search word. And you can find the form to add todos on the header also.</p>
            <p>Whenever viewing todos you can view all their information or modify them by clicking on it's name.</p>
        </div >
    )
}

export default About