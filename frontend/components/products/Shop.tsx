import Image from "next/image";
import styles from "./Shop.module.scss";

async function getProducts() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/products?populate=*`,
    {
      cache: "no-store",
    },
  );

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  return res.json();
}

export default async function ShopPage() {
  const data = await getProducts();
  const products = data.data;

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>Shop</h1>

      <div className={styles.grid}>
        {products.map((product: any) => {
          const imageUrl = product.image?.url;

          return (
            <div key={product.id} className={styles.card}>
              {imageUrl && (
                <img
                  src={`${process.env.NEXT_PUBLIC_API_URL}${imageUrl}`}
                  alt={product.title}
                  className={styles.image}
                />
              )}

              <h3>{product.title}</h3>
              <p>{product.description}</p>
              <a href={product.buyLink} target="_blank">
                Buy Now
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
}
