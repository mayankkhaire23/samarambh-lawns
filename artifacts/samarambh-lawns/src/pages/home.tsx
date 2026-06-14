import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, MapPin, Phone, Mail, Menu, X, Car, Utensils, Sparkles, Zap, Shield, Users, Check, Star } from "lucide-react";
import { FaWhatsapp, FaInstagram, FaFacebookF, FaYoutube } from "react-icons/fa";
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import useEmblaCarousel from "embla-carousel-react";

const NAV_LINKS = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Gallery", href: "#gallery" },
  { name: "Amenities", href: "#amenities" },
  { name: "Packages", href: "#packages" },
  { name: "Testimonials", href: "#testimonials" },
  { name: "Contact", href: "#contact" },
];

const GALLERY_IMAGES = [
  { src: "/gallery/about.png", category: "Receptions", alt: "Luxurious reception hall" },
  { src: "/gallery/mandap.png", category: "Decorations", alt: "Decorated wedding mandap" },
  { src: "/gallery/reception.png", category: "Receptions", alt: "Reception hall lights" },
  { src: "/gallery/aerial.png", category: "Night Views", alt: "Night aerial lawn view" },
  { src: "/gallery/suite.png", category: "Weddings", alt: "Luxury bridal suite" },
  { src: "/gallery/floral.png", category: "Decorations", alt: "Floral decoration detail" },
  { src: "/gallery/dining.png", category: "Weddings", alt: "Outdoor dining setup" },
];

const AMENITIES = [
  { icon: Users, title: "Spacious Lawn", description: "Expansive green spaces for grand celebrations." },
  { icon: Car, title: "Ample Parking", description: "Secure parking facility for all your guests." },
  { icon: Utensils, title: "Catering Support", description: "Dedicated areas for live counters and dining." },
  { icon: Sparkles, title: "Decoration Services", description: "In-house premium decoration team." },
  { icon: Zap, title: "Generator Backup", description: "Uninterrupted power supply for your event." },
  { icon: Shield, title: "Professional Security", description: "Round-the-clock security personnel." },
  { icon: Users, title: "Bridal Room", description: "Luxurious AC rooms for the bride and groom." },
  { icon: Check, title: "Comfortable Seating", description: "Premium seating arrangements for guests." },
];

const PACKAGES = [
  {
    name: "Silver Celebration",
    guests: "Up to 300 guests",
    price: "₹1,50,000",
    popular: false,
    features: ["Lawn & Hall Access", "Standard Stage Decor", "Basic Lighting", "Bridal Rooms (2)", "Standard Seating (300)"],
  },
  {
    name: "Golden Grand",
    guests: "Up to 800 guests",
    price: "₹3,50,000",
    popular: true,
    features: ["Premium Lawn Access", "Exclusive Mandap Decor", "Ambient Fairy Lighting", "Bridal Rooms (4)", "Premium Seating (800)", "Valet Parking"],
  },
  {
    name: "Royal Premier",
    guests: "Up to 2000 guests",
    price: "₹7,00,000",
    popular: false,
    features: ["Full Estate Access", "Custom Royal Decor", "Intelligent Lighting System", "Bridal Suites (6)", "Luxury Seating (2000)", "Valet & Security Team", "Generator Backup (Full)"],
  },
];

const TESTIMONIALS = [
  { name: "Priya & Rahul", date: "December 2023", text: "Samarambh Lawns made our dream wedding a reality. The evening lighting was spectacular, and the staff was incredibly accommodating. We couldn't have asked for a better venue." },
  { name: "Neha & Vikram", date: "January 2024", text: "The grandeur of the lawn took our breath away. Our guests are still talking about how beautiful the setup was. A truly premium experience from start to finish." },
  { name: "Ananya & Rohan", date: "February 2024", text: "From the spacious bridal suites to the massive parking area, everything was perfectly organized. The decor team understood exactly what we wanted." },
  { name: "Shruti & Aditya", date: "March 2024", text: "We hosted our reception here and it felt like a royal affair. The sheer scale of the venue and the lush greenery added so much elegance to our photos." },
  { name: "Meera & Karan", date: "April 2024", text: "Exceptional service and a stunning location. Booking Samarambh Lawns was the best decision we made for our wedding." },
];

