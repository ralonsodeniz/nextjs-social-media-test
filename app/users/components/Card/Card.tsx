import styles from './Card.module.css';
import Image from 'next/image';
import Link from 'next/link';

interface ICard {
  id: string;
  name: string | null;
  age: number | null;
  image: string | null;
}

const Card = ({ id, age, name, image }: ICard) => (
  <div className={styles.card}>
    <Image
      src={image ?? '/mememan.webp'}
      alt={`${name}'s avatar`}
      width={150}
      height={120}
      style={{ objectFit: 'cover', marginBottom: '0.5 rem' }}
    />
    <div className={styles.cardContent}>
      <h3>
        <Link href={`/users/${id}`}>{name}</Link>
      </h3>
      <p>Age: {age ?? '∞'}</p>
    </div>
  </div>
);

export default Card;
