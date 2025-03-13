// AI Website Generator Tool JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const userPromptInput = document.getElementById('user-prompt');
    const professionSelect = document.getElementById('profession');
    const colorOptions = document.querySelectorAll('.color-option');
    const layoutOptions = document.querySelectorAll('.layout-option');
    const generateBtn = document.getElementById('generate-btn');
    const previewSection = document.getElementById('preview');
    const htmlCodeBlock = document.getElementById('html-code');
    const cssCodeBlock = document.getElementById('css-code');
    const readmeCodeBlock = document.getElementById('readme-code');
    const downloadBtn = document.getElementById('download-btn');
    const copyBtn = document.getElementById('copy-btn');
    const previewBtn = document.getElementById('preview-btn');
    const tabBtns = document.querySelectorAll('.tab-btn');
    const codeBlocks = document.querySelectorAll('.code-block');
    const previewModal = document.getElementById('preview-modal');
    const previewFrame = document.getElementById('preview-frame');
    const closeModal = document.querySelector('.close-modal');
    const templateBtns = document.querySelectorAll('.use-template');

    // State variables
    let selectedColor = '#4A90E2';
    let selectedLayout = 'minimal';
    let generatedHTML = '';
    let generatedCSS = '';
    let generatedReadme = '';
    
    // Set first color option as active
    colorOptions[0].classList.add('active');

    // Event Listeners
    colorOptions.forEach(option => {
        option.addEventListener('click', function() {
            colorOptions.forEach(o => o.classList.remove('active'));
            this.classList.add('active');
            selectedColor = this.getAttribute('data-color');
        });
    });

    layoutOptions.forEach(option => {
        option.addEventListener('click', function() {
            layoutOptions.forEach(o => o.classList.remove('active'));
            this.classList.add('active');
            selectedLayout = this.getAttribute('data-layout');
        });
    });

    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            tabBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            const tabName = this.getAttribute('data-tab');
            codeBlocks.forEach(block => block.classList.remove('active'));
            document.getElementById(tabName + '-code').classList.add('active');
        });
    });

    generateBtn.addEventListener('click', generateWebsite);
    
    downloadBtn.addEventListener('click', downloadFiles);
    
    copyBtn.addEventListener('click', copyCurrentCode);
    
    previewBtn.addEventListener('click', showPreview);
    
    closeModal.addEventListener('click', function() {
        previewModal.style.display = 'none';
    });
    
    window.addEventListener('click', function(event) {
        if (event.target === previewModal) {
            previewModal.style.display = 'none';
        }
    });
    
    templateBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const templateId = this.getAttribute('data-template');
            const templatePrompt = document.getElementById('template-' + templateId).getAttribute('data-prompt');
            userPromptInput.value = templatePrompt;
            
            // Set profession based on template
            if (templateId === 'designer') {
                professionSelect.value = 'designer';
            } else if (templateId === 'developer') {
                professionSelect.value = 'developer';
            } else if (templateId === 'photographer') {
                professionSelect.value = 'photographer';
            }
            
            // Scroll to generator section
            document.getElementById('generator').scrollIntoView({ behavior: 'smooth' });
        });
    });

    // Functions
    function generateWebsite() {
        const prompt = userPromptInput.value.trim();
        if (!prompt) {
            alert('Please enter a description for your portfolio website.');
            return;
        }
        
        // Show loading state
        generateBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Generating...';
        generateBtn.disabled = true;
        
        // In a real implementation, this would call an AI API
        // For demo purposes, we'll simulate the generation process
        setTimeout(() => {
            // Generate the website content based on the inputs
            const profession = professionSelect.value;
            const result = generateContent(prompt, profession, selectedColor, selectedLayout);
            
            // Display the generated code
            htmlCodeBlock.textContent = result.html;
            cssCodeBlock.textContent = result.css;
            readmeCodeBlock.textContent = result.readme;
            
            // Store generated content
            generatedHTML = result.html;
            generatedCSS = result.css;
            generatedReadme = result.readme;
            
            // Show the preview section
            previewSection.classList.remove('hidden');
            
            // Reset button state
            generateBtn.innerHTML = '<i class="fas fa-magic"></i> Generate Website';
            generateBtn.disabled = false;
            
            // Scroll to preview section
            previewSection.scrollIntoView({ behavior: 'smooth' });
        }, 2000);
    }
    
    function generateContent(prompt, profession, color, layout) {
        // This is a simplified demo function that returns pre-generated content
        // In a real implementation, this would call an AI service
        
        // Extract a name from the prompt or use a default
        let name = "Portfolio";
        const nameMatch = prompt.match(/for\s+a\s+\w+\s+named\s+(\w+)/i);
        if (nameMatch && nameMatch[1]) {
            name = nameMatch[1];
        }
        
        // Extract years of experience or use a default
        let experience = "3";
        const expMatch = prompt.match(/(\d+)\s+years?\s+of\s+experience/i);
        if (expMatch && expMatch[1]) {
            experience = expMatch[1];
        }
        
        // Generate HTML with color and layout variations
        const html = generateHTML(name, profession, experience, color, layout);
        
        // Generate CSS with color and layout variations
        const css = generateCSS(color, layout);
        
        // Generate README
        const readme = generateReadme(name, profession);
        
        return {
            html: html,
            css: css,
            readme: readme
        };
    }
    
    function generateHTML(name, profession, experience, color, layout) {
        // This would be the actual HTML generation
        // For demo purposes, we're using the template HTML with some basic replacements
        
        let professionTitle;
        switch (profession) {
            case 'designer':
                professionTitle = 'Graphic Designer';
                break;
            case 'developer':
                professionTitle = 'Web Developer';
                break;
            case 'photographer':
                professionTitle = 'Photographer';
                break;
            case 'writer':
                professionTitle = 'Content Writer';
                break;
            case 'artist':
                professionTitle = 'Artist';
                break;
            default:
                professionTitle = 'Professional';
        }
        
        // Return the HTML template from the existing portfolio example
        // with replaced values based on the user input
        return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${name}'s Portfolio | ${professionTitle}</title>
    <link rel="stylesheet" href="styles.css">
    <!-- Google Fonts -->
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;700&display=swap" rel="stylesheet">
</head>
<body>
    <!-- Header Section -->
    <header>
        <div class="container">
            <nav>
                <div class="logo">${name}</div>
                <ul class="nav-links">
                    <li><a href="#about">About</a></li>
                    <li><a href="#projects">Projects</a></li>
                    <li><a href="#media">Media</a></li>
                    <li><a href="#contact">Contact</a></li>
                </ul>
            </nav>
            
            <div class="hero">
                <!-- Placeholder for profile image -->
                <div class="profile-image-container">
                    <!-- CUSTOMIZATION: Replace with your profile image -->
                    <div class="profile-placeholder">
                        <span>Profile Image</span>
                        <small>Click to upload (300x300px recommended)</small>
                    </div>
                </div>
                <h1>Hi, I'm ${name} – Creative ${professionTitle}</h1>
                <p class="tagline">Turning ideas into ${profession === 'designer' ? 'visual stories' : 
                                   profession === 'developer' ? 'functional websites' : 
                                   profession === 'photographer' ? 'captivating images' : 
                                   profession === 'writer' ? 'compelling content' : 
                                   profession === 'artist' ? 'beautiful art' : 'amazing creations'}</p>
            </div>
        </div>
    </header>

    <!-- About Section -->
    <section id="about" class="about">
        <div class="container">
            <h2>About Me</h2>
            <div class="about-content">
                <p>I'm a passionate ${professionTitle.toLowerCase()} with ${experience} years of experience creating ${profession === 'designer' ? 'compelling visual identities and digital assets' : 
                                   profession === 'developer' ? 'responsive websites and web applications' : 
                                   profession === 'photographer' ? 'stunning portraits and landscapes' : 
                                   profession === 'writer' ? 'engaging articles and copy' : 
                                   profession === 'artist' ? 'unique artwork and illustrations' : 'professional projects'}.
                   My approach combines creativity with strategic thinking to deliver results that not only look great but also effectively communicate my clients' messages.</p>
                <p>With a background in ${profession === 'designer' ? 'fine arts and digital media' : 
                                   profession === 'developer' ? 'computer science and design' : 
                                   profession === 'photographer' ? 'visual arts and composition' : 
                                   profession === 'writer' ? 'journalism and creative writing' : 
                                   profession === 'artist' ? 'classical and modern techniques' : 'my field'}, 
                   I bring a unique perspective to each project. I believe in the power of ${layout === 'minimal' ? 'clean, purposeful design' : 
                                   layout === 'creative' ? 'creative, innovative solutions' : 'modern, effective approaches'} to elevate brands and engage audiences.</p>
                <div class="skills">
                    <h3>Skills</h3>
                    <ul>
                        ${generateSkillsList(profession)}
                    </ul>
                </div>
            </div>
        </div>
    </section>

    <!-- Projects Section -->
    <section id="projects" class="projects">
        <div class="container">
            <h2>My Projects</h2>
            <div class="project-grid">
                <!-- Project 1 -->
                <div class="project-card">
                    <!-- CUSTOMIZATION: Replace with project image -->
                    <div class="project-image-placeholder">
                        <span>Project Image</span>
                        <small>Click to upload (800x500px recommended)</small>
                    </div>
                    <h3>${generateProjectTitle(profession, 1)}</h3>
                    <p>${generateProjectDescription(profession, 1)}</p>
                    <div class="project-tags">
                        ${generateProjectTags(profession, 1)}
                    </div>
                </div>
                
                <!-- Project 2 -->
                <div class="project-card">
                    <!-- CUSTOMIZATION: Replace with project image -->
                    <div class="project-image-placeholder">
                        <span>Project Image</span>
                        <small>Click to upload (800x500px recommended)</small>
                    </div>
                    <h3>${generateProjectTitle(profession, 2)}</h3>
                    <p>${generateProjectDescription(profession, 2)}</p>
                    <div class="project-tags">
                        ${generateProjectTags(profession, 2)}
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Media Gallery Section -->
    <section id="media" class="media">
        <div class="container">
            <h2>Media Gallery</h2>
            <p class="section-intro">A showcase of my creative work including images, videos, and process documentation.</p>
            
            <!-- Gallery Layout Controls -->
            <div class="gallery-controls">
                <button class="gallery-btn active" data-layout="grid">Grid View</button>
                <button class="gallery-btn" data-layout="masonry">Masonry View</button>
                <button class="gallery-btn" data-layout="carousel">Carousel View</button>
            </div>
            
            <!-- Media Gallery Grid -->
            <div class="media-gallery grid-layout">
                <!-- Image Item 1 -->
                <div class="media-item image-item">
                    <!-- CUSTOMIZATION: Replace with your media -->
                    <div class="media-placeholder">
                        <span>Image</span>
                        <small>Click to upload</small>
                    </div>
                    <div class="media-caption">${generateMediaCaption(profession, 1)}</div>
                </div>
                
                <!-- Image Item 2 -->
                <div class="media-item image-item">
                    <!-- CUSTOMIZATION: Replace with your media -->
                    <div class="media-placeholder">
                        <span>Image</span>
                        <small>Click to upload</small>
                    </div>
                    <div class="media-caption">${generateMediaCaption(profession, 2)}</div>
                </div>
                
                <!-- Video Item 1 -->
                <div class="media-item video-item">
                    <!-- CUSTOMIZATION: Replace with your video embed code -->
                    <div class="video-placeholder">
                        <span>Video</span>
                        <small>Paste embed code here</small>
                    </div>
                    <div class="media-caption">${generateMediaCaption(profession, 3)}</div>
                </div>
                
                <!-- Add Media Button -->
                <div class="media-item add-media-item">
                    <div class="add-media-btn">
                        <span>+</span>
                        <small>Add Media</small>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Contact Section -->
    <section id="contact" class="contact">
        <div class="container">
            <h2>Get In Touch</h2>
            <p class="contact-intro">Interested in working together? I'm always open to discussing new projects and opportunities.</p>
            
            <div class="contact-details">
                <div class="contact-item">
                    <h3>Email</h3>
                    <p><a href="mailto:${name.toLowerCase()}@example.com">${name.toLowerCase()}@example.com</a></p>
                </div>
                
                <div class="contact-item">
                    <h3>Social Media</h3>
                    <div class="social-links">
                        <a href="#" class="social-link">Instagram</a>
                        <a href="#" class="social-link">LinkedIn</a>
                        <a href="#" class="social-link">${profession === 'designer' || profession === 'artist' ? 'Behance' : 
                                                       profession === 'developer' ? 'GitHub' : 
                                                       profession === 'photographer' ? 'Flickr' : 
                                                       profession === 'writer' ? 'Medium' : 'Portfolio'}</a>
                    </div>
                </div>
            </div>
            
            <div class="contact-form">
                <h3>Send Me a Message</h3>
                <form>
                    <div class="form-group">
                        <label for="name">Name</label>
                        <input type="text" id="name" name="name" required>
                    </div>
                    
                    <div class="form-group">
                        <label for="email">Email</label>
                        <input type="email" id="email" name="email" required>
                    </div>
                    
                    <div class="form-group">
                        <label for="message">Message</label>
                        <textarea id="message" name="message" rows="5" required></textarea>
                    </div>
                    
                    <button type="submit" class="btn">Send Message</button>
                </form>
            </div>
        </div>
    </section>

    <!-- Footer -->
    <footer>
        <div class="container">
            <p>&copy; ${new Date().getFullYear()} ${name} | ${professionTitle}</p>
        </div>
    </footer>

    <!-- CUSTOMIZATION: Add your JavaScript here -->
    <script>
        // Simple gallery layout switcher
        document.addEventListener('DOMContentLoaded', function() {
            const galleryBtns = document.querySelectorAll('.gallery-btn');
            const mediaGallery = document.querySelector('.media-gallery');
            
            galleryBtns.forEach(btn => {
                btn.addEventListener('click', function() {
                    // Remove active class from all buttons
                    galleryBtns.forEach(b => b.classList.remove('active'));
                    // Add active class to clicked button
                    this.classList.add('active');
                    
                    // Remove all layout classes from gallery
                    mediaGallery.classList.remove('grid-layout', 'masonry-layout', 'carousel-layout');
                    
                    // Add selected layout class
                    const layout = this.getAttribute('data-layout');
                    mediaGallery.classList.add(layout + '-layout');
                });
            });
            
            // Placeholder for file upload simulation
            const placeholders = document.querySelectorAll('.profile-placeholder, .project-image-placeholder, .media-placeholder');
            placeholders.forEach(placeholder => {
                placeholder.addEventListener('click', function() {
                    alert('In a real implementation, this would open a file upload dialog. To add your image, replace this placeholder with an <img> tag pointing to your image file.');
                });
            });
        });
    </script>
