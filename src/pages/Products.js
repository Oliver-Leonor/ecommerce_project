import ProductCard from '../components/ProductsCard'
import useGet from '../customHooks/useGet'
import LoadingSkeleton from '../components/LoadingSkeleton'

export default function Home() {
  const {
    data: products,
    isPending,
    error,
  } = useGet('https://capstone2-leonor.onrender.com/products/')

  return (
    <div className='products'>
      {error && <div>{error}</div>}
      {isPending && <LoadingSkeleton />}
      {products && <ProductCard products={products} title='All Products' />}
    </div>
  )
}
