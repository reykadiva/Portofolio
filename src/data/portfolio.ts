// ============================================================
// SINGLE SOURCE OF TRUTH - Portfolio Data
// ============================================================
// Ubah data di sini, otomatis berubah di SEMUA halaman.
// ============================================================

// --- Personal Info ---
export const personalInfo = {
  fullName: "Muhammad Reyka Agastya Divaputra",
  shortName: "Muhammad Reyka Agastya",
  firstName: "Muhammad",
  highlightName: "Reyka",  // yang di-highlight hijau di navbar
  tagline: "IoT Enthusiast & Full-Stack Developer",
  bio: "I build bridges between hardware and software. Specializing in IoT systems, embedded devices, and modern web applications with a focus on performance and impact.",
  location: "Cikarang, West Java",
  email: "revka334@gmail.com",
  phone: "085267900655",
  github: "https://github.com/reykadiva",
  linkedin: "https://www.linkedin.com/in/reykaagastya/",
  profileImage: "/profile2.jpeg",
};

// --- Education ---
export const education = {
  degree: "Informatics Engineering",
  university: "Paramadina University",
  period: "2023 — Present",
  gpa: 3.67,
  maxGpa: 4.0,
};

// --- About Descriptions ---
export const aboutDescriptions = [
  {
    text: `I am an <strong class="text-accent">Informatics Engineering</strong> student at Paramadina University, actively involved in various student activities and organizations. Experienced as Vice Chairperson in a social organization, Event Division Coordinator during university orientation programs, and Game Making Division member in the IT Fest competition.`,
    className: "text-base sm:text-lg leading-relaxed",
  },
  {
    text: "Skilled in teamwork, able to perform well under pressure, and adaptable to various roles. With this background, I am eager to develop my career in the digital field and contribute positively to a professional environment.",
    className: "text-base sm:text-lg leading-relaxed text-text-secondary",
  },
];

// --- Skills ---
export const skills = [
  { category: "Technical", items: ["IoT Projects", "C++", "Figma", "Canva", "Photoshop"] },
  { category: "Organizational", items: ["Event Management", "Project Management", "Leadership", "Team Coordination"] },
  { category: "Analytical", items: ["Problem Solving", "Analytical Thinking", "Attention to Detail"] },
  { category: "Tools", items: ["Microsoft Office", "Google Workspace"] },
];

// --- Languages ---
export const languages = [
  { name: "Indonesian", level: "Native", percentage: 100 },
  { name: "English", level: "Limited Working Proficiency", percentage: 55 },
];

// --- Experience / Organizations ---
export const experienceData = [
  {
    role: "Event Coordinator",
    org: "Exmazarts — Campus Orientation Program",
    period: "Jul 2025 — Sep 2025",
    details: [
      "Led a team of 10 members in organizing the Campus Orientation Program attended by over 350 participants.",
      "Collaborated with the Event Chairperson to design and execute the main event agenda, ensuring smooth coordination across all committees.",
      "Achieved a successful and well-received event, gaining positive feedback from participants and appreciation from university executives.",
    ],
  },
  {
    role: "Vice Chairperson",
    org: "Paramadina Social Care",
    period: "Jan 2024 — Mar 2025",
    details: [
      "Led and coordinated a team of over 80 active members in managing multiple social and educational programs focused on elementary to high school students.",
      "Successfully served as the person-in-charge for several major initiatives such as PSC Peduli Kasih, Biru Muda, and Inauguration Events, ensuring smooth execution and strong team collaboration.",
      "Fostered unity and collaboration across all divisions by integrating ideas from various team members, resulting in well-executed and impactful community programs.",
    ],
  },
  {
    role: "Event Division Member",
    org: "Exmazarts — Campus Orientation Program",
    period: "Jul 2024 — Sep 2024",
    details: [
      "Contributed to the planning and development of event concepts, themes, and activity schedules as part of a 40+ member organizing team.",
      "Assisted in managing event logistics and ensuring smooth execution for an event attended by around 180 participants.",
      "Gained valuable experience in teamwork, event coordination, and creative planning — serving as a foundation for leadership role in the following year's orientation program.",
    ],
  },
  {
    role: "Game Making Division Member",
    org: "IT Fest 4.0 — Universitas Paramadina",
    period: "May 2024 — Sep 2024",
    details: [
      "Contributed to the successful execution of one of IT Fest's key sub-events, promoting creativity and innovation among student participants.",
      "Organized the Game Making competition, handling the development of themes, subthemes, technical guidelines, jury selection, and overall event logistics.",
      "Collaborated with fellow committee members to ensure a well-structured and engaging competition involving 5–7 participating teams.",
    ],
  },
];

