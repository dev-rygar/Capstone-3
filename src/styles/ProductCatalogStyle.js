const styles = {
  mainContainer: "bg-white mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8",
  header: "text-xl font-bold text-gray-900",
  productGrid: "mt-8 grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8",
  productCard: "relative",
  imageContainer: "relative h-72 w-full overflow-hidden rounded-lg",
  productInfo: "relative mt-4",
  productName: "text-sm font-medium text-gray-900",
  productColor: "mt-1 text-sm text-gray-500",
  priceContainer: "absolute inset-x-0 top-0 flex h-72 items-end justify-end overflow-hidden rounded-lg p-4",
  priceBackground: "absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black opacity-50",
  price: "relative text-lg font-semibold text-white",
  addToCartButton: "ml-10 relative flex items-center justify-center rounded-md border border-transparent bg-gray-100 px-20 pl-37 pr-37 py-2 text-sm font-medium text-gray-900 hover:bg-gray-200"
};

export default styles;
