# 💰 Expense Tracker - Full Stack Application

A modern, full-stack expense tracking application built with **Spring Boot** (backend) and **Angular** (frontend). Track your personal expenses with beautiful UI, categorization, filtering, and PDF export capabilities.

## 🌟 Overview

This project consists of two main components:
- **Backend API**: RESTful API built with Spring Boot and Java
- **Frontend UI**: Modern Angular application with responsive design

![Expense Tracker Demo](https://via.placeholder.com/800x400/27ae60/ffffff?text=Expense+Tracker+App)

## ✨ Key Features

### 💰 Expense Management
- Add, view, and track expenses with validation
- Categorize expenses with color-coded visual indicators
- Filter expenses by month for better organization

### 📊 Analytics & Reporting
- Summary dashboard with spending breakdown by category
- Percentage calculations and visual progress bars
- Export capabilities to PDF for record-keeping

### 🎨 User Experience
- Modern, responsive design that works on all devices
- Beautiful green and white theme with smooth animations
- Intuitive navigation and user-friendly forms

### 🛠️ Technical Features
- RESTful API with comprehensive validation
- Real-time data synchronization
- In-memory H2 database for quick setup
- CORS configuration for seamless frontend-backend communication

## 🏗️ Architecture

```
expense-tracker/
├── expense-tracker/          # Spring Boot Backend API
│   ├── src/main/java/       # Java source code
│   ├── src/main/resources/  # Configuration files
│   ├── pom.xml             # Maven dependencies
│   └── README.md           # Backend documentation
├── expense-tracker-ui/      # Angular Frontend
│   ├── src/app/            # Angular components & services
│   ├── src/styles.scss     # Global styles
│   ├── package.json        # npm dependencies
│   └── README.md           # Frontend documentation
└── README.md               # This file
```

## 🚀 Quick Start

### Prerequisites
- **Java 17+** (for backend)
- **Node.js 18+** (for frontend)
- **Maven 3.6+** (or use included wrapper)

### 1. Start the Backend API

```bash
# Navigate to backend directory
cd expense-tracker

# Run the Spring Boot application
./mvnw spring-boot:run

# API will be available at http://localhost:8080
```

### 2. Start the Frontend Application

```bash
# Navigate to frontend directory
cd expense-tracker-ui

# Install dependencies
npm install

# Start the development server
npm start

# Application will be available at http://localhost:4200
```

### 3. Access the Application

- **Frontend**: [http://localhost:4200](http://localhost:4200)
- **Backend API**: [http://localhost:8080/api](http://localhost:8080/api)
- **H2 Database Console**: [http://localhost:8080/h2-console](http://localhost:8080/h2-console)

## 📊 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/expenses` | Add a new expense |
| `GET` | `/api/expenses` | Get all expenses |
| `GET` | `/api/expenses?month=January` | Get expenses for specific month |
| `GET` | `/api/summary` | Get expense summary by category |

## 🏷️ Expense Categories

The application supports 7 predefined categories with distinct colors:

| Category | Color | Description |
|----------|-------|-------------|
| 🛒 GROCERIES | Bright Green | Food and grocery shopping |
| 🏠 RENT | Deep Orange | Housing and rent expenses |
| ⚡ UTILITIES | Vivid Blue | Bills (electricity, water, internet) |
| 🎬 ENTERTAINMENT | Bold Red | Movies, games, subscriptions |
| ✈️ TRAVEL | Bright Orange | Transportation and travel costs |
| 🏥 HEALTH | Rich Purple | Medical and healthcare expenses |
| 📦 OTHER | Dark Blue-Gray | Miscellaneous expenses |

## 🛠️ Technology Stack

### Backend
- **Java 17** - Programming language
- **Spring Boot 3.2.5** - Framework
- **Spring Data JPA** - Data persistence
- **H2 Database** - In-memory database
- **Maven** - Dependency management
- **Bean Validation** - Input validation

### Frontend
- **Angular 19.2** - Frontend framework
- **TypeScript** - Type-safe JavaScript
- **SCSS** - Enhanced CSS
- **Reactive Forms** - Form management
- **jsPDF** - PDF generation
- **HTTP Client** - API communication

## 📱 Screenshots

### Expense List View
- Clean table layout with color-coded categories
- Month filtering dropdown
- Export to PDF functionality
- Quick action buttons

### Add Expense Form
- Simple, intuitive form design
- Real-time validation
- Category selection
- Date picker with smart defaults

### Summary Dashboard
- Visual spending breakdown
- Percentage calculations
- Progress bar visualizations
- Total spending calculations

## 🔧 Development

### Backend Development
```bash
cd expense-tracker

# Build the project
./mvnw clean compile

# Run tests
./mvnw test

# Create JAR file
./mvnw clean package
```

### Frontend Development
```bash
cd expense-tracker-ui

# Build for development
npm run build

# Run tests
npm test

# Build for production
npm run build --prod
```

## 🚀 Deployment

### Backend Deployment Options
1. **JAR Deployment**: Build and run the JAR file on any server
2. **Docker**: Containerize the Spring Boot application
3. **Cloud Platforms**: Deploy to Heroku, Railway, or AWS

### Frontend Deployment Options
1. **Static Hosting**: Netlify, Vercel, GitHub Pages
2. **CDN**: AWS CloudFront, Azure CDN
3. **Traditional Hosting**: Any web server serving static files

## 📚 Documentation

- [Backend API Documentation](expense-tracker/README.md) - Detailed Spring Boot setup and API reference
- [Frontend Documentation](expense-tracker-ui/README.md) - Angular application guide and features

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Make your changes** and add tests
4. **Commit your changes**: `git commit -m 'Add amazing feature'`
5. **Push to the branch**: `git push origin feature/amazing-feature`
6. **Open a Pull Request**

### Development Guidelines
- Follow the existing code style and conventions
- Add tests for new features
- Update documentation as needed
- Ensure all tests pass before submitting

## 🐛 Troubleshooting

### Common Issues

**Backend won't start**
- Check if port 8080 is available
- Verify Java 17+ is installed
- Check Maven dependencies

**Frontend can't connect to backend**
- Ensure backend is running on port 8080
- Check CORS configuration
- Verify API endpoint URLs

**Build failures**
- Clear node_modules and reinstall: `rm -rf node_modules && npm install`
- Clear Maven cache: `./mvnw clean`

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Authors

- **Your Name** - Initial work and development

## 🙏 Acknowledgments

- Spring Boot team for the excellent framework
- Angular team for the powerful frontend framework
- jsPDF community for PDF generation capabilities
- H2 Database for the lightweight database solution

---

**Start tracking your expenses today! 💰✨**

For detailed setup instructions, please refer to the individual README files in the `expense-tracker/` and `expense-tracker-ui/` directories.
