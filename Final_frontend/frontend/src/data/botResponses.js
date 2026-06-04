import { University } from "lucide-react";

export const botFlows = {
  start: {
    text: "Hi there! 💜 I'm so happy you're here. I'm Asha, your personal career guide. What would you like to know?",
    buttons: [
      { title: "Middle School", next: "highschool" },
      { title: "High School student", next: "graduate" },
      { title: "Graduated", next: "university" },
      { title: "University", next: "employee" },
      { title: "Other option", next: "other" }
    ]
  },

  highschool: {
    text: "This is a very important stage in your academic development. The subjects and interests you cultivate now can significantly influence your future career choices. It is helpful to reflect on which classes you enjoy most, which activities you participate in willingly, and what topics naturally spark your curiosity. Understanding your interests early can guide you toward suitable career paths. Which area interests you most?",
    buttons: [
      { title: "Science & Technology", next: "tech" },
      { title: "Arts & Creativity", next: "arts" },
      { title: "Helping Others", next: "helping" },
      { title: "Business & Leadership", next: "leading" },
      { title: "Nature & Environment", next: "environment" },
      { title: "I'm not sure yet", next: "options" }
    ]
  },

  graduate: {
    text: "Congratulations on completing this important phase of your education. Graduation marks the beginning of new opportunities and responsibilities. At this stage, careful planning becomes essential as you consider university enrollment, career direction, or financial support options. How would you like me to assist you right now?",
    buttons: [
      { title: "How to join university", next: "joinUni" },
      { title: "Best courses to choose", next: "courses" },
      { title: "Scholarships", next: "scholarships" },
      { title: "Back", next: "start" }
    ]
  },

  university: {
    text: "University education equips you with specialized knowledge and professional skills. As you progress, it is important to start thinking about your next strategic move, whether that involves employment, further studies, or entrepreneurship. Which direction are you currently considering?",
    buttons: [
      { title: "Find a job", next: "job" },
      { title: "Masters degree", next: "masters" },
      { title: "Start business", next: "businessStart" },
      { title: "Back", next: "start" }
    ]
  },

  employee: {
    text: "Gaining professional experience is a valuable step in personal and career growth. At this stage, it is beneficial to evaluate your long-term goals and consider how to advance strategically. Would you like to improve your employment opportunities, pursue higher education, or explore entrepreneurship?",
    buttons: [
      { title: "Find a better job", next: "job" },
      { title: "Masters degree", next: "masters" },
      { title: "Start business", next: "businessStart" },
      { title: "Back", next: "start" }
    ]
  }, 

  other: {
    text: "Every individual follows a unique journey, and there is no single correct timeline for success. Regardless of your current situation, there are always opportunities available. Please share the type of future you envision for yourself or the fields that currently interest you most.",
    buttons: [
      { title: "Technology", next: "tech" },
      { title: "Creative careers", next: "arts" },
      { title: "Helping people", next: "helping" },
      { title: "Business", next: "leading" },
      { title: "Back", next: "start" }
    ]
  },

  tech: {
    text: "Tech is a powerful and exciting field 💻 You can explore coding, artificial intelligence, cybersecurity, data science, and more. Starting with small projects, online courses, or school clubs can help you discover what you enjoy most. Keep learning and building — your future in tech can be very bright.",
    buttons: [{ title: "Back", next: "highschool" }]
  },

  arts: {
    text: "Creativity is a superpower 🎨 Whether it's design, music, writing, animation, or filmmaking, creative skills can open many opportunities. You can start by building a portfolio and sharing your work online. Your creativity matters and can grow into a meaningful career.",
    buttons: [{ title: "Back", next: "highschool" }]
  },

  helping: {
    text: "Wanting to help others is truly inspiring 🤝 Careers like medicine, teaching, psychology, social work, and community leadership allow you to make a real difference. Focus on learning, volunteering, and developing empathy — the world needs people like you.",
    buttons: [{ title: "Back", next: "highschool" }]
  },

  leading: {
    text: "Leadership and business skills can take you far 🚀 You might enjoy entrepreneurship, management, finance, or marketing. Start by learning how businesses work, joining school leadership activities, or even starting small projects. Great leaders grow through experience.",
    buttons: [{ title: "Back", next: "highschool" }]
  },

  environment: {
    text: "Caring for nature and the environment is powerful 🌍 Careers in environmental science, agriculture, conservation, and renewable energy help protect our planet. Your passion can create real change for future generations.",
    buttons: [{ title: "Back", next: "highschool" }]
  },

  options: {
    text: "It's completely okay to be unsure 💜 Many successful people discovered their passion by exploring different things. Try learning new skills, joining clubs, volunteering, or taking online courses. Exploration is how clarity comes.",
    buttons: [{ title: "Back", next: "highschool" }]
  },

  joinUni: {
    text: "Joining university usually requires choosing a course, meeting entry requirements, and applying through official admission systems. Focus on your strengths, research universities you like, and prepare your documents early. You can do this step by step — you're not alone.",
    buttons: [{ title: "Back", next: "graduate" }]
  },

  courses: {
    text: "Choosing a course becomes easier when you match it with your interests, strengths, and future goals. Think about what subjects you enjoy and what kind of work excites you. I can always help you explore options and career paths.",
    buttons: [{ title: "Back", next: "graduate" }]
  },

  scholarships: {
    text: "Scholarships can support your education financially 🎓 Many organizations and universities offer them based on merit, need, or talent. Start by researching early, preparing your documents, and applying to multiple opportunities. You deserve support in your education journey.",
    buttons: [{ title: "Back", next: "graduate" }]
  },

  job: {
    text: "Finding a job takes preparation and confidence 💼 Build your CV, learn useful skills, create projects, and apply consistently. Networking and internships also help a lot. Every application is progress toward your goal.",
    buttons: [{ title: "Back", next: "university" }]
  },

  masters: {
    text: "A master’s degree can deepen your expertise and open advanced opportunities 🎓 Choose a field you enjoy and research universities and scholarships. Planning early makes the journey smoother.",
    buttons: [{ title: "Back", next: "university" }]
  },

  businessStart: {
    text: "Starting a business is bold and exciting 🚀 Begin with a simple idea, understand the problem you want to solve, and learn basic business skills like marketing and finance. Small steps today can grow into something big tomorrow.",
    buttons: [{ title: "Back", next: "university" }]
  }
};
