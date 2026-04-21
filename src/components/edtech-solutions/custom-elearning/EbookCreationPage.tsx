import SubServicePageTemplate from "../shared/SubServicePageTemplate";
import { TabletSmartphone, FileText, Video, BookOpen, Accessibility } from "lucide-react";

const EbookCreationPage = () => (
  <SubServicePageTemplate
    seoTitle="Ebook Creation for K12 & Higher Education | eQOURSE"
    seoDescription="Interactive eBook creation services for K-12 and higher education. Digital textbooks with multimedia, interactive elements, and engaging content for modern learners."
    seoCanonical="https://www.eqourse.com/edtech-solutions/custom-e-learning-content/ebook-creation"
    seoKeywords="ebook creation, interactive ebooks, digital textbooks, EPUB3, educational ebooks"
    parentLabel="Custom E-Learning Content"
    parentHref="/edtech-solutions/custom-e-learning-content"
    currentLabel="E-Book Creation"
    preHeadline="Interactive eBook Creation Services for K-12 & Higher Education"
    headline="Interactive eBook"
    headlineAccent="Creation Services"
    subtext="eQOURSE creates interactive e-books that transform traditional textbooks into dynamic digital learning experiences. Our e-books incorporate multimedia elements, interactive quizzes, embedded videos, and animated illustrations to engage modern learners across K-12 and higher education."
    introLabel="Digital-First Learning"
    introTitle="E-Books That"
    introGradient="Come Alive"
    introDescription="Our interactive e-books go beyond static PDFs to deliver rich, multimedia-driven learning experiences."
    introParagraphs={["From EPUB3 to PDF formats, our e-books are compatible with all major reading platforms and designed with accessibility features for learners with diverse needs."]}
    servicesLabel="E-Book Formats"
    servicesTitle="Our E-Book"
    servicesGradient="Solutions"
    services={[
      { icon: TabletSmartphone, title: "Interactive Digital Textbooks", description: "E-books with embedded quizzes, videos, animations, and interactive exercises for engaging learning." },
      { icon: FileText, title: "EPUB & PDF E-Books", description: "Professional e-books in EPUB3 and PDF formats compatible with all major reading platforms." },
      { icon: Video, title: "Multimedia-Rich E-Books", description: "E-books incorporating audio, video, 3D models, and interactive diagrams for deeper understanding." },
      { icon: BookOpen, title: "Curriculum-Aligned E-Books", description: "Digital textbooks aligned to CBSE, ICSE, IB, and State Board standards." },
      { icon: Accessibility, title: "Accessible E-Books", description: "E-books designed with accessibility features for learners with diverse needs." },
    ]}
    ctaHeadline="Transform Your Textbooks"
    ctaSubtext="Convert your print materials into engaging, interactive digital e-books. Talk to our e-book production team."
    ctaButtonText="Get Free Consultation"
    relatedPages={[
      { title: "Educational Content", href: "/edtech-solutions/custom-e-learning-content/educational-content-development" },
      { title: "2D & 3D Videos", href: "/edtech-solutions/custom-e-learning-content/2d-3d-videos" },
      { title: "Workbook Development", href: "/edtech-solutions/custom-e-learning-content/workbook-development" },
    ]}
  />
);

export default EbookCreationPage;
