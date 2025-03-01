# 🚨 ReportNow


![EchoForms](public/HomePage.png)


![Stars](https://img.shields.io/github/stars/10xshivam/ReportNow?style=social) ![Forks](https://img.shields.io/github/forks/10xshivam/ReportNow?style=social) ![Issues](https://img.shields.io/github/issues/10xshivam/ReportNow)



**ReportNow** is an advanced, AI-powered web application that enables users to **anonymously report incidents** whether emergency or non-emergency seamlessly and efficiently. By simply uploading an image, the system leverages **Gemini LLM** to intelligently analyze the content and automatically generate a **structured incident report**, including the **title, description, and category**. Users have full control to review and refine the generated details before submission.

Beyond reporting, **ReportNow** enhances public safety by offering **real-time report tracking, live location sharing, and instant access to nearby emergency services** such as **hospitals, police stations, fire stations, and pharmacies**. Designed with scalability and security in mind, the application is fully **Dockerized**, ensuring effortless deployment across any environment.
 

---

## 🌟 Key Features

- 📸 **AI-Powered Image Analysis** – Automatically extracts key details from uploaded images to generate a comprehensive incident report.
- 📝 **Smart Report Generation** – Dynamically fills in the report fields with AI-generated insights, editable by the user.
- 📍 **Live Location Sharing** – Users can provide their real-time location for precise assistance.
- 🔎 **Incident Tracking System** – Every report is assigned a **unique tracking ID**, allowing users to monitor real-time status updates.
- ✉️ **Email Notifications** – Optional email alerts keep users informed on their report’s progress.
- 🏥 **Nearby Emergency Support** – Instantly fetches locations of the closest **hospitals, police stations, fire stations, and pharmacies**.
- 🔐 **Admin Dashboard** – Securely managed via **NextAuth**, enabling administrators to oversee and handle reports efficiently.
- ☁️ **Cloud-Based Image Storage** – Seamless integration with **Cloudinary** for secure and scalable image management.
- 🐳 **Dockerized Deployment** – Deploy the entire application effortlessly using a pre-configured **Docker image**.

---

## 🛠️ Tech Stack

| **Technology**  | **Purpose** |
|----------------|------------|
| **Next.js** | Frontend & API Routes |
| **Prisma & PostgreSQL (NeonDB)** | Database & ORM |
| **Gemini LLM** | AI-powered image analysis |
| **NextAuth** | Secure authentication (Admin Dashboard) |
| **Cloudinary** | Scalable image storage |
| **Resend** | Email notification services |
| **React Hook Form & Zod** | Form validation & management |
| **Docker** | Containerized deployment |

---

## 📥 Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/10xshivam/ReportNow.git
   cd ReportNow
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   - Copy `.env.example` to `.env`.
   - Add required keys.
4. **Initialize the database:**
   ```bash
   npx prisma migrate dev --name init
   npx prisma generate
   ```
5. Start the development server:
   ```bash
   npm run dev
   ```

---

## Docker Deployment
   To build and deploy the application as a Docker container, use the following commands:
   ```bash
   docker build -t reportnow .
   docker run -p 3000:3000 reportnow
   ```

## 🤝 Contribution Guidelines

### 🌱 How to Get Involved

1. **Fork the repository** by clicking the "Fork" button.
2. **Clone your fork:**
   ```bash
   git clone https://github.com/10xshivam/ReportNow.git
   ```
3. **Create a new branch:**
   ```bash
   git checkout -b feature/<feature-name>
   ```
4. **Make changes** and commit:
   ```bash
   git add .
   git commit -m "Your descriptive commit message"
   ```
5. **Push changes:**
   ```bash
   git push origin <your-branch-name>
   ```
6. Open a pull request.

### 📌 Suggested Contributions

- **Geofencing Alerts & Auto-Reporting 📍**  
   - Notify users if they enter a **high-risk zone** based on past reports.  
   - Auto-suggest report filing when an **incident is detected nearby**.  

- **AI Chatbot for Assistance 🤖**  
   - Implement a chatbot to **guide users through reporting**.  
   - Offer **instant safety tips** based on the incident type.  

- **Social Media Integration 📢**  
   - Allow users to **share reports anonymously** on platforms like Twitter & Telegram.  
   - Implement **auto-generated emergency alerts** for mass awareness.  

---

## 🌟 Stargazers & Forkers

We appreciate your support! 🌟🍴

[![Stargazers](https://img.shields.io/github/stars/10xshivam/ReportNow)](https://github.com/10xshivam/ReportNow/stargazers) [![Forks](https://img.shields.io/github/forks/10xshivam/ReportNow)](https://github.com/10xshivam/ReportNow/network/members)

---

## 🛡 License

ReportNow is licensed under the MIT License.

---


## 📬 Contact

For queries or collaborations:

- Email: [kumarshivam3788@gmail.com](mailto:kumarshivam3788@gmail.com)
- LinkedIn: [codrshivam](https://www.linkedin.com/in/codrshivam/)
- Twitter: [@shivamcodes_](https://x.com/shivamcodes_)