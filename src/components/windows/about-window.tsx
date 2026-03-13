'use client';

export function AboutWindow() {
  return (
    <div className="p-6 space-y-4">
      <div className="flex gap-6">
        <div className="w-24 h-24 bg-gradient-to-br from-[#0078d4] to-[#1084d7] rounded flex items-center justify-center text-5xl flex-shrink-0">
          👤
        </div>
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-foreground">Welcome to My Portfolio</h2>
          <p className="text-muted-foreground mt-2">
            I'm a passionate developer with expertise in building modern web applications. 
            This portfolio is built as a Windows 10 OS simulator to showcase my skills and projects.
          </p>
        </div>
      </div>

      <div className="border-t border-[#d0d0d0] dark:border-[#404040] pt-4">
        <h3 className="font-semibold text-foreground mb-3">About Me</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">
          With over 5 years of experience in web development, I specialize in:
        </p>
        <ul className="text-sm text-muted-foreground mt-3 space-y-2 list-disc list-inside">
          <li>Frontend Development (React, Vue, Next.js)</li>
          <li>Backend Development (Node.js, Python, TypeScript)</li>
          <li>UI/UX Design and Implementation</li>
          <li>Database Design and Management</li>
          <li>DevOps and Cloud Deployment</li>
        </ul>
      </div>

      <div className="border-t border-[#d0d0d0] dark:border-[#404040] pt-4">
        <h3 className="font-semibold text-foreground mb-2">Contact Info</h3>
        <div className="text-sm text-muted-foreground space-y-1">
          <p>📧 Email: your.email@example.com</p>
          <p>🔗 LinkedIn: linkedin.com/in/yourprofile</p>
          <p>💻 GitHub: github.com/yourprofile</p>
          <p>🌐 Website: yourwebsite.com</p>
        </div>
      </div>
    </div>
  );
}
