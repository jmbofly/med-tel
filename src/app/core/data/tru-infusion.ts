import { Product } from '../interfaces/product';
export const Products: Product[] = [
    {
        imgUrl: 'assets/images/smokiez/Smokiez_CBD_Roll-on.jpg',
        caption: 'CBD Relief Gel Roll-on',
        price: 50.00,
        productId: 'SMOKIEZ_ROLL_ON',
        description: `Roll-CBD relief gel roll-on - 3 fl. oz.`,
        reviews: [
            {
                name: 'joe schmoe',
                text: 'such a great product!',
                stars: 3,
            },
            {
                name: 'jane schmoe',
                text: 'such a wonderful thing!',
                stars: 5,
            },
        ],
        options: {
            packages: 'Ask about our crate subscriptions.',
            quantity: 1,
        },
        additionalInformation: 'No additional information at this time.',
        productName: 'Roll-on',
        tags: ['new'],
        category: ['pain-relief', 'roll-on', 'topical', 'cbd'],
    },
];