</body>
</html>`;
    }
    
    function generateCSS(color, layout) {
        // Basic CSS generation with customization based on selected color and layout
        const customCSS = `/* 
* ${layout === 'minimal' ? 'Minimal' : layout === 'creative' ? 'Creative' : 'Modern'} Portfolio Website
* A clean, professional design for showcasing your work
*/

/* ==== Base Styles ==== */
:root {
    --primary-color: ${color};
    --secondary-color: #f8f8f8;
    --accent-color: ${getAccentColor(color)};
    --text-color: #333333;
    --light-gray: #e0e0e0;
    --dark-gray: #555555;
    --spacing-sm: 1rem;
    --spacing-md: 2rem;
    --spacing-lg: 4rem;
    --border-radius: ${layout === 'minimal' ? '4px' : layout === 'creative' ? '8px' : '6px'};
    --transition: all 0.3s ease;
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

html {
    scroll-behavior: smooth;
}

body {
    font-family: 'Poppins', sans-serif;
    line-height: 1.6;
    color: var(--text-color);
    background-color: #ffffff;
}

.container {
    width: 85%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1rem;
}

h1, h2, h3 {
    font-weight: 700;
    line-height: 1.2;
    margin-bottom: var(--spacing-sm);
}

h1 {
    font-size: 2.5rem;
}

h2 {
    font-size: 2rem;
    position: relative;
    display: inline-block;
    margin-bottom: var(--spacing-md);
}

h2::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: -10px;
    width: 60px;
    height: 3px;
    background-color: var(--primary-color);
}

