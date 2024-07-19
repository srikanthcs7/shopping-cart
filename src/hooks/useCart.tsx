import { useDispatch } from "react-redux";
import {
  addToCart,
  removeFromCart,
  updateQuantity,
} from "store/slices/cartSlice";
import { showError } from "store/slices/errorSlice";
import { CartItem } from "types/cart";

const useCart = (product: CartItem) => {
  
  const dispatch = useDispatch();
  const currentQuantity: number = (product && product.quantity) || 0;

  const handleIncrease = () => {
    if (!product) return;
    if (currentQuantity < product?.stock) {
      dispatch(
        updateQuantity({ id: product.id, quantity: currentQuantity + 1 })
      );
    } else {
      dispatch(
        showError({
          open: true,
          message: "Stock unavailable",
          severity: "error",
        })
      );
    }
  };

  const handleDecrease = () => {
    if (currentQuantity - 1 === 0) {
      if (product) dispatch(removeFromCart(product.id));
    }
    if (currentQuantity > 0) {
      dispatch(
        updateQuantity({ id: product.id, quantity: currentQuantity - 1 })
      );
    }
  };

  const handleAddToCart = () => {
    handleIncrease();
    // onAddToCart(currentQuantity);
    dispatch(addToCart(product));
  };

  return { handleIncrease, handleAddToCart, handleDecrease };
};

export default useCart