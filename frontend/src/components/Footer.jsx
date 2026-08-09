import { motion } from 'framer-motion'

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #0f0503 0%, #1a0804 60%, #0c0302 100%)' }}
    >
      {/* Línea decorativa dorada superior */}
      <div className="h-px w-full" style={{ background: 'linear-gradient(90deg, transparent, #D4AF37, transparent)' }} />

      <div className="container mx-auto px-8 py-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">

          {/* Marca */}
          <div>
            <h3 className="font-playfair text-2xl font-bold text-white mb-1">Restaurante Éxtasis</h3>
            <p className="font-inter text-xs text-amber-300/60 tracking-widest uppercase">
              Cocina cubana auténtica
            </p>
          </div>

          {/* Info de contacto */}
          <div className="flex flex-col sm:flex-row gap-6 text-sm font-inter text-gray-400">
            <div className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-amber-600/80" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>Calle 24 de Febrero #64, Puerto Padre, Las Tunas</span>
            </div>
            <div className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-amber-600/80" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span>+53 50566664</span>
            </div>
            <div className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-amber-600/80" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>11:00 AM — 11:00 PM</span>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-6 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-2">
          <p className="font-inter text-xs text-gray-600">
            © {new Date().getFullYear()} Restaurante Éxtasis — Todos los derechos reservados
          </p>
          <p className="font-inter text-xs text-gray-700">
            Desarrollado con <span className="text-amber-800">♥</span> para la cultura cubana
          </p>
        </div>
      </div>
    </motion.footer>
  )
}