h3 {
    font-size: 1.5rem;
}

p {
    margin-bottom: var(--spacing-sm);
}

a {
    color: var(--primary-color);
    text-decoration: none;
    transition: var(--transition);
}

a:hover {
    color: var(--accent-color);
}

section {
    padding: var(--spacing-lg) 0;
}

.section-intro {
    max-width: 700px;
    margin-bottom: var(--spacing-md);
}

ul {
    list-style-type: none;
}

img {
    max-width: 100%;
    height: auto;
}

/* Rest of the CSS would be here... */

/* Custom styles based on selected layout */
${layout === 'creative' ? 
`/* Creative Layout Customizations */
.project-card, .media-item, .contact-item, .skills {
    border-radius: 15px;
    overflow: hidden;
}

.hero h1 {
    background: linear-gradient(to right, var(--primary-color), var(--accent-color));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}

.profile-image-container {
    border: 5px solid var(--primary-color);
}` : 
layout === 'modern' ? 
`/* Modern Layout Customizations */
.project-card, .media-item, .contact-item, .skills {
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
    transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.project-card:hover, .media-item:hover {
    transform: translateY(-10px) scale(1.02);
}

nav {
    background-color: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(10px);
    padding: 1rem;
    border-radius: 50px;
    margin-top: 1rem;
}` : 
`/* Minimal Layout Customizations */
.container {
    max-width: 1000px;
}

h2::after {
    height: 2px;
    width: 40px;
}

.project-card, .media-item, .contact-item, .skills {
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
}`}

