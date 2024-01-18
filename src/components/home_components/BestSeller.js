import ATCButton from '../cart/ATCButton';

const products = [
  {
    id: '65a6b4672f6daf2ad77cce11',
    name: 'Focus Paper Refill',
    color: 'Plain White',
    href: '#',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-01-image-card-01.jpg',
    imageAlt: 'Person using a pen to cross a task off a productivity paper card.',
    price: '₱13',
  },
  {
    id: '65a6b5282f6daf2ad77cce15',
    name: 'SKB Care Kit',
    color: "Men's Collection",
    href: '#',
    imageSrc: 'https://images.unsplash.com/photo-1627384113743-6bd5a479fffd?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    imageAlt: 'Skin Care Set',
    price: '₱48'
  },
  {
    id: '65a6b5d92f6daf2ad77cce17',
    name: 'Sigma 18-35mm Lens',
    color: 'Telephoto Lens',
    href: '#',
    imageSrc: 'https://images.unsplash.com/photo-1617005082133-548c4dd27f35?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    imageAlt: 'Sigma 18-35mm Lens',
    price: '₱475'
  },
  {
    id: '65a6b9672f6daf2ad77cce1b',
    name: 'Machined Mechanical Pencil',
    color: 'Black & Gold',
    href: '#',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-04.jpg',
    imageAlt: 'Hand holding black machined steel mechanical pencil with brass tip and top.',
    price: '₱35',
  }  
]


export default function Example() {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-xl font-bold text-gray-900">Our best seller products</h2>

        <div className="mt-8 grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
          {products.map((product) => (
            <div key={product.id}>
              <div className="relative">
                <div className="relative h-72 w-full overflow-hidden rounded-lg">
                  <img
                    src={product.imageSrc}
                    alt={product.imageAlt}
                    className="h-full w-full object-cover object-center"
                  />
                </div>
                <div className="relative mt-4">
                  <h3 className="text-sm font-medium text-gray-900">{product.name}</h3>
                  <p className="mt-1 text-sm text-gray-500">{product.color}</p>
                </div>
                <div className="absolute inset-x-0 top-0 flex h-72 items-end justify-end overflow-hidden rounded-lg p-4">
                  <div
                    aria-hidden="true"
                    className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black opacity-50"
                  />
                  <p className="relative text-lg font-semibold text-white">{product.price}</p>
                </div>
              </div>
              <div className="mt-6">
                 <ATCButton
                    productId={product._id}
                />  
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
