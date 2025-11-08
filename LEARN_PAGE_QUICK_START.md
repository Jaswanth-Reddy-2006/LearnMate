# Learn Page - Quick Start Guide

## 🚀 Getting Started

### Prerequisites
- Node.js 16+
- npm or yarn
- Both frontend and coordinator-node running

### Installation & Running

```bash
# Terminal 1: Start Backend
cd coordinator-node
npm install
npm run dev
# Should run on http://localhost:3000

# Terminal 2: Start Frontend
cd frontend
npm install
npm run dev
# Should run on http://localhost:5173
```

### Access the Learn Page
- **Direct URL**: `http://localhost:5173/learn`
- **Via Navigation**: Click "Learn B.Tech" in the left sidebar

---

## 🎯 Key Features

### 1. Search Functionality
```
Search box filters by:
- Course title
- Description
- Tags/skills
Real-time filtering as you type
```

### 2. Filter by Difficulty
```
Buttons: All Levels | Beginner | Intermediate | Advanced
Visual feedback: Active button highlighted in primary color
```

### 3. Filter by Discipline
```
10 categories including:
- Computer Science
- Electronics & Communication
- Mechanical Engineering
- Data Science & AI
- Cybersecurity
- DevOps & Cloud
- Soft Skills
- Mathematics
- Tools
```

### 4. Course Cards
Each card shows:
- **Image**: Cover with zoom effect on hover
- **Title**: Changes to primary color on hover
- **Description**: Brief overview
- **Difficulty Badge**: Color-coded with emoji
- **Duration**: Time in minutes
- **Tags**: Up to 2 shown, +N for more
- **Details Button**: Expands to show all info
- **Start Button**: Links to lesson

### 5. Statistics Dashboard
- Total courses count
- Filtered results percentage
- Difficulty distribution

---

## 📱 Responsive Breakpoints

| Device | Layout | Columns |
|--------|--------|---------|
| Mobile | Stack | 1 |
| Tablet | Grid | 2 |
| Desktop | Grid | 3 |

All interactive elements scale appropriately for touch devices.

---

## 🎨 Styling & Customization

### Colors (In `tailwind.config.js`)
```javascript
// Primary color for highlights
primary: 'your-color-here'

// Background
slate-950, slate-900

// Text
white, slate-300, slate-400
```

### Difficulty Badges
- **Beginner** (🟢): Success color - green
- **Intermediate** (🟡): Warning color - yellow/amber
- **Advanced** (🔴): Default color - red

---

## 🔗 Integration Points

### API Endpoint
```
GET /catalog
Returns: CatalogItem[]
```

### Navigation
Added to `MainLayout.tsx` navItems:
```javascript
{ 
  path: '/learn', 
  label: 'Learn B.Tech', 
  icon: Sparkles 
}
```

### Routes
```
/learn              -> LearnPage component
/lesson/:id         -> Start course (existing)
```

---

## 💻 Component API

### LearnPage Props
None (uses React Query for data fetching)

### State Management
- `search`: Course search query
- `difficulty`: Selected difficulty level
- `category`: Selected discipline
- `expandedCard`: Currently expanded card ID

### URL Parameters (Optional)
```
?q=search_term
?difficulty=beginner|intermediate|advanced
?category=cse|ece|mech|ds|security|devops|soft-skills|math|tools
```

Example:
```
/learn?q=algorithms&difficulty=intermediate&category=cse
```

---

## 🧪 Testing Checklist

- [ ] All 48 courses display
- [ ] Search filters work correctly
- [ ] Difficulty buttons toggle
- [ ] Category filters work
- [ ] Course cards responsive on mobile
- [ ] Details button expands/collapses
- [ ] Start button links to lesson
- [ ] Empty state shows when no results
- [ ] Clear Filters button resets all
- [ ] Stats update correctly
- [ ] Hover effects work
- [ ] Touch-friendly on mobile
- [ ] No console errors

---

## 🎯 User Stories Implemented

### Story 1: Browse All Courses
```
As a student
I want to see all available B.Tech courses
So that I can explore learning options
```
✅ Hero section shows all 48 courses
✅ Grid layout displays courses
✅ Stats show total count

### Story 2: Search for Courses
```
As a student
I want to search for specific courses
So that I can find relevant learning paths
```
✅ Search bar with real-time filtering
✅ Searches title, description, tags
✅ Results update instantly

### Story 3: Filter by Level
```
As a student
I want to filter courses by difficulty
So that I can start at the right level
```
✅ Difficulty filter buttons
✅ Visual active state
✅ Instant results update

### Story 4: Filter by Discipline
```
As a student
I want to filter by engineering branch
So that I can focus on my specialization
```
✅ 10 discipline categories
✅ Multiple selection support
✅ Clear filtering

### Story 5: View Course Details
```
As a student
I want to see more details about a course
So that I can decide if it matches my needs
```
✅ Expandable card with details
✅ Shows all tags
✅ Shows last updated date

### Story 6: Start Learning
```
As a student
I want to start a course
So that I can begin my learning journey
```
✅ "Start" button on each card
✅ Navigates to lesson player
✅ Passes course ID

---

## 🐛 Common Issues & Solutions

### Issue: Courses not displaying
**Solution**: 
- Verify backend is running on port 3000
- Check `/catalog` endpoint returns data
- Inspect React Query cache in dev tools

### Issue: Search not working
**Solution**:
- Verify data is loaded (check Network tab)
- Check filter logic in useMemo
- Look for TypeScript errors in console

### Issue: Styling looks broken
**Solution**:
- Ensure Tailwind CSS is processing
- Check tailwind.config.js includes all paths
- Clear browser cache and rebuild

### Issue: Navigation link not working
**Solution**:
- Verify route added to AppRouter
- Check NavLink path matches route
- Ensure MainLayout is imported

---

## 📊 Performance Tips

1. **Lazy Loading**: Cards render only when visible
2. **Memoization**: useMemo prevents unnecessary filtering
3. **Image Optimization**: Use placehold.co for placeholders
4. **Bundle Size**: Monitor React Query overhead

---

## 🔐 Security Considerations

- ✅ No sensitive data in client
- ✅ All user input validated
- ✅ Safe React Router usage
- ✅ XSS protection via React JSX

---

## 📚 Resources

### Documentation
- [React Router Docs](https://reactrouter.com)
- [React Query Docs](https://tanstack.com/query)
- [Tailwind CSS Docs](https://tailwindcss.com)
- [Lucide Icons](https://lucide.dev)

### Related Files
- Main Component: `src/pages/LearnPage.tsx`
- Router: `src/routes/AppRouter.tsx`
- Layout: `src/components/layout/MainLayout.tsx`
- Catalog Data: `coordinator-node/src/data/catalog.ts`

---

## ✨ Example: Adding a New Course

```typescript
// In coordinator-node/src/data/catalog.ts
{
  id: 'new-course-id',
  title: 'New Course Title',
  description: 'Brief description of the course',
  tags: ['tag1', 'tag2', 'tag3'],
  difficulty: 'intermediate', // or 'beginner' or 'advanced'
  duration: 150, // minutes
  coverImage: cover('Course Name'),
  lastUpdated: new Date().toISOString(),
}
```

---

## 🎓 Learning Outcomes

After implementing this page, you understand:
- ✅ Building responsive React components
- ✅ Using React Query for data fetching
- ✅ Filtering and searching techniques
- ✅ Card-based UI patterns
- ✅ Tailwind CSS for styling
- ✅ TypeScript in React
- ✅ Accessibility best practices
- ✅ UX/UI design principles

---

Last Updated: November 8, 2025
Version: 1.0
Status: ✅ Production Ready
