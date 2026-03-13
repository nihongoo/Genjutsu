'use client';

export function ProjectsWindow() {
    const projects = [
        {
            title: 'E-Commerce Platform',
            description: 'Full-stack e-commerce solution with React, Node.js, and PostgreSQL',
            tech: ['React', 'Node.js', 'PostgreSQL', 'Stripe'],
        },
        {
            title: 'Task Management App',
            description: 'Real-time task management with drag-and-drop functionality',
            tech: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Firebase'],
        },
        {
            title: 'AI Chat Application',
            description: 'ChatGPT-like application with streaming responses and chat history',
            tech: ['React', 'OpenAI API', 'Express', 'MongoDB'],
        },
        {
            title: 'Analytics Dashboard',
            description: 'Data visualization dashboard for business metrics and KPIs',
            tech: ['Next.js', 'Recharts', 'PostgreSQL', 'Tailwind'],
        },
        {
            title: 'Social Media API',
            description: 'RESTful API for social media platform with authentication',
            tech: ['Node.js', 'Express', 'PostgreSQL', 'JWT'],
        },
        {
            title: 'Music Streaming Service',
            description: 'Music streaming platform with playlist management and recommendations',
            tech: ['React', 'Node.js', 'MongoDB', 'WebSocket'],
        },
    ];

    return (
        <div className="p-6 space-y-6">
            <h2 className="text-2xl font-bold text-foreground">Featured Projects</h2>

            <div className="grid gap-4">
                {projects.map((project, idx) => (
                    <div
                        key={idx}
                        className="border border-[#d0d0d0] dark:border-[#404040] p-4 hover:bg-[#f9f9f9] dark:hover:bg-[#333333] transition-colors cursor-default"
                    >
                        <h3 className="font-semibold text-foreground">{project.title}</h3>
                        <p className="text-sm text-muted-foreground mt-2">{project.description}</p>
                        <div className="flex flex-wrap gap-2 mt-3">
                            {project.tech.map((tech) => (
                                <span
                                    key={tech}
                                    className="text-xs bg-[#e0e0e0] dark:bg-[#3a3a3a] text-foreground px-2 py-1 rounded"
                                >
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
