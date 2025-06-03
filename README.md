# Real-Time Collaborative Document Editor

**COMPANY:** CODTECH IT SOLUTIONS  
**NAME:** DISHA J KOTIAN  
**INTERN ID:** CT04DN1299  
**DOMAIN:** FULL STACK WEB DEVELOPMENT  
**DURATION:** 4 WEEEKS  
**MENTOR:** NEELA SANTOSH  

## 1. Project Overview  
A web-based real-time collaborative editor where multiple users can create and edit documents simultaneously. Built with Y.js, TipTap, and WebSockets, it offers seamless syncing, user presence, and a responsive interface.

## 2. Key Features  

### 2.1 Real-Time Collaboration  
- Live editing across multiple users  
- Instant syncing of content and cursors  
- Awareness API for presence and cursor tracking  
- Conflict-free editing (CRDT via Y.js)  

### 2.2 Rich Text Editing  
- WYSIWYG interface using TipTap  
- Formatting: bold, italic, lists, headings, links  
- Undo/Redo and auto-save support  

### 2.3 Document Management  
- Dashboard to view, create, delete documents  
- Real-time collaborator count  
- Display of last edited time  

### 2.4 Responsive UI  
- Built with Tailwind CSS  
- Mobile friendly, dark/light mode  
- Smooth animations and tooltips  

## 3. Technologies Used  

### Frontend  
- **Next.js 14**, **React 18+**, **TypeScript**  
- **Tailwind CSS**, **shadcn/ui**, **Lucide React**  

### Editor  
- **TipTap** (ProseMirror-based)  
- **Y.js** integration for CRDT and syncing  
- **Collaboration cursors plugin**  

### Real-Time Sync  
- **y-websocket** server  
- **Awareness API** for presence  
- **Next.js API routes** for document handling  

### Database (Optional)  
- **MongoDB** for storing documents  
- Indexed queries and JSON schemas  

### Dev Tools  
- ESLint, Prettier, custom TS and Tailwind configs  

## 4. Use Case Scenarios  
- Remote teams collaborating on docs  
- Students sharing lecture notes  
- Writers co-authoring content  
- Agile teams updating live documentation  

## 5. 📸 Output

![Real time document editor Screenshot](https://github.com/DishaKotian/Document-Editor/blob/main/IMG-20250527-WA0006.jpg?raw=true)  
## 6. Installation Guide  

```bash
git clone https://github.com/your-username/realtime-doc-editor.git
cd realtime-doc-editor

# Install dependencies
npm install

# Add environment config
touch .env.local
# (Add MONGODB_URI or other variables)

# Run development server
npm run dev

# Build for production
npm run build
npm start
