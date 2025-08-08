# 📁 File Upload Functionality - CrisisBoard

## 🎯 Overview

The file upload functionality in CrisisBoard allows students to attach multimedia files to their complaints, enhancing issue documentation and enabling faster resolution by providing visual evidence and detailed context.

## ✨ Features Implemented

### 🎨 User Interface
- **Drag & Drop Zone**: Intuitive file upload area with visual feedback
- **File Preview Grid**: Thumbnail view of selected files with file information
- **Progress Indicators**: Real-time upload progress with percentage display
- **File Management**: Individual file removal and bulk clear functionality
- **Responsive Design**: Works seamlessly on desktop and mobile devices

### 🔧 Technical Features
- **File Validation**: Type and size validation with user-friendly error messages
- **Multiple File Support**: Upload up to 10 files simultaneously
- **File Type Support**: Images, PDFs, Documents, Audio, and Video files
- **Size Limits**: 5MB per file, 20MB total limit
- **Security**: Client-side validation and file type restrictions

### 🎭 User Experience
- **Visual Feedback**: Hover effects, animations, and status notifications
- **Error Handling**: Clear error messages for invalid files
- **Progress Tracking**: Real-time upload progress simulation
- **Dark Mode Support**: Full compatibility with theme switching

## 📋 Supported File Types

| Category | File Types | Extensions |
|----------|------------|------------|
| **Images** | JPEG, PNG, GIF, WebP | `.jpg`, `.jpeg`, `.png`, `.gif`, `.webp` |
| **Documents** | PDF, Word Documents | `.pdf`, `.doc`, `.docx` |
| **Audio** | MP3, WAV, AAC | `.mp3`, `.wav`, `.aac` |
| **Video** | MP4, AVI, MOV | `.mp4`, `.avi`, `.mov` |

## 🛠️ Technical Implementation

### File Upload Configuration
```javascript
const allowedTypes = [
  'image/jpeg', 'image/png', 'image/gif', 'image/webp',
  'application/pdf',
  'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'audio/mpeg', 'audio/wav', 'audio/mp3', 'audio/aac',
  'video/mp4', 'video/avi', 'video/mov', 'video/quicktime'
];

const maxFileSize = 5 * 1024 * 1024; // 5MB per file
const maxTotalSize = 20 * 1024 * 1024; // 20MB total
const maxFiles = 10; // Maximum number of files
```

### Key Functions

#### File Validation
```javascript
function validateFile(file) {
  const errors = [];
  
  // Check file type
  if (!allowedTypes.includes(file.type)) {
    errors.push(`File type not allowed: ${file.name}`);
  }
  
  // Check file size
  if (file.size > maxFileSize) {
    errors.push(`File too large: ${file.name} (${formatFileSize(file.size)})`);
  }
  
  // Check for duplicates
  if (selectedFiles.some(f => f.name === file.name && f.size === file.size)) {
    errors.push(`File already selected: ${file.name}`);
  }
  
  return errors;
}
```

#### File Preview Management
```javascript
function updateFilePreview() {
  filePreviewGrid.innerHTML = '';
  
  selectedFiles.forEach((file, idx) => {
    const fileDiv = document.createElement('div');
    fileDiv.className = 'file-preview-item bg-white rounded-lg p-3 shadow-md border border-gray-200';
    
    const icon = getFileIcon(file);
    const isImage = file.type.startsWith('image/');
    
    // Create preview with thumbnail for images, icon for other files
    // Add remove button and file information
  });
}
```

#### Drag and Drop Handling
```javascript
function handleDrop(e) {
  e.preventDefault();
  e.stopPropagation();
  fileUploadArea.classList.remove('drag-over');
  
  const files = e.dataTransfer.files;
  if (files.length > 0) {
    processFiles(files);
  }
}
```

## 🎨 UI/UX Design Features

### Visual Enhancements
- **Hover Effects**: Files lift and show remove button on hover
- **Drag Feedback**: Upload area highlights when dragging files over
- **File Icons**: Appropriate emoji icons for different file types
- **Progress Animation**: Smooth progress bar with percentage display
- **Notifications**: Toast-style notifications for user feedback

