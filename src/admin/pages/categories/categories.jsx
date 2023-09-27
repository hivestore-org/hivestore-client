// import './categories.css';
// import Topbar from '../../components/topbar/Topbar';
// import Sidebar from '../../components/sidebar/Sidebar';
// import { Formik, Form, Field, ErrorMessage } from 'formik';
// import axios from 'axios';

// export default function AddCategory() {
//     const initialValues = {
//         title: '',
//     }

//     const handleSubmit = async (values) => {
//         const formData = new FormData();
//         formData.append('title', values.title);
//         formData.append('description', values.description);
//         formData.append('image', values.image);
//         formData.append('categories', values.categories);
//         formData.append('size', values.size);
//         formData.append('color', values.color);
//         formData.append('price', values.price);
//         formData.append('inStock', values.inStock);
//         formData.append('taxable', values.taxable);
//         try {
//             const response = await axios.post('/api/v1/products', formData, {
//                 headers: { 'Content-Type': 'multipart/form-data' }
//             });
//             console.log(response.data);
//         } catch (error) {
//             console.error(error);
//         }
//     }

//   return (
//     <div className='newProduct'> 
//         <Topbar />
//         <div className="container">
//             <Sidebar />
//             <div className="main">
//             <h1 className="addProductTitle">New Product</h1>
//                 <Formik initialValues={initialValues} onSubmit={handleSubmit}>
//                     <Form className="addProductForm">
//                         <div className="addProductItem">
//                             <label htmlFor="image">Image</label>
//                             <Field type="file" id='image' name='image' />
//                             <ErrorMessage name='image' component='div' />
//                         </div>
//                         <div className="addProductItem">
//                             <label htmlFor="title">Title:</label>
//                             <Field type="text" id='title' name='title' placeholder='Apple Airpods' />
//                             <ErrorMessage name='title' component='div' />
//                         </div>
//                         <div className="addProductItem">
//                             <label htmlFor="categories">Categories:</label>
//                             <Field type="text" id="categories" name="categories" />
//                             <ErrorMessage name="categories" component="div" />
//                         </div>
//                         <div className="addProductItem">
//                             <label htmlFor="description">Description:</label>
//                             <Field as="textarea" id='description' name='description' placeholder='Apple Airpods' />
//                             <ErrorMessage name='description' component='div' />
//                         </div>
//                         <div className="addProductItem">
//                             <label htmlFor="size">Size:</label>
//                             <Field type="text" id="size" name="size" />
//                             <ErrorMessage name="size" component="div" />
//                         </div>
//                         <div className="addProductItem">
//                             <label htmlFor="color">Color:</label>
//                             <Field type="text" id="color" name="color" />
//                             <ErrorMessage name="color" component="div" />
//                         </div>
//                         <div className="addProductItem">
//                             <label htmlFor="price">Price:</label>
//                             <Field type="number" id="price" name="price" />
//                             <ErrorMessage name="price" component="div" />
//                         </div>
//                         <div className="addProductItem">
//                             <label htmlFor="inStock">In Stock:</label>
//                             <Field type="checkbox" id='inStock' name='inStock' placeholder='123' />
//                             <ErrorMessage name='inStock' component='div' />
//                         </div>
//                         <div className="addProductItem">
//                             <label htmlFor="inStock">Taxable:</label>
//                             <Field type="checkbox" id='taxable' name='taxable' placeholder='123' />
//                             <ErrorMessage name='taxable' component='div' />
//                         </div>
//                         <button type='submit' className='addProductButton'>Add Product</button>
//                     </Form>
//                 </Formik>
//             </div>
//         </div>
       
//     </div>
//   );
// };