/* The rest of the CSS file would be here... */`;

        return customCSS;
    }
    
    function generateReadme(name, profession) {
        return `# ${name}'s Portfolio Website

This is a simple, clean, and responsive portfolio website template for a ${profession}. The website showcases ${name}'s profile, skills, projects, and contact information.

## Project Structure

- \`index.html\` - The main HTML file containing the website structure and content
- \`styles.css\` - The CSS file for styling the website
- \`README.md\` - This file with instructions

## Features

- Clean, modern design with a minimalist aesthetic
- Fully responsive layout that works on mobile, tablet, and desktop
- Sections for about, projects, and contact information
- **Customizable media gallery** with support for images and videos
- **Multiple layout options** for displaying media (grid, masonry, carousel)
- Placeholder spots for media with clear upload instructions
- Contact form (frontend only, no backend functionality)
- Smooth scrolling navigation

## How to Use

### Opening the Website Locally

1. Download or clone all the files in this repository to your local machine.
2. Open the \`index.html\` file in any modern web browser (Chrome, Firefox, Safari, Edge, etc.).
3. The website should load immediately, and you can navigate through it.

### Customizing the Website

You can easily customize this website to fit your needs:

1. **Content**: Edit the text in \`index.html\` to replace the placeholder content with your own information.

2. **Images**: Replace the placeholder image sections with actual images:
   - For the profile picture, add your image to the project folder and update the profile-image-container div.
   - For project images, add your project images and update the project-image-placeholder divs.

3. **Colors**: Modify the color scheme by changing the CSS variables in the \`:root\` section of \`styles.css\`.

4. **Fonts**: The website uses Google Fonts (Poppins). You can change this by updating the font import in the \`<head>\` section of \`index.html\` and updating the \`font-family\` property in \`styles.css\`.

### Adding Media to the Gallery

Check the documentation for detailed instructions on how to add and customize your media gallery.

## Deploying to GitHub Pages

This website is ready to be deployed to GitHub Pages. Follow these steps:

1. Make sure your repository is set up correctly on GitHub.
2. Go to your repository's "Settings" tab.
3. Scroll down to the "GitHub Pages" section.
4. Under "Source", select "main" branch and click "Save".
5. Your website will be available at \`https://your-username.github.io/repository-name/\`.

## License

This project is open source and available for personal and commercial use.

## Credits

- Generated using AI Website Generator
- Fonts: [Google Fonts - Poppins](https://fonts.google.com/specimen/Poppins)

---

Happy coding!`;
    }
    
    function generateSkillsList(profession) {
        const skills = {
            'designer': [
                'Brand Identity Design',
                'Digital Illustration',
                'UI/UX Design',
                'Adobe Creative Suite',
                'Typography'
            ],
            'developer': [
                'Front-end Development (HTML, CSS, JavaScript)',
                'React.js / Vue.js',
                'Responsive Web Design',
                'Back-end Development',
                'API Integration'
            ],
            'photographer': [
                'Portrait Photography',
                'Landscape Photography',
                'Adobe Lightroom & Photoshop',
                'Studio Lighting',
                'Composition & Framing'
            ],
            'writer': [
                'Content Strategy',
                'Copywriting',
                'SEO Writing',
                'Blog Content',
                'Editorial Writing'
            ],
            'artist': [
                'Traditional Painting',
                'Digital Art',
                'Sculpture',
                'Mixed Media',
                'Conceptual Design'
            ],
            'other': [
                'Project Management',
                'Client Communication',
                'Problem Solving',
                'Attention to Detail',
                'Creative Thinking'
            ]
        };
        
        const skillList = skills[profession] || skills['other'];
        return skillList.map(skill => `<li>${skill}</li>`).join('\n                        ');
    }
    
    function generateProjectTitle(profession, number) {
        const titles = {
            'designer': [
                'Brand Identity for Artisan Coffee Shop',
                'UI Design for Wellness Application'
            ],
            'developer': [
                'E-commerce Website Redesign',
                'Interactive Dashboard Application'
            ],
            'photographer': [
                'Urban Landscapes Collection',
                'Corporate Portrait Series'
            ],
            'writer': [
                'Content Strategy for Tech Startup',
                'Blog Series for Health & Wellness Brand'
            ],
            'artist': [
                'Mixed Media Exhibition: "Nature\'s Patterns"',
                'Digital Art Series: "Urban Dreams"'
            ],
            'other': [
                'Client Project: Strategic Rebrand',
                'Personal Project: Creative Exploration'
            ]
        };
        
        const projectTitles = titles[profession] || titles['other'];
        return projectTitles[number - 1] || `Project ${number}`;
    }
    
    function generateProjectDescription(profession, number) {
        const descriptions = {
            'designer': [
                'Created a complete brand identity for a local artisan coffee shop. The project included logo design, packaging, menus, and signage. The design uses warm earthy tones and organic shapes to reflect the shop\'s commitment to sustainable, locally-sourced products.',
                'Designed the user interface for a mobile wellness application focused on meditation and mindfulness. The clean, minimalist design uses a calming color palette and intuitive navigation to create a soothing user experience that aligns with the app\'s purpose.'
            ],
            'developer': [
                'Completely rebuilt an e-commerce website with a focus on performance and mobile responsiveness. Implemented custom shopping cart functionality, product filtering, and integrated with payment APIs. The result was a 40% increase in mobile conversions.',
                'Built an interactive dashboard application that visualizes complex data sets in real-time. Used React for the frontend with D3.js for data visualization, and Node.js for the backend. The application features customizable charts and export options.'
            ],
            'photographer': [
                'A collection of urban landscape photographs capturing the interplay of architecture, light, and human elements in cities around the world. Shot over the course of a year using natural light to highlight the changing seasons.',
                'A series of professional portraits for executives and team members at a tech company. Created a consistent yet personalized look that reflected both individual personalities and the company\'s brand identity.'
            ],
            'writer': [
                'Developed and implemented a comprehensive content strategy for a tech startup launching a new SaaS product. Created website copy, blog posts, social media content, and email campaigns that increased user signups by 35%.',
                'Wrote a series of in-depth articles on health and wellness topics for a brand\'s blog. Conducted research, interviewed experts, and created engaging, scientifically-accurate content that positioned the brand as a thought leader.'
            ],
            'artist': [
                'A series of mixed media works exploring patterns found in nature. Combined traditional painting techniques with natural materials and digital elements to create textured pieces that invite viewer interaction.',
                'Digital art series exploring the intersection of urban environments and dreamscapes. Used a combination of photography, digital painting, and procedural generation to create surreal cityscapes.'
            ],
            'other': [
                'Led a strategic rebranding project for a client transitioning from a local to a national market. Developed a comprehensive brand strategy, visual identity, and implementation plan that positioned the client for successful expansion.',
                'Personal creative project exploring new techniques and approaches. This self-directed work allowed for experimentation and innovation, resulting in fresh perspectives that influenced client work.'
            ]
        };
        
        const projectDescriptions = descriptions[profession] || descriptions['other'];
        return projectDescriptions[number - 1] || `Description for Project ${number}`;
    }
    
    function generateProjectTags(profession, number) {
        const tags = {
            'designer': [
                '<span>Branding</span><span>Logo Design</span><span>Packaging</span>',
                '<span>UI Design</span><span>Mobile App</span><span>UX</span>'
            ],
            'developer': [
                '<span>E-commerce</span><span>Responsive</span><span>Frontend</span>',
                '<span>React</span><span>Data Visualization</span><span>API Integration</span>'
            ],
            'photographer': [
                '<span>Urban</span><span>Architecture</span><span>Natural Light</span>',
                '<span>Corporate</span><span>Portrait</span><span>Studio</span>'
            ],
            'writer': [
                '<span>Content Strategy</span><span>SEO</span><span>Web Copy</span>',
                '<span>Blog Series</span><span>Research</span><span>Health</span>'
            ],
            'artist': [
                '<span>Mixed Media</span><span>Nature</span><span>Texture</span>',
                '<span>Digital Art</span><span>Urban</span><span>Surrealism</span>'
            ],
            'other': [
                '<span>Strategy</span><span>Branding</span><span>Marketing</span>',
                '<span>Creative</span><span>Experimental</span><span>Innovation</span>'
            ]
        };
        
        const projectTags = tags[profession] || tags['other'];
        return projectTags[number - 1] || `<span>Tag 1</span><span>Tag 2</span><span>Tag 3</span>`;
    }
    
    function generateMediaCaption(profession, number) {
        const captions = {
            'designer': [
                'Initial Sketches',
                'Color Palette Exploration',
                'Design Process Timelapse',
                'Final Mockup'
            ],
            'developer': [
                'Wireframing Stage',
                'Component Architecture',
                'Coding Session Highlights',
                'Final Application Demo'
            ],
            'photographer': [
                'Behind the Scenes Setup',
                'Raw vs Edited Comparison',
                'Location Scouting',
                'Final Selected Images'
            ],
            'writer': [
                'Research Notes',
                'Content Structure Planning',
                'Writing Process',
                'Published Article Feature'
            ],
            'artist': [
                'Initial Concept Sketches',
                'Work in Progress',
                'Studio Setup',
                'Exhibition Opening'
            ],
            'other': [
                'Project Planning Phase',
                'Research & Development',
                'Implementation Process',
                'Final Outcome'
            ]
        };
        
        const mediaCaptions = captions[profession] || captions['other'];
        return mediaCaptions[(number - 1) % mediaCaptions.length] || `Media Item ${number}`;
    }
    
    function getAccentColor(primaryColor) {
        // This function returns a complementary or accent color based on the primary color
        // For demo purposes, we'll use a simple mapping
        const colorMap = {
            '#4A90E2': '#FF6B6B', // Blue to red
            '#50C878': '#9B59B6', // Green to purple
            '#FF6B6B': '#4A90E2', // Red to blue
            '#9B59B6': '#50C878', // Purple to green
            '#34495E': '#F1C40F'  // Dark blue to yellow
        };
        
        return colorMap[primaryColor] || '#FF6B6B';
    }
    
    function downloadFiles() {
        // Create HTML file
        createAndDownloadFile('index.html', generatedHTML);
        
        // Create CSS file
        createAndDownloadFile('styles.css', generatedCSS);
        
        // Create README file
        createAndDownloadFile('README.md', generatedReadme);
        
        // You could also create a ZIP of all files, but that requires additional libraries
        alert('Files downloaded successfully! You can now use these files to build your website.');
    }
    
    function createAndDownloadFile(filename, content) {
        const element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(content));
        element.setAttribute('download', filename);
        
        element.style.display = 'none';
        document.body.appendChild(element);
        
        element.click();
        
        document.body.removeChild(element);
    }
    
    function copyCurrentCode() {
        // Get the active code block
        const activeTab = document.querySelector('.tab-btn.active').getAttribute('data-tab');
        const codeContent = document.getElementById(activeTab + '-code').textContent;
        
        // Copy to clipboard
        navigator.clipboard.writeText(codeContent)
            .then(() => {
                // Show success message
                const copyBtn = document.getElementById('copy-btn');
                const originalText = copyBtn.innerHTML;
                copyBtn.innerHTML = '<i class="fas fa-check"></i> Copied!';
                
                // Reset after 2 seconds
                setTimeout(() => {
                    copyBtn.innerHTML = originalText;
                }, 2000);
            })
            .catch(err => {
                console.error('Failed to copy: ', err);
                alert('Failed to copy to clipboard. Please try again.');
            });
    }
    
    function showPreview() {
        // Create a blob with the HTML content
        const htmlContent = generatedHTML.replace('<link rel="stylesheet" href="styles.css">', 
            `<style>${generatedCSS}</style>`);
        
        const blob = new Blob([htmlContent], {type: 'text/html'});
        const blobURL = URL.createObjectURL(blob);
        
        // Set the iframe src to the blob URL
        previewFrame.src = blobURL;
        
        // Show the modal
        previewModal.style.display = 'block';
    }
}); 