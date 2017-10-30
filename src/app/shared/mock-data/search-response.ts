import { SearchViewModel } from './../../core/viewmodels/search/search.viewmodel';
import { ProductCardViewModel } from './../../product/viewmodels/product-card/product-card.viewmodel';
export const searchResponse = <SearchViewModel>{
    products: [
        <ProductCardViewModel>{
            productId: '123',
            productRating: 4,
            productName: 'Ryzen 5',
            productFavorite: 123,
            productReview: 112,
            productPrice: 1234
        }, <ProductCardViewModel>{
            productId: '123',
            productRating: 4,
            productName: 'Ryzen 5',
            productFavorite: 123,
            productReview: 112,
            productPrice: 1234
        }, <ProductCardViewModel>{
            productId: '123',
            productRating: 4,
            productName: 'Ryzen 5',
            productFavorite: 123,
            productReview: 112,
            productPrice: 1234
        }, <ProductCardViewModel>{
            productId: '123',
            productRating: 4,
            productName: 'Ryzen 5',
            productFavorite: 123,
            productReview: 112,
            productPrice: 1234
        }, <ProductCardViewModel>{
            productId: '123',
            productRating: 4,
            productName: 'Ryzen 5',
            productFavorite: 123,
            productReview: 112,
            productPrice: 1234
        }
    ]
};
