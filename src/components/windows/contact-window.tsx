'use client';

import { useState } from 'react';

export function ContactWindow() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setFormData({ name: '', email: '', subject: '', message: '' });
      setSubmitted(false);
    }, 2000);
  };

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold text-foreground">Contact Me</h2>

      {submitted && (
        <div className="bg-green-100 dark:bg-green-900/30 border border-green-400 dark:border-green-700 text-green-700 dark:text-green-300 px-4 py-3 rounded">
          ✓ Message sent successfully! I'll get back to you soon.
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-[#d0d0d0] dark:border-[#404040] bg-white dark:bg-[#333333] text-foreground rounded focus:outline-none focus:border-[#0078d4] focus:ring-1 focus:ring-[#0078d4]"
            placeholder="Your name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-[#d0d0d0] dark:border-[#404040] bg-white dark:bg-[#333333] text-foreground rounded focus:outline-none focus:border-[#0078d4] focus:ring-1 focus:ring-[#0078d4]"
            placeholder="your.email@example.com"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Subject</label>
          <input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-[#d0d0d0] dark:border-[#404040] bg-white dark:bg-[#333333] text-foreground rounded focus:outline-none focus:border-[#0078d4] focus:ring-1 focus:ring-[#0078d4]"
            placeholder="Subject"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Message</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows={5}
            className="w-full px-3 py-2 border border-[#d0d0d0] dark:border-[#404040] bg-white dark:bg-[#333333] text-foreground rounded focus:outline-none focus:border-[#0078d4] focus:ring-1 focus:ring-[#0078d4] resize-none"
            placeholder="Your message..."
          />
        </div>

        <button
          type="submit"
          className="w-full px-4 py-2 bg-[#0078d4] text-white font-medium rounded hover:bg-[#1084d7] active:bg-[#006ab9] transition-colors cursor-pointer"
        >
          Send Message
        </button>
      </form>

      <div className="border-t border-[#d0d0d0] dark:border-[#404040] pt-4">
        <h3 className="font-semibold text-foreground mb-3">Quick Contact</h3>
        <div className="space-y-2 text-sm text-muted-foreground">
          <p>📧 Email: contact@example.com</p>
          <p>📱 Phone: +1 (555) 123-4567</p>
          <p>🔗 LinkedIn: linkedin.com/in/profile</p>
          <p>💻 GitHub: github.com/profile</p>
        </div>
      </div>
    </div>
  );
}
