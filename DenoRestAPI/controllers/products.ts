import { Product } from './types.ts';
import { v4 } from 'https://deno.land/std/uuid/mod.ts';

let products: Product[] = [
    {
        id: '1',
        name: 'Product one',
        description: 'This is product one',
        price: 29.99
    },
    {
        id: '2',
        name: 'Product two',
        description: 'This is product two',
        price: 289.79
    },
    {
        id: '3',
        name: 'Product three',
        description: 'This is product three',
        price: 129.90
    },
    {
        id: '4',
        name: 'Product four',
        description: 'This is product four',
        price: 9.99
    }
];

// @desc    Get all products
// @route   GET /api/v1/products

const getProducts = ({ response }: { response: any }) => {
    response.body = {
        success: true,
        data: products
    }
};

// @desc    Get a single product
// @route   GET /api/v1/products/:id

const getProduct = ({ params, response }: { params: { id: string }, response: any }) => {
    const product: Product | undefined = products.find(p => p.id === params.id);
    if(product) {
        response.status = 200;
        response.body = {
            success: true,
            data: product
        }
    } else {
        response.status = 404;
        response.body = {
            success: false,
            msg: 'Product not found'
        }
    }
};

// @desc    Add a product
// @route   POST /api/v1/products

const addProduct = async ({ request, response }: { request: any, response: any }) => {
    const body = await request.body();

    if(!request.hasBody) {
        response.status = 400
        response.body = {
            success: false,
            msg: 'No request body defined'
        }
    } else {
        const product: Product = body.value;
        product.id = v4.generate();
        products.push(product);
        response.status = 201;
        response.body = {
            success: true,
            data: product
        }
    }
};

// @desc    Update a product
// @route   PUT /api/v1/products/:id

const updateProduct = async ({ params, request, response }: { params: { id: string }, request: any, response: any }) => {
    const product: Product | undefined = products.find(p => p.id === params.id);
    if(product) {
        const body = await request.body();
        const updatedData: { name?: string, description?: string, price?: number } = body.value;
        products = products.map(p => p.id === params.id ? { ...p, ...updatedData } : p);

        response.status = 200;
        response.body = {
            success: true,
            data: products
        }
    } else {
        response.status = 404;
        response.body = {
            success: false,
            msg: 'Product not found'
        }
    }
};

// @desc    Delete a product
// @route   DELETE /api/v1/products/:id

const deleteProduct = ({ params, response }: { params: { id: string }, response: any }) => {
    products = products.filter(p => p.id !== params.id);
    response.body = {
        success: true,
        msg: 'Product deleted successfuly'
    }
};

export { getProducts, addProduct, getProduct, deleteProduct, updateProduct }