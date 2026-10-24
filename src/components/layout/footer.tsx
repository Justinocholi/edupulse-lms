import Link from "next/link";
import { Phone, Mail, MapPin, Clock, ExternalLink, Shield, GraduationCap } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-[#003366]/20 bg-[#001f3f] text-white">
      <div className="container mx-auto py-14 px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="relative h-12 w-12 rounded-xl bg-white p-1 shadow-md flex items-center justify-center overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/assets/logo.png"
                  alt="Teacher Home Crest"
                  className="h-full w-full object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-heading text-xl font-bold tracking-tight text-white leading-none">
                  Teacher Home
                </span>
                <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#66b2ff] mt-1">
                  Secondary School
                </span>
              </div>
            </Link>

            <p className="text-xs text-white/80 leading-relaxed max-w-sm">
              Educate A Child &amp; Build A Virile Nation. Building capable, principled and future-ready young people through quality, technology-integrated secondary education in Lokoja, Kogi State.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="h-9 w-9 rounded-lg bg-white/10 hover:bg-[#66b2ff] hover:text-[#001f3f] transition-all flex items-center justify-center text-sm"
                aria-label="Facebook"
              >
                <i className="fab fa-facebook-f"></i>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="h-9 w-9 rounded-lg bg-white/10 hover:bg-[#66b2ff] hover:text-[#001f3f] transition-all flex items-center justify-center text-sm"
                aria-label="Instagram"
              >
                <i className="fab fa-instagram"></i>
              </a>
              <a
                href="https://wa.me/"
                target="_blank"
                rel="noreferrer"
                className="h-9 w-9 rounded-lg bg-white/10 hover:bg-[#25D366] hover:text-white transition-all flex items-center justify-center text-sm"
                aria-label="WhatsApp"
              >
                <i className="fab fa-whatsapp"></i>
              </a>
            </div>
          </div>

          {/* Explore Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#66b2ff]">Explore</h4>
            <ul className="space-y-2 text-xs text-white/80 font-medium">
              <li>
                <Link href="/#about" className="hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/#academics" className="hover:text-white transition-colors">
                  Academic Curriculum
                </Link>
              </li>
              <li>
                <Link href="/#facilities" className="hover:text-white transition-colors">
                  Science &amp; ICT Labs
                </Link>
              </li>
              <li>
                <Link href="/#management" className="hover:text-white transition-colors">
                  School Leadership
                </Link>
              </li>
              <li>
                <Link href="/#bulletin" className="hover:text-white transition-colors">
                  School Bulletin
                </Link>
              </li>
            </ul>
          </div>

          {/* Portals & Admissions */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#66b2ff]">Portals &amp; Parents</h4>
            <ul className="space-y-2 text-xs text-white/80 font-medium">
              <li>
                <Link href="/#admissions" className="hover:text-white transition-colors">
                  Admissions 2026/2027
                </Link>
              </li>
              <li>
                <a
                  href="https://forms.google.com"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-1"
                >
                  <span>Apply Online</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              </li>
              <li>
                <Link
                  href="/dashboard"
                  className="hover:text-white transition-colors flex items-center gap-1.5 text-[#ff6685] font-semibold"
                >
                  <GraduationCap className="h-3.5 w-3.5" />
                  <span>Student Portal (Results)</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/admin"
                  className="hover:text-white transition-colors flex items-center gap-1.5 text-[#66b2ff] font-semibold"
                >
                  <Shield className="h-3.5 w-3.5" />
                  <span>Staff Portal</span>
                </Link>
              </li>
              <li>
                <Link href="/#contact" className="hover:text-white transition-colors">
                  Schedule a Visit
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#66b2ff]">Contact</h4>
            <div className="space-y-2.5 text-xs text-white/80">
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-[#66b2ff] shrink-0 mt-0.5" />
                <span>Peace Community, Lokoja, Kogi State, Nigeria</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-[#66b2ff] shrink-0" />
                <a href="tel:+2348031234567" className="hover:text-white">
                  +234 803 123 4567
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-[#66b2ff] shrink-0" />
                <a href="mailto:info@teacherhomeschool.com" className="hover:text-white">
                  info@teacherhomeschool.com
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-[#66b2ff] shrink-0" />
                <span>Mon – Fri: 7:30 AM – 3:30 PM</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/60">
          <p>© 2026 Teacher Home Secondary School, Lokoja. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
            <a
              href="https://delversetech.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white transition-colors text-[11px]"
            >
              Crafted by Delverse Technologies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