const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [emblaRef] = useEmblaCarousel({ loop: true });

  useEffect(() => {
    document.title = "Samarambh Lawns – Premium Wedding Venue";
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  const filteredGallery = selectedCategory === "All" ? GALLERY_IMAGES : GALLERY_IMAGES.filter(img => img.category === selectedCategory);
  const categories = ["All", ...Array.from(new Set(GALLERY_IMAGES.map(img => img.category)))];

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary selection:text-white">
      {/* Navbar */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-primary text-white shadow-md py-3" : "bg-transparent text-white py-5"
        }`}
      >
        <div className="container mx-auto px-4 md:px-8 flex items-center justify-between">
          <a href="#home" onClick={(e) => scrollTo(e, "#home")} className="font-serif text-2xl md:text-3xl font-bold tracking-wide">
            Samarambh Lawns
          </a>
          
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            {NAV_LINKS.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => scrollTo(e, link.href)}
                className="hover:text-accent transition-colors duration-200"
              >
                {link.name}
              </a>
            ))}
          </nav>

          <button
            className="md:hidden text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            data-testid="button-mobile-menu"
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-primary w-full overflow-hidden"
            >
              <nav className="flex flex-col py-4">
                {NAV_LINKS.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => scrollTo(e, link.href)}
                    className="px-6 py-3 border-b border-white/10 hover:bg-white/5 font-medium"
                  >
                    {link.name}
                  </a>
                ))}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Hero Section */}
      <section id="home" className="relative h-[100dvh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/hero.png"
            alt="Samarambh Lawns at night"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-black/50 bg-gradient-to-t from-black/80 via-black/40 to-black/30 mix-blend-multiply" />
          <div className="absolute inset-0 bg-primary/20 mix-blend-overlay" />
        </div>
        
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto mt-16">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-serif text-5xl md:text-7xl font-bold leading-tight mb-6"
          >
            Where Celebrations Become <span className="text-accent italic">Timeless</span> Memories.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-xl md:leading-relaxed text-white/90 mb-10 max-w-2xl mx-auto font-light"
          >
            Samarambh Lawns – The Perfect Destination for Weddings, Receptions & Grand Events.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 w-full sm:w-auto text-base h-14 px-8" onClick={(e: any) => scrollTo(e, "#contact")}>
              Book a Visit
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary w-full sm:w-auto text-base h-14 px-8" onClick={(e: any) => scrollTo(e, "#gallery")}>
              View Gallery
            </Button>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2, repeat: Infinity, repeatType: "reverse" }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/70"
        >
          <ChevronDown size={32} />
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 md:py-32 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <motion.div
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
          >
            <div className="space-y-8">
              <div className="inline-flex items-center gap-4">
                <span className="h-[1px] w-12 bg-accent block"></span>
                <span className="text-accent font-medium tracking-widest uppercase text-sm">OUR STORY</span>
              </div>
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground">
                A Legacy of <br /> Extraordinary Celebrations
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Step into a world where elegance meets nature. Samarambh Lawns has been the backdrop to the city's most prestigious events for over a decade. Our sprawling emerald lawns and meticulously designed spaces offer a canvas for your imagination.
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed">
                We believe that every celebration deserves quiet luxury and flawless execution. From the first floral arrangement to the final farewell, our venue provides an intimate yet grand setting that feels truly extraordinary.
              </p>
              
              <div className="grid grid-cols-2 gap-8 pt-6 border-t border-border">
                <div>
                  <div className="text-4xl font-serif text-primary font-bold mb-2">500-2000</div>
                  <div className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Guest Capacity</div>
                </div>
                <div>
                  <div className="text-4xl font-serif text-primary font-bold mb-2">10+</div>
                  <div className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Years Experience</div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="aspect-[4/5] rounded-t-full overflow-hidden border-8 border-white shadow-2xl relative z-10">
                <img src="/gallery/about.png" alt="Luxurious Hall" className="w-full h-full object-cover" />
              </div>
              <div className="absolute -bottom-8 -left-8 w-2/3 aspect-square rounded-full border border-accent/30 z-0"></div>
              <div className="absolute -top-8 -right-8 w-1/2 aspect-square rounded-full border border-primary/20 z-0"></div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-24 md:py-32 bg-secondary">
        <div className="container mx-auto px-4 md:px-8">
          <motion.div
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6">Moments Captured in Time</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Explore the beauty and versatility of Samarambh Lawns across various celebrations.
            </p>
            
            <div className="flex flex-wrap justify-center gap-3 mt-10">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-6 py-2 rounded-full text-sm transition-all duration-300 ${
                    selectedCategory === cat
                      ? "bg-primary text-primary-foreground shadow-md"
                      : "bg-white text-muted-foreground hover:bg-white hover:text-primary border border-border"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {filteredGallery.map((img, index) => (
                <motion.div
                  key={`${img.src}-${index}`}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="group relative aspect-square overflow-hidden rounded-lg bg-muted cursor-pointer"
                >
                  <Dialog>
                    <DialogTrigger asChild>
                      <div className="w-full h-full relative">
                        <img
                          src={img.src}
                          alt={img.alt}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                          <span className="text-white font-serif text-xl tracking-wide">View Image</span>
                        </div>
                      </div>
                    </DialogTrigger>
                    <DialogContent className="max-w-5xl p-1 bg-transparent border-none shadow-none">
                      <DialogTitle className="sr-only">{img.alt}</DialogTitle>
                      <img src={img.src} alt={img.alt} className="w-full h-auto max-h-[85vh] object-contain rounded-md" />
                    </DialogContent>
                  </Dialog>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Amenities Section */}
      <section id="amenities" className="py-24 md:py-32 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <motion.div
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6">Unparalleled Amenities</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Every detail considered. Every need anticipated. Experience flawless service.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {AMENITIES.map((amenity, index) => {
              const Icon = amenity.icon;
              return (
                <motion.div key={index} variants={fadeIn}>
                  <Card className="h-full border-border/60 hover:border-accent/50 hover:shadow-lg transition-all duration-300 bg-white">
                    <CardHeader>
                      <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center mb-4">
                        <Icon className="w-6 h-6 text-accent" />
                      </div>
                      <CardTitle className="font-serif text-xl">{amenity.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{amenity.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Packages Section */}
      <section id="packages" className="py-24 md:py-32 bg-secondary/50">
        <div className="container mx-auto px-4 md:px-8">
          <motion.div
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6">Curated Packages</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Tailored solutions for celebrations of every scale.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto items-center"
          >
            {PACKAGES.map((pkg, index) => (
              <motion.div key={index} variants={fadeIn} className={pkg.popular ? "relative z-10" : ""}>
                <Card className={`h-full flex flex-col ${pkg.popular ? 'border-accent shadow-2xl scale-100 md:scale-105 bg-white' : 'border-border/60 bg-white'}`}>
                  {pkg.popular && (
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-accent text-accent-foreground px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest shadow-sm">
                      Most Popular
                    </div>
                  )}
                  <CardHeader className="text-center pb-8 pt-8">
                    <CardTitle className="font-serif text-2xl mb-2">{pkg.name}</CardTitle>
                    <CardDescription className="text-base mb-6">{pkg.guests}</CardDescription>
                    <div className="text-4xl font-bold text-primary font-serif">{pkg.price}</div>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <ul className="space-y-4">
                      {pkg.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <Check className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                          <span className="text-muted-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter className="pt-8">
                    <Button 
                      className={`w-full h-12 text-base ${pkg.popular ? 'bg-primary hover:bg-primary/90 text-white' : 'bg-secondary text-foreground hover:bg-secondary/80'}`}
                      onClick={(e: any) => scrollTo(e, "#contact")}
                    >
                      Inquire Now
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-24 md:py-32 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 md:px-8">
          <motion.div
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6">Words of Love</h2>
            <p className="text-white/80 max-w-2xl mx-auto text-lg">
              Hear from the couples who chose to begin their forever with us.
            </p>
          </motion.div>

          <div className="max-w-5xl mx-auto">
            <div className="overflow-hidden" ref={emblaRef}>
              <div className="flex -ml-4">
                {TESTIMONIALS.map((testimonial, index) => (
                  <div key={index} className="flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_33.333%] min-w-0 pl-4">
                    <Card className="bg-white/10 border-accent/20 backdrop-blur-sm h-full text-white">
                      <CardContent className="p-8">
                        <div className="flex text-accent mb-6">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-5 h-5 fill-current" />
                          ))}
                        </div>
                        <p className="text-lg leading-relaxed mb-8 italic">"{testimonial.text}"</p>
                        <div>
                          <p className="font-serif font-bold text-xl">{testimonial.name}</p>
                          <p className="text-white/60 text-sm">{testimonial.date}</p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 md:py-32 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <motion.div
              variants={fadeIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6">Plan Your Celebration</h2>
              <p className="text-muted-foreground mb-10 text-lg">
                Reach out to us to check availability, schedule a venue tour, or discuss your event requirements in detail.
              </p>
              
              <div className="space-y-8 mb-10">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">Visit Us</h4>
                    <p className="text-muted-foreground">Samarambh Lawns, Green Estate Road, Grand Valley District, India</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">Call Us</h4>
                    <p className="text-muted-foreground">+91 98765 43210</p>
                    <p className="text-muted-foreground">+91 98765 43211</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">Email Us</h4>
                    <p className="text-muted-foreground">inquiries@samarambhlawns.com</p>
                  </div>
                </div>
              </div>

              <div className="aspect-video w-full bg-muted rounded-xl relative overflow-hidden border border-border flex items-center justify-center group cursor-pointer">
                {/* Simulated Google Map */}
                <div className="absolute inset-0 opacity-50 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
                <div className="relative z-10 flex flex-col items-center">
                  <MapPin className="w-10 h-10 text-accent mb-2 drop-shadow-md group-hover:scale-110 transition-transform" />
                  <span className="font-medium px-4 py-2 bg-white/90 backdrop-blur rounded-full shadow-sm">View on Maps</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              variants={fadeIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <Card className="border-border shadow-xl">
                <CardHeader>
                  <CardTitle className="font-serif text-2xl">Send an Inquiry</CardTitle>
                  <CardDescription>Fill out the form below and our team will get back to you shortly.</CardDescription>
                </CardHeader>
                <CardContent>
                  <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Your Name</label>
                        <Input placeholder="John Doe" className="h-12 bg-secondary/50" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Phone Number</label>
                        <Input placeholder="+91" className="h-12 bg-secondary/50" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Email Address</label>
                      <Input type="email" placeholder="john@example.com" className="h-12 bg-secondary/50" />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Event Date</label>
                        <Input type="date" className="h-12 bg-secondary/50" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Estimated Guests</label>
                        <Input type="number" placeholder="500" className="h-12 bg-secondary/50" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Additional Message</label>
                      <Textarea placeholder="Tell us about your requirements..." className="min-h-[120px] bg-secondary/50" />
                    </div>
                    <Button type="submit" className="w-full h-14 text-lg bg-primary hover:bg-primary/90 text-white">
                      Send Inquiry
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-16 border-t border-white/10">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 lg:gap-16">
            <div className="md:col-span-2">
              <h3 className="font-serif text-3xl font-bold mb-6">Samarambh Lawns</h3>
              <p className="text-white/80 leading-relaxed max-w-md mb-8">
                The perfect destination for weddings, receptions & grand events. Creating timeless memories in a setting of unparalleled luxury.
              </p>
              <div className="flex items-center gap-4">
                <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-accent transition-colors duration-300">
                  <FaInstagram className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-accent transition-colors duration-300">
                  <FaFacebookF className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-accent transition-colors duration-300">
                  <FaYoutube className="w-5 h-5" />
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="font-bold text-lg mb-6 uppercase tracking-wider text-accent">Quick Links</h4>
              <ul className="space-y-4">
                {NAV_LINKS.map(link => (
                  <li key={link.name}>
                    <a href={link.href} onClick={(e) => scrollTo(e, link.href)} className="text-white/80 hover:text-white transition-colors duration-200">
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold text-lg mb-6 uppercase tracking-wider text-accent">Contact</h4>
              <ul className="space-y-4 text-white/80">
                <li className="flex gap-3">
                  <MapPin className="w-5 h-5 shrink-0 mt-1" />
                  <span>Green Estate Road, Grand Valley District</span>
                </li>
                <li className="flex gap-3">
                  <Phone className="w-5 h-5 shrink-0" />
                  <span>+91 98765 43210</span>
                </li>
                <li className="flex gap-3">
                  <Mail className="w-5 h-5 shrink-0" />
                  <span>info@samarambhlawns.com</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-white/10 mt-16 pt-8 text-center text-white/60 text-sm">
            <p>&copy; {new Date().getFullYear()} Samarambh Lawns. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/919876543210"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-300 shadow-[#25D366]/30"
        aria-label="Chat on WhatsApp"
        data-testid="button-whatsapp"
      >
        <FaWhatsapp className="w-8 h-8" />
      </a>
    </div>
  );
}
