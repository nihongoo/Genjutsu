'use client';

export function ResumeWindow() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Resume / CV</h2>
          <p className="text-muted-foreground mt-1">Full Stack Developer</p>
        </div>
        <button className="px-4 py-2 bg-[#0078d4] text-white font-medium rounded hover:bg-[#1084d7] transition-colors">
          📥 Download PDF
        </button>
      </div>

      <div className="border-t border-[#d0d0d0] dark:border-[#404040] pt-4">
        <h3 className="font-semibold text-foreground mb-3">Experience</h3>
        <div className="space-y-4">
          {[
            {
              title: 'Senior Frontend Developer',
              company: 'Tech Company Inc.',
              period: '2021 - Present',
              details: ['Led development of React applications', 'Mentored junior developers', 'Improved performance by 40%'],
            },
            {
              title: 'Full Stack Developer',
              company: 'Digital Solutions Ltd.',
              period: '2019 - 2021',
              details: ['Built REST APIs with Node.js', 'Designed database schemas', 'Deployed to AWS'],
            },
            {
              title: 'Junior Developer',
              company: 'StartUp Co.',
              period: '2018 - 2019',
              details: ['Fixed bugs and implemented features', 'Wrote unit tests', 'Collaborated with design team'],
            },
          ].map((job, idx) => (
            <div key={idx} className="border-l-4 border-[#0078d4] pl-4">
              <h4 className="font-semibold text-foreground">{job.title}</h4>
              <p className="text-sm text-muted-foreground">{job.company}</p>
              <p className="text-xs text-muted-foreground mb-2">{job.period}</p>
              <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                {job.details.map((detail, i) => (
                  <li key={i}>{detail}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-[#d0d0d0] dark:border-[#404040] pt-4">
        <h3 className="font-semibold text-foreground mb-3">Education</h3>
        <div className="space-y-3">
          {[
            { degree: 'B.S. in Computer Science', school: 'University Name', year: '2018' },
            { degree: 'Advanced React & Node.js Bootcamp', school: 'Tech Academy', year: '2017' },
          ].map((edu, idx) => (
            <div key={idx}>
              <h4 className="font-semibold text-foreground">{edu.degree}</h4>
              <p className="text-sm text-muted-foreground">{edu.school} • {edu.year}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-[#d0d0d0] dark:border-[#404040] pt-4">
        <h3 className="font-semibold text-foreground mb-3">Certifications</h3>
        <ul className="text-sm text-muted-foreground space-y-2 list-disc list-inside">
          <li>AWS Certified Solutions Architect</li>
          <li>Google Cloud Associate Cloud Engineer</li>
          <li>React Advanced Patterns & Best Practices</li>
          <li>TypeScript Professional Developer</li>
        </ul>
      </div>
    </div>
  );
}
