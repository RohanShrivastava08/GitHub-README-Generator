import React, { useState, useEffect } from "react";
import "./index.css";

const App = () => {
  const [form, setForm] = useState({
    name: "",
    bio: "",
    github: "",
    linkedin: "",
    twitter: "",
    instagram: "",
    facebook: "",
    youtube: "",
    website: "",
    projects: "",
    skills: "",
    support: "",
  });

  const [generatedMarkdown, setGeneratedMarkdown] = useState("");
  const [previewImage, setPreviewImage] = useState("");

  useEffect(() => {
    if (form.github.trim()) {
      setPreviewImage(`https://avatars.githubusercontent.com/${form.github}`);
    }
  }, [form.github]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const generateMarkdown = () => {
    const {
      name,
      bio,
      github,
      linkedin,
      twitter,
      instagram,
      facebook,
      youtube,
      website,
      projects,
      skills,
      support,
    } = form;

    const markdown = `
<p align="center">
  <img src="https://avatars.githubusercontent.com/${github}" width="150" style="border-radius: 50%;" />
</p>

<h1 align="center">Hi 👋, I'm ${name}</h1>
<h3 align="center">${bio}</h3>

---

## 🧰 Tech Stack

<p align="center">
  ${skills
    .split(",")
    .map(
      (skill) =>
        `<img src="https://img.shields.io/badge/-${skill.trim()}-gray?style=flat-square&logo=${skill.trim()}&logoColor=white" />`
    )
    .join("\n  ")}
</p>

---

<details>
  <summary>📈 GitHub Stats</summary>
  <p align="center">
    <img src="https://github-readme-stats.vercel.app/api?username=${github}&show_icons=true&theme=radical" />
    <img src="https://github-readme-streak-stats.herokuapp.com/?user=${github}&theme=radical" />
  </p>
</details>

---

<details>
  <summary>🗂️ Pinned Projects</summary>

${projects
  .split("\n")
  .map((project) => `- [${project.trim()}](https://github.com/${github}/${project.trim()})`)
  .join("\n")}

</details>

---

## 🌐 Connect with Me

<p align="center">
  ${linkedin ? `<a href="https://linkedin.com/in/${linkedin}" target="_blank">
    <img src="https://img.shields.io/badge/-LinkedIn-blue?style=flat-square&logo=Linkedin&logoColor=white" />
  </a>` : ""}
  ${twitter ? `<a href="https://twitter.com/${twitter}" target="_blank">
    <img src="https://img.shields.io/badge/-Twitter-blue?style=flat-square&logo=Twitter&logoColor=white" />
  </a>` : ""}
  ${instagram ? `<a href="https://instagram.com/${instagram}" target="_blank">
    <img src="https://img.shields.io/badge/-Instagram-purple?style=flat-square&logo=Instagram&logoColor=white" />
  </a>` : ""}
  ${facebook ? `<a href="https://facebook.com/${facebook}" target="_blank">
    <img src="https://img.shields.io/badge/-Facebook-blue?style=flat-square&logo=Facebook&logoColor=white" />
  </a>` : ""}
  ${youtube ? `<a href="https://youtube.com/${youtube}" target="_blank">
    <img src="https://img.shields.io/badge/-YouTube-red?style=flat-square&logo=YouTube&logoColor=white" />
  </a>` : ""}
  ${website ? `<a href="https://${website}" target="_blank">
    <img src="https://img.shields.io/badge/-Website-green?style=flat-square&logo=Google-Chrome&logoColor=white" />
  </a>` : ""}
</p>

---

## ☕ Support Me

<a href="${support}" target="_blank">
  <img src="https://img.shields.io/badge/-Buy Me A Coffee-yellow?style=flat-square&logo=buy-me-a-coffee&logoColor=black" />
</a>
`;

    setGeneratedMarkdown(markdown.trim());
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedMarkdown);
    alert("✅ Copied to clipboard!");
  };

  const downloadMarkdown = () => {
    const blob = new Blob([generatedMarkdown], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "README.md";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-white to-gray-200 text-gray-800 font-sans">
      {/* Header */}
      <header className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white py-6 shadow-lg mb-10 animate-fadeIn">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-1">🚀 GitHub README Generator</h1>
          <p className="text-sm font-light">Build a classy GitHub profile effortlessly</p>
        </div>
      </header>

      {/* Form + Output */}
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl shadow-xl p-6 space-y-4 animate-fadeUp">
          {previewImage && (
            <div className="flex justify-center mb-4">
              <img
                src={previewImage}
                alt="GitHub Avatar"
                className="w-24 h-24 rounded-full border-4 border-indigo-500 shadow-md transition-all duration-300 hover:scale-105"
              />
            </div>
          )}
          {[
            { label: "Name", name: "name" },
            { label: "Bio", name: "bio" },
            { label: "GitHub Username", name: "github" },
            { label: "LinkedIn Username", name: "linkedin" },
            { label: "Twitter Username", name: "twitter" },
            { label: "Personal Website (domain.com)", name: "website" },
            { label: "Support Link (BuyMeACoffee, Ko-fi, etc.)", name: "support" },
          ].map((field) => (
            <div key={field.name}>
              <label className="block text-sm font-semibold">{field.label}</label>
              <input
                type="text"
                name={field.name}
                value={form[field.name]}
                onChange={handleChange}
                className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
                required
              />
            </div>
          ))}

          <div>
            <label className="block text-sm font-semibold">Pinned Projects (one per line)</label>
            <textarea
              name="projects"
              rows={3}
              value={form.projects}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
            ></textarea>
          </div>

          <div>
            <label className="block text-sm font-semibold">Skills (comma-separated, e.g., React, Node.js)</label>
            <input
              type="text"
              name="skills"
              value={form.skills}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          <div className="flex space-x-4 mt-4">
            <button
              onClick={generateMarkdown}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md transition transform hover:scale-105"
            >
              🚀 Generate
            </button>
            <button
              onClick={copyToClipboard}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md transition transform hover:scale-105"
            >
              📋 Copy Markdown
            </button>
            <button
              onClick={downloadMarkdown}
              className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-md transition transform hover:scale-105"
            >
              💾 Export as .md
            </button>
          </div>
        </div>

        {/* Output Markdown */}
        <div className="bg-white rounded-xl shadow-xl p-6 animate-fadeIn">
          <h2 className="text-xl font-bold mb-4">📄 Generated README Markdown</h2>
          <textarea
            readOnly
            className="w-full h-[500px] p-4 border rounded-md font-mono text-sm bg-gray-100"
            value={generatedMarkdown}
          ></textarea>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-24 bg-gray-900 text-white py-10 px-4">
  <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
    <div className="text-center md:text-left mb-6 md:mb-0">
      <h2 className="text-xl font-bold text-indigo-400">🚀 GitHub README Generator</h2>
      <p className="text-sm text-gray-400 mt-1">Crafted with React + TailwindCSS</p>
    </div>

    <div className="flex space-x-6 text-gray-300 text-lg">
      <a href="https://github.com/RohanShrivastava08" target="_blank" className="hover:text-indigo-400 transition duration-300">
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 .5C5.65.5.5 5.65.5 12a11.5 11.5 0 008 10.94c.59.11.8-.26.8-.58v-2.03c-3.25.71-3.93-1.56-3.93-1.56-.54-1.38-1.31-1.75-1.31-1.75-1.07-.74.08-.73.08-.73 1.19.08 1.82 1.23 1.82 1.23 1.05 1.82 2.76 1.3 3.43.99.11-.76.41-1.3.74-1.6-2.6-.29-5.33-1.3-5.33-5.8 0-1.28.46-2.32 1.21-3.14-.12-.3-.52-1.5.11-3.13 0 0 .98-.31 3.2 1.2a10.96 10.96 0 015.82 0c2.22-1.51 3.2-1.2 3.2-1.2.63 1.63.23 2.83.12 3.13.76.82 1.21 1.86 1.21 3.14 0 4.51-2.74 5.51-5.35 5.8.42.37.8 1.1.8 2.22v3.3c0 .32.21.7.81.58A11.5 11.5 0 0023.5 12C23.5 5.65 18.35.5 12 .5z"/></svg>
      </a>
      <a href="https://www.linkedin.com/in/rohan-shrivastava-887a15251/" target="_blank" className="hover:text-blue-400 transition duration-300">
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.28c-.96 0-1.72-.78-1.72-1.72s.77-1.72 1.72-1.72c.95 0 1.72.78 1.72 1.72s-.77 1.72-1.72 1.72zm13.5 11.28h-3v-5.4c0-1.29-.03-2.95-1.8-2.95-1.8 0-2.07 1.4-2.07 2.85v5.5h-3v-10h2.88v1.35h.04c.4-.75 1.38-1.53 2.85-1.53 3.04 0 3.6 2 3.6 4.55v5.63z"/></svg>
      </a>
      <a href="https://twitter.com/rohan_sh0808" target="_blank" className="hover:text-sky-400 transition duration-300">
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.44 4.83c-.81.36-1.69.6-2.61.71a4.55 4.55 0 001.98-2.5c-.87.52-1.83.9-2.85 1.1A4.52 4.52 0 0016.1 3c-2.5 0-4.52 2.02-4.52 4.51 0 .35.04.7.12 1.03-3.75-.19-7.08-1.99-9.31-4.72-.39.68-.62 1.46-.62 2.3 0 1.59.81 3 2.05 3.82a4.49 4.49 0 01-2.05-.57v.06c0 2.22 1.58 4.07 3.69 4.5a4.58 4.58 0 01-2.04.08 4.54 4.54 0 004.23 3.13A9.06 9.06 0 012 19.54a12.8 12.8 0 006.95 2.04c8.34 0 12.9-6.9 12.9-12.9 0-.2 0-.41-.02-.61.89-.64 1.66-1.45 2.27-2.37z"/></svg>
      </a>
      <a href="https://rohan-portfolio-rouge.vercel.app/" target="_blank" className="hover:text-green-400 transition duration-300">
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.38 0 0 5.37 0 12c0 6.63 5.38 12 12 12s12-5.37 12-12C24 5.37 18.62 0 12 0zm0 22.15c-5.6 0-10.15-4.55-10.15-10.15S6.4 1.85 12 1.85 22.15 6.4 22.15 12 17.6 22.15 12 22.15zM12 6.6a5.4 5.4 0 100 10.8 5.4 5.4 0 000-10.8zm0 9a3.6 3.6 0 110-7.2 3.6 3.6 0 010 7.2z"/></svg>
      </a>
    </div>
  </div>

  <div className="text-center mt-6 text-sm text-gray-500">
    &copy; {new Date().getFullYear()} Crafted by <span className="text-indigo-400 font-medium">Rohan</span> • All Rights Reserved
  </div>
</footer>
    </div>
  );
};

export default App;

 
