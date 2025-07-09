# Expense Tracker Frontend

A modern, responsive Angular application for personal expense tracking with beautiful UI, categorization, filtering, and PDF export capabilities.

## 🚀 Features

- **📱 Responsive Design**: Beautiful modern UI that works on desktop and mobile
- **💰 Expense Management**: Add, view, and track your expenses
- **🏷️ Color-Coded Categories**: Visual categorization with distinct colors
- **📊 Summary Dashboard**: View spending totals by category with percentages
- **🗓️ Month Filtering**: Filter expenses and summaries by specific months
- **📄 PDF Export**: Export expense lists and summaries to PDF
- **⚡ Real-time Updates**: Instant updates when adding new expenses
- **🎨 Modern UI**: Green and white theme with gradients and animations

## 🛠️ Tech Stack

- **Angular 19.2**: Latest Angular framework
- **TypeScript**: Type-safe development
- **SCSS**: Enhanced CSS with variables and nesting
- **Reactive Forms**: Form validation and management
- **Angular Router**: Client-side navigation
- **HTTP Client**: REST API communication
- **jsPDF**: PDF generation and export
- **Server-Side Rendering (SSR)**: Improved performance and SEO

## 📋 Prerequisites

- Node.js 18+ 
- npm 8+ (comes with Node.js)
- Angular CLI 19.2+ (optional, can use npx)

## 🏃‍♂️ Quick Start

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd expense-tracker-ui
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   # Using npm scripts
   npm start
   
   # Or using Angular CLI directly
   npx ng serve
   ```

4. **Access the application**
   - Open your browser and go to `http://localhost:4200`
   - The app will automatically reload when you make changes

## 📊 Application Pages

### 1. Expenses List (`/expenses`)
- View all your expenses in a clean table format
- Filter expenses by month using the dropdown
- Color-coded category badges for easy identification
- Export filtered data to PDF
- Quick actions to add new expenses or view summary

### 2. Add Expense (`/add`)
- Simple form to add new expenses
- Amount validation (must be positive)
- Category selection from predefined options
- Date picker with default to current date
- Automatic redirect to expenses list after saving

### 3. Summary Dashboard (`/summary`)
- Visual breakdown of spending by category
- Percentage calculations and progress bars
- Month-based filtering
- Total spending calculation
- Export summary to PDF

## 🏷️ Expense Categories

The application supports 7 color-coded categories:

- 🛒 **GROCERIES** - Bright green
- 🏠 **RENT** - Deep orange  
- ⚡ **UTILITIES** - Vivid blue
- 🎬 **ENTERTAINMENT** - Bold red
- ✈️ **TRAVEL** - Bright orange
- 🏥 **HEALTH** - Rich purple
- 📦 **OTHER** - Dark blue-gray

## 🗂️ Project Structure

```
src/
├── app/
│   ├── models/                  # TypeScript interfaces
│   │   ├── expense.model.ts
│   │   └── summary-item.model.ts
│   ├── services/                # HTTP services
│   │   └── expenses.service.ts
│   ├── pages/                   # Page components
│   │   ├── expenses-list/
│   │   ├── expense-form/
│   │   └── summary/
│   ├── app.component.*          # Root component
│   ├── app.routes.ts           # Routing configuration
│   └── app.config.ts           # App configuration
├── environments/               # Environment settings
│   └── environment.ts
├── styles.scss                 # Global styles
└── main.ts                     # Application bootstrap
```

## 🔧 Development

### Building the Project
```bash
# Development build
npm run build

# Production build
npm run build --prod
```

### Running Tests
```bash
# Unit tests
npm test

# Unit tests with coverage
npm run test -- --code-coverage
```

### Code Quality
```bash
# Lint check
npx ng lint

# Format check
npx ng format
```

### Generating Components
```bash
# Generate a new component
npx ng generate component my-component

# Generate a service
npx ng generate service my-service
```

## ⚙️ Configuration

### API Backend
The frontend is configured to connect to the backend API at `http://localhost:8080/api`. To change this, update the `environment.ts` file:

```typescript
export const environment = {
  apiBase: 'http://your-api-url/api'
};
```

### TypeScript Configuration
The project uses strict TypeScript settings for better code quality. See `tsconfig.json` for details.

## 📱 Responsive Design

The application is fully responsive and includes:

- **Mobile-first approach**: Optimized for mobile devices
- **Flexible layouts**: Adapts to different screen sizes
- **Touch-friendly buttons**: Large touch targets for mobile
- **Responsive navigation**: Collapsible navigation on small screens
- **Optimized forms**: Mobile-friendly form inputs

## 🎨 UI Design Features

- **Modern color scheme**: White and green theme throughout
- **Beautiful gradients**: Subtle gradients on buttons and elements
- **Card-based layouts**: Clean card designs with shadows
- **Smooth animations**: Hover effects and transitions
- **Typography**: Professional font stack and spacing
- **Visual feedback**: Loading states and form validation

## 📄 PDF Export

The application includes comprehensive PDF export functionality:

- **Expense Lists**: Export filtered expense data with month information
- **Summary Reports**: Export category summaries with totals
- **Automatic Naming**: PDFs are named based on filtered month or "all"
- **Table Formatting**: Clean table layouts in exported PDFs

## 🚀 Deployment

### Development Build
```bash
npm run build
# Files will be in dist/ directory
```

### Production Build
```bash
npm run build --configuration=production
# Optimized files for production deployment
```

### Static Hosting
The built files in `dist/` can be deployed to any static hosting service:
- Netlify
- Vercel
- GitHub Pages
- AWS S3
- Firebase Hosting

### Server-Side Rendering
The project includes SSR support:
```bash
npm run serve:ssr:expense-tracker-ui
```

## 🔗 Backend Integration

This frontend is designed to work with the Expense Tracker Backend API. Make sure to:

1. Start the backend server on `http://localhost:8080`
2. Ensure CORS is configured in the backend
3. Update the `environment.ts` file if using a different backend URL

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Make your changes and add tests
4. Commit your changes: `git commit -m 'Add new feature'`
5. Push to the branch: `git push origin feature/new-feature`
6. Submit a pull request

## 📝 Code Style

- Use TypeScript strict mode
- Follow Angular style guide
- Use SCSS for styling
- Implement responsive design principles
- Add proper component documentation

## 🐛 Troubleshooting

### Common Issues

1. **Port 4200 already in use**
   ```bash
   npx ng serve --port 4201
   ```

2. **Backend connection issues**
   - Ensure backend is running on port 8080
   - Check CORS configuration
   - Verify API endpoints in browser network tab

3. **PDF export not working**
   - Ensure jsPDF dependencies are installed
   - Check browser console for errors

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

**Built with ❤️ using Angular 19**