### Responsive Design
- **Grid Layout**: Responsive grid that adapts to screen size
- **Mobile Optimized**: Touch-friendly interface for mobile devices
- **Dark Mode**: Full dark mode support with proper contrast

## 🔒 Security Features

### Client-Side Validation
- File type validation using MIME types
- File size limits enforced
- Duplicate file detection
- Maximum file count enforcement

### User Experience Safety
- Clear error messages for invalid files
- Graceful handling of unsupported file types
- Progress indication to prevent multiple submissions

## 🚀 Usage Instructions

### For Users
1. **Drag & Drop**: Simply drag files from your computer to the upload area
2. **Browse Files**: Click the upload area or "browse" link to select files
3. **Preview**: See thumbnails and file information for selected files
4. **Remove Files**: Click the "✕" button on any file to remove it
5. **Clear All**: Use "Clear All" button to remove all files at once
6. **Submit**: Files will be uploaded when you submit the complaint

### For Developers
1. **Install Dependencies**: `npm install`
2. **Start Development Server**: `npm run dev`
3. **Open Browser**: Navigate to `http://localhost:3000`
4. **Test File Upload**: Try uploading various file types and sizes

## 🔧 Customization

### Adding New File Types
```javascript
// Add new MIME types to allowedTypes array
const allowedTypes = [
  // ... existing types
  'application/vnd.ms-excel', // Excel files
  'text/plain' // Text files
];
```

### Modifying Size Limits
```javascript
const maxFileSize = 10 * 1024 * 1024; // Increase to 10MB per file
const maxTotalSize = 50 * 1024 * 1024; // Increase to 50MB total
const maxFiles = 20; // Increase to 20 files
```

### Custom File Icons
```javascript
const fileTypeIcons = {
  // ... existing icons
  'application/vnd.ms-excel': '📊',
  'text/plain': '📄'
};
```

## 🧪 Testing

### Manual Testing Checklist
- [ ] Drag and drop functionality
- [ ] File browser selection
- [ ] File type validation
- [ ] File size validation
- [ ] Duplicate file detection
- [ ] File removal (individual and bulk)
- [ ] Progress indication
- [ ] Error message display
- [ ] Dark mode compatibility
- [ ] Mobile responsiveness

### Test File Types
- Images: JPG, PNG, GIF, WebP
- Documents: PDF, DOC, DOCX
- Audio: MP3, WAV
- Video: MP4, AVI, MOV
- Invalid: EXE, ZIP, TXT (if not allowed)

## 🐛 Known Issues & Limitations

### Current Limitations
- **Client-side Only**: File upload is simulated (no actual backend integration)
- **Browser Storage**: Files are stored in memory only
- **No Persistence**: Files are lost on page refresh

### Planned Improvements
- **Backend Integration**: Connect to Firebase Storage or similar
- **File Compression**: Automatic image compression for large files
- **Batch Upload**: Optimize multiple file uploads
- **File Preview**: Enhanced preview for documents and videos

## 📚 Dependencies

### Frontend Libraries
- **Tailwind CSS**: Styling and responsive design
- **Vanilla JavaScript**: Core functionality
- **HTML5 File API**: File handling and drag & drop

### Development Tools
- **http-server**: Local development server
- **Node.js**: Runtime environment

## 🤝 Contributing

### File Upload Related Issues
- Add new file type support
- Improve upload performance
- Enhance error handling
- Add file compression
- Implement backend integration

### Code Style
- Follow existing JavaScript patterns
- Use descriptive function and variable names
- Add comments for complex logic
- Maintain responsive design principles

## 📄 License

This file upload functionality is part of the CrisisBoard project and is licensed under the MIT License.

---

**Note**: This implementation provides a complete file upload experience with modern UI/UX patterns. The actual file storage and backend integration can be added later when connecting to Firebase or other cloud storage services. 