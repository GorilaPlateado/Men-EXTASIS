import { useQuery } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import ProductCard from './ProductCard'
import { useApiUrl } from '../hooks/useApiUrl'

export default function CategoryGrid() {
  const apiUrl = useApiUrl()

  const { data: categorias = [], isLoading, isError } = useQuery({
    queryKey: ['categorias'],
    queryFn: () =>
      fetch(`${apiUrl}/categorias/menu_completo/`).then((res) => {
        if (!res.ok) throw new Error('Error al cargar el menú')
        return res.json()
      }),
    staleTime: 1000 * 60 * 5,
  })

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-900"></div>
        </div>
      </div>
    )
  }

  if (isError) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <p className="text-red-900 font-bold">No se pudo cargar el menú. Por favor, intenta más tarde.</p>
      </div>
    )
  }

  return (
    <section className="py-12 bg-amber-50">
      <div className="container mx-auto px-4">
        {categorias.map((categoria, catIndex) => {
          const productos = categoria.productos || []
          if (productos.length === 0) return null

          return (
            <motion.div
              key={categoria.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: catIndex * 0.1 }}
              className="mb-12"
            >
              <motion.h2
                className="category-title text-center"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
              >
                {categoria.nombre}
              </motion.h2>

              <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                variants={{
                  hidden: { opacity: 0 },
                  show: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.1,
                      delayChildren: 0.2,
                    },
                  },
                }}
              >
                {productos.map((producto, prodIndex) => (
                  <motion.div
                    key={producto.id}
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      show: { opacity: 1, y: 0 },
                    }}
                    transition={{ duration: 0.5, delay: prodIndex * 0.05 }}
                  >
                    <ProductCard producto={producto} index={prodIndex} />
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}
