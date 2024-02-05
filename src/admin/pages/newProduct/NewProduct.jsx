import './newProduct.css';
import { useState } from 'react';
import Topbar from '../../components/topbar/Topbar';
import Sidebar from '../../components/sidebar/Sidebar';
import { useFormik, Form, Field, ErrorMessage } from 'formik';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { uploadImgHook } from '../../../firebase/firebase'; 

export default function AdminNewProduct() {
    const [sku, setSku] = useState('');
    const [progress, setProgress] = useState(0);
   
    const formik = useFormik({
        initialValues: {
            title: '',
            sku: '',
            description: '',
            image: null,
            categoriesString: '',
            sizeString: '',
            colorString: '',
            price: 0,
            inStock: true,
            taxable: true
        },
        onSubmit: async (values, { resetForm }) => {
            values.sku = sku;
            setSku('');
            
            try {
                const downloadURL = await uploadImgHook(values.image, setProgress);
                const formData = {
                    title: values.title,
                    sku: values.sku,
                    description: values.description,
                    image: downloadURL,
                    categoriesString: values.categoriesString,
                    sizeString: values.sizeString,
                    colorString: values.colorString,
                    price: values.price,
                    inStock: values.inStock,
                    taxable: values.taxable
                }
                const authTokens = localStorage.getItem('token');
                const response = await axios.post(`${import.meta.env.VITE_API_DOMAIN}/api/v1/products/`, formData, {
                    headers: {
                        Authorization: `Bearer ${authTokens}`,
                    }});
               
                    toast.success('A Product has been successfully added!', {
                        position: toast.POSITION.TOP_CENTER
                    });
                
                resetForm();
                setProgress(0)
            } catch (err) {
                
                    toast.error(`An error occured!`, {
                        position: toast.POSITION.TOP_CENTER
                    });
              
                console.error(err);
            }
        }
    });

    const generateSKU = () => {
        const alpha = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let newSku = '';
        for(let i = 0; i <= 6; i++) {
            const randomIndex = Math.floor(Math.random() * alpha.length);
            newSku += alpha[randomIndex];
        }
        setSku(newSku);
    }

    // const handleSubmit = async (values) => {
    //     const formData = new FormData();
    
    //     formData.append('title', values.title);
    //     formData.append('description', values.description);
    //     formData.append('image', values.image);
    //     formData.append('category', values.category);
    //     formData.append('size', values.size);
    //     formData.append('color', values.color);
    //     formData.append('price', values.price);
    //     formData.append('inStock', values.inStock);
    //     formData.append('taxable', values.taxable);
    //     try {
    //         const response = await axios.post('/api/v1/products', formData, {
    //             headers: { 'Content-Type': 'multipart/form-data' }
    //         });
    //         console.log(response.data);
    //     } catch (error) {
    //         console.error(error);
    //     }
    // }

  return (
    <div className='newProduct'> 
        <Topbar />
        <div className="container">
            <Sidebar />
            <div className="main">
                <ToastContainer/>
            <h1 className="addProductTitle">New Product</h1>
                    <form onSubmit={formik.handleSubmit} className="addProductForm" encType="multipart/form-data">
                        <div className="addProductItem">
                            <label htmlFor="sku">SKU:</label>
                            <input type="text" id='sku' value={sku} name='sku' readOnly />
                            <button type='button' onClick={generateSKU}>Generate SKU</button>
                            {/* <ErrorMessage name='image' component='div' /> */}

                        </div>
                        <div className="addProductItem">
                            <label htmlFor="image">Image</label>
                            <input type="file" id='image' name='image' accept='image/*' onChange={(e) => formik.setFieldValue('image', e.currentTarget.files[0])} />
                            {/* <ErrorMessage name='image' component='div' /> */}
                            <progress value={progress} max="100" />
                        </div>
                        <div className="addProductItem">
                            <label htmlFor="title">Title:</label>
                            <input type="text" id='title' name='title' placeholder='Apple Airpods' value={formik.values.title} onChange={formik.handleChange}  />
                            {/* <ErrorMessage name='title' component='div' /> */}
                        </div>
                        <div className="addProductItem">
                            <label htmlFor="categoriesString">Categories:</label>
                            <input type="text" id="categoriesString" name="categoriesString" value={formik.values.categoriesString} onChange={formik.handleChange} />
                            {/* <ErrorMessage name="category" component="div" /> */}
                        </div>
                        <div className="addProductItem">
                            <label htmlFor="description">Description:</label>
                            <input type="text" id='description' name='description' value={formik.values.description} onChange={formik.handleChange} placeholder='Apple Airpods' />
                            {/* <ErrorMessage name='description' component='div' /> */}
                        </div>
                        <div className="addProductItem">
                            <label htmlFor="size">Size:</label>
                            <input type="text" id="size" name="sizeString" value={formik.values.sizeString} onChange={formik.handleChange}/>
                            {/* <ErrorMessage name="size" component="div" /> */}
                        </div>
                        <div className="addProductItem">
                            <label htmlFor="color">Color:</label>
                            <input type="text" id="color" name="colorString" value={formik.values.colorString} onChange={formik.handleChange} />
                            {/* <ErrorMessage name="color" component="div" /> */}
                        </div>
                        <div className="addProductItem">
                            <label htmlFor="price">Price:</label>
                            <input type="number" id="price" value={formik.values.price} onChange={formik.handleChange} name="price" />
                            {/* <ErrorMessage name="price" component="div" /> */}
                        </div>
                        <div className="addProductItem">
                            <label htmlFor="inStock">In Stock:</label>
                            <input type="checkbox" id='inStock' name='inStock' checked={formik.values.inStock} onChange={(e) => formik.setFieldValue('inStock', e.target.checked)} placeholder='123' />
                            {/* <ErrorMessage name='inStock' component='div' /> */}
                        </div>
                        <div className="addProductItem">
                            <label htmlFor="inStock">Taxable:</label>
                            <input type="checkbox" id='taxable' name='taxable' checked={formik.values.taxable} onChange={(e) => formik.setFieldValue('taxable', e.target.checked)} placeholder='123' />
                            {/* <ErrorMessage name='taxable' component='div' /> */}
                        </div>
                        <button type='submit' className='addProductButton'>Add Product</button>
                    </form>
            </div>
        </div>
       
    </div>
  );
};
