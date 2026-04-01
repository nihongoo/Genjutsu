'use client';

export function ProjectsWindow() {
    const project = [
        {
            name: 'Genjutsu',
            description: 'A portfolio website that mimics the Windows 11 interface, showcasing my projects and skills in a unique and interactive way.',
            link: 'https://github1s.com/nihongoo/Genjutsu'
        }
    ]
    return (
        <div className="h-full w-full">
            <div className="h-full w-full rounded-xl overflow-hidden border border-gray-300 dark:border-gray-700 shadow-lg">
                <iframe
                    src={project[0].link}
                    frameBorder="0"
                    title="Genjutsu Repo"
                    className="h-full w-full bg-[#1e1e1e]"
                />
            </div>
        </div>
    );
}