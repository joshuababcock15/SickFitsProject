import { useRouter } from 'next/router';
import SingleProduct from '../../components/SingleProduct';

export default function SingleProductPage() {
  const router = useRouter();
  const { id } = router.query;
  return <SingleProduct id={id} />;
}

// export const getServerSideProps = async (context) => {
//     const res = await fetch(`https://something here/products/${context.params.id}`)
// }

// const product = await res.json();

// return {
//     props:  {
//         product
//     }
// }

// export const getStaticPaths

// export const getStaticPaths = async () => {
//   const res = await fetch(`https://something here/products/`);

//   const products = await res.json();

//   const ids = products.map((product) => product.id);
//   const paths = ids.map((id) => ({ params: { id: id.toString() } }));

//   return {
//     paths,
//     fallback: false,
//   };
// };
