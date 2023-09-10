import { HeartIcon as OutlineHeartIcon } from '@heroicons/react/24/outline';
import { HeartIcon as SolidHeartIcon } from '@heroicons/react/24/solid';
import classNames from 'classnames';
import { usePathname, useRouter } from 'next/navigation';
import { useCurrentUser } from 'src/hooks/useCurrentUser';
import { useFavorites } from 'src/hooks/useFavorites';
import { Product } from 'src/hooks/useProduct';

import { IconButton } from './IconButton';

type FavoriteButtonProps = {
  product: Product;
};

export const FavoriteButton = ({ product }: FavoriteButtonProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const { currentUser } = useCurrentUser();
  const { isProductInFavorites, toggleFavorite } = useFavorites();
  const isFavorite = isProductInFavorites(product.uuid);

  const handleToggleFavorite = () => {
    if (currentUser) {
      toggleFavorite(product);
      return;
    }

    router.push(`/sign-in?callbackUrl=${pathname}`);
  };

  return (
    <IconButton
      className={classNames('z-10', {
        'text-rose-600': isFavorite,
      })}
      onClick={handleToggleFavorite}
      type="button"
    >
      {isFavorite ? (
        <SolidHeartIcon aria-hidden="true" className="h-6 w-6 flex-shrink-0" />
      ) : (
        <OutlineHeartIcon
          aria-hidden="true"
          className="h-6 w-6 flex-shrink-0"
        />
      )}
      <span className="sr-only">Add to favorites</span>
    </IconButton>
  );
};
