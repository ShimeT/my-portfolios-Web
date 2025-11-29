// ===================================
// Multi-Language Translation System
// Supports: English, Amharic (አማርኛ), Afan Oromo
// ===================================

const translations = {
    en: {
        // Navigation
        nav_home: "Home",
        nav_about: "About",
        nav_experience: "Experience",
        nav_portfolio: "Portfolio",
        nav_contact: "Contact",
        
        // Hero Section
        hero_greeting: "Hi, I'm",
        hero_title: "Computer Science & Data Science Professional",
        hero_description: "Passionate about leveraging data-driven insights and cutting-edge technology to solve complex problems and drive innovation.",
        btn_get_in_touch: "Get In Touch",
        btn_download_cv: "Download CV",
        
        // About Section
        about_title: "About Me",
        about_text_1: "I am a dedicated professional with a strong foundation in Computer Science and advanced expertise in Data Science. My journey in technology has been driven by curiosity and a passion for continuous learning.",
        about_text_2: "With a BSc in Computer Science and an MSc in Data Science, I combine theoretical knowledge with practical skills to deliver innovative solutions. I specialize in machine learning, data analysis, software development, and creating scalable systems that make a real-world impact.",
        education_title: "Education",
        degree_msc: "Master of Science in Data Science",
        degree_msc_short: "MSc | Data Science",
        degree_bsc: "Bachelor of Science in Computer Science",
        degree_bsc_short: "BSc | Computer Science",
        courses_taken: "Courses Taken:",
        btn_add_course: "Add Course",
        
        // Experience Section
        experience_title: "Work Experience",
        experience_present: "Present",
        
        // Portfolio Section
        portfolio_title: "Portfolio",
        portfolio_subtitle: "Check out some of my recent projects",
        
        // Contact Section
        contact_title: "Get In Touch",
        contact_subtitle: "Feel free to reach out for collaborations or just a friendly chat",
        contact_email: "Email",
        contact_phone: "Phone",
        contact_location: "Location",
        form_name: "Your Name",
        form_email: "Your Email",
        form_subject: "Subject",
        form_message: "Your Message",
        btn_send_message: "Send Message",
        form_success: "Message sent successfully!",
        
        // Footer
        footer_rights: "All rights reserved.",
        
        // Admin Panel
        admin_login: "Admin Login",
        admin_username: "Username",
        admin_password: "Password",
        btn_login: "Login",
        btn_register: "Register",
        admin_hint: "Default: admin / admin123",
        admin_panel: "Admin Panel",
        btn_logout: "Logout",
        admin_projects: "Projects",
        admin_experience: "Work Experience",
        admin_courses: "Courses",
        btn_add_project: "Add Project",
        btn_add_experience: "Add Experience",
        btn_add_course_bsc: "Add BSc Course",
        btn_add_course_msc: "Add MSc Course",
        btn_edit: "Edit",
        btn_delete: "Delete",
        btn_save: "Save",
        btn_cancel: "Cancel",
        
        // Project Form
        project_title_label: "Project Title",
        project_description_label: "Description",
        project_technologies_label: "Technologies (comma-separated)",
        project_features_label: "Features (one per line)",
        project_github_label: "GitHub URL",
        project_demo_label: "Demo URL",
        project_icon_label: "Icon (Font Awesome class)",
        
        // Experience Form
        exp_title_label: "Job Title",
        exp_company_label: "Company",
        exp_date_label: "Date Range",
        exp_description_label: "Description",
        exp_responsibilities_label: "Responsibilities (one per line)",
        exp_skills_label: "Skills (comma-separated)",
        
        // Course Form
        course_name_label: "Course Name",
        
        // Validation Messages
        error_name_required: "Name is required",
        error_name_length: "Name must be at least 2 characters",
        error_email_required: "Email is required",
        error_email_invalid: "Please enter a valid email address",
        error_subject_required: "Subject is required",
        error_subject_length: "Subject must be at least 3 characters",
        error_message_required: "Message is required",
        error_message_length: "Message must be at least 10 characters",
        error_login_invalid: "Invalid username or password",
        
        // Confirmation Messages
        confirm_delete_project: "Are you sure you want to delete this project?",
        confirm_delete_experience: "Are you sure you want to delete this work experience?",
        confirm_delete_course: "Are you sure you want to delete this course?",
        confirm_logout: "Are you sure you want to logout?",
        
        // Empty States
        empty_projects: "No projects yet. Add your first project!",
        empty_experience: "No work experience yet. Add your first position!",
        empty_courses: "No courses yet. Add your first course!",
        
        // Tabs
        tab_bsc_courses: "BSc Courses",
        tab_msc_courses: "MSc Courses",
        admin_resources: "Resources",
        admin_users: "Users",
        
        // Resources
        resources_title: "Course Resources",
        resources_subtitle: "Download educational materials and course content",
        register_to_download: "Register to Download",
        register_subtitle: "Create a free account to access course resources",
        full_name: "Full Name",
        email_address: "Email Address",
        password_min: "Password (min 6 characters)",
        register_download: "Register & Download",
        download: "Download",
        upload_resource: "Upload New Resource",
        resource_title: "Resource Title",
        resource_description: "Description",
        resource_category: "Category",
        resource_file: "File (Max 50MB)",
        upload: "Upload Resource",
        manage_resources: "Manage Course Resources",
        registered_users: "Registered Users",
        empty_resources: "No resources available yet",
        empty_users: "No registered users yet",
        
        // Settings Management
        admin_settings: "Settings",
        admin_profile: "Profile",
        profile_name_label: "Full Name",
        profile_title_label: "Professional Title",
        profile_bio_label: "Bio / Introduction",
        profile_email_label: "Email",
        profile_phone_label: "Phone",
        profile_location_label: "Location",
        profile_linkedin_label: "LinkedIn URL",
        profile_github_label: "GitHub URL",
        profile_twitter_label: "Twitter URL",
        btn_save_profile: "Save Profile",
        profile_updated: "Profile updated successfully!",
        
        // Password Change
        change_password: "Change Password",
        current_password_label: "Current Password",
        new_password_label: "New Password",
        confirm_password_label: "Confirm New Password",
        btn_change_password: "Change Password",
        password_changed: "Password changed successfully!",
        error_password_mismatch: "New passwords do not match",
        error_password_length: "Password must be at least 6 characters",
        error_current_password: "Current password is incorrect",
        personal_information: "Personal Information"
    },
    
    am: {
        // Navigation (አማርኛ)
        nav_home: "መነሻ",
        nav_about: "ስለኔ",
        nav_experience: "የስራ ልምድ",
        nav_portfolio: "ፖርትፎሊዮ",
        nav_contact: "አድራሻ",
        
        // Hero Section
        hero_greeting: "ሰላም፣ እኔ",
        hero_title: "የኮምፒውተር ሳይንስ እና የዳታ ሳይንስ ባለሙያ",
        hero_description: "ውስብስብ ችግሮችን ለመፍታት እና ፈጠራን ለማሳደግ በመረጃ ላይ የተመሰረተ ግንዛቤ እና ዘመናዊ ቴክኖሎጂን በመጠቀም ላይ ያለኝ ፍላጎት።",
        btn_get_in_touch: "ያግኙን",
        btn_download_cv: "ሲቪ አውርድ",
        
        // About Section
        about_title: "ስለኔ",
        about_text_1: "በኮምፒውተር ሳይንስ ጠንካራ መሰረት እና በዳታ ሳይንስ የላቀ እውቀት ያለው ቁርጠኛ ባለሙያ ነኝ። በቴክኖሎጂ ውስጥ ያለኝ ጉዞ በማወቅ ጉጉት እና በቀጣይነት ለመማር ባለኝ ፍላጎት የተመራ ነው።",
        about_text_2: "በኮምፒውተር ሳይንስ የመጀመሪያ ዲግሪ እና በዳታ ሳይንስ የማስተርስ ዲግሪ፣ ፈጠራ መፍትሄዎችን ለማቅረብ ንድፈ ሃሳባዊ እውቀትን ከተግባራዊ ክህሎቶች ጋር አጣምራለሁ። በማሽን ለርኒንግ፣ በዳታ ትንተና፣ በሶፍትዌር ልማት እና በእውነተኛ ዓለም ተጽእኖ የሚያደርጉ ሊሰፉ የሚችሉ ስርዓቶችን መፍጠር ላይ ልዩ ነኝ።",
        education_title: "ትምህርት",
        degree_msc: "የማስተርስ ዲግሪ በዳታ ሳይንስ",
        degree_msc_short: "ማስተርስ | ዳታ ሳይንስ",
        degree_bsc: "የመጀመሪያ ዲግሪ በኮምፒውተር ሳይንስ",
        degree_bsc_short: "የመጀመሪያ ዲግሪ | ኮምፒውተር ሳይንስ",
        courses_taken: "የተወሰዱ ኮርሶች:",
        btn_add_course: "ኮርስ ጨምር",
        
        // Experience Section
        experience_title: "የስራ ልምድ",
        experience_present: "አሁን",
        
        // Portfolio Section
        portfolio_title: "ፖርትፎሊዮ",
        portfolio_subtitle: "የቅርብ ጊዜ ፕሮጀክቶቼን ይመልከቱ",
        
        // Contact Section
        contact_title: "ያግኙን",
        contact_subtitle: "ለትብብር ወይም ለወዳጃዊ ውይይት ያግኙን",
        contact_email: "ኢሜይል",
        contact_phone: "ስልክ",
        contact_location: "አድራሻ",
        form_name: "ስምዎ",
        form_email: "ኢሜይልዎ",
        form_subject: "ርዕስ",
        form_message: "መልእክትዎ",
        btn_send_message: "መልእክት ላክ",
        form_success: "መልእክት በተሳካ ሁኔታ ተልኳል!",
        
        // Footer
        footer_rights: "ሁሉም መብቶች የተጠበቁ ናቸው።",
        
        // Admin Panel
        admin_login: "የአስተዳዳሪ መግቢያ",
        admin_username: "የተጠቃሚ ስም",
        admin_password: "የይለፍ ቃል",
        btn_login: "ግባ",
        btn_register: "ይመዝገቡ",
        admin_hint: "ነባሪ: admin / admin123",
        admin_panel: "የአስተዳዳሪ ፓነል",
        btn_logout: "ውጣ",
        admin_projects: "ፕሮጀክቶች",
        admin_experience: "የስራ ልምድ",
        admin_courses: "ኮርሶች",
        btn_add_project: "ፕሮጀክት ጨምር",
        btn_add_experience: "ልምድ ጨምር",
        btn_add_course_bsc: "የመጀመሪያ ዲግሪ ኮርስ ጨምር",
        btn_add_course_msc: "የማስተርስ ኮርስ ጨምር",
        btn_edit: "አርትዕ",
        btn_delete: "ሰርዝ",
        btn_save: "አስቀምጥ",
        btn_cancel: "ሰርዝ",
        
        // Project Form
        project_title_label: "የፕሮጀክት ርዕስ",
        project_description_label: "መግለጫ",
        project_technologies_label: "ቴክኖሎጂዎች (በኮማ የተለዩ)",
        project_features_label: "ባህሪያት (በአንድ መስመር)",
        project_github_label: "የጊትሀብ አድራሻ",
        project_demo_label: "የማሳያ አድራሻ",
        project_icon_label: "አዶ (የፎንት አውሰም ክላስ)",
        
        // Experience Form
        exp_title_label: "የስራ ርዕስ",
        exp_company_label: "ኩባንያ",
        exp_date_label: "የቀን ክልል",
        exp_description_label: "መግለጫ",
        exp_responsibilities_label: "ኃላፊነቶች (በአንድ መስመር)",
        exp_skills_label: "ክህሎቶች (በኮማ የተለዩ)",
        
        // Course Form
        course_name_label: "የኮርስ ስም",
        
        // Validation Messages
        error_name_required: "ስም ያስፈልጋል",
        error_name_length: "ስም ቢያንስ 2 ቁምፊዎች መሆን አለበት",
        error_email_required: "ኢሜይል ያስፈልጋል",
        error_email_invalid: "እባክዎ ትክክለኛ ኢሜይል ያስገቡ",
        error_subject_required: "ርዕስ ያስፈልጋል",
        error_subject_length: "ርዕስ ቢያንስ 3 ቁምፊዎች መሆን አለበት",
        error_message_required: "መልእክት ያስፈልጋል",
        error_message_length: "መልእክት ቢያንስ 10 ቁምፊዎች መሆን አለበት",
        error_login_invalid: "ልክ ያልሆነ የተጠቃሚ ስም ወይም የይለፍ ቃል",
        
        // Confirmation Messages
        confirm_delete_project: "እርግጠኛ ነዎት ይህን ፕሮጀክት መሰረዝ ይፈልጋሉ?",
        confirm_delete_experience: "እርግጠኛ ነዎት ይህን የስራ ልምድ መሰረዝ ይፈልጋሉ?",
        confirm_delete_course: "እርግጠኛ ነዎት ይህን ኮርስ መሰረዝ ይፈልጋሉ?",
        confirm_logout: "እርግጠኛ ነዎት መውጣት ይፈልጋሉ?",
        
        // Empty States
        empty_projects: "ገና ምንም ፕሮጀክቶች የሉም። የመጀመሪያዎን ፕሮጀክት ያክሉ!",
        empty_experience: "ገና ምንም የስራ ልምድ የለም። የመጀመሪያዎን ቦታ ያክሉ!",
        empty_courses: "ገና ምንም ኮርሶች የሉም። የመጀመሪያዎን ኮርስ ያክሉ!",
        
        // Tabs
        tab_bsc_courses: "የመጀመሪያ ዲግሪ ኮርሶች",
        tab_msc_courses: "የማስተርስ ኮርሶች",
        admin_resources: "ሪሶርሶች",
        admin_users: "ተጠቃሚዎች",
        
        // Resources
        resources_title: "የኮርስ ሪሶርሶች",
        resources_subtitle: "የትምህርት ቁሳቁሶችን እና የኮርስ ይዘቶችን ያውርዱ",
        register_to_download: "ለማውረድ ይመዝገቡ",
        register_subtitle: "የኮርስ ሪሶርሶችን ለማግኘት ነፃ መለያ ይፍጠሩ",
        full_name: "ሙሉ ስም",
        email_address: "የኢሜይል አድራሻ",
        password_min: "የይለፍ ቃል (ቢያንስ 6 ቁምፊዎች)",
        register_download: "ይመዝገቡ እና ያውርዱ",
        download: "አውርድ",
        upload_resource: "አዲስ ሪሶርስ ይስቀሉ",
        resource_title: "የሪሶርስ ርዕስ",
        resource_description: "መግለጫ",
        resource_category: "ምድብ",
        resource_file: "ፋይል (ከ50MB በታች)",
        upload: "ሪሶርስ ይስቀሉ",
        manage_resources: "የኮርስ ሪሶርሶችን ያስተዳድሩ",
        registered_users: "የተመዘገቡ ተጠቃሚዎች",
        empty_resources: "ገና ምንም ሪሶርስ የለም",
        empty_users: "ገና የተመዘገቡ ተጠቃሚዎች የሉም",
        
        // Settings Management
        admin_settings: "ቅንብሮች",
        admin_profile: "መገለጫ",
        profile_name_label: "ሙሉ ስም",
        profile_title_label: "የሙያ ርዕስ",
        profile_bio_label: "መግለጫ / መግቢያ",
        profile_email_label: "ኢሜይል",
        profile_phone_label: "ስልክ",
        profile_location_label: "አድራሻ",
        profile_linkedin_label: "የሊንክድኢን አድራሻ",
        profile_github_label: "የጊትሀብ አድራሻ",
        profile_twitter_label: "የትዊተር አድራሻ",
        btn_save_profile: "መገለጫ አስቀምጥ",
        profile_updated: "መገለጫ በተሳካ ሁኔታ ተዘምኗል!",
        
        // Password Change
        change_password: "የይለፍ ቃል ቀይር",
        current_password_label: "የአሁኑ የይለፍ ቃል",
        new_password_label: "አዲስ የይለፍ ቃል",
        confirm_password_label: "አዲሱን የይለፍ ቃል አረጋግጥ",
        btn_change_password: "የይለፍ ቃል ቀይር",
        password_changed: "የይለፍ ቃል በተሳካ ሁኔታ ተቀይሯል!",
        error_password_mismatch: "አዲሶቹ የይለፍ ቃሎች አይዛመዱም",
        error_password_length: "የይለፍ ቃል ቢያንስ 6 ቁምፊዎች መሆን አለበት",
        error_current_password: "የአሁኑ የይለፍ ቃል ልክ አይደለም",
        personal_information: "የግል መረጃ"
    },
    
    om: {
        // Navigation (Afan Oromo)
        nav_home: "Mana",
        nav_about: "Waa'ee Koo",
        nav_experience: "Muuxannoo Hojii",
        nav_portfolio: "Hojiiwwan",
        nav_contact: "Quunnamtii",
        
        // Hero Section
        hero_greeting: "Nagaa, Ani",
        hero_title: "Ogeessa Saayinsii Kompiitaraa fi Saayinsii Deetaa",
        hero_description: "Rakkoolee walxaxaa furuu fi kalaqaa guddisuu keessatti hubannoo daataa irratti hundaa'e fi teeknooloojii ammayyaa fayyadamuun fedhii guddaa qaba.",
        btn_get_in_touch: "Nu Quunnamaa",
        btn_download_cv: "CV Buufadhu",
        
        // About Section
        about_title: "Waa'ee Koo",
        about_text_1: "Ani ogeessa bu'uura cimaa Saayinsii Kompiitaraa fi beekumsa ol'aanaa Saayinsii Deetaa qabuudha. Imalli koo teeknooloojii keessatti fedhii beekuu fi barnoota itti fufinsaan barachuun kan qajeelfamedha.",
        about_text_2: "Digirii jalqabaa Saayinsii Kompiitaraa fi Digirii Maastarsii Saayinsii Deetaa waliin, beekumsa tiyoorii fi dandeettii hojiirra oolmaa walitti makuun furmaata kalaqaa kennuuf. Barumsa maashinii, xiinxala daataa, misoomsa sooftiweerii fi sirnoota bal'achuu danda'an dhiibbaa addunyaa dhugaa uumuun keessatti addadha.",
        education_title: "Barnoota",
        degree_msc: "Digirii Maastarsii Saayinsii Deetaa",
        degree_msc_short: "Maastarsii | Saayinsii Deetaa",
        degree_bsc: "Digirii Jalqabaa Saayinsii Kompiitaraa",
        degree_bsc_short: "Digirii Jalqabaa | Saayinsii Kompiitaraa",
        courses_taken: "Koorsii Fudhataman:",
        btn_add_course: "Koorsii Ida'i",
        
        // Experience Section
        experience_title: "Muuxannoo Hojii",
        experience_present: "Ammaa",
        
        // Portfolio Section
        portfolio_title: "Hojiiwwan",
        portfolio_subtitle: "Pirojektii koo dhiyoo kana ilaalaa",
        
        // Contact Section
        contact_title: "Nu Quunnamaa",
        contact_subtitle: "Walta'iinsaaf ykn haasawa michummaa qofaaf bilisa ta'aa nu quunnamaa",
        contact_email: "Imeelii",
        contact_phone: "Bilbilaa",
        contact_location: "Bakka",
        form_name: "Maqaa Keessan",
        form_email: "Imeelii Keessan",
        form_subject: "Mata-duree",
        form_message: "Ergaa Keessan",
        btn_send_message: "Ergaa Ergi",
        form_success: "Ergaan milkaa'inaan ergameera!",
        
        // Footer
        footer_rights: "Mirgi hundi eegameera.",
        
        // Admin Panel
        admin_login: "Seensa Bulchaa",
        admin_username: "Maqaa Fayyadamaa",
        admin_password: "Jecha Icciitii",
        btn_login: "Seeni",
        btn_register: "Galmaa'i",
        admin_hint: "Durtii: admin / admin123",
        admin_panel: "Paanaalii Bulchaa",
        btn_logout: "Ba'i",
        admin_projects: "Pirojektoota",
        admin_experience: "Muuxannoo Hojii",
        admin_courses: "Koorsiiwwan",
        btn_add_project: "Pirojektii Ida'i",
        btn_add_experience: "Muuxannoo Ida'i",
        btn_add_course_bsc: "Koorsii Digirii Jalqabaa Ida'i",
        btn_add_course_msc: "Koorsii Maastarsii Ida'i",
        btn_edit: "Gulaali",
        btn_delete: "Haqi",
        btn_save: "Olkaa'i",
        btn_cancel: "Dhiisi",
        
        // Project Form
        project_title_label: "Mata-duree Pirojektii",
        project_description_label: "Ibsa",
        project_technologies_label: "Teeknooloojiiwwan (komaan adda ba'an)",
        project_features_label: "Amaloota (sarara tokkoon)",
        project_github_label: "Teessoo GitHub",
        project_demo_label: "Teessoo Agarsiisaa",
        project_icon_label: "Sajoo (Font Awesome class)",
        
        // Experience Form
        exp_title_label: "Mata-duree Hojii",
        exp_company_label: "Dhaabbata",
        exp_date_label: "Hangii Guyyaa",
        exp_description_label: "Ibsa",
        exp_responsibilities_label: "Itti Gaafatamummaa (sarara tokkoon)",
        exp_skills_label: "Dandeettii (komaan adda ba'an)",
        
        // Course Form
        course_name_label: "Maqaa Koorsii",
        
        // Validation Messages
        error_name_required: "Maqaan barbaachisaadha",
        error_name_length: "Maqaan yoo xiqqaate qubee 2 ta'uu qaba",
        error_email_required: "Imeeliin barbaachisaadha",
        error_email_invalid: "Maaloo imeelii sirrii ta'e galchaa",
        error_subject_required: "Mata-dureen barbaachisaadha",
        error_subject_length: "Mata-dureen yoo xiqqaate qubee 3 ta'uu qaba",
        error_message_required: "Ergaan barbaachisaadha",
        error_message_length: "Ergaan yoo xiqqaate qubee 10 ta'uu qaba",
        error_login_invalid: "Maqaa fayyadamaa ykn jecha icciitii sirrii hin taane",
        
        // Confirmation Messages
        confirm_delete_project: "Pirojektii kana haquu barbaadduu mirkaneessitee?",
        confirm_delete_experience: "Muuxannoo hojii kana haquu barbaadduu mirkaneessitee?",
        confirm_delete_course: "Koorsii kana haquu barbaadduu mirkaneessitee?",
        confirm_logout: "Ba'uu barbaadduu mirkaneessitee?",
        
        // Empty States
        empty_projects: "Ammallee pirojektiin hin jiru. Pirojektii kee jalqabaa ida'i!",
        empty_experience: "Ammallee muuxannoon hojii hin jiru. Bakka kee jalqabaa ida'i!",
        empty_courses: "Ammallee koorsiiwwan hin jiran. Koorsii kee jalqabaa ida'i!",
        
        // Tabs
        tab_bsc_courses: "Koorsiiwwan Digirii Jalqabaa",
        tab_msc_courses: "Koorsiiwwan Maastarsii",
        admin_resources: "Qabeenya",
        admin_users: "Fayyadamtoota",
        
        // Resources
        resources_title: "Qabeenya Koorsii",
        resources_subtitle: "Meeshaalee barnootaa fi qabeenya koorsii buufadhaa",
        register_to_download: "Buufachuuf Galmaa'i",
        register_subtitle: "Qabeenya koorsii argachuuf herrega bilisaa uumi",
        full_name: "Maqaa Guutuu",
        email_address: "Teessoo Imeelii",
        password_min: "Jecha Icciitii (yoo xiqqaate qubee 6)",
        register_download: "Galmaa'ii fi Buufadhu",
        download: "Buufadhu",
        upload_resource: "Qabeenya Haaraa Olkaa'i",
        resource_title: "Mata-duree Qabeenya",
        resource_description: "Ibsa",
        resource_category: "Ramaddii",
        resource_file: "Faayilii (50MB gadi)",
        upload: "Qabeenya Olkaa'i",
        manage_resources: "Qabeenya Koorsii Bulchi",
        registered_users: "Fayyadamtoota Galmaa'an",
        empty_resources: "Qabeenya hin jiru",
        empty_users: "Fayyadamtoota galmaa'an hin jiru",
        
        // Settings Management
        admin_settings: "Qindaa'ina",
        admin_profile: "Ibsa",
        profile_name_label: "Maqaa Guutuu",
        profile_title_label: "Mata-duree Hojii",
        profile_bio_label: "Ibsa / Seensa",
        profile_email_label: "Imeelii",
        profile_phone_label: "Bilbilaa",
        profile_location_label: "Bakka",
        profile_linkedin_label: "Teessoo LinkedIn",
        profile_github_label: "Teessoo GitHub",
        profile_twitter_label: "Teessoo Twitter",
        btn_save_profile: "Ibsa Olkaa'i",
        profile_updated: "Ibsaan milkaa'inaan haaromfameera!",
        
        // Password Change
        change_password: "Jecha Icciitii Jijjiiri",
        current_password_label: "Jecha Icciitii Ammaa",
        new_password_label: "Jecha Icciitii Haaraa",
        confirm_password_label: "Jecha Icciitii Haaraa Mirkaneessi",
        btn_change_password: "Jecha Icciitii Jijjiiri",
        password_changed: "Jecha icciitiin milkaa'inaan jijjiiramee!",
        error_password_mismatch: "Jechoonni icciitii haaraan wal hin simatan",
        error_password_length: "Jecha icciitii yoo xiqqaate qubee 6 ta'uu qaba",
        error_current_password: "Jecha icciitii ammaa sirrii miti",
        personal_information: "Odeeffannoo Dhuunfaa"
    }
};

// Get translation for current language
function t(key) {
    const currentLang = localStorage.getItem('language') || 'en';
    return translations[currentLang][key] || translations['en'][key] || key;
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { translations, t };
}
