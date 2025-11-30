import dayjs from 'dayjs';
import { formatMoney } from '../../utils/money';
import { DeliveryOptions } from '../../checkout/DeliveryOptions';

export function OrderSummary({ cart = [], deliveryOptions = [] }) {
  // If nothing to show, render a small placeholder
  if (!Array.isArray(cart) || cart.length === 0) {
    return <div className="order-summary">No items in cart.</div>;
  }

  return (
    <div className="order-summary">
      {cart.map((cartItem) => {
        // Defensive: ensure cartItem is an object
        if (!cartItem) return null;

        const product = cartItem.product ?? {};
        const quantity = cartItem.quantity ?? 0;

        // Find delivery option; may be undefined
        const selectedDeliveryOption = Array.isArray(deliveryOptions)
          ? deliveryOptions.find((opt) => opt.id === cartItem.deliveryOptionId)
          : undefined;

        // Safe delivery date string
        const deliveryDate = selectedDeliveryOption?.estimatedDeliveryTimeMs
          ? dayjs(selectedDeliveryOption.estimatedDeliveryTimeMs).format('dddd, MMMM D')
          : 'Delivery date unavailable';

        const imageSrc = product.image ?? '/images/placeholder.png'; // keep a placeholder in public/images
        const priceCents = product.priceCents ?? 0;

        return (
          <div key={cartItem.productId ?? Math.random()} className="cart-item-container">
            <div className="delivery-date">Delivery date: {deliveryDate}</div>

            <div className="cart-item-details-grid">
              <img
                className="product-image"
                src={imageSrc}
                alt={product.name ?? 'Product'}
                // optional: provide width/height or onError fallback
                onError={(e) => (e.currentTarget.src = '/images/placeholder.png')}
              />

              <div className="cart-item-details">
                <div className="product-name">{product.name ?? 'Unknown product'}</div>
                <div className="product-price">{formatMoney(priceCents)}</div>

                <div className="product-quantity">
                  <span>
                    Quantity: <span className="quantity-label">{quantity}</span>
                  </span>
                  <span className="update-quantity-link link-primary">Update</span>
                  <span className="delete-quantity-link link-primary">Delete</span>
                </div>
              </div>

              <DeliveryOptions cartItem={cartItem} deliveryOptions={deliveryOptions} />
            </div>
          </div>
        );
      })}
    </div>
  );
}
