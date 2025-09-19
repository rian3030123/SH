import { createRoot } from 'react-dom/client'
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import App from './App.tsx'
import './index.css'

// Register GSAP plugins at app bootstrap
gsap.registerPlugin(ScrollTrigger);

createRoot(document.getElementById("root")!).render(<App />);
