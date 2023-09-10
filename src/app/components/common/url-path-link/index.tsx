import classNames from 'classnames';
import Link from 'next/link';

type Props = {
  items: { href: string; label: string }[];
  product?: string;
};

export const URLPathLink = ({ items, product }: Props) => {
  if (!product && items && items.length > 0) {
    const lastItem = items.slice(-1);
    items = items.slice(0, -1);
    if (lastItem) {
      product = lastItem[0].label;
    }
  }
  return (
    <nav className="mx-auto max-w-7xl ">
      <ol className="flex items-center space-x-3 lg:space-x-4" role="list">
        {items.map((breadcrumb, index) => (
          <li key={breadcrumb.label}>
            <div className="flex items-center">
              <Link
                className="mr-4 text-sm font-medium text-gray-900"
                href={breadcrumb.href}
              >
                {breadcrumb.label}
              </Link>
              {product ? (
                <p className="text-gray-600">/</p>
              ) : (
                <span
                  className={classNames({ hidden: index === items.length - 1 })}
                >
                  /
                </span>
              )}
            </div>
          </li>
        ))}
        {product && (
          <li className="text-sm">
            <p className="hover:poi pointer-events-none font-medium capitalize text-gray-500 hover:text-gray-600">
              {product}
            </p>
          </li>
        )}
      </ol>
    </nav>
  );
};