// --- Projects ---
export const projectsData = [
  {
    id: "project-1",
    title: "Smart Attendance System (SAS) Based On IoT",
    category: "IoT / Full-Stack",
    description:
      "Smart Attendance System (SAS) Based On IoT utilizing ESP32, RFID, and facial verification along with a web monitoring dashboard.",
    longDescription: `
      <p>The Smart Attendance System (SAS) is an IoT project that aims to integrate hardware components like the ESP32 and RFID RC522 with a custom-built web server. It features a web dashboard for live monitoring and attendance logs.</p>
      <p><strong>Note:</strong> Meskipun project ini pada akhirnya tidak begitu berhasil sepenuhnya seperti yang diharapkan, saya belajar banyak hal berharga dari proses pembuatannya. Pengalaman ini mengajarkan saya tentang integrasi hardware-software, komunikasi API, dan pengembangan sistem full-stack secara keseluruhan.</p>
    `,
    image: "/sas-iot.jpg",
    tags: ["ESP32", "Python", "Flask", "RFID", "HTML/CSS", "IoT"],
    features: [
      "Live attendance monitoring web dashboard",
      "Hardware integration using ESP32 and RFID RC522",
      "Facial verification service attempt",
      "Student attendance data logging and statistics",
    ],
    links: [
      { label: "View Source", url: "https://github.com/reykadiva/AbsenProject", type: "primary" },
    ],
  },
  {
    id: "project-2",
    title: "BeBeauty - Sustainable Beauty Platform",
    category: "Web App / Sustainability",
    description:
      "A sustainable beauty movement platform for recycling cosmetic packaging with reward systems and eco-impact tracking.",
    longDescription: `
      <p>BeBeauty adalah platform inovatif yang dirancang untuk mendorong daur ulang kemasan kosmetik. Platform ini menghubungkan pengguna dengan mesin daur ulang khusus, memungkinkan mereka melacak dampak lingkungan mereka dan mendapatkan reward atas kontribusi mereka.</p>
      <p><strong>Note:</strong> Data lokasi mesin yang ditampilkan saat ini adalah data dummy dan platform ini siap untuk dikembangkan lebih lanjut untuk integrasi dengan sistem IoT mesin daur ulang fisik jika diperlukan.</p>
    `,
    image: "/bebeauty.jpg",
    tags: ["React", "Tailwind CSS", "Lovable", "UI/UX Design", "Sustainability"],
    features: [
      "Dashboard interaktif untuk melacak poin dan item kosmetik",
      "Pelacakan dampak lingkungan (Eco-Impact) secara real-time",
      "Sistem pencari lokasi mesin daur ulang terdekat (Dummy Data)",
      "Sistem rewards untuk menukarkan poin",
      "Desain modern dan responsif dengan estetika premium",
    ],
    links: [
      { label: "View Live", url: "https://bebeautyproject.lovable.app/", type: "primary" },
      { label: "View Source", url: "https://github.com/reykadiva/bebeautyproject", type: "outline" },
    ],
  },
  {
    id: "project-3",
    title: "Personal Portfolio Website",
    category: "Web Development",
    description:
      "A modern, responsive portfolio website built from scratch using only HTML, CSS, and vanilla JavaScript with a dark Spotify-inspired theme.",
    longDescription: `
      <p>A fully custom-built, multi-page personal portfolio website designed with a dark Spotify-inspired theme. The site is built entirely from scratch using HTML, CSS, and vanilla JavaScript — no frameworks or libraries used.</p>
      <p>The portfolio showcases my educational background, organizational experiences, technical skills, and projects in a clean, modern, and responsive layout with smooth page transitions and micro-animations.</p>
    `,
    image: "/profile2.jpeg",
    tags: ["HTML5", "CSS3", "JavaScript", "Responsive Design", "SEO"],
    features: [
      "Multi-page architecture with consistent design system",
      "Custom CSS design tokens (Spotify-inspired)",
      "Responsive design for all device sizes",
      "SVG-based icons for crisp visuals",
      "Fade-in scroll animations",
    ],
    links: [
      { label: "View Source", url: "https://github.com/reykadiva/Portofolio", type: "primary" },
    ],
  },
];

// ============================================================
// COMPUTED / DERIVED DATA (auto-calculated, jangan diubah manual)
// ============================================================

/** Total unique organizations from experience data */
export const totalOrganizations = new Set(experienceData.map((e) => e.org)).size;

/** Total projects — otomatis bertambah kalau tambah project baru di atas */
export const totalProjects = projectsData.length;

/** Years of experience — dihitung dari tahun pertama di experience data */
function getYearsOfExperience(): number {
  const now = new Date();
  // Parse earliest year from experience periods
  const years = experienceData.map((e) => {
    const match = e.period.match(/\b(20\d{2})\b/);
    return match ? parseInt(match[1]) : now.getFullYear();
  });
  const earliest = Math.min(...years);
  return now.getFullYear() - earliest;
}

export const yearsOfExperience = getYearsOfExperience();

// --- Home Page Stats (auto-generated) ---
export const homeStats = [
  {
    value: `${yearsOfExperience}+`,
    label: "Years Experience",
  },
  {
    value: `${totalProjects}+`,
    label: "Projects Built",
  },
  {
    value: `${totalOrganizations}`,
    label: "Organizations",
  },
  {
    value: education.gpa.toFixed(2),
    label: "GPA Score",
  },
];

// --- Experience Page Stats (auto-generated) ---
export const experienceStats = [
  { number: `${totalOrganizations}`, label: "Total Organizations" },
  { number: "350+", label: "People Managed" },
  { number: `${yearsOfExperience}+`, label: "Years of Experience" },
];
