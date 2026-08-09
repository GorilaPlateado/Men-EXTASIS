import { motion } from 'framer-motion'

export default function ProductCard({ producto, index }) {
  const cardImage = producto.imagen_url || '/placeholder-food.svg'

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="product-card group"
    >
      <div className="relative h-40 overflow-hidden">
        <img
          src={cardImage}
          alt={producto.nombre}
          className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-300"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/300x160/f5f5dc/8B0000?text=' + encodeURIComponent(producto.nombre)
          }}
          loading="lazy"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-red-900 mb-1 font-playfair">
          {producto.nombre}
        </h3>
        {producto.descripcion && (
          <p className="text-sm text-gray-600 mb-2 line-clamp-2">
            {producto.descripcion}
          </p>
        )}
        <div className="flex justify-between items-center">
          <span className="text-xl font-bold text-red-900">
            {Number(producto.precio).toLocaleString('es-ES', {
              style: 'currency',
              currency: 'CUP',
              minimumFractionDigits: 0,
            }).replace('CUP', 'CUP')}
          </span>
        </div>
      </div>
    </motion.div>
  )
}
