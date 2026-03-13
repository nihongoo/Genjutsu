'use client';

export function SkillsWindow() {
  const skillCategories = [
    {
      category: 'Frontend',
      skills: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Vue.js'],
    },
    {
      category: 'Backend',
      skills: ['Node.js', 'Python', 'Express', 'FastAPI', 'PostgreSQL'],
    },
    {
      category: 'Tools & Platforms',
      skills: ['Git', 'Docker', 'AWS', 'Vercel', 'GitHub'],
    },
    {
      category: 'Design',
      skills: ['Figma', 'UI/UX', 'Responsive Design', 'Accessibility', 'Prototyping'],
    },
  ];

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold text-foreground">Technical Skills</h2>

      {skillCategories.map((category) => (
        <div key={category.category}>
          <h3 className="font-semibold text-foreground mb-3">{category.category}</h3>
          <div className="flex flex-wrap gap-2">
            {category.skills.map((skill) => (
              <div
                key={skill}
                className="px-4 py-2 bg-[#0078d4] text-white text-sm rounded font-medium hover:bg-[#1084d7] transition-colors cursor-default"
              >
                {skill}
              </div>
            ))}
          </div>
        </div>
      ))}

      <div className="border-t border-[#d0d0d0] dark:border-[#404040] pt-4 mt-6">
        <h3 className="font-semibold text-foreground mb-3">Proficiency Levels</h3>
        <div className="space-y-3">
          {[
            { name: 'React', level: 95 },
            { name: 'TypeScript', level: 90 },
            { name: 'Node.js', level: 85 },
            { name: 'UI/UX Design', level: 80 },
          ].map((skill) => (
            <div key={skill.name}>
              <div className="flex justify-between text-sm mb-1">
                <span className="font-medium text-foreground">{skill.name}</span>
                <span className="text-muted-foreground">{skill.level}%</span>
              </div>
              <div className="w-full bg-[#e0e0e0] dark:bg-[#3a3a3a] h-2 rounded">
                <div
                  className="bg-[#0078d4] h-full rounded transition-all"
                  style={{ width: `${skill.level}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
