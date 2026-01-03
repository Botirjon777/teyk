import directus from '../../../lib/directus';
import { readItems } from '@directus/sdk';
import Image from 'next/image';

interface ProductImage {
    url: string; // File ID for image URL
}

interface Product {
    id: string | number;
    name: string;
    description: string;
    price: number;
    product_images?: ProductImage[];
}

const DIRECTUS_URL = process.env.DIRECTUS_URL || 'https://teyk-app.directus.app';

function getImageUrl(imageId: string | number): string {
    return `${DIRECTUS_URL}/assets/${imageId}`;
}

interface DirectusError {
    message?: string;
    extensions?: {
        reason?: string;
        code?: string;
    };
}

async function getProducts(): Promise<Product[]> {
    try {
        const products = await directus.request(
            readItems('products', {
                fields: [
                    'id',
                    'name',
                    'description',
                    'price',
                    'product_images.url', // Fetch only url field from product_images relation. use product_images.* to fetch all fields
                ],
            })
        );
        return products as Product[];
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
}

export default async function TestPage() {
    try {
        const products = await getProducts();
        return (
            <div className="p-8">
                <h1 className="text-2xl font-bold mb-4">Products</h1>
                {products.length > 0 ? (
                    <ul className="space-y-4">
                        {products.map((product, index) => {
                            return (
                                <li key={product.id || index} className="border p-4 rounded">
                                    {product.product_images && product.product_images.length > 0 && (
                                        <div className="mb-4 space-y-2">
                                            {product.product_images.map((image, imgIndex) => (
                                                <div key={imgIndex}>
                                                    <Image
                                                        src={getImageUrl(image.url)}
                                                        alt={product.name}
                                                        width={300}
                                                        height={200}
                                                        className="rounded object-cover"
                                                        unoptimized
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                    <h2 className="text-xl font-semibold">
                                        {product.name}
                                    </h2>
                                    <p className="text-gray-600">
                                        {product.description}
                                    </p>
                                    <p className="text-green-600 font-bold mt-2">
                                        ${product.price.toLocaleString()}
                                    </p>
                                </li>
                            );
                        })}
                    </ul>
                ) : (
                    <p>No products found</p>
                )}
            </div>
        );
    } catch (error) {
        const directusError = error as DirectusError;
        return (
            <div className="p-8">
                <h1 className="text-2xl font-bold mb-4 text-red-600">Error</h1>
                <p className="text-red-500">
                    {directusError?.message || 'Failed to fetch products'}
                </p>
                <p className="text-sm text-gray-500 mt-2">
                    {directusError?.extensions?.reason || 'Please check your Directus configuration and permissions.'}
                </p>
            </div>
        );
    }
}
